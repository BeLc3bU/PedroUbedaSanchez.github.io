import type { Direction, GameState, InteractiveStation, Player, RectCollider } from "./types";
import { STATIONS } from "./dialogs";

export const MAP_WIDTH = 800;
export const MAP_HEIGHT = 560;
export const PLAYER_SIZE = 32;
export const PLAYER_SPEED = 180; // pixels per second

export interface GameParticle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    alpha: number;
    life: number;
    maxLife: number;
}

// Exit Door Sensor at the bottom center: x: 350..450, y: 520..560
export const EXIT_DOOR_ZONE: RectCollider = {
    x: 350,
    y: 520,
    width: 100,
    height: 40,
};

export const DEFAULT_OBSTACLES: RectCollider[] = [
    // Outer perimeter walls (Leaving gap at bottom center x: 350..450 for Exit Door)
    { x: 0, y: 0, width: MAP_WIDTH, height: 40 }, // Top wall
    { x: 0, y: MAP_HEIGHT - 35, width: 350, height: 35 }, // Bottom wall Left
    { x: 450, y: MAP_HEIGHT - 35, width: 350, height: 35 }, // Bottom wall Right
    { x: 0, y: 0, width: 35, height: MAP_HEIGHT }, // Left wall
    { x: MAP_WIDTH - 35, y: 0, width: 35, height: MAP_HEIGHT }, // Right wall

    // Top-Left: Avionics Cabin (Precisely matching background)
    { x: 50, y: 40, width: 220, height: 160 },

    // Top-Right: Server Racks & Terminals (x: 390..740, y: 40..150)
    { x: 390, y: 40, width: 350, height: 110 },

    // Bottom-Left: Console Workstation & Barrel Stack (x: 35..180, y: 360..525)
    { x: 35, y: 360, width: 155, height: 165 },

    // Bottom-Right: Command Console Desk (x: 600..740, y: 390..490)
    { x: 600, y: 390, width: 140, height: 100 },

    // Bottom-Right: Conduits / Pipe border (x: 580..765, y: 490..530)
    { x: 580, y: 490, width: 185, height: 40 },

    // Central Energy Reactor Tank (x: 310..490, y: 190..400)
    { x: 310, y: 190, width: 180, height: 210 },
];

