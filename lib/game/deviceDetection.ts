/**
 * Detecta si el dispositivo actual es móvil o cuenta con puntero táctil grueso.
 */
export function detectTouchMobileDevice(): boolean {
    if (typeof window === "undefined") return false;
    const uaMatch = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
    const coarsePointer =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(pointer: coarse)").matches &&
        (navigator.maxTouchPoints ?? 0) > 0;
    return uaMatch || coarsePointer;
}
