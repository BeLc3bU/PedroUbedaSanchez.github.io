import BaseScene from "./BaseScene";
import { TiledMapLoader, type MapConfig } from "./TiledMapLoader";
import { PLAYER_CONFIG } from "./GameConfig";
import OutlineEffect from "./OutlineEffect";
import InfoPanel from "./InfoPanel";
import { Analytics } from "./analytics";

export default class ProjectsCastleScene extends BaseScene {
    private infoPanel!: InfoPanel;
    private mapConfig: MapConfig = {
        tilesetFolder: "P_P_FREE_RPG_TILESET",
        tilesets: [
            { name: "Island_24x24", path: "Island_24x24.png" },
            { name: "Dungeon_24x24", path: "Dungeon_24x24.png" },
            { name: "decor", path: "decor.png" },
            // Sheets to use loose tiles (objects/key sprites)
            {
                name: "decor_sheet",
                path: "decor.png",
                spritesheet: { frameWidth: 24, frameHeight: 24 },
            },
            {
                name: "Dungeon_24x24_sheet",
                path: "Dungeon_24x24.png",
                spritesheet: { frameWidth: 24, frameHeight: 24 },
            },
            {
                name: "Island_24x24_sheet",
                path: "Island_24x24.png",
                spritesheet: { frameWidth: 24, frameHeight: 24 },
            },
        ],
        mapKey: "projects_castle_map",
        mapPath: "assets/tiled/maps/projects_castle.json",
    };

    constructor() {
        super("ProjectsCastleScene");
    }

    preload() {
        TiledMapLoader.loadPlayer(this, PLAYER_CONFIG);
        TiledMapLoader.loadMap(this, this.mapConfig);
        this.load.audio("projects_music", "assets/audio/music/Bright_Roads_of_Doria.ogg");
        this.load.audio("chest_open", "assets/audio/sfx/success_key_founded.ogg");

        // Load dialogue button textures
        this.load.image("e_key_button", "assets/textures/e_key.png");
        this.load.image("a_button", "assets/textures/a_button.png");
    }

    create() {
        // Launch HUDScene if not already running
        if (!this.scene.isActive("HUDScene")) {
            this.scene.launch("HUDScene");
        }

        // Start or resume background music with fade-in
        this.startOrResumeMusic("projects_music", 0.5);

        OutlineEffect.addToScene(this);
        const { map, tilesets } = TiledMapLoader.createMap(this, this.mapConfig);

        // 1. Below Layer (Ground)
        map.createLayer("Below/BaseMap", tilesets, 0, 0);

        // 2. Below Layer (Decorations that are always below)
        const tiledObjectsLayer = map.getLayer("Below/TiledObjects");
        if (tiledObjectsLayer) {
            map.createLayer("Below/TiledObjects", tilesets, 0, 0);
        }

        // 3. Same Layer (Base objects like trunks - rendered flat before objects)
        const objectsBaseLayer = map.getLayer("Same/ObjectsBase");
        if (objectsBaseLayer) {
            map.createLayer("Same/ObjectsBase", tilesets, 0, 0);
        }

        // 4. Player & Active Objects (Y-Sorted)
        this.setupPlayer(map);
        this.setupObjects(map); // Loads 'Same/Objects'

        // 5. Above Layer (Tree tops - always on top)
        const objectsTopLayer = map.getLayer("Above/ObjectsTop");
        if (objectsTopLayer) {
            const topLayer = map.createLayer("Above/ObjectsTop", tilesets, 0, 0);
            topLayer?.setDepth(map.heightInPixels + 1000);
        }

        // Our loader doesn't respect Tiled's initial visibility flag, so hide open chest explicitly.
        this.objectSprites.get("experience_open_chest")?.setVisible(false);

        this.setupColliders(map); // 'System/Colliders'
        this.setupInteractables(map); // 'System/Interactables'
        this.setupInput();
        this.setupCamera(map);

        // Create the InfoPanel after setupInput() so it gets registered on the UI camera.
        this.infoPanel = new InfoPanel(this);

        // Show environment name
        const hudScene = this.scene.get("HUDScene") as any;
        if (hudScene && hudScene.showEnvironmentName) {
            hudScene.showEnvironmentName("Projects Castle");
        }
    }

