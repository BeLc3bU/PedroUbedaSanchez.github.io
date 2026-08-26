"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Wrench, Settings, Cpu } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SocialLinks } from "@/components/SocialLinks";
import { useLanguage } from "@/hooks/useLanguage";

function TypingTitle() {
    const { t } = useLanguage();
    const titles = t.hero.titles;
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentFullText = titles[currentTitleIndex] || titles[0];

        if (!isDeleting && displayText === currentFullText) {
            const timeout = setTimeout(() => {
                setIsDeleting(true);
            }, 1000);
            return () => clearTimeout(timeout);
        }

        if (isDeleting && displayText === "") {
            const timeout = setTimeout(() => {
                setIsDeleting(false);
                setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
            }, 100);
            return () => clearTimeout(timeout);
        }

        const timeout = setTimeout(
            () => {
                setDisplayText(
                    isDeleting
                        ? currentFullText.substring(0, displayText.length - 1)
                        : currentFullText.substring(0, displayText.length + 1)
                );
            },
            isDeleting ? 75 : 150
        );

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentTitleIndex, titles]);

    return (
        <div className="flex flex-col items-center">
            <span className="text-4xl md:text-7xl font-bold font-display">{t.hero.greeting}</span>
            <span className="text-4xl md:text-7xl font-bold font-display text-primary">
                {displayText}
                <span className="inline-block w-[3px] h-[1em] bg-primary ml-1 animate-cursor-blink align-middle"></span>
            </span>
        </div>
    );
}

const slideIcons = [
    <Sparkles key="1" className="w-5 h-5 text-primary" />,
    <Wrench key="2" className="w-5 h-5 text-primary" />,
    <Settings key="3" className="w-5 h-5 text-primary" />,
    <Cpu key="4" className="w-5 h-5 text-primary" />,
];

function TagsAnimation() {
    const { t } = useLanguage();
    const slides = t.hero.slides;
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const activeSlide = slides[currentSlide] || slides[0];
    const icon = slideIcons[currentSlide % slideIcons.length];

    return (
        <div className="w-full mt-6">
            <AnimatePresence mode="wait">
                <motion.div
                    key={`${t.locale}-${currentSlide}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                >
                    {/* Icon + Tagline */}
                    <div
                        className="flex items-center justify-center gap-2 text-sm md:text-2xl mb-6"
                        style={{ color: "hsl(var(--muted-foreground))" }}
                    >
                        <span className="text-primary">{icon}</span>
                        <p className="text-balance">{activeSlide.tagline}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto h-[100px] sm:h-[80px] overflow-hidden">
                        {activeSlide.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-4 py-2 rounded-full text-sm md:text-base font-medium border transition-colors bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default function HeroInteractive() {
    const { t } = useLanguage();

    return (
        <div className="max-w-6xl mx-auto flex flex-col items-center">
            {/* Avatar - Centered on top */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative mb-8"
            >
                <div className="rounded-[2rem] overflow-hidden border-4 border-primary shadow-2xl">
                    <Image
                        src="/foto.webp"
                        alt={portfolioData.name}
                        width={192}
                        height={288}
                        priority
                        className="w-40 h-56 md:w-48 md:h-72 object-cover"
                    />
                </div>
            </motion.div>

            {/* Text Content - Below avatar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center w-full"
            >
                <TypingTitle key={t.locale} />
                <TagsAnimation />

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="flex justify-center gap-4 mt-8"
                >
                    <a
                        href="#projects"
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium"
                    >
                        {t.hero.viewProjects}
                    </a>
                    <a
                        href="#about"
                        className="px-6 py-3 border border-primary text-primary rounded-xl hover:bg-primary/10 transition-colors font-medium"
                    >
                        {t.hero.aboutMe}
                    </a>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="flex justify-center mt-8"
                >
                    <SocialLinks />
                </motion.div>
            </motion.div>
        </div>
    );
}
