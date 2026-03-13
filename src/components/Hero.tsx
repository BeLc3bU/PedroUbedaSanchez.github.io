import { FileText, ArrowRight, Linkedin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
    onPrint: (e: React.MouseEvent) => void;
}

export function Hero({ onPrint }: HeroProps) {
    return (
        <section className="container mx-auto px-6 py-12 flex flex-col items-center text-center relative z-10" id="about">
            <div className="flex flex-col items-center gap-8 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-indigo-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <picture>
                        <source media="(min-width: 768px)" srcSet="/foto-384.webp" type="image/webp" />
                        <source media="(max-width: 767px)" srcSet="/foto-320.webp" type="image/webp" />
                        <img
                            alt="Pedro Úbeda Sánchez"
                            className="relative w-40 h-52 md:w-56 md:h-72 rounded-full object-cover object-[center_15%] border-4 border-slate-900 dark:border-slate-800 shadow-2xl transition-transform hover:scale-105 duration-500"
                            src="/foto-384.jpg"
                            width="224"
                            height="288"
                            loading="eager"
                        />
                    </picture>
                </div>

                <div className="max-w-4xl px-4">
                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tight leading-tight">
                        <span className="text-foreground block mb-2">SISTEMAS CRÍTICOS,</span>
                        <span className="text-accent-gradient">MISIÓN CUMPLIDA.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-foreground font-medium dark:text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Evolucionando infraestructuras de alta complejidad donde la <span className="text-primary font-bold">precisión</span> es la única opción. Más de 20 años integrando tecnología avanzada con rigor y eficacia.
                    </p>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-32 animate-in fade-in zoom-in duration-1000 delay-300">
                <Button
                    size="lg"
                    onClick={onPrint}
                    className="rounded-full bg-foreground text-background hover:bg-primary transition-all shadow-xl px-8 md:px-10 py-6 md:py-7 text-lg md:text-xl font-bold"
                >
                    <FileText className="mr-2 h-5 w-5 md:h-6 md:w-6" />
                    Trayectoria Completa
                    <ArrowRight className="ml-2 h-5 w-5 md:h-6 md:w-6 group-hover:translate-x-1 transition-transform" />
                </Button>

                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" className="rounded-full w-12 h-12 md:w-14 md:h-14 bg-white/5 border-border hover:bg-primary/10 hover:border-primary/50" asChild>
                        <a href="https://www.linkedin.com/in/pubesan" target="_blank" rel="noopener noreferrer">
                            <Linkedin className="h-5 w-5 md:h-6 md:w-6" />
                        </a>
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full w-12 h-12 md:w-14 md:h-14 bg-white/5 border-border hover:bg-primary/10 hover:border-primary/50" asChild>
                        <a href="https://github.com/BeLc3bU" target="_blank" rel="noopener noreferrer">
                            <Github className="h-5 w-5 md:h-6 md:w-6" />
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    );
}
