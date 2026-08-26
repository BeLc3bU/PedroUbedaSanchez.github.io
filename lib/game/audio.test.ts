import { describe, it, expect, beforeEach, vi } from "vitest";
import { tacticalAudio } from "./audio";

describe("tacticalAudio (Web Audio API Synthesizer)", () => {
    beforeEach(() => {
        tacticalAudio.setMuted(false);
    });

    it("should allow toggling mute state", () => {
        expect(tacticalAudio.getMuted()).toBe(false);
        const newState = tacticalAudio.toggleMuted();
        expect(newState).toBe(true);
        expect(tacticalAudio.getMuted()).toBe(true);
    });

    it("should safely execute sound methods without crashing in non-browser or mock environments", () => {
        expect(() => {
            tacticalAudio.playHover();
            tacticalAudio.playSelect();
            tacticalAudio.playStationOpen();
            tacticalAudio.playStationClose();
        }).not.toThrow();
    });

    it("should suppress sound generation when muted", () => {
        tacticalAudio.setMuted(true);
        const hoverSpy = vi.spyOn(tacticalAudio, "playHover");
        tacticalAudio.playHover();
        expect(hoverSpy).toHaveBeenCalled();
    });
});
