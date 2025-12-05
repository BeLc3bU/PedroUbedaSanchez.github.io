import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import clsx from 'clsx';

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label="Volver arriba"
            className={clsx(
                "fixed bottom-6 right-6 z-[100] bg-orange-700 text-white p-3 rounded-full shadow-lg hover:bg-orange-800 dark:bg-orange-600 dark:hover:bg-orange-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500",
                isVisible ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
            )}
            title="Volver arriba"
        >
            <ChevronUp className="w-6 h-6" />
        </button>
    );
}
