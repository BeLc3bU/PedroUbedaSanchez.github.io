import { renderHook, act } from '@testing-library/react';
import { useTheme } from './useTheme';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('useTheme hook', () => {
    beforeEach(() => {
        localStorage.clear();
        document.documentElement.className = '';
        
        // Mock matchMedia
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: vi.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            })),
        });
    });

    it('should default to light theme if no preference is saved or set in OS', () => {
        const { result } = renderHook(() => useTheme());
        expect(result.current.theme).toBe('light');
    });

    it('should use OS preference if no local storage is found', () => {
        window.matchMedia = vi.fn().mockImplementation(() => ({
            matches: true,
        })) as any;

        const { result } = renderHook(() => useTheme());
        expect(result.current.theme).toBe('dark');
        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should load theme from local storage', () => {
        localStorage.setItem('theme', 'dark');
        const { result } = renderHook(() => useTheme());
        expect(result.current.theme).toBe('dark');
        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should toggle theme from light to dark', () => {
        const { result } = renderHook(() => useTheme());
        expect(result.current.theme).toBe('light');

        act(() => {
            result.current.toggleTheme();
        });

        expect(result.current.theme).toBe('dark');
        expect(localStorage.getItem('theme')).toBe('dark');
        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
});
