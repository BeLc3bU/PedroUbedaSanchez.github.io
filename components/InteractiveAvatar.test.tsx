import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import InteractiveAvatar from "./InteractiveAvatar";

describe("InteractiveAvatar", () => {
    it("renders with default avatar view and accessible role", () => {
        render(<InteractiveAvatar />);

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("aria-pressed", "false");
        expect(screen.getByText("Ver Foto Real")).toBeInTheDocument();
        expect(screen.getByAltText(/Avatar 3D/)).toBeInTheDocument();
        expect(screen.queryByAltText(/Foto Real/)).not.toBeInTheDocument();
    });

    it("flips to real photo when clicked and swaps images", () => {
        render(<InteractiveAvatar />);

        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(button).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByText("Ver Avatar 3D")).toBeInTheDocument();
        expect(screen.getByAltText(/Foto Real/)).toBeInTheDocument();
        expect(screen.queryByAltText(/Avatar 3D/)).not.toBeInTheDocument();

        // Clicking again flips back to avatar
        fireEvent.click(button);
        expect(button).toHaveAttribute("aria-pressed", "false");
        expect(screen.getByText("Ver Foto Real")).toBeInTheDocument();
        expect(screen.getByAltText(/Avatar 3D/)).toBeInTheDocument();
        expect(screen.queryByAltText(/Foto Real/)).not.toBeInTheDocument();
    });

    it("toggles with keyboard interaction (Enter and Space)", () => {
        render(<InteractiveAvatar />);

        const button = screen.getByRole("button");

        // Enter key
        fireEvent.keyDown(button, { key: "Enter" });
        expect(button).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByAltText(/Foto Real/)).toBeInTheDocument();

        // Space key
        fireEvent.keyDown(button, { key: " " });
        expect(button).toHaveAttribute("aria-pressed", "false");
        expect(screen.getByAltText(/Avatar 3D/)).toBeInTheDocument();
    });

    it("honors defaultFlipped prop", () => {
        render(<InteractiveAvatar defaultFlipped={true} />);

        const button = screen.getByRole("button");
        expect(button).toHaveAttribute("aria-pressed", "true");
        expect(screen.getByText("Ver Avatar 3D")).toBeInTheDocument();
        expect(screen.getByAltText(/Foto Real/)).toBeInTheDocument();
    });
});
