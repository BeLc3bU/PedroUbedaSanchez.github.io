"use client";

import { useState, useEffect, useCallback, useMemo, type ReactNode } from "react";
import { locales, defaultLocale, type Locale } from "@/data/locales";
import { LanguageContext } from "./LanguageContextDefinition";

const STORAGE_KEY = "portfolio_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Locale>(() => {
        if (typeof window !== "undefined") {
            try {
                const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
                if (saved === "es" || saved === "en") {
                    return saved;
                }
            } catch {
                // Fallback silencioso ante modo incógnito o storage bloqueado
            }
        }
        return defaultLocale;
    });

    const setLanguage = useCallback((lang: Locale) => {
        setLanguageState(lang);
        if (typeof window !== "undefined") {
            try {
                localStorage.setItem(STORAGE_KEY, lang);
            } catch {
                // Ignore storage errors
            }
        }
    }, []);

    const toggleLanguage = useCallback(() => {
        setLanguageState((prev) => {
            const nextLang: Locale = prev === "es" ? "en" : "es";
            if (typeof window !== "undefined") {
                try {
                    localStorage.setItem(STORAGE_KEY, nextLang);
                } catch {
                    // Ignore storage errors
                }
            }
            return nextLang;
        });
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            document.documentElement.lang = language;
        }
    }, [language]);

    const value = useMemo(
        () => ({
            language,
            setLanguage,
            toggleLanguage,
            t: locales[language] || locales[defaultLocale],
        }),
        [language, setLanguage, toggleLanguage]
    );

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
