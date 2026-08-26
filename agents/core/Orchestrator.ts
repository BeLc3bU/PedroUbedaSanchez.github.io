import type { IAgent, AgentTask } from "./types";

export class Orchestrator {
    private registry: Map<string, IAgent> = new Map();
    private queue: AgentTask[] = [];

    public register(agent: IAgent): void {
        if (this.registry.has(agent.id)) {
            throw new Error(`Agent with id ${agent.id} is already registered.`);
        }
        this.registry.set(agent.id, agent);
        console.log(`[Orchestrator] Registered agent: ${agent.name}`);
    }

    public enqueueTask(task: AgentTask): void {
        task.status = "pending";
        this.queue.push(task);
        console.log(`[Orchestrator] Enqueued task: ${task.id}`);
    }

    public getTask(id: string): AgentTask | undefined {
        return this.queue.find((t) => t.id === id);
    }

    public async run(onLog?: (msg: string) => void): Promise<void> {
        const log = (msg: string) => {
            console.log(msg);
            if (onLog) onLog(msg);
        };

        log("[Orchestrator] Starting workflow execution...");
        while (this.queue.some((t) => t.status === "pending")) {
            const readyTasks = this.queue.filter(
                (t) =>
                    t.status === "pending" &&
                    (!t.dependencies ||
                        t.dependencies.every(
                            (depId) => this.getTask(depId)?.status === "completed"
                        ))
            );

            if (readyTasks.length === 0) {
                throw new Error(
                    "[Orchestrator] Deadlock detected or missing dependencies in task graph."
                );
            }

            // Execute ready tasks in parallel
            await Promise.all(
                readyTasks.map(async (task) => {
                    task.status = "in-progress";
                    try {
                        const agent = this.registry.get(task.type);
                        if (!agent) {
                            throw new Error(`No agent found for task type: ${task.type}`);
                        }

                        log(`[Orchestrator] Delegating task ${task.id} to ${agent.name}`);
                        const result = await agent.execute(task, onLog);
                        task.result = result;
                        task.status = "completed";
                        log(`[Orchestrator] Task ${task.id} completed successfully.`);
                    } catch (error) {
                        const message = error instanceof Error ? error.message : String(error);
                        console.error(`[Orchestrator] Task ${task.id} failed:`, error);
                        task.error = message;
                        task.status = "failed";
                        log(`[Orchestrator] Task ${task.id} failed: ${message}`);
                    }
                })
            );
        }
        log("[Orchestrator] Workflow execution finished.");
    }
}
