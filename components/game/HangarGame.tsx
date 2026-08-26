"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/hooks/useLanguage";
import {
    createInitialGameState,
    updatePlayerPosition,
    findNearStation,
    checkExitDoorTrigger,
    renderGameScene,
    MAP_WIDTH,
    MAP_HEIGHT,
} from "@/lib/game/engine";
import { tacticalAudio } from "@/lib/game/audio";
import type { GameState, InteractiveStation } from "@/lib/game/types";
import TacticalHUD from "./TacticalHUD";
import {
    ChevronUp,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    X,
    Sparkles,
    CheckCircle2,
    ExternalLink,
    FileDown,
    Send,
    Radio,
} from "lucide-react";

interface HangarGameProps {
    onClose?: () => void;
}

export default function HangarGame({ onClose }: HangarGameProps) {
    const { language, t } = useLanguage();
    const router = useRouter();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [gameState, setGameState] = useState<GameState>(() => createInitialGameState());
    const [activeStation, setActiveStation] = useState<InteractiveStation | null>(null);
    const [dialogStep, setDialogStep] = useState<number>(0);
    const [keysPressed, setKeysPressed] = useState<Record<string, boolean>>({});

    const activeStationRef = useRef<InteractiveStation | null>(null);
    const keysRef = useRef<Record<string, boolean>>({});
    const [assets, setAssets] = useState<{
        bgImage: HTMLImageElement | null;
        spriteImage: HTMLImageElement | null;
        portraitImage: HTMLImageElement | null;
    }>({ bgImage: null, spriteImage: null, portraitImage: null });

    // Load Pixel Art Assets
    useEffect(() => {
        const bg = new Image();
        bg.src = "/assets/game/hangar_bg.jpg";
        bg.onload = () => setAssets((prev) => ({ ...prev, bgImage: bg }));

        const sprite = new Image();
        sprite.src = "/assets/game/pilot_sprite.jpg";
        sprite.onload = () => setAssets((prev) => ({ ...prev, spriteImage: sprite }));

        const portrait = new Image();
        portrait.src = "/assets/game/portraits.jpg";
        portrait.onload = () => setAssets((prev) => ({ ...prev, portraitImage: portrait }));
    }, []);

    const movementRef = useRef({
        up: false,
        down: false,
        left: false,
        right: false,
    });

    useEffect(() => {
        activeStationRef.current = activeStation;
    }, [activeStation]);

    useEffect(() => {
        keysRef.current = keysPressed;
        movementRef.current = {
            up: Boolean(keysPressed["KeyW"] || keysPressed["ArrowUp"]),
            down: Boolean(keysPressed["KeyS"] || keysPressed["ArrowDown"]),
            left: Boolean(keysPressed["KeyA"] || keysPressed["ArrowLeft"]),
            right: Boolean(keysPressed["KeyD"] || keysPressed["ArrowRight"]),
        };
    }, [keysPressed]);

    const openStation = useCallback((station: InteractiveStation) => {
        tacticalAudio.playStationOpen();
        setActiveStation(station);
        setDialogStep(0);
    }, []);

    const closeStation = useCallback(() => {
        tacticalAudio.playStationClose();
        setActiveStation(null);
        setDialogStep(0);
    }, []);

    const handleInteract = useCallback(() => {
        if (activeStationRef.current) {
            const currentStation = activeStationRef.current;
            const currentLang = language === "en" ? "en" : "es";
            const totalLines = currentStation.dialog[currentLang].lines.length;

            setDialogStep((prev) => {
                if (prev + 1 >= totalLines) {
                    closeStation();
                    return 0;
                }
                tacticalAudio.playSelect();
                return prev + 1;
            });
        } else {
            setGameState((prev) => {
                const near = findNearStation(prev.player, prev.stations);
                if (near) {
                    openStation(near);
                }
                return prev;
            });
        }
    }, [language, openStation, closeStation]);

    // Handle Direct Tactical Action
    const handleStationAction = (actionTarget: string, actionType: "route" | "scroll" | "link") => {
        tacticalAudio.playSelect();
        if (actionType === "route") {
            if (onClose) onClose();
            router.push(actionTarget);
        } else if (actionType === "scroll") {
            if (onClose) onClose();
            const element = document.querySelector(actionTarget);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else if (actionType === "link") {
            window.open(actionTarget, "_blank", "noopener,noreferrer");
        }
    };

    // Keyboard handlers with shortcuts 1..4
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
                e.preventDefault();
            }

            // Direct station shortcuts (1: Avionics, 2: Agents, 3: Infra, 4: Command)
            if (e.key === "1" || e.code === "Digit1") {
                const st = gameState.stations[0];
                if (st) openStation(st);
                return;
            }
            if (e.key === "2" || e.code === "Digit2") {
                const st = gameState.stations[1];
                if (st) openStation(st);
                return;
            }
            if (e.key === "3" || e.code === "Digit3") {
                const st = gameState.stations[2];
                if (st) openStation(st);
                return;
            }
            if (e.key === "4" || e.code === "Digit4") {
                const st = gameState.stations[3];
                if (st) openStation(st);
                return;
            }

            if (e.code === "KeyE" || e.code === "Space" || e.code === "Enter") {
                handleInteract();
                return;
            }

            if (e.code === "Escape") {
                if (activeStationRef.current) {
                    closeStation();
                } else if (onClose) {
                    tacticalAudio.playStationClose();
                    onClose();
                }
                return;
            }

            setKeysPressed((prev) => ({ ...prev, [e.code]: true }));
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            setKeysPressed((prev) => ({ ...prev, [e.code]: false }));
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [handleInteract, onClose, openStation, closeStation, gameState.stations]);

    const onCloseRef = useRef(onClose);
    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    // Main Game Animation Loop
    useEffect(() => {
        let animationFrameId: number;
        let lastTime = performance.now();
        let isExiting = false;

        const loop = (currentTime: number) => {
            const deltaSeconds = Math.min((currentTime - lastTime) / 1000, 0.1);
            lastTime = currentTime;

            if (!isExiting) {
                setGameState((prevState) => {
                    let updatedPlayer = prevState.player;

                    // Only move if not reading dialog
                    if (!activeStationRef.current) {
                        updatedPlayer = updatePlayerPosition(
                            prevState.player,
                            movementRef.current,
                            deltaSeconds,
                            prevState.obstacles
                        );

                        // Check if player reaches the bottom exit door
                        if (checkExitDoorTrigger(updatedPlayer)) {
                            isExiting = true;
                            tacticalAudio.playStationClose();
                            setTimeout(() => {
                                onCloseRef.current?.();
                            }, 0);
                            return prevState;
                        }
                    }

                    const nearStation = findNearStation(updatedPlayer, prevState.stations);

                    const nextState: GameState = {
                        ...prevState,
                        player: updatedPlayer,
                        isNearStation: nearStation,
                    };

                    return nextState;
                });
            }

            animationFrameId = requestAnimationFrame(loop);
        };

        animationFrameId = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Render Scene to Canvas on state or asset change
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                renderGameScene(ctx, gameState, language === "en" ? "en" : "es", assets);
            }
        }
    }, [gameState, language, assets]);

    // Virtual D-Pad Touch Handlers
    const setVirtualDir = (code: string, isDown: boolean) => {
        setKeysPressed((prev) => ({ ...prev, [code]: isDown }));
    };

    const currentLang = language === "en" ? "en" : "es";

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto select-none gap-3">
            {/* Tactical HUD Header & Quick Navigation Dock */}
            <TacticalHUD
                coords={{ x: gameState.player.x, y: gameState.player.y }}
                stations={gameState.stations}
                activeStationId={activeStation?.id || null}
                onSelectStation={openStation}
                onClose={onClose}
            />

            {/* Game Canvas Container */}
            <div className="relative w-full rounded-2xl overflow-hidden border-2 border-primary/40 shadow-2xl bg-black aspect-[800/560]">
                <canvas
                    ref={canvasRef}
                    width={MAP_WIDTH}
                    height={MAP_HEIGHT}
                    className="w-full h-full object-contain block"
                />

                {/* Sub-system Dialog Box Modal (Tactical Terminal Overlay) */}
                {activeStation && (
                    <div className="absolute inset-x-3 md:inset-x-6 bottom-3 z-20 animate-in fade-in slide-in-from-bottom-3 duration-200">
                        <div
                            className="bg-card/95 backdrop-blur-md border-2 rounded-2xl p-4 md:p-5 shadow-2xl text-foreground"
                            style={{ borderColor: activeStation.color }}
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between gap-3 mb-3 border-b border-border/60 pb-3">
                                <div className="flex items-center gap-3">
                                    {/* Pixel Art NPC Portrait Avatar */}
                                    <div
                                        className="w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden border-2 flex-shrink-0 shadow-lg relative bg-slate-900"
                                        style={{ borderColor: activeStation.color }}
                                    >
                                        <div
                                            className="w-full h-full bg-cover"
                                            style={{
                                                backgroundImage:
                                                    "url('/assets/game/portraits.jpg')",
                                                backgroundSize: "200% 200%",
                                                backgroundPosition: `${activeStation.portraitCol === 0 ? "0%" : "100%"} ${activeStation.portraitRow === 0 ? "0%" : "100%"}`,
                                                imageRendering: "pixelated",
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <div
                                            className="text-[10px] uppercase font-mono tracking-wider font-bold"
                                            style={{ color: activeStation.color }}
                                        >
                                            {activeStation.dialog[currentLang].title}
                                        </div>
                                        <h4 className="font-bold text-sm md:text-base text-foreground flex items-center gap-2">
                                            {activeStation.dialog[currentLang].speaker}
                                            <span
                                                className="w-2 h-2 rounded-full animate-pulse"
                                                style={{ backgroundColor: activeStation.color }}
                                            />
                                        </h4>
                                        <p className="text-xs text-muted-foreground font-mono">
                                            {activeStation.dialog[currentLang].role}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={closeStation}
                                    onMouseEnter={() => tacticalAudio.playHover()}
                                    className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label={t.game.closeDialog}
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Dialogue Line */}
                            <p className="text-sm md:text-base leading-relaxed mb-3 min-h-[44px] text-foreground/95">
                                {activeStation.dialog[currentLang].lines[dialogStep]}
                            </p>

                            {/* Highlights Badges */}
                            <div className="flex flex-wrap gap-1.5 mb-3">
                                {activeStation.dialog[currentLang].highlights.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="text-xs px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1.5 border"
                                        style={{
                                            backgroundColor: `${activeStation.color}15`,
                                            borderColor: `${activeStation.color}40`,
                                            color: activeStation.color,
                                        }}
                                    >
                                        <Sparkles className="w-3 h-3" />
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Direct Tactical Actions & Next Dialog Controls */}
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2 border-t border-border/40">
                                {/* Direct Action Shortcuts */}
                                <div className="flex items-center gap-2 flex-wrap">
                                    {activeStation.action && (
                                        <button
                                            onClick={() =>
                                                activeStation.action &&
                                                handleStationAction(
                                                    activeStation.action.target,
                                                    activeStation.action.type
                                                )
                                            }
                                            className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all hover:scale-[1.02] shadow-sm text-foreground bg-secondary/80 hover:bg-secondary border-border/80"
                                        >
                                            {activeStation.action.type === "route" ? (
                                                <FileDown className="w-3.5 h-3.5 text-primary" />
                                            ) : activeStation.action.type === "link" ? (
                                                <ExternalLink className="w-3.5 h-3.5 text-primary" />
                                            ) : (
                                                <Radio className="w-3.5 h-3.5 text-primary" />
                                            )}
                                            <span>
                                                {language === "es"
                                                    ? activeStation.action.label.es
                                                    : activeStation.action.label.en}
                                            </span>
                                        </button>
                                    )}

                                    {activeStation.secondaryAction && (
                                        <button
                                            onClick={() =>
                                                activeStation.secondaryAction &&
                                                handleStationAction(
                                                    activeStation.secondaryAction.target,
                                                    activeStation.secondaryAction.type
                                                )
                                            }
                                            className="px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all hover:scale-[1.02] shadow-sm text-foreground bg-secondary/80 hover:bg-secondary border-border/80"
                                        >
                                            <Send className="w-3.5 h-3.5 text-amber-400" />
                                            <span>
                                                {language === "es"
                                                    ? activeStation.secondaryAction.label.es
                                                    : activeStation.secondaryAction.label.en}
                                            </span>
                                        </button>
                                    )}
                                </div>

                                {/* Step Progress & Next Button */}
                                <div className="flex items-center justify-between sm:justify-end gap-3">
                                    <span className="text-xs text-muted-foreground font-mono">
                                        {dialogStep + 1} /{" "}
                                        {activeStation.dialog[currentLang].lines.length}
                                    </span>
                                    <button
                                        onClick={handleInteract}
                                        className="px-4 py-2 text-xs font-semibold rounded-xl text-primary-foreground flex items-center gap-2 transition-all hover:opacity-95 shadow"
                                        style={{ backgroundColor: activeStation.color }}
                                    >
                                        {dialogStep + 1 <
                                        activeStation.dialog[currentLang].lines.length ? (
                                            <>
                                                {t.game.next}{" "}
                                                <ChevronRight className="w-3.5 h-3.5" />
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle2 className="w-3.5 h-3.5" />{" "}
                                                {t.game.understood}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Virtual Controls Bar (Mobile & Desktop Touch) */}
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border">
                {/* Desktop Instructions */}
                <div className="text-xs text-muted-foreground font-mono text-center md:text-left">
                    <p className="font-semibold text-foreground mb-1">{t.game.controls}</p>
                    <p>{t.game.description}</p>
                </div>

                {/* Virtual Touch Controller (D-Pad + Action Button) */}
                <div className="flex items-center gap-6">
                    {/* D-Pad */}
                    <div className="grid grid-cols-3 gap-1 w-28 h-28 p-1 bg-secondary/50 rounded-2xl border border-border">
                        <div />
                        <button
                            onPointerDown={() => setVirtualDir("KeyW", true)}
                            onPointerUp={() => setVirtualDir("KeyW", false)}
                            onPointerLeave={() => setVirtualDir("KeyW", false)}
                            className="flex items-center justify-center rounded-xl bg-card active:bg-primary active:text-primary-foreground border border-border transition-colors shadow-sm"
                            aria-label="Up"
                        >
                            <ChevronUp className="w-5 h-5" />
                        </button>
                        <div />

                        <button
                            onPointerDown={() => setVirtualDir("KeyA", true)}
                            onPointerUp={() => setVirtualDir("KeyA", false)}
                            onPointerLeave={() => setVirtualDir("KeyA", false)}
                            className="flex items-center justify-center rounded-xl bg-card active:bg-primary active:text-primary-foreground border border-border transition-colors shadow-sm"
                            aria-label="Left"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <div className="rounded-lg bg-border/40 m-1" />
                        <button
                            onPointerDown={() => setVirtualDir("KeyD", true)}
                            onPointerUp={() => setVirtualDir("KeyD", false)}
                            onPointerLeave={() => setVirtualDir("KeyD", false)}
                            className="flex items-center justify-center rounded-xl bg-card active:bg-primary active:text-primary-foreground border border-border transition-colors shadow-sm"
                            aria-label="Right"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>

                        <div />
                        <button
                            onPointerDown={() => setVirtualDir("KeyS", true)}
                            onPointerUp={() => setVirtualDir("KeyS", false)}
                            onPointerLeave={() => setVirtualDir("KeyS", false)}
                            className="flex items-center justify-center rounded-xl bg-card active:bg-primary active:text-primary-foreground border border-border transition-colors shadow-sm"
                            aria-label="Down"
                        >
                            <ChevronDown className="w-5 h-5" />
                        </button>
                        <div />
                    </div>

                    {/* Action Button [E / Interact] */}
                    <button
                        onClick={handleInteract}
                        className={`h-24 px-5 rounded-2xl flex flex-col items-center justify-center gap-1.5 font-bold border transition-all shadow-md active:scale-95 ${
                            gameState.isNearStation
                                ? "bg-primary text-primary-foreground border-primary animate-pulse"
                                : "bg-card text-muted-foreground border-border hover:bg-secondary"
                        }`}
                        aria-label="Interact Action"
                    >
                        <Sparkles className="w-5 h-5" />
                        <span className="text-xs font-mono">
                            {gameState.isNearStation ? "[E] ABRIR" : "[E] ACCIÓN"}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
