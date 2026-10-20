"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export interface InteractiveAvatarProps {
    className?: string;
    priority?: boolean;
    defaultFlipped?: boolean; // false = Avatar 3D, true = Foto Real
}

export default function InteractiveAvatar({
    className = "",
    priority = true,
    defaultFlipped = false,
}: InteractiveAvatarProps) {
    const [isFlipped, setIsFlipped] = useState(defaultFlipped);
    const shouldReduceMotion = useReducedMotion();

    const toggleFlip = () => {
        setIsFlipped((prev) => !prev);
    };

    return (
        <div className={`relative select-none inline-block ${className}`}>
            <motion.div
                className="relative cursor-pointer group focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/50 rounded-[2rem]"
                style={{ perspective: 1000 }}
                onClick={toggleFlip}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleFlip();
                    }
                }}
                role="button"
                tabIndex={0}
                aria-pressed={isFlipped}
                aria-label={
                    isFlipped
                        ? "Mostrando foto real de Pedro. Pulsa para cambiar al avatar 3D."
                        : "Mostrando avatar 3D de Pedro. Pulsa para cambiar a la foto real."
                }
                whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            >
                {/* 3D Card Inner */}
                <motion.div
                    className="w-40 h-56 md:w-48 md:h-72 rounded-[2rem] overflow-hidden border-4 border-primary shadow-2xl relative"
                    style={{ transformStyle: "preserve-3d" }}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={
                        shouldReduceMotion
                            ? { duration: 0 }
                            : { duration: 0.6, ease: [0.23, 1, 0.32, 1] }
                    }
                >
                    {/* Front: Avatar 3D (Voxel) */}
                    <div
                        className="absolute inset-0 w-full h-full bg-[#1b3459]"
                        style={{
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden",
                        }}
                    >
                        <Image
                            src="/avatar.webp"
                            alt={`${portfolioData.name} - Avatar 3D`}
                            width={192}
                            height={288}
                            priority={priority}
                            sizes="(max-width: 768px) 160px, 192px"
                            className="w-full h-full object-cover object-center"
                        />
                    </div>

                    {/* Back: Foto Real */}
                    <div
                        className="absolute inset-0 w-full h-full bg-card"
                        style={{
                            backfaceVisibility: "hidden",
                            WebkitBackfaceVisibility: "hidden",
                            transform: "rotateY(180deg)",
                        }}
                    >
                        <Image
                            src="/foto.webp"
                            alt={`${portfolioData.name} - Foto Real`}
                            width={192}
                            height={288}
                            priority={priority}
                            sizes="(max-width: 768px) 160px, 192px"
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                </motion.div>

                {/* Floating Interactive Badge */}
                <motion.div
                    initial={{ opacity: 0.9 }}
                    whileHover={{ scale: 1.05, opacity: 1 }}
                    className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-background/95 backdrop-blur-md border border-primary/50 rounded-full shadow-lg flex items-center gap-1.5 text-[11px] font-medium text-foreground whitespace-nowrap pointer-events-none group-hover:border-primary group-hover:shadow-primary/25 transition-all"
                >
                    <ArrowLeftRight className="w-3 h-3 text-primary animate-pulse" />
                    <span>{isFlipped ? "Ver Avatar 3D" : "Ver Foto Real"}</span>
                </motion.div>
            </motion.div>
        </div>
    );
}
