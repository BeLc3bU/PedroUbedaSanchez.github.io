import { Github, Linkedin, Mail, FileText, MessageCircle } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { useNavigate } from 'react-router-dom';

export function SocialLinks() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center gap-4">
      <a
        href={portfolioData.social.github}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2.5 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-all"
        aria-label="GitHub"
      >
        <Github size={20} />
      </a>
      <a
        href={portfolioData.social.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2.5 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-all"
        aria-label="LinkedIn"
      >
        <Linkedin size={20} />
      </a>
      <a
        href={`mailto:${portfolioData.social.email}`}
        className="p-2.5 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-all"
        aria-label="Email"
      >
        <Mail size={20} />
      </a>
      <a
        href={portfolioData.social.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2.5 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-all"
        aria-label="WhatsApp"
      >
        <MessageCircle size={20} />
      </a>
      <button
        onClick={() => navigate('/cv')}
        className="p-2.5 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground text-muted-foreground transition-all"
        aria-label="Download CV"
      >
        <FileText size={20} />
      </button>
    </div>
  );
}
