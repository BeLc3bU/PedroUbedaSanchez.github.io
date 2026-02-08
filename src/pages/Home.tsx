import { Helmet } from 'react-helmet';
import { Linkedin, Github, FileText, ArrowRight, Zap, Target, ShieldCheck } from 'lucide-react';

export default function Home() {
    const handlePrintCv = (e: React.MouseEvent) => {
        e.preventDefault();
        let iframe = document.getElementById('print-iframe-cv') as HTMLIFrameElement | null;
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.id = 'print-iframe-cv';
            iframe.src = '/curriculum.html';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            iframe.onload = () => {
                iframe?.contentWindow?.focus();
                iframe?.contentWindow?.print();
            };
        } else {
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
        }
    };

    return (
        <div className="bg-grid-pattern min-h-screen pt-20 md:pt-24 pb-12 overflow-hidden">
            <Helmet>
                <title>Pedro Úbeda | Especialista en IT y Aviónica Senior</title>
                <meta name="description" content="Evolucionando sistemas complejos con precisión militar y visión tecnológica. Más de 20 años de experiencia en informática y aviónica." />
                <link rel="canonical" href="https://pedroubedasanchez.es/" />
                <meta property="og:title" content="Pedro Úbeda | Especialista en IT y Aviónica Senior" />
                <meta property="og:description" content="Evolucionando sistemas complejos con precisión militar y visión tecnológica." />
                <meta property="og:url" content="https://pedroubedasanchez.es/" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
            </Helmet>

            <section className="container mx-auto px-6 py-12 flex flex-col items-center text-center relative z-10" id="about">
                {/* Visual Accent */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full -z-10"></div>

                <div className="flex flex-col items-center gap-8 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <picture>
                            <source media="(min-width: 768px)" srcSet="/foto-384.webp" type="image/webp" />
                            <source media="(max-width: 767px)" srcSet="/foto-320.webp" type="image/webp" />
                            <img
                                alt="Pedro Úbeda Sánchez"
                                className="relative w-40 h-52 md:w-56 md:h-72 rounded-full object-cover object-[center_15%] border-4 border-slate-900 shadow-2xl transition-transform hover:scale-105 duration-500"
                                src="/foto-384.jpg"
                                width="224"
                                height="288"
                                loading="eager"
                            />
                        </picture>
                    </div>

                    <div className="max-w-4xl">
                        <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight px-2">
                            <span className="text-slate-900 dark:text-white block opacity-90">SISTEMAS CRÍTICOS,</span>
                            <span className="text-accent-gradient">SOLUCIONES PRECISAS.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
                            Evolucionando infraestructuras complejas con <span className="text-slate-900 dark:text-white font-medium">disciplina militar</span> y visión tecnológica. Especialista en IT y aviónica con más de 20 años de trayectoria.
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-6 mb-24 animate-in fade-in zoom-in duration-1000 delay-300">
                    <a
                        href="/curriculum.html"
                        onClick={handlePrintCv}
                        className="group flex items-center gap-3 bg-white text-slate-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-cyan-400/20 active:scale-95"
                    >
                        <FileText size={20} />
                        Descargar CV
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </a>

                    <div className="flex items-center gap-3 px-2">
                        <a
                            href="https://www.linkedin.com/in/pubesan"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 rounded-full bg-white/5 border border-white/5 text-slate-400 hover:text-cyan-400 hover:bg-white/10 transition-all active:scale-90"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={24} />
                        </a>
                        <a
                            href="https://github.com/BeLc3bU"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 rounded-full bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-90"
                            aria-label="GitHub"
                        >
                            <Github size={24} />
                        </a>
                    </div>
                </div>

                {/* Key Features / Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
                    <div className="card-tech text-left">
                        <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-6 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                            <Zap size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Rápida Resolución</h3>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Capacidad crítica para diagnosticar y ejecutar soluciones en entornos de alta presión.</p>
                    </div>

                    <div className="card-tech text-left">
                        <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-indigo-500 group-hover:text-slate-950 transition-colors">
                            <Target size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Precisión Extrema</h3>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Experiencia en sistemas de aviónica donde el margen de error es inexistente.</p>
                    </div>

                    <div className="card-tech text-left">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-6 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Compromiso Total</h3>
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Valores militares aplicados al desarrollo de proyectos y entregas de alta calidad.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
