import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useTheme } from '../hooks/useTheme';
import { Sun, Moon, Menu, X, User, Briefcase, Lightbulb, GraduationCap, BookOpen, MessageCircle, Code2 } from 'lucide-react';

export default function Header() {
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Sobre Mí', path: '/', icon: <User size={18} /> },
        { name: 'Experiencia', path: '/experiencia', icon: <Briefcase size={18} /> },
        { name: 'Habilidades', path: '/habilidades', icon: <Lightbulb size={18} /> },
        { name: 'Proyectos', path: '/proyectos', icon: <Code2 size={18} /> },
        { name: 'Formación', path: '/formacion', icon: <GraduationCap size={18} /> },
        { name: 'Otros Datos', path: '/otros-datos', icon: <BookOpen size={18} /> },
        { name: 'Contacto', path: '/contacto', icon: <MessageCircle size={18} /> },
    ];

    const closeMenu = () => setIsMobileMenuOpen(false);

    return (
        <header className={clsx(
            "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 md:px-8 py-4",
            isScrolled
                ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-black/5 dark:border-white/5 py-3 shadow-sm"
                : "bg-transparent py-5"
        )}>
            <nav className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex-shrink-0">
                    <Link to="/" className="text-xl font-bold tracking-tight text-white flex items-center gap-2 group" aria-label="Inicio">
                        <span className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center text-slate-950 font-black group-hover:rotate-12 transition-transform">PU</span>
                        <span className="hidden sm:inline text-slate-900 dark:text-white">Pedro <span className="text-cyan-600 dark:text-cyan-400">Úbeda</span> Sánchez</span>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center space-x-2">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={clsx(
                                    "nav-link",
                                    location.pathname === link.path && "nav-link-active"
                                )}
                                aria-current={location.pathname === link.path ? 'page' : undefined}
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </Link>
                        </li>
                    ))}

                    <div className="w-[1px] h-6 bg-white/10 mx-2"></div>

                    <li>
                        <button
                            onClick={toggleTheme}
                            type="button"
                            className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-white/5 transition-all"
                            aria-label="Cambiar tema"
                        >
                            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>
                    </li>
                </ul>

                {/* Mobile Controls */}
                <div className="md:hidden flex items-center gap-2">
                    <button
                        onClick={toggleTheme}
                        type="button"
                        className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-white/5 transition-all"
                        aria-label="Cambiar tema"
                    >
                        {theme === 'dark' ? <Moon size={22} /> : <Sun size={22} />}
                    </button>

                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        type="button"
                        className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-white/5 transition-all"
                        aria-label="Abrir menú"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-white/98 dark:bg-slate-950/98 backdrop-blur-2xl z-[150] flex flex-col p-6 animate-in fade-in duration-300">
                    <div className="flex justify-between items-center mb-12">
                        <div className="text-xl font-bold text-slate-900 dark:text-white">Menú</div>
                        <button
                            onClick={closeMenu}
                            type="button"
                            className="p-2 rounded-full bg-white/5 text-white hover:text-cyan-400 transition"
                        >
                            <X size={28} />
                        </button>
                    </div>

                    <nav className="flex-grow">
                        <ul className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        onClick={closeMenu}
                                        className={clsx(
                                            "flex items-center gap-4 p-4 rounded-xl text-xl transition-all",
                                            location.pathname === link.path
                                                ? "bg-cyan-500/10 text-cyan-400 font-bold"
                                                : "text-slate-400 hover:bg-white/5 active:scale-95"
                                        )}
                                    >
                                        <div className={clsx(
                                            "p-2 rounded-lg",
                                            location.pathname === link.path ? "bg-cyan-500/20" : "bg-white/5"
                                        )}>
                                            {link.icon}
                                        </div>
                                        <span>{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="mt-auto pt-8 border-t border-white/5 text-center text-slate-500 text-sm">
                        Pedro Úbeda Sánchez © 2026
                    </div>
                </div>
            )}
        </header>
    );
}
