"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimateOnScrollProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "left" | "none";
}

export default function AnimateOnScroll({
    children,
    className = "",
    delay = 0,
    direction = "up",
}: AnimateOnScrollProps) {
    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 20 : 0,
            x: direction === "left" ? -20 : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration: 0.6,
                delay,
                ease: "easeOut" as const,
            },
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
}
