import { Helmet } from 'react-helmet';
import type { ReactNode } from 'react';
import { Award, GraduationCap, Shield, ShieldCheck, Medal, Star } from 'lucide-react';

interface CardProps {
    icon: ReactNode;
    title: string;
    subtitle?: string;
}

function EducationCard({ icon, title, subtitle }: CardProps) {
    return (
        <li className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm flex items-start card-lift transition-transform hover:scale-[1.02] hover:shadow-md">
            <span className="text-orange-600 mr-4 mt-1">
                {icon}
            </span>
            <div>
                <p className="font-bold text-slate-800 dark:text-slate-100 mb-1">
                    {title}
                </p>
                {subtitle && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {subtitle}
                    </p>
                )}
            </div>
        </li>
    );
}

function SectionTitle({ children }: { children: ReactNode }) {
    return (
        <h3 className="text-xl md:text-2xl font-semibold mb-6 text-slate-700 dark:text-slate-200 border-b-2 border-orange-200 dark:border-slate-700 pb-2 inline-block">
            {children}
        </h3>
    );
}

export default function Education() {
    return (
        <>
            <Helmet>
                <title>Formación y Reconocimientos - Pedro Úbeda Sánchez</title>
                <meta name="description" content="Conoce la formación académica, cursos y reconocimientos de Pedro Úbeda Sánchez, incluyendo su título de Técnico Especialista en Informática y cursos de ciberseguridad." />
                <link rel="canonical" href="https://pedroubedasanchez.es/formacion" />
            </Helmet>

            <section className="container mx-auto px-6 py-12 mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <h1 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-orange-900 dark:text-orange-400 flex items-center justify-center gap-3">
                    <Award size={40} className="text-orange-900 dark:text-orange-400" />
                    Formación y Logros
                </h1>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
                    {/* Formación Académica */}
                    <div>
                        <SectionTitle>Formación Académica y Cursos</SectionTitle>
                        <ul className="space-y-4">
                            <EducationCard
                                icon={<GraduationCap size={24} />}
                                title="Técnico Especialista en Informática de Gestión"
                                subtitle="CIF CARLOS III, Cartagena (1998-2001)"
                            />
                            <EducationCard
                                icon={<Shield size={24} />}
                                title="Curso de Ciberseguridad"
                                subtitle="Instituto Nacional de Ciberseguridad (INCIBE), León (2018)"
                            />
                            <EducationCard
                                icon={<ShieldCheck size={24} />}
                                title="Curso NATO HPS CRYPTO"
                                subtitle="Ministerio de Defensa (2024)"
                            />
                        </ul>
                    </div>

                    {/* Reconocimientos */}
                    <div>
                        <SectionTitle>Reconocimientos</SectionTitle>
                        <ul className="space-y-4">
                            <EducationCard
                                icon={<Medal size={24} />}
                                title="Cruz del Mérito Aeronáutico con distintivo Blanco."
                            />
                            <EducationCard
                                icon={<Medal size={24} />}
                                title="Cruz a la constancia en el Servicio de bronce."
                            />
                            <EducationCard
                                icon={<Star size={24} />}
                                title="Reconocimiento DANA 2024."
                            />
                        </ul>
                    </div>
                </div>
            </section>
        </>
    );
}
