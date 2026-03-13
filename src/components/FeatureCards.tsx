import { Zap, Target, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function FeatureCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
            <Card className="bg-card/40 dark:bg-card/40 backdrop-blur-md border-border hover:border-primary/50 transition-all group text-left p-4 shadow-lg md:shadow-none">
                <CardHeader>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                        <Zap className="h-6 w-6 md:h-7 md:w-7" />
                    </div>
                    <CardTitle className="text-xl md:text-2xl font-bold">Rápida Resolución</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed">Capacidad crítica para diagnosticar y ejecutar soluciones en entornos de alta presión.</p>
                </CardContent>
            </Card>

            <Card className="bg-card/40 dark:bg-card/40 backdrop-blur-md border-border hover:border-primary/50 transition-all group text-left p-4 shadow-lg md:shadow-none">
                <CardHeader>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500 dark:text-indigo-400 mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                        <Target className="h-6 w-6 md:h-7 md:w-7" />
                    </div>
                    <CardTitle className="text-xl md:text-2xl font-bold">Precisión Extrema</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed">Experiencia en sistemas de aviónica donde el margen de error es inexistente.</p>
                </CardContent>
            </Card>

            <Card className="bg-card/40 dark:bg-card/40 backdrop-blur-md border-border hover:border-primary/50 transition-all group text-left p-4 shadow-lg md:shadow-none">
                <CardHeader>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                        <ShieldCheck className="h-6 w-6 md:h-7 md:w-7" />
                    </div>
                    <CardTitle className="text-xl md:text-2xl font-bold">Compromiso Total</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed">Valores militares aplicados al desarrollo de proyectos y entregas de alta calidad.</p>
                </CardContent>
            </Card>
        </div>
    );
}
