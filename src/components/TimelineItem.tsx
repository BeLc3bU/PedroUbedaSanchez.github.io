import type { ReactNode } from 'react';

interface TimelineItemProps {
    title: string;
    subtitle: string;
    icon: string | ReactNode;
    children: ReactNode;
}

export default function TimelineItem({ title, subtitle, icon, children }: TimelineItemProps) {
    return (
        <div className="relative pl-6 md:pl-8 pb-12 last:pb-0 group">
            <div className="timeline-line"></div>
            <div className="timeline-dot group-hover:scale-150 transition-transform duration-300"></div>

            <div className="card-tech">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                        <span className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-white/5 text-cyan-600 dark:text-cyan-400">
                            {icon}
                        </span>
                        <span>{title}</span>
                    </h3>
                    <span className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold tracking-widest uppercase">
                        {subtitle}
                    </span>
                </div>

                <div className="text-slate-600 dark:text-slate-400 leading-relaxed font-light pl-2 border-l border-black/5 dark:border-white/5">
                    {children}
                </div>
            </div>
        </div>
    );
}
