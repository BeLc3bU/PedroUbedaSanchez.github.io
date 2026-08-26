"use client";

import { useEffect } from "react";
import HangarGame from "./HangarGame";

interface HangarModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function HangarModal({ isOpen, onClose }: HangarModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-4xl bg-card border border-border rounded-3xl p-4 md:p-6 shadow-2xl overflow-y-auto max-h-[95vh]">
                <HangarGame onClose={onClose} />
            </div>
        </div>
    );
}