export function checkAABBCollision(
    rect1: { x: number; y: number; width: number; height: number },
    rect2: { x: number; y: number; width: number; height: number }
): boolean {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

export function checkObstacleCollision(
    targetX: number,
    targetY: number,
    width: number,
    height: number,
    obstacles: RectCollider[] = DEFAULT_OBSTACLES
): boolean {
    const targetRect = { x: targetX, y: targetY, width, height };
    for (const obstacle of obstacles) {
        if (checkAABBCollision(targetRect, obstacle)) {
            return true;
        }
    }
    return false;
}

export function checkExitDoorTrigger(player: Player): boolean {
    const playerRect = {
        x: player.x,
        y: player.y,
        width: player.width,
        height: player.height,
    };
    return checkAABBCollision(playerRect, EXIT_DOOR_ZONE);
}

export function findNearStation(
    player: Player,
    stations: InteractiveStation[] = STATIONS
): InteractiveStation | null {
    const playerCenterX = player.x + player.width / 2;
    const playerCenterY = player.y + player.height / 2;

    for (const station of stations) {
        const stationCenterX = station.x + station.width / 2;
        const stationCenterY = station.y + station.height / 2;
        const dist = Math.hypot(playerCenterX - stationCenterX, playerCenterY - stationCenterY);

        if (dist <= station.interactRadius + player.width + 10) {
            return station;
        }
    }
    return null;
}

export function createInitialGameState(): GameState {
    return {
        player: {
            x: 384,
            y: 450,
            width: PLAYER_SIZE,
            height: PLAYER_SIZE,
            speed: PLAYER_SPEED,
            direction: "up",
            isMoving: false,
            stepAnim: 0,
        },
        stations: STATIONS,
        obstacles: DEFAULT_OBSTACLES,
        activeStationId: null,
        isNearStation: null,
        isPaused: false,
        mapWidth: MAP_WIDTH,
        mapHeight: MAP_HEIGHT,
    };
}

export function updatePlayerPosition(
    player: Player,
    movement: { up: boolean; down: boolean; left: boolean; right: boolean },
    deltaSeconds: number,
    obstacles: RectCollider[] = DEFAULT_OBSTACLES
): Player {
    let dx = 0;
    let dy = 0;

    if (movement.up) dy -= 1;
    if (movement.down) dy += 1;
    if (movement.left) dx -= 1;
    if (movement.right) dx += 1;

    if (dx === 0 && dy === 0) {
        return {
            ...player,
            isMoving: false,
        };
    }

    if (dx !== 0 && dy !== 0) {
        const factor = 1 / Math.SQRT2;
        dx *= factor;
        dy *= factor;
    }

    const moveDistance = player.speed * deltaSeconds;
    const targetX = player.x + dx * moveDistance;
    const targetY = player.y + dy * moveDistance;

    let newX = player.x;
    let newY = player.y;

    if (!checkObstacleCollision(targetX, player.y, player.width, player.height, obstacles)) {
        newX = targetX;
    }
    if (!checkObstacleCollision(player.x, targetY, player.width, player.height, obstacles)) {
        newY = targetY;
    }

    let newDirection: Direction = player.direction;
    // Update facing direction based on input intention
    if (movement.up && !movement.down) {
        newDirection = "up";
    } else if (movement.down && !movement.up) {
        newDirection = "down";
    } else if (movement.left && !movement.right) {
        newDirection = "left";
    } else if (movement.right && !movement.left) {
        newDirection = "right";
    }

    return {
        ...player,
        x: newX,
        y: newY,
        direction: newDirection,
        isMoving: true,
        stepAnim: (player.stepAnim + deltaSeconds * 9) % 5,
    };
}

// Particle System State
export const particlesList: GameParticle[] = [];

export function updateAndRenderParticles(ctx: CanvasRenderingContext2D, deltaSeconds: number) {
    if (particlesList.length < 35 && Math.random() < 0.4) {
        particlesList.push({
            x: 370 + Math.random() * 60,
            y: 280 + Math.random() * 40,
            vx: (Math.random() - 0.5) * 30,
            vy: -20 - Math.random() * 30,
            size: 1.5 + Math.random() * 2.5,
            color: Math.random() > 0.3 ? "#22d3ee" : "#38bdf8",
            alpha: 0.8,
            life: 0,
            maxLife: 1.2 + Math.random() * 1.5,
        });
    }

    for (let i = particlesList.length - 1; i >= 0; i--) {
        const p = particlesList[i];
        p.life += deltaSeconds;
        if (p.life >= p.maxLife) {
            particlesList.splice(i, 1);
            continue;
        }

        p.x += p.vx * deltaSeconds;
        p.y += p.vy * deltaSeconds;
        p.alpha = 1 - p.life / p.maxLife;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Offscreen Chroma-Key Processed Sprite Cache
let transparentSpriteCache: HTMLCanvasElement | null = null;
let lastSourceSprite: HTMLImageElement | null = null;

export function getTransparentSprite(spriteImg: HTMLImageElement): HTMLCanvasElement {
    if (transparentSpriteCache && lastSourceSprite === spriteImg) {
        return transparentSpriteCache;
    }

    const offscreen = document.createElement("canvas");
    offscreen.width = spriteImg.naturalWidth;
    offscreen.height = spriteImg.naturalHeight;
    const offCtx = offscreen.getContext("2d");
    if (!offCtx) return offscreen;

    offCtx.drawImage(spriteImg, 0, 0);
    const imgData = offCtx.getImageData(0, 0, offscreen.width, offscreen.height);
    const data = imgData.data;

    // Chroma Key: Remove near-white background (RGB > 225)
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        if (r > 220 && g > 220 && b > 220) {
            data[i + 3] = 0; // Alpha to 0
        }
    }
    offCtx.putImageData(imgData, 0, 0);

    transparentSpriteCache = offscreen;
    lastSourceSprite = spriteImg;
    return offscreen;
}

export function renderGameScene(
    ctx: CanvasRenderingContext2D,
    state: GameState,
    lang: "es" | "en",
    assets?: {
        bgImage?: HTMLImageElement | null;
        spriteImage?: HTMLImageElement | null;
    }
): void {
    const { player, stations, mapWidth, mapHeight, isNearStation } = state;

    ctx.imageSmoothingEnabled = false;

    // 1. Render Background Map
    if (assets?.bgImage && assets.bgImage.complete && assets.bgImage.naturalWidth > 0) {
        ctx.drawImage(assets.bgImage, 0, 0, mapWidth, mapHeight);
    } else {
        ctx.fillStyle = "#0a0e17";
        ctx.fillRect(0, 0, mapWidth, mapHeight);
        ctx.strokeStyle = "#162032";
        ctx.lineWidth = 1;
        for (let x = 0; x < mapWidth; x += 40) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, mapHeight);
            ctx.stroke();
        }
        for (let y = 0; y < mapHeight; y += 40) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(mapWidth, y);
            ctx.stroke();
        }
    }

    // 2. Render EXIT Gate Glow & Indicator on Bottom Door
    ctx.save();
    const time = Date.now() * 0.003;
    const pulse = (Math.sin(time) + 1) / 2;

    // Exit Door Area Marker
    ctx.fillStyle = `rgba(239, 68, 68, ${0.25 + pulse * 0.35})`; // Red glow
    ctx.fillRect(EXIT_DOOR_ZONE.x, EXIT_DOOR_ZONE.y, EXIT_DOOR_ZONE.width, EXIT_DOOR_ZONE.height);

    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 2;
    ctx.shadowColor = "#ef4444";
    ctx.shadowBlur = 10;
    ctx.strokeRect(
        EXIT_DOOR_ZONE.x,
        EXIT_DOOR_ZONE.y + 4,
        EXIT_DOOR_ZONE.width,
        EXIT_DOOR_ZONE.height - 8
    );

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 11px monospace";
    ctx.textAlign = "center";
    ctx.fillText("▼ EXIT ▼", 400, 545);
    ctx.restore();

    // 3. Dynamic Reactor Ambient Glow
    const reactorGradient = ctx.createRadialGradient(400, 275, 10, 400, 275, 95);
    reactorGradient.addColorStop(0, `rgba(34, 211, 238, ${0.45 + pulse * 0.25})`);
    reactorGradient.addColorStop(0.5, `rgba(6, 182, 212, ${0.2 + pulse * 0.15})`);
    reactorGradient.addColorStop(1, "rgba(6, 182, 212, 0)");

    ctx.save();
    ctx.fillStyle = reactorGradient;
    ctx.fillRect(280, 160, 240, 230);
    ctx.restore();

    // 4. Render Particles
    updateAndRenderParticles(ctx, 0.016);

    // 5. Render Interactive Station Glow Rings & Floating Badges
    for (const station of stations) {
        const isTarget = isNearStation?.id === station.id;

        // Pulsing Interaction Zone Halo
        ctx.save();
        ctx.strokeStyle = isTarget ? station.color : "rgba(100, 116, 139, 0.4)";
        ctx.lineWidth = isTarget ? 2.5 : 1;
        ctx.setLineDash(isTarget ? [5, 3] : [3, 5]);

        if (isTarget) {
            ctx.shadowColor = station.color;
            ctx.shadowBlur = 12;
        }

        ctx.beginPath();
        ctx.arc(
            station.x + station.width / 2,
            station.y + station.height / 2,
            station.interactRadius,
            0,
            Math.PI * 2
        );
        ctx.stroke();
        ctx.restore();

        // Neon Tag Badge above station
        ctx.save();
        const badgeY = station.y - 12;
        ctx.fillStyle = isTarget ? station.color : "rgba(15, 23, 42, 0.85)";
        ctx.strokeStyle = station.color;
        ctx.lineWidth = 1.5;

        const text = `${station.icon} ${station.tagline[lang]}`;
        ctx.font = "bold 10px monospace";
        const textWidth = ctx.measureText(text).width;
        const pad = 12;

        ctx.beginPath();
        ctx.roundRect(
            station.x + station.width / 2 - textWidth / 2 - pad / 2,
            badgeY - 14,
            textWidth + pad,
            20,
            6
        );
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = isTarget ? "#090d16" : "#f1f5f9";
        ctx.textAlign = "center";
        ctx.fillText(text, station.x + station.width / 2, badgeY);
        ctx.restore();

        // Floating Action Tooltip
        if (isTarget) {
            const bounce = Math.sin(Date.now() * 0.009) * 4;
            ctx.save();
            ctx.fillStyle = station.color;
            ctx.shadowColor = station.color;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.roundRect(station.x + station.width / 2 - 45, station.y - 42 + bounce, 90, 22, 8);
            ctx.fill();

            ctx.fillStyle = "#090d16";
            ctx.font = "bold 11px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(
                lang === "es" ? "▶ [E] ABRIR" : "▶ [E] OPEN",
                station.x + station.width / 2,
                station.y - 27 + bounce
            );
            ctx.restore();
        }
    }

    // 6. Render Player Sprite (Transparent Chroma-Keyed)
    const px = player.x;
    const py = player.y;
    const pw = player.width;
    const ph = player.height;

    // Drop Shadow
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
    ctx.beginPath();
    ctx.ellipse(px + pw / 2, py + ph - 2, pw / 2 + 2, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    const sprite = assets?.spriteImage;
    if (sprite && sprite.complete && sprite.naturalWidth > 0) {
        // Sprite sheet mapping (4 rows x 5 cols)
        // Row 0: Down (Frente)
        // Row 1: Up (Espalda)
        // Row 2: Side Walk (Perfil Lateral mirando a la derecha)
        let row = 0;
        const isLeft = player.direction === "left";

        if (player.direction === "down") row = 0;
        else if (player.direction === "up") row = 1;
        else if (player.direction === "right" || player.direction === "left") row = 2;

        // Frame selection (0 is idle, 0..4 when moving)
        const frameIndex = player.isMoving ? Math.floor(player.stepAnim) % 5 : 0;

        const transparentCanvas = getTransparentSprite(sprite);
        const frameWidth = transparentCanvas.width / 5;
        const frameHeight = transparentCanvas.height / 4;

        ctx.save();
        if (isLeft) {
            // Flip horizontally around the player center for pixel-perfect left walking
            ctx.translate(px + pw / 2, py + ph / 2);
            ctx.scale(-1, 1);
            ctx.translate(-(px + pw / 2), -(py + ph / 2));
        }

        ctx.drawImage(
            transparentCanvas,
            frameIndex * frameWidth,
            row * frameHeight,
            frameWidth,
            frameHeight,
            px - 6,
            py - 16,
            pw + 12,
            ph + 18
        );
        ctx.restore();
    } else {
        ctx.fillStyle = "#2563eb";
        ctx.fillRect(px + 4, py + 10, pw - 8, ph - 10);
        ctx.fillStyle = "#f8fafc";
        ctx.beginPath();
        ctx.arc(px + pw / 2, py + 8, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#06b6d4";
        ctx.fillRect(px + pw / 2 - 5, py + 6, 10, 4);
    }

    // Player Pilot Tag
    ctx.save();
    ctx.fillStyle = "#38bdf8";
    ctx.shadowColor = "#38bdf8";
    ctx.shadowBlur = 5;
    ctx.font = "bold 9px monospace";
    ctx.textAlign = "center";
    ctx.fillText("PEDRO", px + pw / 2, py - 18);
    ctx.restore();

    // 7. Retro CRT Scanline Overlay FX
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    for (let y = 0; y < mapHeight; y += 4) {
        ctx.fillRect(0, y, mapWidth, 1.5);
    }
    const vignette = ctx.createRadialGradient(
        mapWidth / 2,
        mapHeight / 2,
        mapHeight / 3,
        mapWidth / 2,
        mapHeight / 2,
        mapWidth / 1.5
    );
    vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
    vignette.addColorStop(1, "rgba(0, 0, 0, 0.45)");
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, mapWidth, mapHeight);
    ctx.restore();
}
