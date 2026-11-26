"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePrefersReducedMotion } from "@/hooks/useReducedMotion";

const TechBackground = dynamic(() => import("@/components/TechBackground"), { ssr: false });

export default function ClientBackground() {
    const reducedMotion = usePrefersReducedMotion();
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (reducedMotion === "reduce") {
            return;
        }

        // Diferir la carga de Three.js hasta que el navegador quede libre tras el primer pintado
        if (typeof window !== "undefined" && "requestIdleCallback" in window) {
            const idleId = window.requestIdleCallback(() => setShouldRender(true), {
                timeout: 1200,
            });
            return () => window.cancelIdleCallback(idleId);
        }

        const timeoutId = setTimeout(() => setShouldRender(true), 200);
        return () => clearTimeout(timeoutId);
    }, [reducedMotion]);

    if (reducedMotion === "reduce" || !shouldRender) {
        return <div className="fixed inset-0 -z-20 bg-background" aria-hidden="true" />;
    }

    return <TechBackground />;
}
