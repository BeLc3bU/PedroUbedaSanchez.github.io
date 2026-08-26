import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ContactForm from "./ContactForm";

// Mock de Sonner Toast
vi.mock("sonner", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

describe("ContactForm Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        global.fetch = vi.fn();
    });

    it("renders all form fields and submit button", () => {
        render(<ContactForm />);

        expect(screen.getByPlaceholderText(/P. ej. John Doe/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/P. ej. john@example.com/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Escriba su mensaje aquí.../i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Iniciar Transmisión/i })).toBeInTheDocument();
    });

    it("shows validation errors when fields are empty", async () => {
        render(<ContactForm />);

        const submitBtn = screen.getByRole("button", { name: /Iniciar Transmisión/i });
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(screen.getByText(/Identidad requerida./i)).toBeInTheDocument();
            expect(screen.getByText(/Formato de comunicación no válido./i)).toBeInTheDocument();
            expect(screen.getByText(/Mensaje vacío./i)).toBeInTheDocument();
        });
    });

    it("discards bot submission silently when honeypot field is filled (Honeypot Protection)", async () => {
        const { toast } = await import("sonner");
        render(<ContactForm />);

        fireEvent.change(screen.getByPlaceholderText(/P. ej. John Doe/i), {
            target: { value: "Spam Bot" },
        });
        fireEvent.change(screen.getByPlaceholderText(/P. ej. john@example.com/i), {
            target: { value: "bot@spam.com" },
        });
        fireEvent.change(screen.getByPlaceholderText(/Escriba su mensaje aquí.../i), {
            target: { value: "Buy cheap products now!" },
        });

        // Rellenar campo honeypot oculto
        const honeypotInput = screen.getByLabelText(/Website/i);
        fireEvent.change(honeypotInput, { target: { value: "https://spam-link.com" } });

        const submitBtn = screen.getByRole("button", { name: /Iniciar Transmisión/i });
        fireEvent.click(submitBtn);

        await waitFor(() => {
            // El bot recibe confirmación simulada pero NO se llama a la API
            expect(toast.success).toHaveBeenCalledWith(
                "¡Transmisión Exitosa!",
                expect.objectContaining({
                    description: expect.stringContaining("He recibido su mensaje encriptado"),
                })
            );
            expect(global.fetch).not.toHaveBeenCalled();
        });
    });

    it("submits the form successfully when inputs are valid and honeypot is empty", async () => {
        const { toast } = await import("sonner");
        (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
            json: async () => ({ success: "true" }),
        });

        render(<ContactForm />);

        fireEvent.change(screen.getByPlaceholderText(/P. ej. John Doe/i), {
            target: { value: "Pedro Dev" },
        });
        fireEvent.change(screen.getByPlaceholderText(/P. ej. john@example.com/i), {
            target: { value: "pedro@example.com" },
        });
        fireEvent.change(screen.getByPlaceholderText(/Escriba su mensaje aquí.../i), {
            target: { value: "Hola Pedro, excelente portafolio." },
        });

        const submitBtn = screen.getByRole("button", { name: /Iniciar Transmisión/i });
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(toast.success).toHaveBeenCalledWith(
                "¡Transmisión Exitosa!",
                expect.objectContaining({
                    description: expect.stringContaining("He recibido su mensaje encriptado"),
                })
            );
        });
    });
});
