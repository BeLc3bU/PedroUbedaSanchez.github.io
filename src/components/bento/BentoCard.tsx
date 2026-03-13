import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  colSpan?: string;
}

export function BentoCard({ children, className = '', delay = 0, colSpan = '' }: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={`
        bg-card border border-border rounded-4xl p-6 
        hover:border-primary/30 transition-all duration-300
        hover:shadow-lg hover:shadow-primary/5
        ${colSpan}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className = '' }: BentoGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {children}
    </div>
  );
}
