import { createContext } from "react";
import type { Locale, TranslationDictionary } from "@/data/locales";

export interface LanguageContextType {
    language: Locale;
    setLanguage: (lang: Locale) => void;
    toggleLanguage: () => void;
    t: TranslationDictionary;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
