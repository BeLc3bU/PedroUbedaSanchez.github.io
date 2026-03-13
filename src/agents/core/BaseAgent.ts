import type { IAgent, AgentTask, AgentId } from './types';

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

  protected log(msg: string) {
    console.log(`[Agent:${this.name}] ${msg}`);
  }

  // Abstract execute that specific agents must implement
  public abstract execute(task: AgentTask): Promise<any>;
}
