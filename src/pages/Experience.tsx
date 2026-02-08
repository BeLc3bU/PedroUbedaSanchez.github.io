import { Helmet } from 'react-helmet';
import TimelineItem from '../components/TimelineItem';
import { Briefcase, Plane, Calculator, FileText, Radio } from 'lucide-react';

export default function Experience() {
    return (
        <div className="bg-grid-pattern min-h-screen pt-24 md:pt-32 pb-24">
            <Helmet>
                <title>Experiencia Profesional | Pedro Úbeda Sánchez</title>
                <meta name="description" content="Trayectoria profesional de Pedro Úbeda Sánchez: 20 años en las Fuerzas Armadas y administración técnica." />
                <link rel="canonical" href="https://pedroubedasanchez.es/experiencia" />
            </Helmet>

            <section className="container mx-auto px-6 animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="max-w-4xl mx-auto mb-16">
                    <h1 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white flex items-center gap-4">
                        <div className="p-2 md:p-3 bg-cyan-700/20 rounded-2xl text-cyan-400">
                            <Briefcase size={28} className="md:w-8 md:h-8" />
                        </div>
                        Experiencia <span className="text-accent-gradient">Profesional</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 font-light">
                        Una trayectoria marcada por la precisión, el mantenimiento de sistemas de alta tecnología y la gestión operativa en entornos críticos.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <TimelineItem
                        title="Militar (Informático/Aviónico)"
                        subtitle="FAS | 2008 - 2025"
                        icon={<Plane size={20} />}
                    >
                        <ul className="list-disc list-inside space-y-3">
                            <li>Mantenimiento, diagnóstico y solución de averías de simuladores de vuelo y flota de aviones a nivel informático y electrónico.</li>
                            <li>Gestión administrativa y logística de componentes de aviónica.</li>
                            <li>Elaboración de informes técnicos de precisión y control de calidad.</li>
                            <li>Servicio de control de accesos y vigilancia operativa.</li>
                        </ul>
                    </TimelineItem>

                    <TimelineItem
                        title="Administrativo Contable"
                        subtitle="ICONO TELECOM | 2007 - 2008"
                        icon={<Calculator size={20} />}
                    >
                        <ul className="list-disc list-inside space-y-3">
                            <li>Gestión integral de pagos a proveedores y conciliación de clientes.</li>
                            <li>Contabilización de asientos, control bancario y facturación avanzada.</li>
                            <li>Elaboración de informes ejecutivos y gestión optimizada de gastos.</li>
                        </ul>
                    </TimelineItem>

                    <TimelineItem
                        title="Auxiliar Administrativo"
                        subtitle="TRUCCSA | 2006 - 2007"
                        icon={<FileText size={20} />}
                    >
                        <ul className="list-disc list-inside space-y-3">
                            <li>Gestión de pedidos, albaranes y facturación para operaciones comerciales.</li>
                            <li>Contabilidad auxiliar, control de stock riguroso y gestión de registro.</li>
                        </ul>
                    </TimelineItem>

                    <TimelineItem
                        title="Militar (Admin/Telecom)"
                        subtitle="FAS | 2002 - 2005"
                        icon={<Radio size={20} />}
                    >
                        <ul className="list-disc list-inside space-y-3">
                            <li>Gestión de archivo, correspondencia oficial y registro de seguridad.</li>
                            <li>Mantenimiento de bases de datos críticas e inventario de material.</li>
                            <li>Instalación y mantenimiento preventivo de sistemas de telecomunicaciones.</li>
                        </ul>
                    </TimelineItem>
                </div>
            </section>
        </div>
    );
}
