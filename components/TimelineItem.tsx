import { CircleCheck } from "lucide-react";

interface TimelineItemProps {
    title: string;
    company: string;
    period: string;
    highlights: string[];
    technologies: string[];
}

export default function TimelineItem({
    title,
    company,
    period,
    highlights,
    technologies,
}: TimelineItemProps) {
    return (
        <div className="relative pl-8 border-l-2 border-primary/30 hover:border-primary transition-colors group">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary group-hover:scale-125 transition-transform"></div>
            <div className="pb-12">
                <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2">
                        {title} @ {company}
                    </h3>
                    <p className="text-lg font-medium mb-1 text-primary">{company}</p>
                    <p className="text-primary font-medium">{period}</p>
                </div>
                <ul className="space-y-3 mb-6">
                    {highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start">
                            <CircleCheck className="w-5 h-5 text-primary mt-0.5 mr-2 shrink-0" />
                            <span className="text-muted-foreground/90">{highlight}</span>
                        </li>
                    ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
