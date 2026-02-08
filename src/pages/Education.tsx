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
        <li className="card-tech flex items-start gap-4 hover:border-cyan-500/50 transition-all">
            <div className="p-3 bg-cyan-700/10 rounded-xl text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                {icon}
            </div>
            <div>
                <p className="font-bold text-slate-900 dark:text-white mb-1">
                    {title}
                </p>
                {subtitle && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-light italic">
                        {subtitle}
                    </p>
                )}
            </div>
        </li>
    );
}

export default function Education() {
    return (
        <div className="bg-grid-pattern min-h-screen pt-32 pb-24">
            <Helmet>
                <title>Formación y Logros | Pedro Úbeda Sánchez</title>
                <meta name="description" content="Formación académica y reconocimientos militares de Pedro Úbeda Sánchez." />
                <link rel="canonical" href="https://pedroubedasanchez.es/formacion" />
            </Helmet>

            <section className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white flex items-center justify-center gap-4">
                        <Award size={40} className="text-cyan-600 dark:text-cyan-400" />
                        Formación <span className="text-accent-gradient">& Logros</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 font-light">
                        Una base académica sólida complementada con formación técnica de alto nivel y reconocimientos al servicio.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <div>
                        <h2 className="text-2xl font-black mb-8 text-slate-900 dark:text-white border-b border-black/5 dark:border-white/5 pb-4">
                            Certificaciones Académicas
                        </h2>
                        <ul className="space-y-6">
                            <EducationCard
                                icon={<GraduationCap size={24} />}
                                title="Técnico Especialista en Informática de Gestión"
                                subtitle="CIF CARLOS III, Cartagena (1998-2001)"
                            />
                            <EducationCard
                                icon={<Shield size={24} />}
                                title="Curso de Ciberseguridad"
                                subtitle="INCIBE, León (2018)"
                            />
                            <EducationCard
                                icon={<ShieldCheck size={24} />}
                                title="Curso NATO HPS CRYPTO"
                                subtitle="Ministerio de Defensa (2024)"
                            />
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-black mb-8 text-slate-900 dark:text-white border-b border-black/5 dark:border-white/5 pb-4">
                            Honores y Condecoraciones
                        </h2>
                        <ul className="space-y-6">
                            <EducationCard
                                icon={<Medal size={24} />}
                                title="Cruz del Mérito Aeronáutico"
                                subtitle="Distintivo Blanco"
                            />
                            <EducationCard
                                icon={<Medal size={24} />}
                                title="Cruz a la Constancia en el Servicio"
                                subtitle="Categoría Bronce"
                            />
                            <EducationCard
                                icon={<Star size={24} />}
                                title="Reconocimiento Especial DANA 2024"
                                subtitle="Operaciones de emergencia y apoyo"
                            />
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}
