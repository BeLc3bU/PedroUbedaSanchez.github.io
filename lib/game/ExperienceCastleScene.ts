import BaseScene from "./BaseScene";
import { TiledMapLoader, type MapConfig } from "./TiledMapLoader";
import { PLAYER_CONFIG } from "./GameConfig";
import OutlineEffect from "./OutlineEffect";
import InfoPanel from "./InfoPanel";
import { Analytics } from "./analytics";

export default class ExperienceCastleScene extends BaseScene {
    private infoPanel!: InfoPanel;
    private mapConfig: MapConfig = {
        tilesetFolder: "P_P_FREE_RPG_TILESET",
        tilesets: [
            { name: "Island_24x24", path: "Island_24x24.png" },
            { name: "Dungeon_24x24", path: "Dungeon_24x24.png" },
            { name: "example", path: "example.png" },
            { name: "decor", path: "decor.png" },
            {
                name: "decor_sheet",
                path: "decor.png",
                spritesheet: { frameWidth: 24, frameHeight: 24 },
            },
        ],
        mapKey: "experience_castle_map",
        mapPath: "assets/tiled/maps/experience_castle.json",
    };

    constructor() {
        super("ExperienceCastleScene");
    }

    preload() {
        TiledMapLoader.loadPlayer(this, PLAYER_CONFIG);
        TiledMapLoader.loadMap(this, this.mapConfig);
        this.load.audio("experience_music", "assets/audio/music/Maple_Mosaic.ogg");

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
        this.startOrResumeMusic("experience_music", 0.5);

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
            topLayer?.setDepth(map.heightInPixels + 1000); // Ensure it's above everything
        }

        this.objectSprites.get("projects_open_chest")?.setVisible(false);

        this.setupColliders(map); // 'System/Colliders'
        this.setupInteractables(map); // 'System/Interactables'
        this.setupInput();
        this.setupCamera(map);

        // Create the InfoPanel after setupInput() so it gets registered on the UI camera.
        this.infoPanel = new InfoPanel(this);

        // Show environment name
        const hudScene = this.scene.get("HUDScene") as any;
        if (hudScene && hudScene.showEnvironmentName) {
            hudScene.showEnvironmentName("Castillo de Experiencia");
        }

        // Test for BBCode Text
        this.input.keyboard?.on("keydown-T", () => {
            this.showDialogue({
                text: "This is a test message. The {0} is colored!",
                keyWord: "magic word",
                keyWordColor: "#00ff00",
            });
        });
    }

    protected handleInteraction(obj: any) {
        if (obj.type === "door") {
            const goToMap = obj.properties?.find((p: any) => p.name === "go_to_map")?.value;
            const goToDoor = obj.properties?.find((p: any) => p.name === "go_to_door")?.value;

            if (goToMap === "island") {
                Analytics.trackSceneChange("IslandScene", "ExperienceCastleScene");
                this.transitionToScene("IslandScene", { spawnLocation: goToDoor });
            }
        } else if (obj.name === "chest") {
            const closedChest = this.objectSprites.get("projects_closed_chest");
            const openChest = this.objectSprites.get("projects_open_chest");

            if (closedChest?.visible) {
                Analytics.trackChestOpened("chest", "Castillo de Experiencia");
                closedChest.setVisible(false);
                openChest?.setVisible(true);
                this.showDialogue(
                    "¡Cofre abierto! Muchas gracias por explorar este juego. ¡Que tengas un excelente día! Este cofre ya está vacío."
                );
            } else {
                this.showDialogue("El cofre ya está abierto.");
            }
        } else if (obj.name === "experience_closed_chest") {
            const closedChest = this.objectSprites.get("experience_closed_chest");
            const openChest = this.objectSprites.get("experience_open_chest");

            if (!closedChest?.visible) {
                return;
            }

            Analytics.trackChestOpened("experience_chest", "Castillo de Experiencia");
            closedChest.setVisible(false);
            openChest?.setVisible(true);
        }

        // Check for objects with 'id' property (projects/experiences)
        const id = obj.properties?.find((p: any) => p.name === "id")?.value;
        if (id > -1) {
            const type = obj.properties?.find((p: any) => p.name === "type")?.value;
            if (type === "game") {
                this.infoPanel.showGame(id);
            } else if (type === "experience") {
                // Track experience view - we'll pass a generic label since we don't have company name here
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
            this.showDialogue({ text, keyWord, keyWordColor });
        }
    }

    protected onInteractableEnter(obj: any) {
        if (obj.name === "chest") {
            const sprite = this.objectSprites.get("projects_closed_chest");
            if (sprite) {
                OutlineEffect.apply(sprite);
            }
        }
    }

    protected onInteractableExit(obj: any) {
        if (obj.name === "chest") {
            const sprite = this.objectSprites.get("projects_closed_chest");
            if (sprite) {
                OutlineEffect.remove(sprite);
            }
        }
    }
}
