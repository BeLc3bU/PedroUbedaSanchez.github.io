import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SocialLinks } from "./SocialLinks";

// Mock next/navigation
vi.mock("next/navigation", () => ({
    useRouter: () => ({
        push: vi.fn(),
    }),
}));

// Mock window.dataLayer
Object.defineProperty(window, "dataLayer", {
    value: [],
    writable: true,
});

describe("SocialLinks", () => {
    it("renders GitHub link", () => {
        render(<SocialLinks />);
        expect(screen.getByLabelText("GitHub")).toBeInTheDocument();
    });

    it("renders LinkedIn link", () => {
        render(<SocialLinks />);
        expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
    });

    it("renders Email link", () => {
        render(<SocialLinks />);
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
    });

    it("renders WhatsApp link", () => {
        render(<SocialLinks />);
        expect(screen.getByLabelText("WhatsApp")).toBeInTheDocument();
    });

    it("renders Download CV button", () => {
        render(<SocialLinks />);
        expect(screen.getByLabelText("Download CV")).toBeInTheDocument();
    });

    it("pushes dataLayer event on social click", () => {
        render(<SocialLinks />);

        // Click on GitHub link
        const githubLink = screen.getByLabelText("GitHub");
        githubLink.click();

        const dl = window as unknown as {
            dataLayer?: { event: string; category: string; label: string }[];
        };
        expect(dl.dataLayer).toContainEqual({
            event: "social_click",
            category: "engagement",
            label: "github",
        });
    });
});
