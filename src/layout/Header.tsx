import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useTheme } from '../hooks/useTheme';
import { Sun, Moon, Menu, X, User, Briefcase, Lightbulb, GraduationCap, BookOpen, MessageCircle } from 'lucide-react';

export default function Header() {
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Sobre Mí', path: '/', icon: <User size={18} /> },
        { name: 'Experiencia', path: '/experiencia', icon: <Briefcase size={18} /> },
        { name: 'Habilidades', path: '/habilidades', icon: <Lightbulb size={18} /> },
        { name: 'Formación', path: '/formacion', icon: <GraduationCap size={18} /> },
        { name: 'Otros Datos', path: '/otros-datos', icon: <BookOpen size={18} /> },
        { name: 'Contacto', path: '/contacto', icon: <MessageCircle size={18} /> },
    ];

    const closeMenu = () => setIsMobileMenuOpen(false);

    return (
        <>
            <nav className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
                <div className="flex-shrink-0 text-xl font-bold text-orange-800 dark:text-orange-500">
                    <Link to="/" aria-label="Página de inicio de Pedro Úbeda Sánchez">Pedro Úbeda Sánchez</Link>
                </div>

                {/* Menú de Escritorio */}
                <ul className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={clsx(
                                    "nav-link flex items-center gap-2",
                                    location.pathname === link.path && "font-bold text-orange-700"
                                )}
                                aria-current={location.pathname === link.path ? 'page' : undefined}
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </Link>
                        </li>
                    ))}

                    {/* Interruptor de Modo Oscuro */}
                    <li className="ml-4">
                        <button
                            onClick={toggleTheme}
                            type="button"
                            className="p-2 rounded-full text-slate-500 hover:text-orange-700 hover:bg-stone-200 dark:hover:bg-slate-700 transition-colors"
                            aria-label="Cambiar tema"
                        >
                            {theme === 'dark' ? <Moon size={24} /> : <Sun size={24} />}
                        </button>
                    </li>
                </ul>

                {/* Botón del Menú Móvil */}
                <div className="md:hidden flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        type="button"
                        className="p-2 rounded-full text-slate-500 hover:text-orange-700 hover:bg-stone-200 dark:hover:bg-slate-700 transition-colors"
                        aria-label="Cambiar tema"
                    >
                        {theme === 'dark' ? <Moon size={24} /> : <Sun size={24} />}
                    </button>

                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        type="button"
                        className="flex items-center space-x-2 text-slate-600 hover:text-orange-700 p-2 rounded-lg hover:bg-stone-200 transition"
                        aria-label="Abrir menú"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span>Menú</span>
                        <Menu size={24} />
                    </button>
                </div>
            </nav>

            {/* Overlay del Menú Móvil */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-stone-100/95 dark:bg-slate-900/95 backdrop-blur-md z-[100] flex flex-col animate-in fade-in duration-200">
                    <div className="flex justify-end p-4">
                        <button
                            onClick={closeMenu}
                            type="button"
                            className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-slate-800 transition"
                            aria-label="Cerrar menú"
                        >
                            <X size={32} className="text-slate-800 dark:text-slate-200" />
                        </button>
                    </div>
                    <div className="flex-grow flex items-start justify-center overflow-y-auto pt-12">
                        <ul className="flex flex-col items-center space-y-8 text-2xl p-4">
                            {navLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        onClick={closeMenu}
                                        className={clsx(
                                            "nav-link-mobile flex items-center gap-3",
                                            location.pathname === link.path && "font-bold text-orange-700"
                                        )}
                                    >
                                        {link.icon}
                                        <span>{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
}