    protected handleInteraction(obj: any) {
        let onCloseCallback: (() => void) | undefined;

        if (obj.type === "door") {
            const goToMap = obj.properties?.find((p: any) => p.name === "go_to_map")?.value;
            const goToDoor = obj.properties?.find((p: any) => p.name === "go_to_door")?.value;

            if (goToMap === "island") {
                Analytics.trackSceneChange("IslandScene", "ProjectsCastleScene");
                this.transitionToScene("IslandScene", { spawnLocation: goToDoor });
            } else if (goToMap === "experience_castle") {
                Analytics.trackSceneChange("ExperienceCastleScene", "ProjectsCastleScene");
                this.transitionToScene("ExperienceCastleScene", { spawnLocation: goToDoor });
            }
        } else if (obj.name === "experience_closed_chest") {
            const closedChest = this.objectSprites.get("experience_closed_chest");
            const openChest = this.objectSprites.get("experience_open_chest");

            if (!closedChest?.visible) {
                return;
            }

            Analytics.trackChestOpened("experience_chest", "Projects Castle");
            closedChest.setVisible(false);
            openChest?.setVisible(true);

            // Key animation (reuse the same key sprite frame as HUD for now)
            if (openChest) {
                const keySprite = this.add.sprite(
                    openChest.x + openChest.width / 2,
                    openChest.y - openChest.height / 2,
                    "decor_sheet",
                    82
                );
                keySprite.setOrigin(0.5, 0.5);
                keySprite.setDepth(openChest.depth + 1);

                // This is a world-space sprite; keep it out of the UI camera to avoid a tiny duplicate.
                this.uiCamera?.ignore(keySprite);

                this.sound.play("chest_open", { volume: 0.5 });

                this.tweens.add({
                    targets: keySprite,
                    y: keySprite.y - 20,
                    duration: 1000,
                    ease: "Power2",
                });

                onCloseCallback = () => {
                    const { x: targetX, y: targetY } = this.getHudKeySlotWorldPosition("green");

                    this.tweens.add({
                        targets: keySprite,
                        x: targetX,
                        y: targetY,
                        scaleX: 0.5,
                        scaleY: 0.5,
                        duration: 800,
                        ease: "Back.In",
                        onComplete: () => {
                            keySprite.destroy();
                            const currentInventory = this.registry.get("inventory") || [];
                            if (!currentInventory.includes("green_key")) {
                                Analytics.trackKeyCollected("green");
                                this.registry.set("inventory", [...currentInventory, "green_key"]);
                            }
                        },
                    });
                };
            }
        }

        // Check for objects with 'id' property (projects/experiences)
        const id = obj.properties?.find((p: any) => p.name === "id")?.value;
        if (id > -1) {
            const type = obj.properties?.find((p: any) => p.name === "type")?.value;
            if (type === "game") {
                Analytics.trackProjectViewed(id, `Project ${id}`);
                this.infoPanel.showGame(id);
            } else if (type === "experience") {
                Analytics.trackExperienceViewed(id, `Experience ${id}`);
                this.infoPanel.showExperience(id);
            }
            return;
        }

        const text = obj.properties?.find((p: any) => p.name === "text")?.value;
        if (text) {
            const keyWord = obj.properties?.find((p: any) => p.name === "key_word")?.value;
            const keyWordColor = obj.properties?.find(
                (p: any) => p.name === "key_word_color"
            )?.value;
            this.showDialogue({ text, keyWord, keyWordColor, onClose: onCloseCallback });
        }
    }

    protected onInteractableEnter(obj: any) {
        let offsetYPx = 1;
        if (obj.name === "experience_closed_chest") {
            offsetYPx = 0;
        }

        const sprite = this.objectSprites.get(obj.name);
        if (sprite) {
            OutlineEffect.apply(sprite, 0xffffff, 0.002, 0, offsetYPx);
        }
    }

    protected onInteractableExit(obj: any) {
        const sprite = this.objectSprites.get(obj.name);
        if (sprite) {
            OutlineEffect.remove(sprite);
        }
    }
}
