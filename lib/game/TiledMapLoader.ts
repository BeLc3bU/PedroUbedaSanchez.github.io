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
