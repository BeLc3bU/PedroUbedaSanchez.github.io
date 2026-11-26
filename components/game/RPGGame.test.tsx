import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { MobileControls } from "./MobileControls";

describe("RPG Game MobileControls", () => {
    beforeEach(() => {
        Object.defineProperty(navigator, "userAgent", {
            value: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)",
            configurable: true,
        });
    });

    it("renders MobileControls on touch/mobile devices", () => {
        const onMove = vi.fn();
        const onInteract = vi.fn();

        render(<MobileControls onMove={onMove} onInteract={onInteract} />);

        const actionBtn = screen.getByText("A");
        expect(actionBtn).toBeDefined();

        fireEvent.click(actionBtn);
        expect(onInteract).toHaveBeenCalledTimes(1);
    });

    it("prevents duplicate interaction when touchstart is followed by click", () => {
        const onMove = vi.fn();
        const onInteract = vi.fn();

        render(<MobileControls onMove={onMove} onInteract={onInteract} />);

        const actionBtn = screen.getByRole("button", { name: /Interactuar/i });
        fireEvent.touchStart(actionBtn);
        fireEvent.click(actionBtn);

        expect(onInteract).toHaveBeenCalledTimes(1);
    });

    it("tracks active touch id on joystick and resets cleanly on touchcancel", () => {
        const onMove = vi.fn();
        const onInteract = vi.fn();

        render(<MobileControls onMove={onMove} onInteract={onInteract} />);

        const joystick = screen.getByLabelText("Joystick táctil");
        vi.spyOn(joystick, "getBoundingClientRect").mockReturnValue({
            left: 0,
            top: 0,
            width: 110,
            height: 110,
            right: 110,
            bottom: 110,
            x: 0,
            y: 0,
            toJSON: () => ({}),
        });

        fireEvent.touchStart(joystick, {
            changedTouches: [{ identifier: 1, clientX: 90, clientY: 55 }],
        });
        expect(onMove).toHaveBeenLastCalledWith(expect.objectContaining({ x: 1, y: 0 }));

        // Un segundo dedo no debe secuestrar el joystick ni resetearlo
        fireEvent.touchMove(joystick, {
            changedTouches: [{ identifier: 2, clientX: 10, clientY: 10 }],
        });
        expect(onMove).toHaveBeenCalledTimes(1);

        // Cancelar el toque activo devuelve el joystick a (0, 0)
        fireEvent.touchCancel(joystick, {
            changedTouches: [{ identifier: 1, clientX: 90, clientY: 55 }],
        });
        expect(onMove).toHaveBeenLastCalledWith({ x: 0, y: 0 });
    });
});
