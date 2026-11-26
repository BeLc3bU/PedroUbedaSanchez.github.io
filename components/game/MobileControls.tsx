import { useEffect, useRef, useState } from "react";
import { detectTouchMobileDevice } from "@/lib/game/deviceDetection";
import "./MobileControls.css";

interface MobileControlsProps {
    onMove: (direction: { x: number; y: number }) => void;
    onInteract: () => void;
}

function findTouchById(list: TouchList | ArrayLike<Touch>, id: number): Touch | undefined {
    for (let i = 0; i < list.length; i++) {
        const touch = list[i];
        if (touch && touch.identifier === id) {
            return touch;
        }
    }
    return undefined;
}

export const MobileControls = ({ onMove, onInteract }: MobileControlsProps) => {
    const joystickRef = useRef<HTMLDivElement>(null);
    const stickRef = useRef<HTMLDivElement>(null);
    const activeTouchIdRef = useRef<number | null>(null);
    const suppressNextClickRef = useRef(false);
    const [isMobile] = useState(() => detectTouchMobileDevice());

    useEffect(() => {
        const joystick = joystickRef.current;
        const stick = stickRef.current;
        if (!joystick || !stick) return;

        const resetStick = () => {
            activeTouchIdRef.current = null;
            stick.style.transform = "translate(0, 0)";
            onMove({ x: 0, y: 0 });
        };

        const updateFromTouch = (touch: Touch) => {
            const rect = joystick.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            let deltaX = touch.clientX - centerX;
            let deltaY = touch.clientY - centerY;

            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const maxDistance = Math.max(1, rect.width / 2 - 20);

            if (distance > maxDistance) {
                deltaX = (deltaX / distance) * maxDistance;
                deltaY = (deltaY / distance) * maxDistance;
            }

            stick.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            onMove({ x: deltaX / maxDistance, y: deltaY / maxDistance });
        };

        const handleTouchStart = (e: TouchEvent) => {
            e.preventDefault();
            if (activeTouchIdRef.current !== null) return;
            const touch = e.changedTouches[0];
            if (!touch) return;
            activeTouchIdRef.current = touch.identifier;
            updateFromTouch(touch);
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (activeTouchIdRef.current === null) return;
            const touch = findTouchById(e.changedTouches, activeTouchIdRef.current);
            if (!touch) return;
            e.preventDefault();
            updateFromTouch(touch);
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (activeTouchIdRef.current === null) return;
            const ended = findTouchById(e.changedTouches, activeTouchIdRef.current);
            if (!ended) return;
            e.preventDefault();
            resetStick();
        };

        joystick.addEventListener("touchstart", handleTouchStart, { passive: false });
        joystick.addEventListener("touchmove", handleTouchMove, { passive: false });
        joystick.addEventListener("touchend", handleTouchEnd, { passive: false });
        joystick.addEventListener("touchcancel", handleTouchEnd, { passive: false });

        return () => {
            joystick.removeEventListener("touchstart", handleTouchStart);
            joystick.removeEventListener("touchmove", handleTouchMove);
            joystick.removeEventListener("touchend", handleTouchEnd);
            joystick.removeEventListener("touchcancel", handleTouchEnd);
        };
    }, [onMove, isMobile]);

    if (!isMobile) return null;

    return (
        <div className="mobile-controls">
            <div className="joystick" ref={joystickRef} aria-label="Joystick táctil">
                <div className="joystick-stick" ref={stickRef} />
            </div>
            <button
                type="button"
                className="interact-button"
                aria-label="Interactuar"
                onTouchStart={(e) => {
                    e.preventDefault();
                    suppressNextClickRef.current = true;
                    onInteract();
                }}
                onClick={() => {
                    if (suppressNextClickRef.current) {
                        suppressNextClickRef.current = false;
                        return;
                    }
                    onInteract();
                }}
            >
                A
            </button>
        </div>
    );
};

export default MobileControls;
