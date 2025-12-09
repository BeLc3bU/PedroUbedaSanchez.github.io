import { Helmet } from 'react-helmet-async';
import {
    Lightbulb, Wrench, Brain,
    FileText, Globe, Bot, Monitor, Cloud, Database, ClipboardList, Cpu,
    Search, TrendingUp, Calendar, Clipboard, MessageCircle, RefreshCw, Target, FolderOpen
} from 'lucide-react';

// Interfaces for better type checking
interface SkillItem {
    icon: React.ReactNode;
    description: string;
}

interface SkillCategoryProps {
    title: string;
    icon: React.ReactNode;
    skills: SkillItem[];
    animationClass: string;
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
    { icon: <Wrench size={20} />, description: 'Instrumentación y equipos de diagnóstico para sistemas informáticos y aviónicos' },
];

const competencySkills: SkillItem[] = [
    { icon: <Search size={20} />, description: 'Análisis y diagnóstico de incidencias técnicas y administrativas' },
    { icon: <TrendingUp size={20} />, description: 'Gestión logística y administrativa (pagos, facturación, stock)' },
    { icon: <Calendar size={20} />, description: 'Planificación y ejecución de mantenimiento preventivo' },
    { icon: <Clipboard size={20} />, description: 'Elaboración y control de documentación en entornos críticos' },
    { icon: <MessageCircle size={20} />, description: 'Comunicación efectiva con técnicos, mandos y proveedores' },
    { icon: <RefreshCw size={20} />, description: 'Adaptabilidad a entornos tecnológicos y administrativos diversos' },
    { icon: <Brain size={20} />, description: 'Capacidad de aprendizaje continuo y actualización técnica' },
    { icon: <Target size={20} />, description: 'Orientación a resultados, calidad y cumplimiento de normas' },
    { icon: <FolderOpen size={20} />, description: 'Organización y disciplina en la gestión de tareas y recursos' },
];

function SkillCategory({ title, icon, skills, animationClass }: SkillCategoryProps) {
    return (
        <div className={`bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg card-lift animate-in fade-in duration-700 ${animationClass}`}>
            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2">
                {icon}
                {title}
            </h3>
            <ul className="space-y-4 text-slate-600 dark:text-slate-300">
                {skills.map((skill, index) => (
                    <li key={index} className="flex items-start group">
                        <span className="text-orange-600 mr-4 mt-1 transition-transform group-hover:scale-125 duration-300">
                            {skill.icon}
                        </span>
                        <p>{skill.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function Skills() {
    return (
        <>
            <Helmet>
                <title>Habilidades Técnicas y Personales - Pedro Úbeda Sánchez</title>
                <meta name="description" content="Descubre las habilidades interpersonales y técnicas de Pedro Úbeda Sánchez, incluyendo trabajo en equipo, proactividad, informática, hardware y ciberseguridad." />
                <link rel="canonical" href="https://pedroubedasanchez.es/habilidades" />
            </Helmet>

            <section className="container mx-auto px-6 py-12 mb-24">
                <h1 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-orange-900 dark:text-orange-400 flex items-center justify-center gap-3">
                    <Lightbulb size={40} className="text-orange-900 dark:text-orange-400" />
                    Habilidades
                </h1>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
                    <SkillCategory
                        title="Herramientas y conocimientos"
                        icon={<Wrench size={28} className="text-orange-600" />}
                        skills={toolsSkills}
                        animationClass="slide-in-from-left-8"
                    />
                    <SkillCategory
                        title="Competencias y habilidades"
                        icon={<Brain size={28} className="text-orange-600" />}
                        skills={competencySkills}
                        animationClass="slide-in-from-right-8"
                    />
                </div>
            </section>
        </>
    );
}
