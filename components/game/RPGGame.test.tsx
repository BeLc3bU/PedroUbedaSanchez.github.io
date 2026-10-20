import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { MobileControls } from "./MobileControls";

describe("RPG Game MobileControls", () => {
    it("renders MobileControls on touch/mobile devices", () => {
        const onMove = vi.fn();
        const onInteract = vi.fn();

        // Simular dispositivo móvil
        Object.defineProperty(navigator, "userAgent", {
            value: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)",
            configurable: true,
        });

        render(<MobileControls onMove={onMove} onInteract={onInteract} />);

        const actionBtn = screen.getByText("A");
        expect(actionBtn).toBeDefined();

        fireEvent.click(actionBtn);
        expect(onInteract).toHaveBeenCalled();
    });
});
