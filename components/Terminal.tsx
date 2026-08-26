"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "../data/portfolio";
import { initializeAgentSystem } from "../agents";
import type { AgentTask } from "../agents";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import { useRouter } from "next/navigation";
import { Terminal as TerminalIcon, Sparkles } from "lucide-react";
import HangarModal from "./game/HangarModal";

interface TerminalLine {
    type: "input" | "output" | "error" | "success" | "info";
    content: string;
}

const QUICK_COMMANDS = [
    "help",
    "game",
    "theme",
    "lang",
    "projects",
    "experience",
    "skills",
    "cv",
    "clear",
];

const ASCII_BANNER = `
  ____           _             _   _ _              _       
 |  _ \\ ___   __| |_ __ ___   | | | | |__   ___  __| | __ _ 
 | |_) / _ \\ / _\` | '__/ _ \\  | | | | '_ \\ / _ \\/ _\` |/ _\` |
 |  __/  __/| (_| | | | (_) | | |_| | |_) |  __/ (_| | (_| |
 |_|   \\___| \\__,_|_|  \\___/   \\___/|_.__/ \\___|\\__,_|\\__,_|
 ------------------------------------------------------------
 Systems Specialist • Avionics • FullStack Web Developer
`;

export function Terminal() {
    const { theme, toggleTheme, setTheme } = useTheme();
    const { language, toggleLanguage, setLanguage, t } = useLanguage();
    const router = useRouter();

    const welcomeMessage =
        language === "es"
            ? `Bienvenido a la Terminal de Pedro Úbeda v2.0 (Next.js 16 + SDD)\nEscribe 'help' o presiona uno de los botones rápidos para comenzar.`
            : `Welcome to Pedro Úbeda's Interactive Terminal v2.0 (Next.js 16 + SDD)\nType 'help' or click any quick command chip below to start.`;

    const [input, setInput] = useState("");
    const [isExecuting, setIsExecuting] = useState(false);
    const [isGameOpen, setIsGameOpen] = useState(false);
    const [history, setHistory] = useState<TerminalLine[]>([
        { type: "success", content: welcomeMessage },
    ]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (rawInput: string) => {
        const trimmed = rawInput.trim();
        if (!trimmed) return;

        const parts = trimmed.split(/\s+/);
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        const newHistory: TerminalLine[] = [
            ...history,
            {
                type: "input",
                content: `pedro@portfolio:~$ ${trimmed}`,
            },
        ];

        switch (cmd) {
            case "help":
                newHistory.push({
                    type: "output",
                    content:
                        language === "es"
                            ? "Comandos disponibles:\n" +
                              "  [Consultas]\n" +
                              "    about        - Información biográfica profesional\n" +
                              "    projects     - Listado de proyectos destacados\n" +
                              "    experience   - Trayectoria laboral y militar\n" +
                              "    skills       - Habilidades técnicas y competencias\n" +
                              "    education    - Titulaciones y honores\n" +
                              "    hobbies      - Intereses personales\n" +
                              "    contact      - Canales de contacto directo\n" +
                              "  [Simulación & Gamificación]\n" +
                              "    game / play  - Inicia el minijuego retro 2D del Hangar\n" +
                              "    agents       - Ejecuta simulación orquestada de multi-agentes\n" +
                              "  [Sistema & Reactividad]\n" +
                              "    theme        - Cambia el tema visual (uso: theme light|dark|toggle)\n" +
                              "    lang         - Cambia el idioma (uso: lang es|en|toggle)\n" +
                              "    cv / resume  - Abre la vista de Currículum en PDF\n" +
                              "  [Utilidades]\n" +
                              "    history      - Lista el historial de comandos de la sesión\n" +
                              "    date / time  - Muestra la fecha y hora del sistema\n" +
                              "    echo <msg>   - Imprime el mensaje ingresado\n" +
                              "    banner       - Muestra el arte ASCII del perfil\n" +
                              "    clear        - Limpia la pantalla de la terminal"
                            : "Available commands:\n" +
                              "  [Queries]\n" +
                              "    about        - Professional biographical overview\n" +
                              "    projects     - Featured technical projects\n" +
                              "    experience   - Career timeline & military service\n" +
                              "    skills       - Technical capabilities & competencies\n" +
                              "    education    - Formal education & military honors\n" +
                              "    hobbies      - Personal interests & activities\n" +
                              "    contact      - Direct communication channels\n" +
                              "  [Simulation & Gamification]\n" +
                              "    game / play  - Launch 2D Retro Tech Hangar simulation\n" +
                              "    agents       - Run multi-agent orchestration simulation\n" +
                              "  [System & Reactive]\n" +
                              "    theme        - Toggle or set visual theme (usage: theme light|dark|toggle)\n" +
                              "    lang         - Change language (usage: lang es|en|toggle)\n" +
                              "    cv / resume  - Navigate to printable PDF Resume\n" +
                              "  [Utilities]\n" +
                              "    history      - Display session command history\n" +
                              "    date / time  - Show current system date & time\n" +
                              "    echo <msg>   - Print text arguments\n" +
                              "    banner       - Display ASCII art banner\n" +
                              "    clear        - Clear terminal screen",
                });
                break;

            case "about":
                newHistory.push({
                    type: "success",
                    content: `\n${t.about.bio1}\n\n${t.about.bio2}\n`,
                });
                break;

            case "hobbies":
                newHistory.push({
                    type: "success",
                    content:
                        `\n${t.about.hobbiesTitle}:\n` +
                        t.about.hobbies.map((h, i) => `  ${i + 1}. ${h}`).join("\n") +
                        "\n",
                });
                break;

            case "projects":
                newHistory.push({
                    type: "output",
                    content:
                        `\n${t.projects.title}:\n` +
                        t.projects.items
                            .map(
                                (p, i) =>
                                    `  ${i + 1}. [${p.category}] ${p.title}\n     ${p.description}\n     Tags: ${p.tags.join(", ")}\n`
                            )
                            .join("\n"),
                });
                break;

            case "skills":
                newHistory.push({
                    type: "output",
                    content:
                        `\n${t.skills.technicalTitle}:\n` +
                        t.skills.tools.map((s) => `  • ${s}`).join("\n") +
                        `\n\n${t.skills.competenciesTitle}:\n` +
                        t.skills.competencies.map((c) => `  • ${c}`).join("\n"),
                });
                break;

            case "experience":
                newHistory.push({
                    type: "output",
                    content:
                        `\n${t.experience.title}:\n` +
                        t.experience.items
                            .map(
                                (e) =>
                                    `  • ${e.title} @ ${e.company} (${e.period} - ${e.location})\n    Highlights:\n${e.highlights.map((h) => `      - ${h}`).join("\n")}\n    Tech: ${e.technologies.join(", ")}\n`
                            )
                            .join("\n"),
                });
                break;

            case "education":
                newHistory.push({
                    type: "output",
                    content:
                        `\n${t.education.certificationsTitle}:\n` +
                        t.education.certifications
                            .map(
                                (c) =>
                                    `  • ${c.title} (${c.institution}${c.year ? ` - ${c.year}` : ""})`
                            )
                            .join("\n") +
                        `\n\n${t.education.honorsTitle}:\n` +
                        t.education.honors
                            .map(
                                (h) =>
                                    `  ★ ${h.title} (${h.institution}${h.year ? ` - ${h.year}` : ""})`
                            )
                            .join("\n"),
                });
                break;

            case "contact":
                newHistory.push({
                    type: "success",
                    content:
                        `\n${t.contact.channelsTitle}:\n` +
                        `  Email:    ${portfolioData.social.email}\n` +
                        `  LinkedIn: ${portfolioData.social.linkedin}\n` +
                        `  GitHub:   ${portfolioData.social.github}\n`,
                });
                break;

            case "theme": {
                const targetTheme = args[0]?.toLowerCase();
                if (targetTheme === "dark" || targetTheme === "light") {
                    setTheme(targetTheme);
                    newHistory.push({
                        type: "success",
                        content: `[System] Theme switched to ${targetTheme} mode.`,
                    });
                } else {
                    toggleTheme();
                    const newMode = theme === "dark" ? "light" : "dark";
                    newHistory.push({
                        type: "success",
                        content: `[System] Theme toggled to ${newMode} mode.`,
                    });
                }
                break;
            }

            case "lang": {
                const targetLang = args[0]?.toLowerCase();
                if (targetLang === "es" || targetLang === "en") {
                    setLanguage(targetLang);
                    newHistory.push({
                        type: "success",
                        content: `[System] Language set to ${targetLang.toUpperCase()}.`,
                    });
                } else {
                    toggleLanguage();
                    const next = language === "es" ? "EN" : "ES";
                    newHistory.push({
                        type: "success",
                        content: `[System] Language toggled to ${next}.`,
                    });
                }
                break;
            }

            case "cv":
            case "resume":
                newHistory.push({
                    type: "info",
                    content: "[System] Redirecting to printable Curriculum Vitae view (/cv)...",
                });
                setHistory(newHistory);
                setInput("");
                router.push("/cv");
                return;

            case "game":
            case "play":
            case "hangar":
                newHistory.push({
                    type: "success",
                    content:
                        language === "es"
                            ? "[Simulación] Iniciando Hangar Tecnológico..."
                            : "[Simulation] Launching Tech Hangar...",
                });
                setIsGameOpen(true);
                break;

            case "history":
                newHistory.push({
                    type: "output",
                    content:
                        commandHistory.length > 0
                            ? commandHistory.map((c, i) => `  ${i + 1}  ${c}`).join("\n")
                            : "  (History is empty)",
                });
                break;

            case "echo":
                newHistory.push({
                    type: "output",
                    content: args.join(" "),
                });
                break;

            case "date":
            case "time":
                newHistory.push({
                    type: "output",
                    content: `System Date: ${new Date().toLocaleString()}`,
                });
                break;

            case "sudo":
                newHistory.push({
                    type: "error",
                    content:
                        "Permission denied: user is not in the sudoers file. This incident will be reported to the System Administrator.",
                });
                break;

            case "banner":
            case "matrix":
                newHistory.push({
                    type: "success",
                    content: ASCII_BANNER,
                });
                break;

            case "agents":
                newHistory.push({
                    type: "output",
                    content: "\n[System] Initializing Multi-Agent Orchestrator...",
                });
                setHistory(newHistory);
                setIsExecuting(true);
                setTimeout(async () => {
                    try {
                        const orchestrator = initializeAgentSystem();

                        const task1: AgentTask = {
                            id: "task-build-ui",
                            type: "frontend",
                            description: "Create a new Contact form component",
                            payload: { ui: "form", fields: ["email", "message"] },
                            status: "pending",
                        };

                        const task2: AgentTask = {
                            id: "task-test-ui",
                            type: "testing",
                            description: "Test the Contact form",
                            payload: { target: "ContactForm", type: "unit" },
                            status: "pending",
                            dependencies: ["task-build-ui"],
                        };

                        const task3: AgentTask = {
                            id: "task-seo",
                            type: "seo",
                            description: "Optimize SEO for the portfolio",
                            payload: { generateSitemap: true, schemaMarkup: true },
                            status: "pending",
                        };

                        const task4: AgentTask = {
                            id: "task-game",
                            type: "gamedev",
                            description: "Create portfolio game 2D",
                            payload: { type: "portfolio-game", iframe: true },
                            status: "pending",
                        };

                        orchestrator.enqueueTask(task1);
                        orchestrator.enqueueTask(task2);
                        orchestrator.enqueueTask(task3);
                        orchestrator.enqueueTask(task4);

                        await orchestrator.run((logMsg) => {
                            setHistory((prev) => [...prev, { type: "output", content: logMsg }]);
                        });

                        setHistory((prev) => [
                            ...prev,
                            {
                                type: "success",
                                content:
                                    "\n[System] Multi-Agent Orchestrator execution finished successfully.",
                            },
                        ]);
                    } catch (error) {
                        const errorMsg = error instanceof Error ? error.message : String(error);
                        setHistory((prev) => [
                            ...prev,
                            { type: "error", content: `\n[Error] ${errorMsg}` },
                        ]);
                    } finally {
                        setIsExecuting(false);
                        setTimeout(() => {
                            inputRef.current?.focus();
                        }, 50);
                    }
                }, 100);
                setInput("");
                return;

            case "clear":
                setHistory([]);
                setInput("");
                return;

            default:
                newHistory.push({
                    type: "error",
                    content: `Command not found: '${trimmed}'. Type 'help' for available commands.`,
                });
        }

        // Track terminal command
        (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({
            event: "terminal_command",
            category: "engagement",
            label: cmd || "unknown",
        });

        setCommandHistory((prev) => [...prev, trimmed]);
        setHistory(newHistory);
        setInput("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (isExecuting) {
            e.preventDefault();
            return;
        }
        if (e.key === "Enter") {
            handleCommand(input);
            setHistoryIndex(-1);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex =
                    historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex]);
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex !== -1) {
                const newIndex = historyIndex + 1;
                if (newIndex >= commandHistory.length) {
                    setHistoryIndex(-1);
                    setInput("");
                } else {
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[newIndex]);
                }
            }
        } else if (e.key === "Tab") {
            e.preventDefault();
            const allCommands = [
                "help",
                "game",
                "play",
                "about",
                "projects",
                "skills",
                "experience",
                "education",
                "hobbies",
                "contact",
                "theme",
                "lang",
                "cv",
                "resume",
                "history",
                "date",
                "time",
                "echo",
                "banner",
                "sudo",
                "agents",
                "clear",
            ];
            const matches = allCommands.filter((c) => c.startsWith(input.toLowerCase().trim()));
            if (matches.length === 1) {
                setInput(matches[0]);
            }
        }
    };

    return (
        <>
            <div
                className="flex flex-col bg-background/90 dark:bg-slate-950/90 backdrop-blur-md border border-border rounded-3xl overflow-hidden shadow-2xl transition-all"
                onClick={() => inputRef.current?.focus()}
            >
                {/* Top Bar Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/40">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500/80 shadow-xs" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-xs" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-xs" />
                        <div className="ml-3 flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
                            <TerminalIcon size={13} className="text-primary" />
                            <span>bash • pedro@portfolio:~</span>
                        </div>
                    </div>
                    <div className="text-[11px] font-mono text-muted-foreground hidden sm:flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-secondary text-primary font-bold uppercase text-[10px]">
                            {language}
                        </span>
                        <span>v2.0</span>
                    </div>
                </div>

                {/* Terminal Body */}
                <div
                    ref={terminalRef}
                    className="h-[280px] sm:h-[300px] p-4 overflow-y-auto font-mono text-xs sm:text-sm leading-relaxed"
                >
                    <AnimatePresence>
                        {history.map((line, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 3 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`whitespace-pre-wrap mb-1.5 ${
                                    line.type === "error"
                                        ? "text-rose-400"
                                        : line.type === "success"
                                          ? "text-emerald-400 dark:text-cyan-400 font-medium"
                                          : line.type === "info"
                                            ? "text-sky-400"
                                            : line.type === "input"
                                              ? "text-foreground font-semibold"
                                              : "text-muted-foreground"
                                }`}
                            >
                                {line.content}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Active Input Line */}
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-emerald-500 dark:text-cyan-400 font-bold shrink-0">
                            pedro@portfolio:~$
                        </span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 bg-transparent outline-none text-foreground caret-primary font-mono"
                            spellCheck={false}
                            autoComplete="off"
                            disabled={isExecuting}
                            placeholder={
                                isExecuting
                                    ? language === "es"
                                        ? "Ejecutando simulación..."
                                        : "Executing simulation..."
                                    : ""
                            }
                        />
                        <span className="w-2 h-4 bg-primary animate-cursor-blink" />
                    </div>
                </div>

                {/* Quick Interactive Command Chips Footer */}
                <div className="p-3 border-t border-border/80 bg-muted/20 flex flex-wrap items-center gap-1.5 overflow-x-auto">
                    <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1 mr-1 shrink-0">
                        <Sparkles size={11} className="text-primary" />
                        Quick:
                    </span>
                    {QUICK_COMMANDS.map((cmd) => (
                        <button
                            key={cmd}
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCommand(cmd);
                                inputRef.current?.focus();
                            }}
                            className="px-2.5 py-1 text-xs font-mono rounded-lg border border-border/60 bg-background hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all text-muted-foreground cursor-pointer shadow-xs active:scale-95"
                        >
                            {cmd}
                        </button>
                    ))}
                </div>
            </div>

            <HangarModal isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />
        </>
    );
}

export default Terminal;
