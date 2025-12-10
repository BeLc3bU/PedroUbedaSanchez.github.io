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
    delayClass?: string;
}

function InfoCard({ title, titleIcon, items, delayClass = '' }: InfoCardProps) {
    return (
        <div className={`bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm card-lift animate-in fade-in slide-in-from-bottom-4 duration-700 ${delayClass} hover:shadow-lg transition-shadow`}>
            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2">
                {titleIcon}
                {title}
            </h3>
            <ul className="space-y-4">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start">
                        <span className="text-orange-600 mr-4 mt-1">
                            {item.icon}
                        </span>
                        <p className="text-slate-600 dark:text-slate-300 font-medium">
                            {item.text}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function OtherData() {
    const availabilityItems: InfoItem[] = [
        { icon: <Plane size={20} />, text: 'Disponibilidad para viajar.' },
        { icon: <Clock size={20} />, text: 'Disponibilidad inmediata.' },
        { icon: <Car size={20} />, text: 'Carnet y vehículo propio.' },
    ];

    const languageItems: InfoItem[] = [
        { icon: <MessageCircle size={20} />, text: 'Español: Lengua materna.' },
        { icon: <Languages size={20} />, text: 'Inglés: Nivel A2.' },
    ];

    const hobbyItems: InfoItem[] = [
        { icon: <Activity size={20} />, text: 'Running.' },
        { icon: <Bike size={20} />, text: 'Ciclismo.' },
        { icon: <Waves size={20} />, text: 'Natación.' },
        { icon: <Gamepad2 size={20} />, text: 'Videojuegos.' },
        { icon: <Laptop size={20} />, text: 'Informática.' },
    ];

    return (
        <>
            <Helmet>
                <title>Otros Datos de Interés - Pedro Úbeda Sánchez</title>
                <meta name="description" content="Información adicional sobre Pedro Úbeda Sánchez: disponibilidad, idiomas y hobbies. Totalmente disponible para nuevos retos profesionales." />
                <link rel="canonical" href="https://pedroubedasanchez.es/otros-datos" />
            </Helmet>

            <section className="container mx-auto px-6 py-12 mb-24">
                <h1 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-orange-900 dark:text-orange-400 flex items-center justify-center gap-3">
                    <Heart size={40} className="text-orange-900 dark:text-orange-400" />
                    Otros Datos
                </h1>

                <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
                    <InfoCard
                        title="Disponibilidad"
                        titleIcon={<Calendar size={28} className="text-orange-600" />}
                        items={availabilityItems}
                        delayClass="delay-0"
                    />
                    <InfoCard
                        title="Idiomas"
                        titleIcon={<Globe size={28} className="text-orange-600" />}
                        items={languageItems}
                        delayClass="delay-100"
                    />
                    <InfoCard
                        title="Hobbies"
                        titleIcon={<Heart size={28} className="text-orange-600" />}
                        items={hobbyItems}
                        delayClass="delay-200"
                    />
                </div>
            </section>
        </>
    );
}
