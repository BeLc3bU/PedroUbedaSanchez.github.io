import Link from "next/link";
import { Laptop } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex-grow flex flex-col items-center justify-center min-h-[60vh] bg-background px-4 text-center">
            <div className="flex flex-col items-center max-w-md">
                <div className="p-4 bg-cyan-500/10 text-cyan-400 rounded-full mb-6">
                    <Laptop size={40} />
                </div>
                <h1 className="text-3xl font-extrabold mb-3 font-mono">404 - Ruta Inexistente</h1>
                <p className="text-muted-foreground mb-6 text-sm">
                    El segmento de red o la página técnica solicitada no se encuentra disponible en
                    este host.
                </p>
                <Link
                    href="/"
                    className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium text-sm"
                >
                    Retornar a Terminal
                </Link>
            </div>
        </div>
    );
}
