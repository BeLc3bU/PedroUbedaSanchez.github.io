"use client";

import { useEffect } from "react";
import { Wrench, RefreshCw } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex-grow flex flex-col items-center justify-center min-h-[60vh] bg-background px-4 text-center">
            <div className="flex flex-col items-center max-w-md">
                <div className="p-4 bg-rose-500/10 text-rose-500 rounded-full mb-6">
                    <Wrench size={40} className="animate-bounce" />
                </div>
                <h1 className="text-2xl font-bold mb-3 font-mono">Error de Enlace Técnico</h1>
                <p className="text-muted-foreground mb-6 text-sm">
                    Se ha detectado una anomalía en la carga de la interfaz. Por favor, reinicie la
                    conexión o recargue el componente.
                </p>
                <button
                    onClick={() => reset()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium text-sm"
                >
                    <RefreshCw size={16} />
                    Reintentar Conexión
                </button>
            </div>
        </div>
    );
}
