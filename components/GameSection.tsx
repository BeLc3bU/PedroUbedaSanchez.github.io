"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useLanguage } from "@/hooks/useLanguage";
import { Gamepad2, Sparkles, ArrowRight } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const HangarModal = dynamic(() => import("@/components/game/HangarModal"), {
    ssr: false,
});

export default function GameSection() {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section id="game" className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <AnimateOnScroll>
                    <div className="relative overflow-hidden rounded-3xl border-2 border-primary/30 bg-gradient-to-br from-card via-card/90 to-primary/5 p-6 md:p-8 shadow-2xl">
                        {/* Background subtle glowing elements */}
                        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex-1 text-center md:text-left">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-3">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    {t.game.badge}
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-2">
                                    {t.game.title}
                                </h2>
                                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4 max-w-xl">
                                    {t.game.subtitle} {t.game.description}
                                </p>
                            </div>

                            <button
                                onClick={() => setIsOpen(true)}
                                className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
                            >
                                <Gamepad2 className="w-5 h-5 transition-transform group-hover:rotate-12" />
                                <span>{t.game.openButton}</span>
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>
                </AnimateOnScroll>
            </div>

            {/* Modal */}
            <HangarModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </section>
    );
}
