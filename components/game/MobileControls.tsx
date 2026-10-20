import { useEffect, useRef } from "react";
import "./MobileControls.css";

interface MobileControlsProps {
    onMove: (direction: { x: number; y: number }) => void;
    onInteract: () => void;
}

export const MobileControls = ({ onMove, onInteract }: MobileControlsProps) => {
    const joystickRef = useRef<HTMLDivElement>(null);
    const stickRef = useRef<HTMLDivElement>(null);
    const isTouchingRef = useRef(false);

    useEffect(() => {
        const joystick = joystickRef.current;
        const stick = stickRef.current;
        if (!joystick || !stick) return;

        const handleTouchStart = (e: TouchEvent) => {
            e.preventDefault();
            isTouchingRef.current = true;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!isTouchingRef.current) return;
            e.preventDefault();

            const touch = e.touches[0];
            const rect = joystick.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            let deltaX = touch.clientX - centerX;
            let deltaY = touch.clientY - centerY;

            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const maxDistance = rect.width / 2 - 20;

            if (distance > maxDistance) {
                deltaX = (deltaX / distance) * maxDistance;
                deltaY = (deltaY / distance) * maxDistance;
            }

            stick.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

            const normalizedX = deltaX / maxDistance;
            const normalizedY = deltaY / maxDistance;
            onMove({ x: normalizedX, y: normalizedY });
        };

        const handleTouchEnd = (e: TouchEvent) => {
            e.preventDefault();
            isTouchingRef.current = false;
            stick.style.transform = "translate(0, 0)";
            onMove({ x: 0, y: 0 });
        };

        joystick.addEventListener("touchstart", handleTouchStart);
        joystick.addEventListener("touchmove", handleTouchMove);
        joystick.addEventListener("touchend", handleTouchEnd);

        return () => {
            joystick.removeEventListener("touchstart", handleTouchStart);
            joystick.removeEventListener("touchmove", handleTouchMove);
            joystick.removeEventListener("touchend", handleTouchEnd);
        };
    }, [onMove]);

    const isMobile =
        typeof window !== "undefined" &&
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (!isMobile) return null;

    return (
        <div className="mobile-controls">
            <div className="joystick" ref={joystickRef}>
                <div className="joystick-stick" ref={stickRef} />
            </div>
            <button
                type="button"
                className="interact-button"
                onTouchStart={() => onInteract()}
                onClick={() => onInteract()}
            >
                A
            </button>
        </div>
    );
};

export default MobileControls;
