import { motion } from 'framer-motion';
import { Cpu, Settings, Database, Layout, ExternalLink, Github } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  icon: string;
  link?: string;
  github?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu size={24} />,
  Settings: <Settings size={24} />,
  Database: <Database size={24} />,
  Layout: <Layout size={24} />,
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-card border border-border rounded-3xl p-5 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
          {iconMap[project.icon] || <Cpu size={24} />}
        </div>
        <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
          {project.category}
        </span>
      </div>

      <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
        {project.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.tags.slice(0, 3).map((tag, i) => (
          <span 
            key={i} 
            className="px-2.5 py-1 rounded-full bg-secondary text-xs text-secondary-foreground"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-3 mt-4 pt-4 border-t border-border">
        {project.link && (
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <ExternalLink size={18} />
          </a>
        )}
        {project.github && (
          <a 
            href={project.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github size={18} />
          </a>
        )}
      </div>
    </motion.div>
  );
}
