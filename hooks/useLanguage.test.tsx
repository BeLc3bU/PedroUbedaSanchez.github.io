import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { LanguageProvider, useLanguage } from "./useLanguage";
import type { ReactNode } from "react";

const wrapper = ({ children }: { children: ReactNode }) => (
    <LanguageProvider>{children}</LanguageProvider>
);

describe("useLanguage Hook", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("should provide default language as Spanish ('es')", () => {
        const { result } = renderHook(() => useLanguage(), { wrapper });

        expect(result.current.language).toBe("es");
        expect(result.current.t.nav.projects).toBe("Proyectos");
    });

    it("should toggle language from 'es' to 'en' and update translations", () => {
        const { result } = renderHook(() => useLanguage(), { wrapper });

        act(() => {
            result.current.toggleLanguage();
        });

        expect(result.current.language).toBe("en");
        expect(result.current.t.nav.projects).toBe("Projects");
        expect(localStorage.getItem("portfolio_lang")).toBe("en");
    });

    it("should switch back to 'es' on second toggle", () => {
        const { result } = renderHook(() => useLanguage(), { wrapper });

        act(() => {
            result.current.toggleLanguage();
        });
        expect(result.current.language).toBe("en");

        act(() => {
            result.current.toggleLanguage();
        });
        expect(result.current.language).toBe("es");
        expect(result.current.t.nav.projects).toBe("Proyectos");
        expect(localStorage.getItem("portfolio_lang")).toBe("es");
    });

    it("should allow setting specific language via setLanguage", () => {
        const { result } = renderHook(() => useLanguage(), { wrapper });

        act(() => {
            result.current.setLanguage("en");
        });

        expect(result.current.language).toBe("en");
        expect(result.current.t.locale).toBe("en");
    });
});
