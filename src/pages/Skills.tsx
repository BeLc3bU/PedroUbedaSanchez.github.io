import { Helmet } from 'react-helmet';
import {
    Lightbulb, Wrench, Brain,
    FileText, Globe, Bot, Monitor, Cloud, Database, ClipboardList, Cpu,
    Search, TrendingUp, Calendar, Clipboard, MessageCircle, RefreshCw, Target, FolderOpen
} from 'lucide-react';

interface SkillItem {
    icon: React.ReactNode;
    description: string;
}

interface SkillCategoryProps {
    title: string;
    icon: React.ReactNode;
    skills: SkillItem[];
}

const toolsSkills: SkillItem[] = [
    { icon: <FileText size={20} />, description: 'Microsoft 365 (Word, Excel, PowerPoint)' },
    { icon: <Globe size={20} />, description: 'HTML5, CSS y JavaScript para desarrollo web básico' },
    { icon: <Bot size={20} />, description: 'Uso de herramientas de IA para automatización y análisis' },
    { icon: <Monitor size={20} />, description: 'Administración de Active Directory y máquinas virtuales' },
    { icon: <Cloud size={20} />, description: 'Gestión de hosting, dominios y servidores' },
    { icon: <Database size={20} />, description: 'Manejo de bases de datos y sistemas de control de inventario' },
    { icon: <ClipboardList size={20} />, description: 'Sistemas de gestión documental y elaboración de informes técnicos' },
    { icon: <Cpu size={20} />, description: 'Interpretación de esquemas eléctricos y manuales técnicos' },
    { icon: <Wrench size={20} />, description: 'Instrumentación y equipos de diagnóstico especializado' },
];

const competencySkills: SkillItem[] = [
    { icon: <Search size={20} />, description: 'Análisis y diagnóstico de incidencias técnicas en entornos críticos' },
    { icon: <TrendingUp size={20} />, description: 'Gestión logística y administrativa avanzada' },
    { icon: <Calendar size={20} />, description: 'Planificación y ejecución de mantenimiento preventivo y correctivo' },
    { icon: <Clipboard size={20} />, description: 'Control de documentación técnica bajo normativas estrictas' },
    { icon: <MessageCircle size={20} />, description: 'Comunicación técnica efectiva y liderazgo de equipos' },
    { icon: <RefreshCw size={20} />, description: 'Adaptabilidad a entornos de alta presión y evolución constante' },
    { icon: <Brain size={20} />, description: 'Capacidad de autoaprendizaje y actualización técnica continua' },
    { icon: <Target size={20} />, description: 'Orientación a resultados de alta calidad y precisión táctica' },
    { icon: <FolderOpen size={20} />, description: 'Organización metódica y disciplina profesional militar' },
];

function SkillCategory({ title, icon, skills }: SkillCategoryProps) {
    return (
        <div className="card-tech animate-in fade-in duration-1000">
            <h3 className="text-2xl font-black mb-8 text-white flex items-center gap-3">
                <div className="p-2 bg-cyan-700/10 rounded-lg text-cyan-400">
                    {icon}
                </div>
                {title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all group">
                        <span className="text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                            {skill.icon}
                        </span>
                        <span className="text-sm text-slate-600 dark:text-slate-400 font-light group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                            {skill.description}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Skills() {
    return (
        <div className="bg-grid-pattern min-h-screen pt-24 md:pt-32 pb-24">
            <Helmet>
                <title>Habilidades | Pedro Úbeda Sánchez</title>
                <meta name="description" content="Habilidades técnicas en IT, Aviónica y competencias profesionales de Pedro Úbeda Sánchez." />
                <link rel="canonical" href="https://pedroubedasanchez.es/habilidades" />
            </Helmet>

            <section className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <h1 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white flex flex-wrap items-center justify-center gap-3">
                        <Lightbulb size={32} className="text-cyan-600 dark:text-cyan-400" />
                        Skills <span className="text-accent-gradient">& Competencias</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 font-light">
                        Un conjunto de habilidades forjadas en el rigor militar y la especialización tecnológica constante.
                    </p>
                </div>

                <div className="flex flex-col gap-8 max-w-6xl mx-auto">
                    <SkillCategory
                        title="Herramientas y Conocimientos Técnicos"
                        icon={<Wrench size={24} />}
                        skills={toolsSkills}
                    />
                    <SkillCategory
                        title="Competencias Profesionales"
                        icon={<Brain size={24} />}
                        skills={competencySkills}
                    />
                </div>
            </section>
        </div>
    );
}
