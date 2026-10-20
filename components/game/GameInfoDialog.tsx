import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Briefcase, Code, Calendar, MapPin, ExternalLink, Github } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import type { GameInteractionPayload } from "@/lib/game/types";

interface GameInfoDialogProps {
    data: GameInteractionPayload | null;
    onClose: () => void;
}

export const GameInfoDialog: React.FC<GameInfoDialogProps> = ({ data, onClose }) => {
    if (!data) return null;

    const isExp = data.type === "EXPERIENCE";
    const title = isExp ? "Trayectoria & Experiencia" : "Proyectos Destacados";

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 15 }}
                    className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden bg-card/95 border border-primary/30 rounded-2xl shadow-2xl shadow-primary/10 flex flex-col"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-5 border-b border-border/50 bg-secondary/30">
                        <div className="flex items-center gap-3">
                            {isExp ? (
                                <Briefcase className="w-5 h-5 text-primary" />
                            ) : (
                                <Code className="w-5 h-5 text-cyan-400" />
                            )}
                            <h2 className="text-lg font-bold text-foreground tracking-tight">
                                {title}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1.5 transition-colors rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto space-y-4 max-h-[65vh]">
                        {isExp ? (
                            <div className="space-y-4">
                                {portfolioData.experience.map((exp, idx) => (
                                    <div
                                        key={idx}
                                        className="p-4 rounded-xl border border-border/50 bg-background/50 hover:border-primary/30 transition-colors"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                                            <h3 className="font-semibold text-foreground">
                                                {exp.title}
                                            </h3>
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" /> {exp.period}
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium text-primary mb-2 flex items-center gap-1">
                                            <MapPin className="w-3.5 h-3.5 text-muted-foreground" />{" "}
                                            {exp.company} ({exp.location})
                                        </p>
                                        <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1 mb-3">
                                            {exp.highlights.map((h, hIdx) => (
                                                <li key={hIdx}>{h}</li>
                                            ))}
                                        </ul>
                                        <div className="flex flex-wrap gap-1.5">
                                            {exp.technologies.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-2 py-0.5 text-[10px] rounded bg-primary/10 text-primary border border-primary/20 font-mono"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {portfolioData.projects.map((proj, idx) => (
                                    <div
                                        key={idx}
                                        className="p-4 rounded-xl border border-border/50 bg-background/50 hover:border-cyan-500/30 transition-colors"
                                    >
                                        <div className="flex items-center justify-between gap-2 mb-2">
                                            <h3 className="font-semibold text-foreground">
                                                {proj.title}
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                {proj.github && (
                                                    <a
                                                        href={proj.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-muted-foreground hover:text-foreground transition-colors p-1"
                                                    >
                                                        <Github className="w-4 h-4" />
                                                    </a>
                                                )}
                                                {proj.link && (
                                                    <a
                                                        href={proj.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-muted-foreground hover:text-primary transition-colors p-1"
                                                    >
                                                        <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                                            {proj.description}
                                        </p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {proj.tags.map((t) => (
                                                <span
                                                    key={t}
                                                    className="px-2 py-0.5 text-[10px] rounded bg-primary/10 text-primary border border-primary/20 font-mono"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
