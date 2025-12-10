import { Helmet } from 'react-helmet';
import TimelineItem from '../components/TimelineItem';
import { Briefcase, Plane, Calculator, FileText, Radio } from 'lucide-react';

export default function Experience() {
    return (
        <>
            <Helmet>
                <title>Experiencia Profesional - Pedro Úbeda Sánchez</title>
                <meta name="description" content="Explora la experiencia profesional de Pedro Úbeda Sánchez, con más de 20 años en las Fuerzas Armadas como técnico informático, administrativo y de aviónica." />
                <link rel="canonical" href="https://pedroubedasanchez.es/experiencia" />
            </Helmet>

            <section className="container mx-auto px-6 py-12 mb-24 animate-in fade-in slide-in-from-right-8 duration-700">
                <h1 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-orange-900 dark:text-orange-400 flex items-center justify-center gap-3">
                    <Briefcase size={40} className="text-orange-900 dark:text-orange-400" />
                    Experiencia Profesional
                </h1>

                <div className="relative max-w-4xl mx-auto space-y-8">

                    <TimelineItem
                        title="Militar (Informático/Aviónico)"
                        subtitle="FAS | 2008 - 2025"
                        icon={<Plane size={24} className="text-orange-600" />}
                    >
                        <ul className="list-disc list-inside space-y-2">
                            <li>Mantenimiento, diagnóstico y solución de averías de simuladores de vuelo y flota de aviones a nivel informático y electrónico.</li>
                            <li>Gestión administrativa y logística.</li>
                            <li>Elaboración de informes, registro y control.</li>
                            <li>Servicio de control de accesos y vigilancia.</li>
                        </ul>
                    </TimelineItem>

                    <TimelineItem
                        title="Administrativo Contable"
                        subtitle="ICONO TELECOM | 2007 - 2008"
                        icon={<Calculator size={24} className="text-orange-600" />}
                    >
                        <ul className="list-disc list-inside space-y-2">
                            <li>Gestión de pagos a proveedores y clientes.</li>
                            <li>Contabilización de asientos, control bancario y facturación.</li>
                            <li>Elaboración de informes y gestión de gastos.</li>
                            <li>Atención telefónica y correo.</li>
                        </ul>
                    </TimelineItem>

                    <TimelineItem
                        title="Auxiliar Administrativo"
                        subtitle="TRUCCSA | 2006 - 2007"
                        icon={<FileText size={24} className="text-orange-600" />}
                    >
                        <ul className="list-disc list-inside space-y-2">
                            <li>Gestión de pedidos, albaranes y facturación.</li>
                            <li>Contabilidad, control de stock, archivo y registro.</li>
                            <li>Gestión de pagarés y atención telefónica.</li>
                        </ul>
                    </TimelineItem>

                    <TimelineItem
                        title="Militar (Admin/Telecom)"
                        subtitle="FAS | 2002 - 2005"
                        icon={<Radio size={24} className="text-orange-600" />}
                    >
                        <ul className="list-disc list-inside space-y-2">
                            <li>Archivo, correspondencia y registro.</li>
                            <li>Mantenimiento de BBDD e inventario.</li>
                            <li>Instalación y mantenimiento de telecomunicaciones.</li>
                            <li>Servicio de control de acceso, patrulla, CCTV y verificación de alarmas.</li>
                        </ul>
                    </TimelineItem>

                </div>
            </section>
        </>
    );
}
