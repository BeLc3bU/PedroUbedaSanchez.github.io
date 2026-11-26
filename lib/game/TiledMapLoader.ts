import Phaser from "phaser";

export interface PlayerConfig {
    idlePath: string;
    walkPath: string;
    frameWidth: number;
    frameHeight: number;
    helloPath?: string;
    helloFrameWidth?: number;
    helloFrameHeight?: number;
    helloAnim?: {
        start: number;
        end: number;
        frameRate?: number;
    };
}

export interface TilesetConfig {
    name: string;
    path: string;
    spritesheet?: { frameWidth: number; frameHeight: number };
}

export interface MapConfig {
    tilesetFolder: string;
    tilesets: TilesetConfig[];
    mapKey: string;
    mapPath: string;
}

export class TiledMapLoader {
    static loadPlayer(scene: Phaser.Scene, config: PlayerConfig) {
        scene.load.spritesheet("player_idle", config.idlePath, {
            frameWidth: config.frameWidth,
            frameHeight: config.frameHeight,
        });
        scene.load.spritesheet("player_walk", config.walkPath, {
            frameWidth: config.frameWidth,
            frameHeight: config.frameHeight,
        });

        if (config.helloPath) {
            scene.load.spritesheet("player_hello", config.helloPath, {
                frameWidth: config.helloFrameWidth ?? config.frameWidth,
                frameHeight: config.helloFrameHeight ?? config.frameHeight,
            });

            // BaseScene will read this to build the looping intro animation.
            scene.registry.set(
                "playerHelloAnim",
                config.helloAnim ?? { start: 0, end: 1, frameRate: 6 }
            );
        }
    }

    static loadMap(scene: Phaser.Scene, config: MapConfig) {
        // Load all tilesets
        config.tilesets.forEach((tileset) => {
            const fullPath = `assets/${config.tilesetFolder}/${tileset.path}`;
            if (tileset.spritesheet) {
                scene.load.spritesheet(tileset.name, fullPath, tileset.spritesheet);
            } else {
                scene.load.image(tileset.name, fullPath);
            }
        });

        // Load tilemap
        scene.load.tilemapTiledJSON(config.mapKey, config.mapPath);
    }

    /**
     * Muestra una barra de progreso minimalista mientras se descargan los assets de la escena.
     * Solo se renderiza si hay archivos pendientes en la cola de carga.
     */
    static attachLoadingProgress(scene: Phaser.Scene) {
        if (scene.load.totalToLoad === 0) return;

        const { width, height } = scene.scale;
        const barWidth = Math.min(280, Math.max(160, width * 0.45));
        const barHeight = 14;
        const centerX = width / 2;
        const centerY = height / 2;

        const container = scene.add.container(0, 0).setDepth(20000);
        const bgBox = scene.add
            .rectangle(centerX, centerY, barWidth + 8, barHeight + 8, 0x0f172a, 0.9)
            .setStrokeStyle(2, 0x38bdf8, 0.8);
        const fillBar = scene.add
            .rectangle(centerX - barWidth / 2, centerY, 0, barHeight, 0x38bdf8, 1)
            .setOrigin(0, 0.5);
        const label = scene.add
            .text(centerX, centerY - 24, "Cargando mundo... 0%", {
                fontFamily: '"Press Start 2P", monospace',
                fontSize: "11px",
                color: "#e2e8f0",
            })
            .setOrigin(0.5);

        container.add([bgBox, fillBar, label]);

        const onProgress = (value: number) => {
            fillBar.width = barWidth * value;
            label.setText(`Cargando mundo... ${Math.round(value * 100)}%`);
        };

        const cleanup = () => {
            scene.load.off("progress", onProgress);
            container.destroy(true);
        };

        scene.load.on("progress", onProgress);
        scene.load.once("complete", cleanup);
    }

    static createMap(
        scene: Phaser.Scene,
        config: MapConfig
    ): { map: Phaser.Tilemaps.Tilemap; tilesets: Phaser.Tilemaps.Tileset[] } {
        const map = scene.make.tilemap({ key: config.mapKey });

        const tilesets = config.tilesets
            .map((tileset) => map.addTilesetImage(tileset.name, tileset.name))
            .filter((t): t is Phaser.Tilemaps.Tileset => t !== null);

        return { map, tilesets };
    }
}
