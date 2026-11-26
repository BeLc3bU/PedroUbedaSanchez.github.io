"use client";

import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Minimize2, Gamepad2, RotateCcw, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { resetGameProgress } from "@/lib/game/progressStorage";

const PhaserGame = dynamic(() => import("./PhaserGame"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-cyan-400 font-mono text-xs">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span>Cargando motor RPG 2D...</span>
        </div>
    ),
});

interface PortfolioGameModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PortfolioGameModal: React.FC<PortfolioGameModalProps> = ({ isOpen, onClose }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [gameSessionKey, setGameSessionKey] = useState(0);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(Boolean(document.fullscreenElement));
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && !document.fullscreenElement && isOpen) {
                onClose();
            }
        };

        const handleGameNavigation = (e: Event) => {
            const customEvent = e as CustomEvent<{ url?: string; target?: string }>;
            const targetUrl = customEvent.detail?.url || customEvent.detail?.target || "#contact";

            if (document.fullscreenElement) {
                document.exitFullscreen().catch(() => {});
            }

            onClose();

            setTimeout(() => {
                if (targetUrl.startsWith("#") || targetUrl.startsWith("/#")) {
                    const hash = targetUrl.replace(/^\//, "");
                    const el = document.querySelector(hash);
                    if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                        window.history.pushState(null, "", hash);
                    }
                } else if (targetUrl.startsWith("/")) {
                    window.location.href = targetUrl;
                }
            }, 100);
        };

        window.addEventListener("game:navigate", handleGameNavigation);
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("game:navigate", handleGameNavigation);
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    const toggleFullscreen = async () => {
        if (!modalRef.current) return;
        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
            } else {
                await modalRef.current.requestFullscreen();
            }
        } catch {
            // Ignorar bloqueo de pantalla completa si no está soportado
        }
    };

    const handleResetProgress = () => {
        resetGameProgress();
        setGameSessionKey((prev) => prev + 1);
        toast.success("Progreso reiniciado", {
            description: "Tu aventura vuelve al punto de partida.",
        });
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[150] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-background/90 backdrop-blur-xl">
                <motion.div
                    ref={modalRef}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className={`relative w-full ${
                        isFullscreen
                            ? "h-full max-w-none rounded-none"
                            : "max-w-5xl h-[85vh] max-h-[760px] rounded-3xl"
                    } bg-card border border-primary/20 shadow-2xl flex flex-col overflow-hidden`}
                >
                    {/* Top Bar */}
                    <div className="flex items-center justify-between px-5 py-3 border-b border-border/40 bg-secondary/30 z-20">
                        <div className="flex items-center gap-2.5">
                            <Gamepad2 className="w-5 h-5 text-primary" />
                            <span className="font-bold text-sm text-foreground tracking-tight font-mono">
                                Pedro Úbeda — Portfolio Adventure 2D
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleResetProgress}
                                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-cyan-400 transition-colors cursor-pointer"
                                title="Reiniciar progreso guardado"
                                aria-label="Reiniciar progreso guardado"
                            >
                                <RotateCcw className="w-4 h-4" />
                            </button>

                            <button
                                onClick={toggleFullscreen}
                                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                                title={
                                    isFullscreen
                                        ? "Salir de pantalla completa"
                                        : "Pantalla completa"
                                }
                            >
                                {isFullscreen ? (
                                    <Minimize2 className="w-4 h-4" />
                                ) : (
                                    <Maximize2 className="w-4 h-4" />
                                )}
                            </button>

                            <button
                                onClick={onClose}
                                className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-destructive transition-colors cursor-pointer ml-1"
                                title="Cerrar juego"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Game Content */}
                    <div className="flex-1 w-full h-full relative overflow-hidden bg-black">
                        <PhaserGame key={gameSessionKey} />
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default PortfolioGameModal;
