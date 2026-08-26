import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Terminal from "./Terminal";
import { LanguageProvider } from "@/hooks/useLanguage";
import type { ReactNode } from "react";

// Mock de useRouter de Next.js
const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
    useRouter: () => ({
        push: pushMock,
    }),
    usePathname: () => "/",
}));

const renderWithProviders = (ui: ReactNode) => {
    return render(<LanguageProvider>{ui}</LanguageProvider>);
};

describe("Terminal Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });

    it("should render welcome message and quick chips", () => {
        renderWithProviders(<Terminal />);

        expect(screen.getByText(/Bienvenido a la Terminal de Pedro Úbeda/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "help" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "theme" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "lang" })).toBeInTheDocument();
    });

    it("should execute help command on input submit", () => {
        renderWithProviders(<Terminal />);

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "help" } });
        fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

        expect(screen.getByText(/Comandos disponibles:/i)).toBeInTheDocument();
    });

    it("should execute echo command with arguments", () => {
        renderWithProviders(<Terminal />);

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "echo Hello Antigravity!" } });
        fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

        expect(screen.getByText("Hello Antigravity!")).toBeInTheDocument();
    });

    it("should toggle theme with 'theme' command", () => {
        renderWithProviders(<Terminal />);

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "theme toggle" } });
        fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

        expect(screen.getByText(/\[System\] Theme toggled to/i)).toBeInTheDocument();
    });

    it("should switch language with 'lang en' command", () => {
        renderWithProviders(<Terminal />);

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "lang en" } });
        fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

        expect(screen.getByText(/\[System\] Language set to EN/i)).toBeInTheDocument();
    });

    it("should clear terminal history on 'clear' command", () => {
        renderWithProviders(<Terminal />);

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "help" } });
        fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
        expect(screen.getByText(/Comandos disponibles:/i)).toBeInTheDocument();

        fireEvent.change(input, { target: { value: "clear" } });
        fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

        expect(screen.queryByText(/Comandos disponibles:/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Bienvenido a la Terminal/i)).not.toBeInTheDocument();
    });

    it("should execute command when clicking a quick chip", () => {
        renderWithProviders(<Terminal />);

        const helpChip = screen.getByRole("button", { name: "help" });
        fireEvent.click(helpChip);

        expect(screen.getByText(/Comandos disponibles:/i)).toBeInTheDocument();
    });

    it("should launch game on 'game' command", () => {
        renderWithProviders(<Terminal />);

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "game" } });
        fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

        expect(
            screen.getByText(/\[Simulación\] Iniciando Hangar Tecnológico\.\.\./i)
        ).toBeInTheDocument();
    });

    it("should show error on unknown command", () => {
        renderWithProviders(<Terminal />);

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "foo_bar_xyz" } });
        fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

        expect(screen.getByText(/Command not found: 'foo_bar_xyz'/i)).toBeInTheDocument();
    });
});
