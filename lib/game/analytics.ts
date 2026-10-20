// Google Analytics 4 Event Tracking Utility

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
        dataLayer?: any[];
    }
}

export class Analytics {
    static isAvailable(): boolean {
        return typeof window !== "undefined" && typeof window.gtag === "function";
    }

    static trackGameStart() {
        if (!this.isAvailable()) return;
        window.gtag!("event", "game_start", {
            event_category: "game",
            event_label: "Game Started",
            value: 1,
        });
    }

    static trackSceneChange(sceneName: string, from?: string) {
        if (!this.isAvailable()) return;
        window.gtag!("event", "scene_change", {
            event_category: "navigation",
            event_label: sceneName,
            from_scene: from,
            to_scene: sceneName,
        });
    }

    static trackCastleEntered(castleName: string) {
        if (!this.isAvailable()) return;
        window.gtag!("event", "castle_entered", {
            event_category: "game",
            event_label: castleName,
            castle_name: castleName,
        });
    }

    static trackKeyCollected(keyColor: string) {
        if (!this.isAvailable()) return;
        window.gtag!("event", "key_collected", {
            event_category: "game",
            event_label: `${keyColor} Key`,
            key_color: keyColor,
        });
    }

    static trackChestOpened(chestName: string, location: string) {
        if (!this.isAvailable()) return;
        window.gtag!("event", "chest_opened", {
            event_category: "game",
            event_label: chestName,
            chest_name: chestName,
            location: location,
        });
    }

    static trackProjectViewed(projectId: number, projectTitle: string) {
        if (!this.isAvailable()) return;
        window.gtag!("event", "project_viewed", {
            event_category: "content",
            event_label: projectTitle,
            project_id: projectId,
            project_title: projectTitle,
        });
    }

    static trackExperienceViewed(experienceId: number, company: string) {
        if (!this.isAvailable()) return;
        window.gtag!("event", "experience_viewed", {
            event_category: "content",
            event_label: company,
            experience_id: experienceId,
            company: company,
        });
    }

    static trackDialogueShown(dialogueType: string) {
        if (!this.isAvailable()) return;
        window.gtag!("event", "dialogue_shown", {
            event_category: "interaction",
            event_label: dialogueType,
            dialogue_type: dialogueType,
        });
    }

    static trackExternalLinkClick(url: string, projectTitle: string) {
        if (!this.isAvailable()) return;
        window.gtag!("event", "click", {
            event_category: "outbound",
            event_label: url,
            project_title: projectTitle,
            link_url: url,
            transport_type: "beacon",
        });
    }

    static trackSessionEnd(durationSeconds: number) {
        if (!this.isAvailable()) return;
        window.gtag!("event", "game_session_end", {
            event_category: "game",
            event_label: "Session Ended",
            value: Math.round(durationSeconds),
        });
    }

    static trackCustomEvent(eventName: string, params?: Record<string, any>) {
        if (!this.isAvailable()) return;
        window.gtag!("event", eventName, {
            event_category: "custom",
            ...params,
        });
    }
}
