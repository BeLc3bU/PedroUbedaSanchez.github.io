import { useEffect, useRef, useState, useCallback } from "react";
import Phaser from "phaser";
import BBCodeTextPlugin from "phaser3-rex-plugins/plugins/bbcodetext-plugin.js";
import IslandScene from "@/lib/game/IslandScene";
import HUDScene from "@/lib/game/HUDScene";
import ProjectsCastleScene from "@/lib/game/ProjectsCastleScene";
import ExperienceCastleScene from "@/lib/game/ExperienceCastleScene";
import MobileControls from "./MobileControls";
import "./PhaserGame.css";

export const PhaserGame = () => {
    const gameContainer = useRef<HTMLDivElement>(null);
    const gameInstance = useRef<Phaser.Game | null>(null);
    const [mobileInput, setMobileInput] = useState({
        x: 0,
        y: 0,
        interact: false,
    });
    const [isLandscape, setIsLandscape] = useState(() => {
        if (typeof window === "undefined") return true;
        return window.innerWidth > window.innerHeight;
    });

    const isMobile =
        typeof window !== "undefined" &&
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const handleInteract = useCallback(() => {
        setMobileInput((prev) => ({ ...prev, interact: true }));
        setTimeout(() => setMobileInput((prev) => ({ ...prev, interact: false })), 100);
    }, []);

    useEffect(() => {
        if (!gameContainer.current || gameInstance.current) return;

        let isCancelled = false;
        let resizeObserver: ResizeObserver | null = null;
        let handleResize: (() => void) | null = null;

        const initGame = async () => {
            if (typeof document !== "undefined" && document.fonts) {
                try {
                    await Promise.race([
                        document.fonts.load('14px "Press Start 2P"'),
                        new Promise((resolve) => setTimeout(resolve, 1500)),
                    ]);
                } catch {
                    // Ignore font loading errors
                }
            }

            if (isCancelled || !gameContainer.current || gameInstance.current) return;

            const config: Phaser.Types.Core.GameConfig = {
                type: Phaser.AUTO,
                width: 800,
                height: 500,
                backgroundColor: "#000000",
                parent: gameContainer.current,
                pixelArt: true,
                roundPixels: true,
                plugins: {
                    global: [
                        {
                            key: "rexBBCodeTextPlugin",
                            plugin: BBCodeTextPlugin,
                            start: true,
                        },
                    ],
                },
                scene: [IslandScene, ExperienceCastleScene, ProjectsCastleScene, HUDScene],
                fps: {
                    target: 60,
                    smoothStep: true,
                },
                render: {
                    antialias: false,
                    pixelArt: true,
                    roundPixels: true,
                    powerPreference: "high-performance",
                },
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
            };

            const game = new Phaser.Game(config);
            gameInstance.current = game;

            const parentEl = gameContainer.current;
            const applySize = () => {
                if (!parentEl || !game) return;
                const w = parentEl.clientWidth;
                const h = parentEl.clientHeight;
                if (w > 0 && h > 0) {
                    game.scale.resize(w, h);
                }
            };

            applySize();

            resizeObserver = new ResizeObserver(() => applySize());
            resizeObserver.observe(parentEl);

            handleResize = () => {
                setIsLandscape(window.innerWidth > window.innerHeight);
                applySize();
            };

            window.addEventListener("resize", handleResize);
            window.addEventListener("orientationchange", handleResize);
        };

        initGame();

        return () => {
            isCancelled = true;
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
            if (handleResize) {
                window.removeEventListener("resize", handleResize);
                window.removeEventListener("orientationchange", handleResize);
            }
            if (gameInstance.current) {
                gameInstance.current.destroy(true);
                gameInstance.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (gameInstance.current) {
            gameInstance.current.registry.set("mobileInput", mobileInput);
        }
    }, [mobileInput]);

    return (
        <div
            className={`phaser-game-wrapper ${
                isMobile ? "has-mobile-controls" : ""
            } ${isLandscape ? "landscape" : "portrait"}`}
        >
            <div
                style={{
                    fontFamily: '"Press Start 2P"',
                    position: "absolute",
                    opacity: 0,
                    pointerEvents: "none",
                    zIndex: -1,
                }}
                aria-hidden="true"
            >
                .
            </div>
            <div ref={gameContainer} className="phaser-game-container" />
            <MobileControls
                onMove={(direction) =>
                    setMobileInput((prev) => ({
                        ...prev,
                        x: direction.x,
                        y: direction.y,
                    }))
                }
                onInteract={handleInteract}
            />
        </div>
    );
};

export default PhaserGame;
