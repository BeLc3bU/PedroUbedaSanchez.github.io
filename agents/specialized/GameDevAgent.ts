import { BaseAgent } from "../core/BaseAgent";
import type { AgentTask, AgentId } from "../core/types";

export class GameDevAgent extends BaseAgent {
    public id: AgentId = "gamedev";
    public name = "Game Development Agent";
    public description =
        "Specialist in 2D RPG portfolio games using Vite + React. Expert in game mechanics, pixel art assets, and interactive portfolio experiences (Augusto Polonio style).";
    public skills = [
        "game-development",
        "pixel-art-integration",
        "canvas-design",
        "interactive-experiences",
        "game-mechanics",
    ];

    public canHandle(taskType: string): boolean {
        return ["gamedev", "game", "2d", "rpg", "canvas", "pixel", "interactive"].includes(
            taskType
        );
    }

    public async execute(task: AgentTask, onLog?: (msg: string) => void): Promise<unknown> {
        this.log(`Analyzing game development task: ${task.description}`, onLog);

        if (task.payload?.type === "portfolio-game") {
            this.log(`Creating 2D RPG portfolio game (Augusto Polonio style)`, onLog);
            this.log(`Using pixel art tilesets: Pixel_Poem Free RPG Basic Tileset`, onLog);
            this.log(`Integrating SIERRASSETS Furniture Pack`, onLog);
        }

        if (task.payload?.audio) {
            this.log(`Audio integration: Suno AI generated tracks (non-commercial)`, onLog);
        }

        if (task.payload?.iframe) {
            this.log(`Setting up iframe embed with start panel`, onLog);
        }

        this.log(`Implementing WASD/Arrow key movement controls`, onLog);
        this.log(`Adding NPC interactions for portfolio content`, onLog);

        return new Promise((resolve) =>
            setTimeout(() => {
                this.log(`Game development task completed`, onLog);
                resolve({
                    gameCreated: true,
                    tilesetUsed: "Pixel_Poem Free RPG",
                    controls: "WASD/Arrows",
                    iframeReady: true,
                });
            }, 1500)
        );
    }
}
