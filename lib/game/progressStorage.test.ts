import { describe, it, expect, beforeEach } from "vitest";
import {
    loadGameProgress,
    saveGameProgress,
    addInventoryItem,
    markChestOpened,
    markWelcomeShown,
    resetGameProgress,
} from "./progressStorage";

describe("progressStorage", () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it("returns default empty progress when nothing is stored", () => {
        expect(loadGameProgress()).toEqual({
            inventory: [],
            openedChests: [],
            hasWelcomeShown: false,
        });
    });

    it("persists inventory items and opened chests without duplicates", () => {
        addInventoryItem("blue_key");
        addInventoryItem("blue_key");
        addInventoryItem("green_key");
        markChestOpened("projects_closed_chest");
        markChestOpened("projects_closed_chest");
        markWelcomeShown();

        expect(loadGameProgress()).toEqual({
            inventory: ["blue_key", "green_key"],
            openedChests: ["projects_closed_chest"],
            hasWelcomeShown: true,
        });
    });

    it("recovers cleanly from corrupted JSON in localStorage", () => {
        window.localStorage.setItem("pedro_rpg_progress_v1", "{bad json");

        expect(loadGameProgress()).toEqual({
            inventory: [],
            openedChests: [],
            hasWelcomeShown: false,
        });
    });

    it("resets stored progress completely", () => {
        saveGameProgress({
            inventory: ["blue_key"],
            openedChests: ["projects_closed_chest"],
            hasWelcomeShown: true,
        });

        resetGameProgress();

        expect(loadGameProgress()).toEqual({
            inventory: [],
            openedChests: [],
            hasWelcomeShown: false,
        });
    });
});
