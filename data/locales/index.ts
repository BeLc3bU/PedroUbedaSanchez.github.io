import { es } from "./es";
import { en } from "./en";
import type { TranslationDictionary } from "./es";

export type Locale = "es" | "en";
export type { TranslationDictionary };

export const locales: Record<Locale, TranslationDictionary> = {
    es,
    en,
};

export const defaultLocale: Locale = "es";
