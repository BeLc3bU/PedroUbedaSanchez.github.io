import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import HangarGame from "./HangarGame";
import { LanguageProvider } from "@/context/LanguageProvider";

// Mock Canvas context for jsdom
HTMLCanvasElement.prototype.getContext = vi.fn(() => ({
    fillRect: vi.fn(),
    clearRect: vi.fn(),
    getImageData: vi.fn(() => ({ data: new Uint8ClampedArray(4) })),
    putImageData: vi.fn(),
    createImageData: vi.fn(),
    setTransform: vi.fn(),
    translate: vi.fn(),
    scale: vi.fn(),
    drawImage: vi.fn(),
    save: vi.fn(),
    fillText: vi.fn(),
    restore: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    closePath: vi.fn(),
    stroke: vi.fn(),
    strokeRect: vi.fn(),
    setLineDash: vi.fn(),
    arc: vi.fn(),
    ellipse: vi.fn(),
    fill: vi.fn(),
    roundRect: vi.fn(),
    measureText: vi.fn(() => ({ width: 50 })),
    createRadialGradient: vi.fn(() => ({
        addColorStop: vi.fn(),
    })),
    createLinearGradient: vi.fn(() => ({
        addColorStop: vi.fn(),
    })),
})) as unknown as typeof HTMLCanvasElement.prototype.getContext;

describe("HangarGame Component", () => {
    it("should render game canvas, title, and virtual controller", () => {
        render(
            <LanguageProvider>
                <HangarGame />
            </LanguageProvider>
        );

        expect(screen.getByText(/Hangar Tecnológico|Tech Hangar/i)).toBeInTheDocument();
        expect(screen.getByLabelText("Up")).toBeInTheDocument();
        expect(screen.getByLabelText("Left")).toBeInTheDocument();
        expect(screen.getByLabelText("Right")).toBeInTheDocument();
        expect(screen.getByLabelText("Down")).toBeInTheDocument();
        expect(screen.getByLabelText("Interact Action")).toBeInTheDocument();
    });

    it("should call onClose when close button is clicked", () => {
        const onCloseMock = vi.fn();
        render(
            <LanguageProvider>
                <HangarGame onClose={onCloseMock} />
            </LanguageProvider>
        );

        const closeBtn = screen.getByTitle(/Salir del Hangar|Exit Hangar/i);
        fireEvent.click(closeBtn);
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });

    it("should respond to virtual D-pad touch interactions without crashing", () => {
        render(
            <LanguageProvider>
                <HangarGame />
            </LanguageProvider>
        );

        const upBtn = screen.getByLabelText("Up");
        fireEvent.pointerDown(upBtn);
        fireEvent.pointerUp(upBtn);

        const actionBtn = screen.getByLabelText("Interact Action");
        fireEvent.click(actionBtn);

        expect(screen.getByLabelText("Up")).toBeInTheDocument();
    });
});
