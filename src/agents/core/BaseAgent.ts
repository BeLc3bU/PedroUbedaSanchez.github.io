import type { IAgent, AgentTask, AgentId } from "./types";

export abstract class BaseAgent implements IAgent {
    public abstract id: AgentId;
    public abstract name: string;
    public abstract description: string;
    public skills?: string[] = [];

    constructor() {
        // Agent initialization
    }

    public canHandle(taskType: string): boolean {
        return this.id === taskType;
    }

    protected log(msg: string, onLog?: (msg: string) => void) {
        const formatted = `[Agent:${this.name}] ${msg}`;
        console.log(formatted);
        if (onLog) {
            onLog(formatted);
        }
    }

    // Abstract execute that specific agents must implement
    public abstract execute(task: AgentTask, onLog?: (msg: string) => void): Promise<unknown>;
}
