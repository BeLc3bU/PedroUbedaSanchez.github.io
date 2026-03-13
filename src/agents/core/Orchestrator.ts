import type { IAgent, AgentTask } from './types';

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
    task.status = 'pending';
    this.queue.push(task);
    console.log(`[Orchestrator] Enqueued task: ${task.id}`);
  }

  public getTask(id: string): AgentTask | undefined {
    return this.queue.find((t) => t.id === id);
  }

  public async run(): Promise<void> {
    console.log('[Orchestrator] Starting workflow execution...');
    while (this.queue.some((t) => t.status === 'pending')) {
      const readyTasks = this.queue.filter(
        (t) =>
          t.status === 'pending' &&
          (!t.dependencies ||
            t.dependencies.every(
              (depId) => this.getTask(depId)?.status === 'completed'
            ))
      );

      if (readyTasks.length === 0) {
        throw new Error('[Orchestrator] Deadlock detected or missing dependencies in task graph.');
      }

      // Execute ready tasks in parallel
      await Promise.all(
        readyTasks.map(async (task) => {
          task.status = 'in-progress';
          try {
            const agent = this.registry.get(task.type);
            if (!agent) {
              throw new Error(`No agent found for task type: ${task.type}`);
            }

            console.log(`[Orchestrator] Delegating task ${task.id} to ${agent.name}`);
            const result = await agent.execute(task);
            task.result = result;
            task.status = 'completed';
          } catch (error: any) {
            console.error(`[Orchestrator] Task ${task.id} failed:`, error);
            task.error = error.message;
            task.status = 'failed';
          }
        })
      );
    }
    console.log('[Orchestrator] Workflow execution finished.');
  }
}
