export type Direction = "up" | "down" | "left" | "right";

export interface Position {
    x: number;
    y: number;
}

export interface Size {
    width: number;
    height: number;
}

export interface MobileInputState {
    x: number;
    y: number;
    interact: boolean;
}

export interface GameItemDetail {
    company?: string;
    period?: string;
    location?: string;
    category?: string;
    highlights?: string[];
    tags?: string[];
    technologies?: string[];
    link?: string;
}

export interface GameInteractionPayload {
    type: "PROJECTS" | "EXPERIENCE" | "SKILLS" | "ABOUT" | "CONTACT";
    title?: string;
    description?: string;
    id?: string;
    details?: GameItemDetail;
}
