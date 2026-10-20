"use client";

import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import IslandScene from "@/lib/game/scenes/IslandScene";
import InteriorScene from "@/lib/game/scenes/InteriorScene";
import { MobileControls } from "./MobileControls";
import { GameInfoDialog } from "./GameInfoDialog";
import type { MobileInputState, GameInteractionPayload } from "@/lib/game/types";

export const RPGGameContainer: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const gameInstanceRef = useRef<Phaser.Game | null>(null);
    const [dialogPayload, setDialogPayload] = useState<GameInteractionPayload | null>(null);
    const [isTouchDevice] = useState(() => {
        if (typeof window === "undefined") return false;
        return "ontouchstart" in window || navigator.maxTouchPoints > 0;
    });

    useEffect(() => {
        if (!containerRef.current || gameInstanceRef.current) return;

        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            parent: containerRef.current,
            width: 800,
            height: 500,
            pixelArt: true,
            roundPixels: true,
            backgroundColor: "#050b14",
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { x: 0, y: 0 },
                    debug: false,
                },
            },
            scale: {
                mode: Phaser.Scale.RESIZE,
                autoCenter: Phaser.Scale.CENTER_BOTH,
                width: 800,
                height: 500,
            },
            scene: [IslandScene, InteriorScene],
        };

        const game = new Phaser.Game(config);
        gameInstanceRef.current = game;

        const handleInteraction = (e: Event) => {
            const customEvent = e as CustomEvent<GameInteractionPayload>;
            if (customEvent.detail) {
                setDialogPayload(customEvent.detail);
            }
        };

        window.addEventListener("portfolio-game-interaction", handleInteraction);

        const resizeObserver = new ResizeObserver(() => {
            if (containerRef.current && gameInstanceRef.current) {
                const w = containerRef.current.clientWidth;
                const h = containerRef.current.clientHeight;
                if (w > 0 && h > 0) {
                    gameInstanceRef.current.scale.resize(w, h);
                }
            }
        });

        resizeObserver.observe(containerRef.current);

        return () => {
            window.removeEventListener("portfolio-game-interaction", handleInteraction);
            resizeObserver.disconnect();
            if (gameInstanceRef.current) {
                gameInstanceRef.current.destroy(true);
                gameInstanceRef.current = null;
            }
        };
    }, []);

    const handleMobileInput = (input: MobileInputState) => {
        if (gameInstanceRef.current) {
            gameInstanceRef.current.registry.set("mobileInput", input);
        }
    };

    return (
        <div className="relative w-full h-full min-h-[480px] bg-slate-950 overflow-hidden select-none">
            <div ref={containerRef} className="w-full h-full" />

            {/* Mobile Touch Controls */}
            {isTouchDevice && <MobileControls onInputUpdate={handleMobileInput} />}

            {/* Game Info Dialog */}
            <GameInfoDialog data={dialogPayload} onClose={() => setDialogPayload(null)} />
        </div>
    );
};

export default RPGGameContainer;
