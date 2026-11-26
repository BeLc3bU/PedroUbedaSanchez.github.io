export interface GameProgress {
    inventory: string[];
    openedChests: string[];
    hasWelcomeShown: boolean;
}

const PROGRESS_STORAGE_KEY = "pedro_rpg_progress_v1";

const DEFAULT_PROGRESS: GameProgress = {
    inventory: [],
    openedChests: [],
    hasWelcomeShown: false,
};

function sanitizeStringArray(value: unknown): string[] {
    if (!Array.isArray(value)) return [];
    return Array.from(
        new Set(value.filter((item): item is string => typeof item === "string" && item.length > 0))
    );
}

/**
 * Carga el progreso guardado del minijuego RPG desde localStorage.
 * Devuelve valores por defecto seguros si no existe o en entornos sin almacenamiento.
 */
export function loadGameProgress(): GameProgress {
    if (typeof window === "undefined") {
        return { ...DEFAULT_PROGRESS, inventory: [], openedChests: [] };
    }

    try {
        const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
        if (!raw) {
            return { ...DEFAULT_PROGRESS, inventory: [], openedChests: [] };
        }
        const parsed = JSON.parse(raw) as Partial<GameProgress>;
        return {
            inventory: sanitizeStringArray(parsed.inventory),
            openedChests: sanitizeStringArray(parsed.openedChests),
            hasWelcomeShown: Boolean(parsed.hasWelcomeShown),
        };
    } catch {
        return { ...DEFAULT_PROGRESS, inventory: [], openedChests: [] };
    }
}

/**
 * Persiste el progreso del minijuego RPG en localStorage de forma segura.
 */
export function saveGameProgress(progress: GameProgress): void {
    if (typeof window === "undefined") return;

    try {
        window.localStorage.setItem(
            PROGRESS_STORAGE_KEY,
            JSON.stringify({
                inventory: sanitizeStringArray(progress.inventory),
                openedChests: sanitizeStringArray(progress.openedChests),
                hasWelcomeShown: Boolean(progress.hasWelcomeShown),
            })
        );
    } catch {
        // Ignorar errores de cuota o modo privado
    }
}

export function addInventoryItem(item: string): GameProgress {
    const current = loadGameProgress();
    if (!current.inventory.includes(item)) {
        current.inventory = [...current.inventory, item];
        saveGameProgress(current);
    }
    return current;
}

export function markChestOpened(chestId: string): GameProgress {
    const current = loadGameProgress();
    if (!current.openedChests.includes(chestId)) {
        current.openedChests = [...current.openedChests, chestId];
        saveGameProgress(current);
    }
    return current;
}

export function markWelcomeShown(): GameProgress {
    const current = loadGameProgress();
    if (!current.hasWelcomeShown) {
        current.hasWelcomeShown = true;
        saveGameProgress(current);
    }
    return current;
}

export function resetGameProgress(): void {
    if (typeof window === "undefined") return;

    try {
        window.localStorage.removeItem(PROGRESS_STORAGE_KEY);
    } catch {
        // Ignorar errores de almacenamiento
    }
}
