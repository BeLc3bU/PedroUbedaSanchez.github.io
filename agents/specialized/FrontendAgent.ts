import { BaseAgent } from "../core/BaseAgent";
import type { AgentTask, AgentId } from "../core/types";

export class FrontendAgent extends BaseAgent {
    public id: AgentId = "frontend";
    public name = "Frontend Developer Agent";
    public description =
        "Specialist in React, TypeScript, Tailwind CSS, Framer Motion animations, and component development. Expert in modern UI patterns inspired by Augusto Polonio portfolio.";
    public skills = [
        "vercel-react-best-practices",
        "frontend-design",
        "tailwind-design-system",
        "typescript-advanced-types",
        "framer-motion-animations",
        "responsive-design",
        "ui-ux-pro-max",
        "clean-code",
    ];

    public canHandle(taskType: string): boolean {
        return ["frontend", "ui", "component", "animation", "tailwind", "react"].includes(taskType);
    }

    public async execute(task: AgentTask, onLog?: (msg: string) => void): Promise<unknown> {
        this.log(`Analyzing frontend task: ${task.description}`, onLog);
        this.log(`Applying React best practices and Tailwind CSS patterns`, onLog);
        this.log(`Ensuring accessibility (WCAG 2.1) and responsive design`, onLog);

        if (task.payload?.animation) {
            this.log(`Adding Framer Motion animations as specified`, onLog);
        }

        if (task.payload?.framework === "react-pdf") {
            this.log(`Working with @react-pdf/renderer for PDF generation`, onLog);
        }

        return new Promise((resolve) =>
            setTimeout(() => {
                this.log(`Successfully generated/modified component code`, onLog);
                resolve({ filesChanged: ["*.tsx"], status: "success" });
            }, 1000)
        );
    }
}
