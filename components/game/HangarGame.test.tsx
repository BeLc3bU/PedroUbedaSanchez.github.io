import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import HangarGame from "./HangarGame";
import { LanguageProvider } from "@/context/LanguageProvider";

// Mock next/navigation
vi.mock("next/navigation", () => ({
    useRouter: () => ({
        push: vi.fn(),
    }),
}));

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
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should render Tactical HUD, live telemetry, and virtual controller", () => {
        render(
            <LanguageProvider>
                <HangarGame />
            </LanguageProvider>
        );

        expect(screen.getByText(/SYSTEM:/i)).toBeInTheDocument();
        expect(screen.getByText(/ONLINE/i)).toBeInTheDocument();
        expect(screen.getByText(/PEDRO ÚBEDA/i)).toBeInTheDocument();
        expect(screen.getByLabelText("Up")).toBeInTheDocument();
        expect(screen.getByLabelText("Left")).toBeInTheDocument();
        expect(screen.getByLabelText("Right")).toBeInTheDocument();
        expect(screen.getByLabelText("Down")).toBeInTheDocument();
        expect(screen.getByLabelText("Interact Action")).toBeInTheDocument();
    });

    it("should render direct route matrix dock buttons and allow clicking them", () => {
        render(
            <LanguageProvider>
                <HangarGame />
            </LanguageProvider>
        );

        const avionicsBtn = screen.getByText(
            /Sistemas Críticos & Aviónica|Critical Systems & Avionics/i
        );
        expect(avionicsBtn).toBeInTheDocument();

        fireEvent.click(avionicsBtn);
        expect(screen.getByText(/Estación de Aviónica|Avionics & Hardware/i)).toBeInTheDocument();
    });

    it("should call onClose when close button in HUD is clicked", () => {
        const onCloseMock = vi.fn();
        render(
            <LanguageProvider>
                <HangarGame onClose={onCloseMock} />
            </LanguageProvider>
        );

        const closeBtn = screen.getByTitle(/Salir del Hangar|Close Hangar/i);
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
