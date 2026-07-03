"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Wrench, Settings, Cpu } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SocialLinks } from "@/components/SocialLinks";

const TITLES = ["Pedro Úbeda", "a Software Developer", "IT Infrastructure", "Avionic Maintenance"];

function TypingTitle() {
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentFullText = TITLES[currentTitleIndex];

        if (!isDeleting && displayText === currentFullText) {
            const timeout = setTimeout(() => {
                setIsDeleting(true);
            }, 1000);
            return () => clearTimeout(timeout);
        }

        if (isDeleting && displayText === "") {
            const timeout = setTimeout(() => {
                setIsDeleting(false);
                setCurrentTitleIndex((prev) => (prev + 1) % TITLES.length);
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
    }, [displayText, isDeleting, currentTitleIndex]);

    return (
        <div className="flex flex-col items-center">
            <span className="text-4xl md:text-7xl font-bold font-display">Hi, I'm</span>
            <span className="text-4xl md:text-7xl font-bold font-display text-primary">
                {displayText}
                <span className="inline-block w-[3px] h-[1em] bg-primary ml-1 animate-cursor-blink align-middle"></span>
            </span>
        </div>
    );
}

function TagsAnimation() {
    const slides = [
        {
            icon: <Sparkles className="w-5 h-5 text-primary" />,
            tagline: "Welcome to my portfolio",
            tags: ["IT Professional", "Aviónica", "Sistemas Críticos"],
        },
        {
            icon: <Wrench className="w-5 h-5 text-primary" />,
            tagline: "Maintaining critical systems",
            tags: ["Hardware", "Software", "Networking"],
        },
        {
            icon: <Settings className="w-5 h-5 text-primary" />,
            tagline: "Building robust infrastructure",
            tags: ["Active Directory", "Servers", "Databases"],
        },
        {
            icon: <Cpu className="w-5 h-5 text-primary" />,
            tagline: "Let's create something amazing together",
            tags: ["20+ Years Experience", "Technical Support", "Infrastructure"],
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <div className="w-full mt-6">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
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
                        <span className="text-primary">{slides[currentSlide].icon}</span>
                        <p className="text-balance">{slides[currentSlide].tagline}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto h-[100px] sm:h-[80px] overflow-hidden">
                        {slides[currentSlide].tags.map((tag, index) => (
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
    return (
        <div className="max-w-6xl mx-auto flex flex-col items-center">
            {/* Avatar - Like Augusto (ON TOP, centered) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative mb-8"
            >
                <div
                    className="w-40 h-56 md:w-48 md:h-72 rounded-[2rem] overflow-hidden border-4 border-primary shadow-2xl relative"
                    style={{ position: "relative" }}
                >
                    <Image
                        src="/foto.webp"
                        alt={portfolioData.name}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 768px) 160px, 192px"
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
                {/* "Hi, I'm" + Animation - Like Augusto */}
                <TypingTitle />

                {/* Tags that transition - Like Augusto */}
                <TagsAnimation />

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="flex justify-center gap-4 mt-8"
                >
                    <a
                        href="#projects"
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium"
                    >
                        View Projects
                    </a>
                    <a
                        href="#about"
                        className="px-6 py-3 border border-primary text-primary rounded-xl hover:bg-primary/10 transition-colors font-medium"
                    >
                        About Me
                    </a>
                </motion.div>

                {/* Social Links en el Hero */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                    className="flex justify-center mt-8"
                >
                    <SocialLinks />
                </motion.div>
            </motion.div>
        </div>
    );
}
