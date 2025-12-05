import { Helmet } from 'react-helmet-async';


interface InfoItem {
    icon: string;
    text: string;
}

interface InfoCardProps {
    title: string;
    titleIcon: string;
    items: InfoItem[];
    delayClass?: string;
}

function InfoCard({ title, titleIcon, items, delayClass = '' }: InfoCardProps) {
    return (
        <div className={`bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm card-lift animate-in fade-in slide-in-from-bottom-4 duration-700 ${delayClass} hover:shadow-lg transition-shadow`}>
            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center text-slate-700 dark:text-slate-200">
                <span className="mr-2" aria-hidden="true">{titleIcon}</span>
                {title}
            </h3>
            <ul className="space-y-4">
                {items.map((item, index) => (
                    <li key={index} className="flex items-start">
                        <span className="text-orange-600 mr-4 mt-1 text-xl" aria-hidden="true">
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
    const availabilityItems = [
        { icon: '🌍', text: 'Disponibilidad para viajar.' },
        { icon: '⏰', text: 'Disponibilidad inmediata.' },
        { icon: '🚗', text: 'Carnet y vehículo propio.' },
    ];

    const languageItems = [
        { icon: '🇪🇸', text: 'Español: Lengua materna.' },
        { icon: '🇬🇧', text: 'Inglés: Nivel A2.' },
    ];

    const hobbyItems = [
        { icon: '🏃', text: 'Running.' },
        { icon: '🚴', text: 'Ciclismo.' },
        { icon: '🏊', text: 'Natación.' },
        { icon: '🎮', text: 'Videojuegos.' },
        { icon: '💻', text: 'Informática.' },
    ];

    return (
        <>
            <Helmet>
                <title>Otros Datos de Interés - Pedro Úbeda Sánchez</title>
                <meta name="description" content="Información adicional sobre Pedro Úbeda Sánchez: disponibilidad, idiomas y hobbies. Totalmente disponible para nuevos retos profesionales." />
                <link rel="canonical" href="https://pedroubedasanchez.es/otros-datos" />
            </Helmet>

            <section className="container mx-auto px-6 py-12 mb-24">
                <h1 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-orange-900 dark:text-orange-400">
                    <span aria-hidden="true" className="mr-3">📚</span>
                    Otros Datos
                </h1>

                <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
                    <InfoCard
                        title="Disponibilidad"
                        titleIcon="🗓️"
                        items={availabilityItems}
                        delayClass="delay-0"
                    />
                    <InfoCard
                        title="Idiomas"
                        titleIcon="🌐"
                        items={languageItems}
                        delayClass="delay-100"
                    />
                    <InfoCard
                        title="Hobbies"
                        titleIcon="🧘"
                        items={hobbyItems}
                        delayClass="delay-200"
                    />
                </div>
            </section>
        </>
    );
}
