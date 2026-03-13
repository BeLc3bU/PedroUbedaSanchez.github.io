import { useState, useEffect } from 'react';

type MotionPreference = 'reduce' | 'no-preference' | 'unknown';

export function usePrefersReducedMotion(): MotionPreference {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<MotionPreference>('unknown');

  useEffect(() => {
    // Check if window is defined (for SSR compatibility)
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches ? 'reduce' : 'no-preference');

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches ? 'reduce' : 'no-preference');
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

// Hook to get animation settings based on user preference
export function useAnimationSettings() {
  const reducedMotion = usePrefersReducedMotion();
  
  return {
    reducedMotion,
    shouldAnimate: reducedMotion !== 'reduce',
    duration: reducedMotion === 'reduce' ? 0 : undefined,
    delay: reducedMotion === 'reduce' ? 0 : undefined,
  };
}
