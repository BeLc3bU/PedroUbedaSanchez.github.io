import { describe, it, expect } from "vitest";
import {
    checkAABBCollision,
    findNearStation,
    checkExitDoorTrigger,
    createInitialGameState,
    updatePlayerPosition,
    MAP_WIDTH,
    MAP_HEIGHT,
} from "./engine";
import { STATIONS } from "./dialogs";

describe("Game Engine Logic", () => {
    it("should initialize default game state within map boundaries", () => {
        const state = createInitialGameState();
        expect(state.player.x).toBeGreaterThan(0);
        expect(state.player.x).toBeLessThan(MAP_WIDTH);
        expect(state.player.y).toBeGreaterThan(0);
        expect(state.player.y).toBeLessThan(MAP_HEIGHT);
        expect(state.stations.length).toBe(4);
        expect(state.obstacles.length).toBeGreaterThan(0);
        expect(state.isPaused).toBe(false);
    });

    it("should detect AABB collision correctly", () => {
        const box1 = { x: 10, y: 10, width: 20, height: 20 };
        const box2 = { x: 20, y: 20, width: 20, height: 20 }; // Overlapping
        const box3 = { x: 50, y: 50, width: 10, height: 10 }; // Outside

        expect(checkAABBCollision(box1, box2)).toBe(true);
        expect(checkAABBCollision(box1, box3)).toBe(false);
    });

    it("should prevent player from walking into obstacles", () => {
        const state = createInitialGameState();
        // Place player right at edge of left wall obstacle (wall is x: 0..30)
        const playerNearWall = {
            ...state.player,
            x: 30,
            y: 200,
        };

        const movement = { up: false, down: false, left: true, right: false };
        // Trying to move left into x < 30 should be blocked and retain x: 30
        const updated = updatePlayerPosition(playerNearWall, movement, 0.1, state.obstacles);

        expect(updated.x).toBe(30);
    });

    it("should detect when player is in proximity to an interactive station", () => {
        const avionicsStation = STATIONS.find((s) => s.id === "avionics")!;
        const playerNearStation = {
            x: avionicsStation.x,
            y: avionicsStation.y + avionicsStation.height + 10,
            width: 28,
            height: 28,
            speed: 180,
            direction: "up" as const,
            isMoving: false,
            stepAnim: 0,
        };

        const near = findNearStation(playerNearStation, STATIONS);
        expect(near).not.toBeNull();
        expect(near?.id).toBe("avionics");
    });

    it("should detect when player steps into the exit door zone", () => {
        const playerAtExit = {
            x: 390,
            y: 530,
            width: 32,
            height: 32,
            speed: 180,
            direction: "down" as const,
            isMoving: true,
            stepAnim: 0,
        };

        expect(checkExitDoorTrigger(playerAtExit)).toBe(true);
    });
});
