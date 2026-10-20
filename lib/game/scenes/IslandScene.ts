import Phaser from "phaser";
import Player from "../Player";

export default class IslandScene extends Phaser.Scene {
    private player!: Player;
    private map!: Phaser.Tilemaps.Tilemap;
    private interactiveEnabled: boolean = false;

    constructor() {
        super("IslandScene");
    }

    preload() {
        // Carga de tilesets y mapa de la isla
        this.load.image("island-tiles", "/assets/game/rpg/Island_24x24.png");
        this.load.image("dungeon-tiles", "/assets/game/rpg/Dungeon_24x24.png");
        this.load.image("decor-tiles", "/assets/game/rpg/decor.png");
        this.load.image("example-tiles", "/assets/game/rpg/example.png");

        this.load.tilemapTiledJSON("island-map", "/assets/game/rpg/island.json");

        // Carga de sprites de animaciones del personaje
        const heroAnims = ["idle", "run"];
        const heroDirs = ["down", "up", "left", "right"];
        heroAnims.forEach((anim) => {
            heroDirs.forEach((dir) => {
                this.load.spritesheet(
                    `hero-${anim}-${dir}`,
                    `/assets/game/rpg/hero/${anim}/${anim}_${dir}_40x40.png`,
                    { frameWidth: 40, frameHeight: 40 }
                );
            });
        });
    }

    create() {
        this.cameras.main.setBackgroundColor("#050b14");
        this.cameras.main.fadeIn(400, 0, 0, 0);
        this.interactiveEnabled = false;

        this.map = this.make.tilemap({ key: "island-map" });

        const islandTiles = this.map.addTilesetImage("Island_24x24", "island-tiles");
        this.map.addTilesetImage("Dungeon_24x24", "dungeon-tiles");
        const decorTiles = this.map.addTilesetImage("decor", "decor-tiles");
        const exampleTiles = this.map.addTilesetImage("example", "example-tiles");

        if (islandTiles && decorTiles && exampleTiles) {
            this.map.createLayer("Below/BaseMap", islandTiles, 0, 0)?.setDepth(0);
            this.map
                .createLayer("Below/TiledObjects", [islandTiles, decorTiles, exampleTiles], 0, 0)
                ?.setDepth(1);
            this.map
                .createLayer("Same/ObjectsBase", [islandTiles, decorTiles, exampleTiles], 0, 0)
                ?.setDepth(5);
            this.map
                .createLayer("Above/ObjectsTop", [islandTiles, decorTiles, exampleTiles], 0, 0)
                ?.setDepth(20);
        }

        const spawnLayer = this.map.getObjectLayer("System/Spawns");
        const spawnPoint = spawnLayer?.objects.find((obj) => obj.name === "player");
        const lastPos =
            (this.game.registry.get("playerLastPos") as {
                x: number;
                y: number;
            }) || undefined;
        const startX = lastPos?.x || spawnPoint?.x || 600;
        const startY = lastPos?.y || spawnPoint?.y || 600;

        this.game.registry.remove("playerLastPos");

        this.player = new Player(this, startX, startY);

        const colliderGroup = this.physics.add.staticGroup();
        const colliders = this.map.getObjectLayer("System/Colliders");

        if (colliders && colliders.objects) {
            colliders.objects.forEach((obj) => {
                if (
                    obj.x !== undefined &&
                    obj.y !== undefined &&
                    obj.width !== undefined &&
                    obj.height !== undefined
                ) {
                    const x = obj.x + obj.width / 2;
                    const y = obj.y + obj.height / 2;
                    const zone = colliderGroup.create(x, y, undefined, undefined, false);
                    zone.setSize(obj.width, obj.height);
                    zone.refreshBody();
                }
            });
        }
        this.physics.add.collider(this.player, colliderGroup);

        this.setupInteractables();

        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.setZoom(1.5);

        this.time.delayedCall(400, () => {
            this.interactiveEnabled = true;
        });
    }

    private setupInteractables() {
        const interactableLayer = this.map.getObjectLayer("System/Interactables");
        const interactables = interactableLayer ? interactableLayer.objects : [];

        interactables.forEach((obj) => {
            if (obj.type === "door") {
                const width = obj.width ?? 0;
                const height = obj.height ?? 0;
                const x = (obj.x ?? 0) + width / 2;
                const y = (obj.y ?? 0) + height / 2;

                const zone = this.add.zone(x, y, width, height);
                this.physics.add.existing(zone, true);

                const mapProp = obj.properties?.find(
                    (p: { name: string; value: unknown }) => p.name === "go_to_map"
                );
                const mapValue = mapProp?.value;

                this.physics.add.overlap(this.player, zone, () => {
                    if (!this.interactiveEnabled) return;
                    this.player.setPromptVisible(true);

                    if (this.player.isInteracting()) {
                        if (mapValue === "projects_castle") {
                            this.enterCastle("PROJECTS");
                        } else if (mapValue === "experience_castle") {
                            this.enterCastle("EXPERIENCE");
                        }
                    }
                });
            }
        });
    }

    private enterCastle(type: "PROJECTS" | "EXPERIENCE") {
        this.interactiveEnabled = false;
        this.game.registry.set("playerLastPos", {
            x: this.player.x,
            y: this.player.y + 24,
        });

        this.cameras.main.fade(
            400,
            0,
            0,
            0,
            false,
            (_camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
                if (progress === 1) {
                    this.scene.start("InteriorScene", { type });
                }
            }
        );
    }

    update() {
        if (this.player && this.scene.isActive()) {
            this.player.setPromptVisible(false);
            this.player.update();
        }
    }
}
