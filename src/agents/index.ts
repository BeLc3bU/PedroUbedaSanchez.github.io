import { Orchestrator } from './core/Orchestrator';
import { FrontendAgent } from './specialized/FrontendAgent';
import { TestingAgent } from './specialized/TestingAgent';
import { DesignAgent } from './specialized/DesignAgent';
import { SeoAgent } from './specialized/SeoAgent';
import { GameDevAgent } from './specialized/GameDevAgent';
import { AnalyticsAgent } from './specialized/AnalyticsAgent';
import type { AgentTask } from './core/types';

export const initializeAgentSystem = () => {
  const orchestrator = new Orchestrator();

  orchestrator.register(new FrontendAgent());
  orchestrator.register(new TestingAgent());
  orchestrator.register(new DesignAgent());
  orchestrator.register(new SeoAgent());
  orchestrator.register(new GameDevAgent());
  orchestrator.register(new AnalyticsAgent());

  return orchestrator;
};

export const runExampleTask = async () => {
  const orchestrator = initializeAgentSystem();

  const task1: AgentTask = {
    id: 'task-build-ui',
    type: 'frontend',
    description: 'Create a new Contact form component',
    payload: { ui: 'form', fields: ['email', 'message'] },
    status: 'pending'
  };

  const task2: AgentTask = {
    id: 'task-test-ui',
    type: 'testing',
    description: 'Test the Contact form',
    payload: { target: 'ContactForm', type: 'unit' },
    status: 'pending',
    dependencies: ['task-build-ui']
  };

  const task3: AgentTask = {
    id: 'task-seo',
    type: 'seo',
    description: 'Optimize SEO for the portfolio',
    payload: { generateSitemap: true, schemaMarkup: true },
    status: 'pending'
  };

  const task4: AgentTask = {
    id: 'task-game',
    type: 'gamedev',
    description: 'Create portfolio game 2D',
    payload: { type: 'portfolio-game', iframe: true },
    status: 'pending'
  };

  orchestrator.enqueueTask(task1);
  orchestrator.enqueueTask(task2);
  orchestrator.enqueueTask(task3);
  orchestrator.enqueueTask(task4);

  await orchestrator.run();
};

export { FrontendAgent, TestingAgent, DesignAgent, SeoAgent, GameDevAgent, AnalyticsAgent };
export type { AgentTask } from './core/types';
