"use client";

import React, { useRef, useState } from "react";
import type { MobileInputState } from "@/lib/game/types";

interface MobileControlsProps {
    onInputUpdate: (input: MobileInputState) => void;
}

export const MobileControls: React.FC<MobileControlsProps> = ({ onInputUpdate }) => {
    const joystickBaseRef = useRef<HTMLDivElement>(null);
    const [stickPos, setStickPos] = useState({ x: 0, y: 0 });
    const [isInteracting, setIsInteracting] = useState(false);
    const activeTouchIdRef = useRef<number | null>(null);

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        const touch = e.changedTouches[0];
        activeTouchIdRef.current = touch.identifier;
        updateJoystick(touch.clientX, touch.clientY);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        for (let i = 0; i < e.changedTouches.length; i++) {
            const touch = e.changedTouches[i];
            if (touch.identifier === activeTouchIdRef.current) {
                updateJoystick(touch.clientX, touch.clientY);
                break;
            }
        }
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        for (let i = 0; i < e.changedTouches.length; i++) {
            if (e.changedTouches[i].identifier === activeTouchIdRef.current) {
                activeTouchIdRef.current = null;
                setStickPos({ x: 0, y: 0 });
                onInputUpdate({ x: 0, y: 0, interact: isInteracting });
                break;
            }
        }
    };

    const updateJoystick = (clientX: number, clientY: number) => {
        if (!joystickBaseRef.current) return;
        const rect = joystickBaseRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const maxRadius = rect.width / 2;
        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;
        const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        let normX = deltaX / maxRadius;
        let normY = deltaY / maxRadius;

        if (dist > maxRadius) {
            normX = deltaX / dist;
            normY = deltaY / dist;
        }

        setStickPos({ x: normX * 30, y: normY * 30 });
        onInputUpdate({ x: normX, y: normY, interact: isInteracting });
    };

    const triggerAction = () => {
        setIsInteracting(true);
        onInputUpdate({ x: stickPos.x / 30, y: stickPos.y / 30, interact: true });
        setTimeout(() => {
            setIsInteracting(false);
            onInputUpdate({
                x: stickPos.x / 30,
                y: stickPos.y / 30,
                interact: false,
            });
        }, 150);
    };

    return (
        <div className="absolute inset-x-0 bottom-4 px-6 flex justify-between items-end pointer-events-none z-50">
            {/* Joystick Base */}
            <div
                ref={joystickBaseRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
                className="w-24 h-24 rounded-full bg-slate-900/60 border-2 border-primary/40 backdrop-blur-sm relative flex items-center justify-center pointer-events-auto touch-none"
            >
                <div
                    className="w-10 h-10 rounded-full bg-primary/80 shadow-lg shadow-primary/30 transform transition-transform duration-75"
                    style={{
                        transform: `translate(${stickPos.x}px, ${stickPos.y}px)`,
                    }}
                />
            </div>

            {/* Action Button */}
            <button
                onTouchStart={triggerAction}
                onClick={triggerAction}
                className="w-16 h-16 rounded-full bg-cyan-500/80 hover:bg-cyan-500 active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/30 flex items-center justify-center pointer-events-auto border border-cyan-400 touch-none cursor-pointer"
            >
                ACT
            </button>
        </div>
    );
};
