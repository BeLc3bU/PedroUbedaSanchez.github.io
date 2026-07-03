import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex-grow flex flex-col items-center justify-center min-h-[50vh] bg-background">
            <div className="flex flex-col items-center gap-4">
                <Loader2 size={48} className="animate-spin text-cyan-600" />
                <p className="text-zinc-600 dark:text-zinc-400 font-mono">Cargando...</p>
            </div>
        </div>
    );
}
