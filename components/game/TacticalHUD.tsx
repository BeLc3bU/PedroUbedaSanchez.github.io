"use client";

import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { tacticalAudio } from "@/lib/game/audio";
import type { InteractiveStation } from "@/lib/game/types";
import { Activity, Volume2, VolumeX, Globe, X, Cpu, Bot, Server, FileText } from "lucide-react";

interface TacticalHUDProps {
    coords: { x: number; y: number };
    stations: InteractiveStation[];
    activeStationId: string | null;
    onSelectStation: (station: InteractiveStation) => void;
    onClose?: () => void;
}

export default function TacticalHUD({
    coords,
    stations,
    activeStationId,
    onSelectStation,
    onClose,
}: TacticalHUDProps) {
    const { language, setLanguage } = useLanguage();
    const [isMuted, setIsMuted] = useState(() => tacticalAudio.getMuted());

    const toggleAudio = () => {
        const next = tacticalAudio.toggleMuted();
        setIsMuted(next);
        if (!next) tacticalAudio.playSelect();
    };

    const toggleLang = () => {
        tacticalAudio.playSelect();
        setLanguage(language === "es" ? "en" : "es");
    };

    const stationIcons = {
        avionics: <Cpu className="w-3.5 h-3.5" />,
        agents: <Bot className="w-3.5 h-3.5" />,
        infra: <Server className="w-3.5 h-3.5" />,
        command: <FileText className="w-3.5 h-3.5" />,
    };

    return (
        <div className="w-full flex flex-col gap-2 pointer-events-none select-none">
            {/* Top Telemetry Bar */}
            <div className="flex items-center justify-between gap-2 p-2 px-3 rounded-xl bg-background/90 backdrop-blur-md border border-border/80 shadow-lg text-xs font-mono">
                {/* Left: System Status Indicator */}
                <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <div className="flex items-center gap-1.5 text-foreground font-semibold">
                        <Activity className="w-3.5 h-3.5 text-primary" />
                        <span className="hidden sm:inline">SYSTEM:</span>
                        <span className="text-emerald-500 font-bold">ONLINE</span>
                    </div>
                    <span className="text-muted-foreground/60 hidden md:inline">|</span>
                    <span className="text-muted-foreground hidden md:inline">
                        OPERATOR: <strong className="text-foreground">PEDRO ÚBEDA</strong>
                    </span>
                </div>

                {/* Center: Live Tactical Coordinates */}
                <div className="hidden sm:flex items-center gap-2 bg-secondary/60 px-2.5 py-1 rounded-lg border border-border/40 text-[11px] text-muted-foreground">
                    <span>
                        POS: X:
                        <strong className="text-primary font-bold">
                            {Math.round(coords.x)}
                        </strong>{" "}
                        Y:<strong className="text-primary font-bold">{Math.round(coords.y)}</strong>
                    </span>
                </div>

                {/* Right: Controls (Audio, Lang, Exit) */}
                <div className="flex items-center gap-1.5 pointer-events-auto">
                    {/* Audio Toggle */}
                    <button
                        onClick={toggleAudio}
                        onMouseEnter={() => tacticalAudio.playHover()}
                        className="p-1.5 rounded-lg bg-secondary/80 hover:bg-secondary text-foreground border border-border/60 transition-colors flex items-center gap-1"
                        title={isMuted ? "Activar Audio Táctico" : "Silenciar Audio Táctico"}
                        aria-label="Toggle Audio"
                    >
                        {isMuted ? (
                            <VolumeX className="w-3.5 h-3.5 text-muted-foreground" />
                        ) : (
                            <Volume2 className="w-3.5 h-3.5 text-primary" />
                        )}
                        <span className="text-[10px] uppercase font-bold hidden lg:inline">
                            {isMuted ? "MUTE" : "SFX"}
                        </span>
                    </button>

                    {/* Language Switcher */}
                    <button
                        onClick={toggleLang}
                        onMouseEnter={() => tacticalAudio.playHover()}
                        className="p-1.5 px-2 rounded-lg bg-secondary/80 hover:bg-secondary text-foreground border border-border/60 transition-colors flex items-center gap-1 text-[11px] font-bold"
                        title="Cambiar Idioma / Switch Language"
                        aria-label="Toggle Language"
                    >
                        <Globe className="w-3.5 h-3.5 text-primary" />
                        <span>{language.toUpperCase()}</span>
                    </button>

                    {/* Exit Hangar Button */}
                    {onClose && (
                        <button
                            onClick={() => {
                                tacticalAudio.playStationClose();
                                onClose();
                            }}
                            onMouseEnter={() => tacticalAudio.playHover()}
                            className="p-1.5 px-2.5 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive border border-destructive/30 transition-colors flex items-center gap-1 text-[11px] font-bold"
                            title="Salir del Hangar"
                            aria-label="Close Hangar"
                        >
                            <X className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">EXIT</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Direct Route Matrix Dock (Fast Nav for Recruiters) */}
            <div className="flex items-center justify-center gap-1.5 p-1.5 px-2 rounded-xl bg-background/80 backdrop-blur border border-border/60 text-xs font-mono overflow-x-auto pointer-events-auto">
                <span className="text-[10px] uppercase font-bold text-muted-foreground px-1 hidden md:inline">
                    DIRECT ACCESS [1-4]:
                </span>
                {stations.map((st, idx) => {
                    const isActive = activeStationId === st.id;
                    const shortcut = idx + 1;
                    return (
                        <button
                            key={st.id}
                            onClick={() => {
                                tacticalAudio.playSelect();
                                onSelectStation(st);
                            }}
                            onMouseEnter={() => tacticalAudio.playHover()}
                            className={`pointer-events-auto flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all text-xs font-medium whitespace-nowrap shadow-sm ${
                                isActive
                                    ? "bg-primary text-primary-foreground border-primary shadow-primary/20 scale-[1.02]"
                                    : "bg-secondary/70 hover:bg-secondary text-foreground border-border/50 hover:border-primary/40"
                            }`}
                            style={{
                                borderColor: isActive ? st.color : undefined,
                            }}
                        >
                            <span
                                className="w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold bg-background/50 border border-border/50"
                                style={{ color: st.color }}
                            >
                                {shortcut}
                            </span>
                            <span style={{ color: isActive ? undefined : st.color }}>
                                {stationIcons[st.id] || st.icon}
                            </span>
                            <span className="text-[11px]">
                                {language === "es" ? st.tagline.es : st.tagline.en}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
