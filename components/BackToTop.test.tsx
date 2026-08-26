import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BackToTop from "./BackToTop";

// Mock scrollTo
const mockScrollTo = vi.fn();
Object.defineProperty(window, "scrollTo", {
    value: mockScrollTo,
    writable: true,
});

// Mock scrollY
Object.defineProperty(window, "scrollY", {
    value: 0,
    writable: true,
});

describe("BackToTop", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders back to top button", () => {
        render(<BackToTop />);
        expect(screen.getByLabelText("Volver arriba")).toBeInTheDocument();
    });

    it("is hidden when scrollY is less than 300", () => {
        window.scrollY = 100;

        render(<BackToTop />);

        const button = screen.getByLabelText("Volver arriba");
        expect(button).toHaveClass("opacity-0");
        expect(button).toHaveClass("pointer-events-none");
    });

    it("is visible when scrollY is greater than 300", () => {
        window.scrollY = 400;

        render(<BackToTop />);

        // Trigger scroll listener
        fireEvent.scroll(window);

        const button = screen.getByLabelText("Volver arriba");
        expect(button).toHaveClass("opacity-100");
    });

    it("scrolls to top when clicked", () => {
        window.scrollY = 400;

        render(<BackToTop />);

        const button = screen.getByLabelText("Volver arriba");
        fireEvent.click(button);

        expect(window.scrollTo).toHaveBeenCalledWith({
            top: 0,
            behavior: "smooth",
        });
    });
});
