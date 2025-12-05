import type { ReactNode } from 'react';

interface TimelineItemProps {
    title: string;
    subtitle: string;
    icon: string | ReactNode;
    children: ReactNode;
}

export default function TimelineItem({ title, subtitle, icon, children }: TimelineItemProps) {
    return (
        <div className="relative timeline-item bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border-l-4 border-orange-600 transition-all hover:scale-[1.02] hover:shadow-xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span aria-hidden="true" className="text-2xl">{icon}</span>
                {title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 font-medium uppercase tracking-wide">
                {subtitle}
            </p>
            <div className="text-slate-600 dark:text-slate-300 space-y-1">
                {children}
            </div>
        </div>
    );
}
