export type AgentId = 
  | 'frontend' 
  | 'testing' 
  | 'design' 
  | 'seo' 
  | 'gamedev' 
  | 'analytics' 
  | string;

export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'failed';

export interface AgentTask {
  id: string;
  type: AgentId;
  description: string;
  payload: Record<string, any>;
  status: TaskStatus;
  dependencies?: string[];
  result?: any;
  error?: string;
}

export interface IAgent {
  id: AgentId;
  name: string;
  description: string;
  skills?: string[];
  canHandle(taskType: string): boolean;
  execute(task: AgentTask): Promise<any>;
}
