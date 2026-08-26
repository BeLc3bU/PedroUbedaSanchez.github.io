export type Direction = "up" | "down" | "left" | "right";

export interface Position {
    x: number;
    y: number;
}

export interface Size {
    width: number;
    height: number;
}

export interface RectCollider {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Player {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    direction: Direction;
    isMoving: boolean;
    stepAnim: number;
}

export interface InteractiveStation {
    id: "avionics" | "agents" | "infra" | "command";
    npcId: "pedro" | "nexus" | "alex" | "command";
    name: string;
    icon: string;
    color: string;
    x: number;
    y: number;
    width: number;
    height: number;
    interactRadius: number;
    portraitCol: number; // 0 o 1
    portraitRow: number; // 0 o 1
    tagline: {
        es: string;
        en: string;
    };
    dialog: {
        es: {
            title: string;
            speaker: string;
            role: string;
            lines: string[];
            highlights: string[];
        };
        en: {
            title: string;
            speaker: string;
            role: string;
            lines: string[];
            highlights: string[];
        };
    };
}

export interface GameState {
    player: Player;
    stations: InteractiveStation[];
    obstacles: RectCollider[];
    activeStationId: string | null;
    isNearStation: InteractiveStation | null;
    isPaused: boolean;
    mapWidth: number;
    mapHeight: number;
}
