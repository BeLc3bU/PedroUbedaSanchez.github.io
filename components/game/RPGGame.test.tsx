import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { MobileControls } from "./MobileControls";
import { GameInfoDialog } from "./GameInfoDialog";
import type { GameInteractionPayload } from "@/lib/game/types";

describe("RPG Game Components", () => {
    it("renders MobileControls and triggers interact action", () => {
        const onInputUpdate = vi.fn();
        render(<MobileControls onInputUpdate={onInputUpdate} />);

        const actionBtn = screen.getByText("ACT");
        expect(actionBtn).toBeDefined();

        fireEvent.click(actionBtn);
        expect(onInputUpdate).toHaveBeenCalled();
    });

    it("renders GameInfoDialog with project details", () => {
        const onClose = vi.fn();
        const mockPayload: GameInteractionPayload = {
            type: "PROJECTS",
        };

        render(<GameInfoDialog data={mockPayload} onClose={onClose} />);
        expect(screen.getByText("Proyectos Destacados")).toBeDefined();

        const closeBtn = screen.getByRole("button");
        fireEvent.click(closeBtn);
        expect(onClose).toHaveBeenCalled();
    });

    it("renders GameInfoDialog with experience details", () => {
        const onClose = vi.fn();
        const mockPayload: GameInteractionPayload = {
            type: "EXPERIENCE",
        };

        render(<GameInfoDialog data={mockPayload} onClose={onClose} />);
        expect(screen.getByText("Trayectoria & Experiencia")).toBeDefined();
    });
});
