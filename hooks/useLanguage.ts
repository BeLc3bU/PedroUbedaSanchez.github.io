"use client";

import { useContext } from "react";
import { LanguageContext, type LanguageContextType } from "@/context/LanguageContextDefinition";
import { locales, defaultLocale } from "@/data/locales";

export function useLanguage(): LanguageContextType {
    const context = useContext(LanguageContext);
    if (!context) {
        // Fallback defensivo si se usa fuera del Provider
        return {
            language: defaultLocale,
            setLanguage: () => {},
            toggleLanguage: () => {},
            t: locales[defaultLocale],
        };
    }
    return context;
}

export { LanguageProvider } from "@/context/LanguageProvider";
