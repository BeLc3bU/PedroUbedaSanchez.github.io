import { Helmet } from 'react-helmet';
import {
    Calendar, Globe, Heart,
    Plane, Clock, Car,
    MessageCircle, Languages,
    Activity, Bike, Waves, Gamepad2, Laptop
} from 'lucide-react';

interface InfoItem {
    icon: React.ReactNode;
    text: string;
}

interface InfoCardProps {
    title: string;
    titleIcon: React.ReactNode;
    items: InfoItem[];
}

function InfoCard({ title, titleIcon, items }: InfoCardProps) {
    return (
        <div className="card-tech animate-in fade-in duration-1000">
            <h3 className="text-2xl font-black mb-8 text-slate-900 dark:text-white flex items-center justify-center gap-3">
                <div className="p-2 bg-cyan-700/10 rounded-xl text-cyan-400">
                    {titleIcon}
                </div>
                {title}
            </h3>
            <ul className="space-y-4">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center gap-4 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all group">
                        <span className="text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                            {item.icon}
                        </span>
                        <span className="text-slate-600 dark:text-slate-400 font-light group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                            {item.text}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function OtherData() {
    const availabilityItems: InfoItem[] = [
        { icon: <Plane size={20} />, text: 'Disponibilidad para movilidad internacional' },
        { icon: <Clock size={20} />, text: 'Incorporación inmediata con alta adaptabilidad' },
        { icon: <Car size={20} />, text: 'Carnet y vehículo propio (Movilidad total)' },
    ];

    const languageItems: InfoItem[] = [
        { icon: <MessageCircle size={20} />, text: 'Español: Lengua Nativa / Nivel Experto' },
        { icon: <Languages size={20} />, text: 'Inglés: Nivel A2 (Capacidad técnica básica)' },
    ];

    const hobbyItems: InfoItem[] = [
        { icon: <Activity size={20} />, text: 'Running & Resistencia Física' },
        { icon: <Bike size={20} />, text: 'Ciclismo de larga distancia' },
        { icon: <Waves size={20} />, text: 'Natación competitiva' },
        { icon: <Gamepad2 size={20} />, text: 'Gaming & Estrategia' },
        { icon: <Laptop size={20} />, text: 'Computación & Hardware' },
    ];

    return (
        <div className="bg-grid-pattern min-h-screen pt-24 md:pt-32 pb-24">
            <Helmet>
                <title>Otros Datos | Pedro Úbeda Sánchez</title>
                <meta name="description" content="Información adicional: disponibilidad, idiomas y perfil personal de Pedro Úbeda Sánchez." />
                <link rel="canonical" href="https://pedroubedasanchez.es/otros-datos" />
            </Helmet>

            <section className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <h1 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white flex flex-wrap items-center justify-center gap-3">
                        <Heart size={32} className="text-cyan-600 dark:text-cyan-400" />
                        Otros Datos <span className="text-accent-gradient">& Intereses</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 font-light">
                        Factores complementarios que definen mi perfil profesional y disciplina personal fuera del entorno técnico.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    <InfoCard
                        title="Disponibilidad"
                        titleIcon={<Calendar size={28} />}
                        items={availabilityItems}
                    />
                    <InfoCard
                        title="Idiomas"
                        titleIcon={<Globe size={28} />}
                        items={languageItems}
                    />
                    <InfoCard
                        title="Hábitos"
                        titleIcon={<Heart size={28} />}
                        items={hobbyItems}
                    />
                </div>
            </section>
        </div>
    );
}
