import { Helmet } from 'react-helmet';
import TimelineItem from '../components/TimelineItem';
import { Briefcase, Plane, Calculator, FileText, Radio } from 'lucide-react';

export default function Experience() {
    return (
        <div className="bg-grid-pattern min-h-screen pt-24 md:pt-32 pb-24">
            <Helmet>
                <title>Experiencia Profesional | Pedro Úbeda Sánchez</title>
                <meta name="description" content="Trayectoria profesional de Pedro Úbeda Sánchez: 20 años en las Fuerzas Armadas y administración técnica." />
                <link rel="canonical" href="https://pedroubedasanchez.es/#experience" />
                
                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://pedroubedasanchez.es/#experience" />
                <meta property="og:title" content="Experiencia Profesional | Pedro Úbeda Sánchez" />
                <meta property="og:description" content="20 años de experiencia técnica de alto nivel en las Fuerzas Armadas." />
                <meta property="og:image" content="https://pedroubedasanchez.es/og-image.png" />
                
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Experiencia Profesional | Pedro Úbeda Sánchez" />
                <meta name="twitter:description" content="20 años de experiencia técnica de alto nivel en las Fuerzas Armadas." />
                <meta name="twitter:image" content="https://pedroubedasanchez.es/og-image.png" />
            </Helmet>

            <section className="container mx-auto px-4 md:px-6 animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="max-w-4xl mx-auto mb-12 md:mb-16">
                    <h1 className="text-3xl md:text-5xl font-black mb-4 text-foreground flex items-center gap-3 md:gap-4">
                        <div className="p-2 md:p-3 bg-primary/10 rounded-2xl text-primary">
                            <Briefcase size={28} className="w-7 h-7 md:w-8 md:h-8" />
                        </div>
                        <span className="flex flex-wrap gap-x-2">
                            <span>Experiencia</span> <span className="text-accent-gradient">Profesional</span>
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground font-light leading-relaxed">
                        Una trayectoria marcada por la precisión, el mantenimiento de sistemas de alta tecnología y la gestión operativa en entornos críticos.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-2">
                    <TimelineItem
                        title="Militar (Informático/Aviónico)"
                        subtitle="FAS | 2008 - 2025"
                        icon={<Plane size={20} />}
                    >
                        <ul className="list-disc list-outside ml-4 space-y-3">
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
                        <ul className="list-disc list-outside ml-4 space-y-3">
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
                        <ul className="list-disc list-outside ml-4 space-y-3">
                            <li>Gestión de pedidos, albaranes y facturación para operaciones comerciales.</li>
                            <li>Contabilidad auxiliar, control de stock riguroso y gestión de registro.</li>
                        </ul>
                    </TimelineItem>

                    <TimelineItem
                        title="Militar (Admin/Telecom)"
                        subtitle="FAS | 2002 - 2005"
                        icon={<Radio size={20} />}
                    >
                        <ul className="list-disc list-outside ml-4 space-y-3">
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
