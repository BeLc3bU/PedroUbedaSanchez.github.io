import Phaser from "phaser";
import Player from "../Player";
import type { GameInteractionPayload } from "../types";

export default class InteriorScene extends Phaser.Scene {
    private player!: Player;
    private type!: "PROJECTS" | "EXPERIENCE";
    private map!: Phaser.Tilemaps.Tilemap;
    private interactiveEnabled: boolean = false;

    constructor() {
        super("InteriorScene");
    }

    init(data: { type: "PROJECTS" | "EXPERIENCE" }) {
        this.type = data.type;
        this.interactiveEnabled = false;
    }

    preload() {
        this.load.image("dungeon-tiles", "/assets/game/rpg/Dungeon_24x24.png");
        this.load.image("decor-tiles", "/assets/game/rpg/decor.png");

        const mapKey = this.type === "PROJECTS" ? "projects-map" : "experience-map";
        const jsonPath =
            this.type === "PROJECTS" ? "projects_castle.json" : "experience_castle.json";

        this.load.tilemapTiledJSON(mapKey, `/assets/game/rpg/${jsonPath}`);
    }

    create() {
        this.cameras.main.setBackgroundColor("#050b14");
        this.cameras.main.fadeIn(400, 0, 0, 0);

        const mapKey = this.type === "PROJECTS" ? "projects-map" : "experience-map";
        this.map = this.make.tilemap({ key: mapKey });

        const dungeonTiles = this.map.addTilesetImage("Dungeon_24x24", "dungeon-tiles");
        const decorTiles = this.map.addTilesetImage("decor", "decor-tiles");

        if (dungeonTiles && decorTiles) {
            this.map.createLayer("Below/BaseMap", dungeonTiles, 0, 0)?.setDepth(0);
            this.map
                .createLayer("Below/TiledObjects", [dungeonTiles, decorTiles], 0, 0)
                ?.setDepth(1);
            this.map.createLayer("Same/ObjectsBase", [dungeonTiles, decorTiles], 0, 0)?.setDepth(5);
            this.map
                .createLayer("Above/ObjectsTop", [dungeonTiles, decorTiles], 0, 0)
                ?.setDepth(20);
        }

        const spawnName =
            this.type === "PROJECTS" ? "projects_door_exit" : "experience_castle_door_exit";
        const spawnLayer = this.map.getObjectLayer("System/Spawns");
        const spawnPoint = spawnLayer?.objects.find((obj) => obj.name === spawnName);

        this.player = new Player(this, spawnPoint?.x || 400, spawnPoint?.y || 400);

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

        const mapWidth = this.map.widthInPixels;
        const mapHeight = this.map.heightInPixels;

        this.physics.world.setBounds(0, 0, mapWidth, mapHeight);
        this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(2.0);

        this.time.delayedCall(500, () => {
            this.interactiveEnabled = true;
        });
    }

    private setupInteractables() {
        const interactableLayer = this.map.getObjectLayer("System/Interactables");
        const interactables = interactableLayer ? interactableLayer.objects : [];

        interactables.forEach((obj) => {
            const width = obj.width ?? 0;
            const height = obj.height ?? 0;
            const x = (obj.x ?? 0) + width / 2;
            const y = (obj.y ?? 0) + height / 2;

            const zone = this.add.zone(x, y, width, height);
            this.physics.add.existing(zone, true);

            const itemId = obj.properties?.find(
                (p: { name: string; value: unknown }) => p.name === "id"
            )?.value;

            if (obj.type === "door" && (obj.name === "exit" || obj.name.includes("exit"))) {
                this.physics.add.overlap(this.player, zone, () => {
                    if (!this.interactiveEnabled) return;
                    this.player.setPromptVisible(true);
                    if (this.player.isInteracting()) {
                        this.exitCastle();
                    }
                });
            } else {
                this.physics.add.overlap(this.player, zone, () => {
                    if (!this.interactiveEnabled) return;
                    this.player.setPromptVisible(true);
                    if (this.player.isInteracting()) {
                        this.handleInteraction(this.type, itemId);
                    }
                });
            }
        });
    }

    private handleInteraction(type: "PROJECTS" | "EXPERIENCE", id: unknown) {
        const payload: GameInteractionPayload = {
            type,
            id: String(id || ""),
        };

        if (typeof window !== "undefined") {
            window.dispatchEvent(
                new CustomEvent("portfolio-game-interaction", {
                    detail: payload,
                })
            );
        }
    }

    private exitCastle() {
        this.interactiveEnabled = false;
        this.cameras.main.fade(
            400,
            0,
            0,
            0,
            false,
            (_camera: Phaser.Cameras.Scene2D.Camera, progress: number) => {
                if (progress === 1) {
                    this.scene.start("IslandScene");
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
