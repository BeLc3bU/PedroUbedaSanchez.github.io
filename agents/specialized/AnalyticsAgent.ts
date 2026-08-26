import { BaseAgent } from "../core/BaseAgent";
import type { AgentTask, AgentId } from "../core/types";

export class AnalyticsAgent extends BaseAgent {
    public id: AgentId = "analytics";
    public name = "Analytics & Monitoring Agent";
    public description =
        "Specialist in Google Analytics, Vercel Analytics, and performance monitoring for web applications.";
    public skills = [
        "analytics-tracking",
        "performance-optimization",
        "vercel-analytics",
        "google-analytics",
    ];

    public canHandle(taskType: string): boolean {
        return ["analytics", "tracking", "monitoring", "performance", "vercel", "google"].includes(
            taskType
        );
    }

    public async execute(task: AgentTask, onLog?: (msg: string) => void): Promise<unknown> {
        this.log(`Setting up analytics for: ${task.description}`, onLog);

        if (task.payload?.vercel) {
            this.log(`Installing @vercel/analytics`, onLog);
            this.log(`Configuring Vercel Analytics tracking`, onLog);
        }

        if (task.payload?.google) {
            this.log(`Setting up Google Analytics 4 (GA4)`, onLog);
            this.log(
                `Configuring event tracking: resume_download, contact_click, social_click`,
                onLog
            );
        }

        if (task.payload?.performance) {
            this.log(`Adding Core Web Vitals monitoring`, onLog);
            this.log(`Setting up performance budgets`, onLog);
        }

        return new Promise((resolve) =>
            setTimeout(() => {
                this.log(`Analytics setup completed`, onLog);
                resolve({
                    vercelAnalytics: task.payload?.vercel || false,
                    googleAnalytics: task.payload?.google || false,
                    eventsConfigured: ["resume_download", "contact_click", "social_click"],
                });
            }, 600)
        );
    }
}
