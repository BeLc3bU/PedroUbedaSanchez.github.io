import { useState, useEffect } from "react";

type MotionPreference = "reduce" | "no-preference" | "unknown";

export function usePrefersReducedMotion(): MotionPreference {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState<MotionPreference>(() => {
        if (typeof window === "undefined") {
            return "unknown";
        }
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "reduce"
            : "no-preference";
    });

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

        // Listen for changes
        const handleChange = (event: MediaQueryListEvent) => {
            setPrefersReducedMotion(event.matches ? "reduce" : "no-preference");
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return prefersReducedMotion;
}

// Hook to get animation settings based on user preference
export function useAnimationSettings() {
    const reducedMotion = usePrefersReducedMotion();

    return {
        reducedMotion,
        shouldAnimate: reducedMotion !== "reduce",
        duration: reducedMotion === "reduce" ? 0 : undefined,
        delay: reducedMotion === "reduce" ? 0 : undefined,
    };
}
