import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '../hooks/useTheme';
import { useNavigate, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Education', href: '#education' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

function smoothScrollTo(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  const target = document.querySelector(href);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  setIsMobileMenuOpen(false);
}

let setIsMobileMenuOpen: (open: boolean) => void = () => {};

export default function Header() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  const isCVPage = location.pathname === '/cv';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen = (open: boolean) => {
      const menu = document.getElementById('mobile-menu');
      if (menu) {
        menu.classList.toggle('hidden', !open);
      }
    };
  }, []);

  if (isCVPage) return null;

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-4 md:px-6 py-4",
      isScrolled
        ? "bg-background/80 backdrop-blur-xl border-b border-border"
        : "bg-transparent"
    )}>
      <nav className="max-w-6xl mx-auto flex justify-between items-center">
        <a 
          href="#hero"
          onClick={(e) => smoothScrollTo(e, '#hero')}
          className="text-lg font-semibold tracking-tight"
        >
          <span className="text-primary font-bold">Pedro</span> Úbeda
          <span className="block text-xs text-muted-foreground font-normal">Software Developer</span>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                onClick={(e) => smoothScrollTo(e, item.href)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              >
                {item.name}
              </a>
            </li>
          ))}

          <li className="ml-2">
            <button
              onClick={() => navigate('/cv')}
              className="px-4 py-2 rounded-lg text-sm font-medium text-primary hover:bg-primary/10 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
                <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
                <path d="M12 18v-6"></path>
                <path d="m9 15 3 3 3-3"></path>
              </svg>
              Resume
            </button>
          </li>

          <li>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground ml-2"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            </Button>
          </li>
        </ul>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground">
            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => {
              const menu = document.getElementById('mobile-menu');
              if (menu) menu.classList.toggle('hidden');
            }} 
            className="text-muted-foreground"
          >
            <Menu size={24} />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div id="mobile-menu" className="hidden fixed inset-0 bg-background/98 backdrop-blur-2xl z-[150] flex flex-col p-6">
        <div className="flex justify-between items-center mb-12">
          <a 
            href="#hero"
            onClick={(e) => smoothScrollTo(e, '#hero')}
            className="text-xl font-semibold"
          >
            <span className="text-primary font-bold">Pedro</span> Úbeda
          </a>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => {
              const menu = document.getElementById('mobile-menu');
              if (menu) menu.classList.add('hidden');
            }}
          >
            <X size={28} />
          </Button>
        </div>

        <nav className="flex-grow">
          <ul className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={(e) => smoothScrollTo(e, item.href)}
                  className="block px-4 py-3 rounded-xl text-lg text-muted-foreground hover:bg-secondary/50 transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
            <li>
              <button
                onClick={() => navigate('/cv')}
                className="block w-full text-left px-4 py-3 rounded-xl text-lg text-primary hover:bg-primary/10 transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"></path>
                  <path d="M14 2v5a1 1 0 0 0 1 1h5"></path>
                  <path d="M12 18v-6"></path>
                  <path d="m9 15 3 3 3-3"></path>
                </svg>
                Resume
              </button>
            </li>
          </ul>
        </nav>

        <div className="mt-auto pt-8 border-t border-border text-center text-muted-foreground text-sm">
          © 2026 Pedro Úbeda
        </div>
      </div>
    </header>
  );
}
