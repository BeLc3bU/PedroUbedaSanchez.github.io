import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Contact from './Contact';

// Mock Sonner toast and Lucide icons
vi.mock('sonner', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn()
    }
}));

vi.mock('lucide-react', () => ({
    Mail: () => <div>Mail Icon</div>,
    Phone: () => <div>Phone Icon</div>,
    Linkedin: () => <div>Linkedin Icon</div>,
    MessageSquare: () => <div>MessageSquare Icon</div>,
    Send: () => <div>Send Icon</div>,
    Globe: () => <div>Globe Icon</div>
}));

// Mock fetch API
global.fetch = vi.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ success: true }),
    })
) as unknown as ReturnType<typeof vi.fn>;

describe('Contact Page', () => {
    it('should render the contact form', () => {
        render(<Contact />);
        expect(screen.getByPlaceholderText('Su nombre')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('su@email.com')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Describa el motivo de su consulta...')).toBeInTheDocument();
        expect(screen.getByText('INICIAR ENVÍO')).toBeInTheDocument();
    });

    it('should show validation errors on submit with empty fields', async () => {
        render(<Contact />);
        fireEvent.click(screen.getByText('INICIAR ENVÍO'));

        await waitFor(() => {
            expect(screen.getByText('Identidad requerida.')).toBeInTheDocument();
            expect(screen.getByText('Formato de comunicación no válido.')).toBeInTheDocument();
            expect(screen.getByText('Mensaje vacío.')).toBeInTheDocument();
        });
    });

    it('should submit successfully with valid data', async () => {
        render(<Contact />);
        
        fireEvent.change(screen.getByPlaceholderText('Su nombre'), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByPlaceholderText('su@email.com'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Describa el motivo de su consulta...'), { target: { value: 'This is a test message.' } });

        fireEvent.click(screen.getByText('INICIAR ENVÍO'));

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledTimes(1);
        });
    });
});
