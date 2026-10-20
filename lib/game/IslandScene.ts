import BaseScene from "./BaseScene";
import { TiledMapLoader, type MapConfig } from "./TiledMapLoader";
import { PLAYER_CONFIG } from "./GameConfig";
import OutlineEffect from "./OutlineEffect";
import { Analytics } from "./analytics";
import WelcomePanel from "./WelcomePanel";

export default class IslandScene extends BaseScene {
    private welcomePanel!: WelcomePanel;
    private mapConfig: MapConfig = {
        tilesetFolder: "P_P_FREE_RPG_TILESET",
        tilesets: [
            { name: "Island_24x24", path: "Island_24x24.png" },
            { name: "Dungeon_24x24", path: "Dungeon_24x24.png" },
            { name: "example", path: "example.png" },
            { name: "decor", path: "decor.png" },
            // Add sheets to use loose tiles
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
                name: "example_sheet",
                path: "example.png",
                spritesheet: { frameWidth: 24, frameHeight: 24 },
            },
        ],
        mapKey: "island_map",
        mapPath: "assets/tiled/maps/island.json",
    };

    constructor() {
        super("IslandScene");
    }

    preload() {
        TiledMapLoader.loadPlayer(this, PLAYER_CONFIG);
        TiledMapLoader.loadMap(this, this.mapConfig);
        this.load.audio("island_music", "assets/audio/music/Cozy_Kingdom_Overworld.ogg");
        this.load.audio("chest_open", "assets/audio/sfx/success_key_founded.ogg");
        this.load.audio("birds_ambient", "assets/audio/sfx/birds.ogg");

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
        this.startOrResumeMusic("island_music", 0.5);

        // Play birds ambient sound in loop
        this.sound.play("birds_ambient", { loop: true, volume: 0.5 });

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

        // Create the WelcomePanel after setupInput() so it gets registered on the UI camera.
        this.welcomePanel = new WelcomePanel(this);

        // Show environment name when returning to island (if not first time)
        if (this.registry.get("hasWelcomeShown")) {
            const hudScene = this.scene.get("HUDScene") as any;
            if (hudScene && hudScene.showEnvironmentName) {
                hudScene.showEnvironmentName("Isla Principal");
            }
        }

        // Show welcome message on first game load
        if (!this.registry.get("hasWelcomeShown")) {
            // Track game start
            Analytics.trackGameStart();

            // Freeze gameplay + play intro wave until the welcome dialog closes.
            this.setMovementLocked(true);
            if (this.anims.exists("hello_wave")) {
                this.player.play("hello_wave", true);
            }

            this.time.delayedCall(500, () => {
                const isDesktop = this.game.device.os.desktop;
                const instructions = isDesktop
                    ? "Use the arrow keys to move (â† â†‘ â†’ â†“) and press [E] to interact."
                    : "Usa los controles táctiles en pantalla para moverte e interactuar.";

                this.showDialogue({
                    text: `¡Hola, explorador! Soy Pedro Úbeda.|||Bienvenido a mi isla: aquí puedes explorar mis proyectos y trayectoria.|||${instructions}`,
                    onClose: () => {
                        this.setMovementLocked(false);
                        const facing = this.registry.get("playerDirection") || "down";
                        this.player.play(`idle_${facing}`, true);

                        // Show environment name after intro
                        const hudScene = this.scene.get("HUDScene") as any;
                        if (hudScene && hudScene.showEnvironmentName) {
                            hudScene.showEnvironmentName("Isla Principal");
                        }
                    },
                });
            });
            this.registry.set("hasWelcomeShown", true);
        }
    }

    protected handleInteraction(obj: any) {
        let onCloseCallback: (() => void) | undefined;

        const infoType = obj.properties?.find((p: any) => p.name === "type")?.value;
        if (infoType === "welcome_info") {
            this.welcomePanel.show({
                message: "¿Quieres ponerte en contacto?\nVisita la sección de contacto de la web.",
                url: "/#contact",
                primaryText: "Ir al formulario",
                secondaryText: "Ahora no",
            });
            return;
        }

        if (obj.type === "door") {
            const locked = obj.properties?.find((p: any) => p.name === "locked")?.value;

            if (locked) {
                const keyColor = obj.properties?.find((p: any) => p.name === "key_color")?.value;
                const inventory = this.registry.get("inventory") || [];
                // Assuming inventory stores items as 'blue_key'
                const requiredKey = `${keyColor}_key`;

                if (!inventory.includes(requiredKey)) {
                    this.showDialogue(
                        `¡Bloqueado! Necesitas la llave ${keyColor === "blue" ? "azul" : keyColor === "green" ? "verde" : keyColor}.`
                    );
                    return;
                }
            }

            const goToMap = obj.properties?.find((p: any) => p.name === "go_to_map")?.value;
            const goToDoor = obj.properties?.find((p: any) => p.name === "go_to_door")?.value;

            if (goToMap === "experience_castle") {
                Analytics.trackCastleEntered("Experience Castle");
                this.transitionToScene("ExperienceCastleScene", { spawnLocation: goToDoor });
            } else if (goToMap === "projects_castle") {
                Analytics.trackCastleEntered("Projects Castle");
                this.transitionToScene("ProjectsCastleScene", { spawnLocation: goToDoor });
            }
        } else if (obj.name === "projects_closed_chest") {
            const closedChest = this.objectSprites.get("projects_closed_chest");
            const openChest = this.objectSprites.get("projects_open_chest");

            if (closedChest?.visible) {
                Analytics.trackChestOpened("projects_chest", "Island");
                closedChest.setVisible(false);
                openChest?.setVisible(true);

                // Added key animation
                if (openChest) {
                    // Blue key frame ID is 42
                    const keySprite = this.add.sprite(
                        openChest.x + openChest.width / 2,
                        openChest.y - openChest.height / 2,
                        "decor_sheet",
                        42
                    );
                    keySprite.setOrigin(0.5, 0.5);
                    keySprite.setDepth(openChest.depth + 1);

                    // This is a world-space sprite; keep it out of the UI camera to avoid a tiny duplicate.
                    this.uiCamera?.ignore(keySprite);

                    //Play sfx
                    this.sound.play("chest_open", { volume: 0.5 });

                    this.tweens.add({
                        targets: keySprite,
                        y: keySprite.y - 20,
                        duration: 1000,
                        ease: "Power2",
                    });

                    onCloseCallback = () => {
                        const { x: targetX, y: targetY } = this.getHudKeySlotWorldPosition("blue");

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
                                // Update inventory
                                const currentInventory = this.registry.get("inventory") || [];
                                if (!currentInventory.includes("blue_key")) {
                                    Analytics.trackKeyCollected("blue");
                                    this.registry.set("inventory", [
                                        ...currentInventory,
                                        "blue_key",
                                    ]);
                                }
                            },
                        });
                    };
                }
            } else {
                return;
            }
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
        var offsetYPx = 1;
        if (obj.name === "projects_closed_chest") {
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
