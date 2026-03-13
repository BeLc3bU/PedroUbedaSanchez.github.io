import { Helmet } from 'react-helmet';
import { ExternalLink, Github, Code2, Cpu, Database, Layout, ShieldAlert, Settings } from 'lucide-react';

const projects = [
    {
        title: "Sistemas de Aviónica FAS",
        category: "Hardware & Sistemas",
        description: "Mantenimiento y diagnóstico preventivo/correctivo de sistemas electrónicos en flota de aeronaves militares y simuladores de vuelo.",
        icon: <Cpu size={24} />,
        tags: ["Electrónica", "Diagnóstico", "Sistemas Críticos"],
        details: "Especialización en manuales técnicos y esquemas eléctricos complejos."
    },
    {
        title: "Infraestructura IT & Redes",
        category: "Administración IT",
        description: "Implementación y administración de redes locales, Active Directory y servidores de gestión documental.",
        icon: <Settings size={24} />,
        tags: ["SysAdmin", "Networking", "Active Directory"],
        details: "Optimización de flujos de trabajo administrativos mediante digitalización."
    },
    {
        title: "Control de Inventario Técnico",
        category: "Software & Datos",
        description: "Desarrollo y mantenimiento de bases de datos para el seguimiento de componentes críticos de aviónica.",
        icon: <Database size={24} />,
        tags: ["BBDD", "Logística", "Excel Avanzado"],
        details: "Reducción de tiempos de búsqueda y mejora en la trazabilidad de repuestos."
    },
    {
        title: "Portfolio Profesional",
        category: "Desarrollo Web",
        description: "Diseño y desarrollo de este portfolio personal utilizando React, TypeScript y Tailwind CSS.",
        icon: <Layout size={24} />,
        tags: ["React", "TypeScript", "Tailwind"],
        details: "Enfoque en accesibilidad, rendimiento y diseño 'Dark Tech' premium."
    }
];

export default function Projects() {
    return (
        <div className="bg-grid-pattern min-h-screen pt-24 md:pt-32 pb-24">
            <Helmet>
                <title>Portfolio de Proyectos | Pedro Úbeda Sánchez</title>
                <meta name="description" content="Explora los proyectos técnicos de Pedro Úbeda: desde mantenimiento de aviónica hasta infraestructura de redes y desarrollo." />
                <link rel="canonical" href="https://pedroubedasanchez.es/proyectos" />
                <meta property="og:title" content="Portfolio de Proyectos | Pedro Úbeda Sánchez" />
                <meta property="og:description" content="Soluciones reales en aviónica, IT y sistemas complejos." />
            </Helmet>

            <section className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <h1 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white flex flex-wrap items-center justify-center gap-3">
                        <Code2 size={32} className="text-cyan-600 dark:text-cyan-400" />
                        Proyectos <span className="text-accent-gradient">& Logros</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 font-light">
                        Una selección de intervenciones técnicas y desarrollos enfocados en la eficiencia operativa.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {projects.map((project, index) => (
                        <div key={index} className="card-tech group">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-cyan-700/10 rounded-xl text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-500">
                                    {project.icon}
                                </div>
                                <div className="text-xs font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase">
                                    {project.category}
                                </div>
                            </div>

                            <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6 font-light leading-relaxed">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 text-xs font-medium">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="pt-6 border-t border-white/5 flex justify-between items-center text-sm font-medium">
                                <span className="text-slate-500 italic">
                                    {project.details}
                                </span>
                                <div className="flex gap-4">
                                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors" title="Ver código">
                                        <Github size={18} />
                                    </a>
                                    <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors" title="Ver en vivo">
                                        <ExternalLink size={18} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Technical Callout */}
                <div className="mt-24 max-w-4xl mx-auto p-8 rounded-3xl bg-cyan-50 dark:bg-gradient-to-br dark:from-cyan-500/10 dark:to-indigo-500/10 border border-cyan-200 dark:border-cyan-500/20 text-center animate-in zoom-in duration-1000">
                    <ShieldAlert size={48} className="mx-auto mb-6 text-cyan-600 dark:text-cyan-400" />
                    <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Seguridad y Confidencialidad</h2>
                    <p className="text-slate-600 dark:text-slate-400 font-light max-w-2xl mx-auto">
                        Debido a la naturaleza de mi trabajo en el ámbito militar, muchos proyectos están sujetos a acuerdos de confidencialidad. Sin embargo, mi experiencia demuestra una capacidad probada para manejar información sensible y sistemas de alta seguridad.
                    </p>
                </div>
            </section>
        </div>
    );
}
