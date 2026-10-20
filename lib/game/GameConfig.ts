import { type PlayerConfig } from "./TiledMapLoader";

export const PLAYER_CONFIG: PlayerConfig = {
    idlePath: "assets/player/idle.png",
    walkPath: "assets/player/walk.png",
    frameWidth: 66,
    frameHeight: 66,
    // Intro wave animation. If your sheet only has pixels in the first frames,
    // keep the animation range tight to avoid rendering empty frames.
    helloPath: "assets/player/waving.png",
    helloFrameWidth: 66,
    helloFrameHeight: 66,
    helloAnim: { start: 0, end: 1, frameRate: 6 },
};
