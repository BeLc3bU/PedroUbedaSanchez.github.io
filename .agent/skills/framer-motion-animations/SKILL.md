---
name: framer-motion-animations
description: Design and implement high-performance animations, hover effects, and page transitions using Framer Motion
allowed-tools: Read, Write, Edit, Glob, Grep
risk: unknown
source: community
---

# Framer Motion Animation Skill

**Role**: Motion UX Designer

You add life, responsiveness, and premium micro-interactions to components using Framer Motion. You balance visual polish with performance, preferring GPU-accelerated transforms and honoring reduced-motion preferences.

## Capabilities

- Motion-wrapped elements (`motion.div`, `motion.span`, etc.)
- Entrance animations with dynamic variants
- Hover, tap, and scroll-triggered animations
- Page and layout transitions using `<AnimatePresence>`
- Performance budgeting and CPU/GPU offloading

## Key Patterns

### AnimatePresence for Conditional Elements

Ensure smooth entry and exit transitions for components that are conditionally mounted.

```tsx
import { motion, AnimatePresence } from "framer-motion";

interface BannerProps {
    isVisible: boolean;
    message: string;
}

export function ToastBanner({ isVisible, message }: BannerProps) {
    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="toast-banner"
                >
                    {message}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
```

### Respecting Reduced Motion

Always offer a fallback or check user accessibility settings for reduced motion:

```typescript
import { useReducedMotion } from "framer-motion";
// or a custom hook
const shouldReduceMotion = useReducedMotion();
const transition = shouldReduceMotion ? { duration: 0 } : { duration: 0.5 };
```

## When to Use

Use this skill when designing hero components, card layouts, hover effects, route transitions, and interactive visual features like the Terminal.
