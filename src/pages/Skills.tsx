import { Helmet } from 'react-helmet-async';


// Interfaces for better type checking
interface SkillItem {
    icon: string;
    description: string;
}

interface SkillCategoryProps {
    title: string;
    icon: string;
    skills: SkillItem[];
    animationClass: string;
}

const toolsSkills: SkillItem[] = [
    { icon: '📄', description: 'Microsoft 365 (Word, Excel, PowerPoint)' },
    { icon: '🌐', description: 'HTML5, CSS y JavaScript para desarrollo web básico' },
    { icon: '🤖', description: 'Uso de herramientas de IA para automatización y análisis' },
    { icon: '🖥️', description: 'Administración de Active Directory y máquinas virtuales' },
    { icon: '☁️', description: 'Gestión de hosting, dominios y servidores' },
    { icon: '🗃️', description: 'Manejo de bases de datos y sistemas de control de inventario' },
    { icon: '📝', description: 'Sistemas de gestión documental y elaboración de informes técnicos' },
    { icon: '🔩', description: 'Interpretación de esquemas eléctricos y manuales técnicos' },
    { icon: '🛠️', description: 'Instrumentación y equipos de diagnóstico para sistemas informáticos y aviónicos' },
];

const competencySkills: SkillItem[] = [
    { icon: '🔍', description: 'Análisis y diagnóstico de incidencias técnicas y administrativas' },
    { icon: '📈', description: 'Gestión logística y administrativa (pagos, facturación, stock)' },
    { icon: '📅', description: 'Planificación y ejecución de mantenimiento preventivo' },
    { icon: '📋', description: 'Elaboración y control de documentación en entornos críticos' },
    { icon: '🗣️', description: 'Comunicación efectiva con técnicos, mandos y proveedores' },
    { icon: '🔄', description: 'Adaptabilidad a entornos tecnológicos y administrativos diversos' },
    { icon: '🧠', description: 'Capacidad de aprendizaje continuo y actualización técnica' },
    { icon: '🎯', description: 'Orientación a resultados, calidad y cumplimiento de normas' },
    { icon: '🗂️', description: 'Organización y disciplina en la gestión de tareas y recursos' },
];

function SkillCategory({ title, icon, skills, animationClass }: SkillCategoryProps) {
    return (
        <div className={`bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg card-lift animate-in fade-in duration-700 ${animationClass}`}>
            <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center text-slate-700 dark:text-slate-200">
                <span className="mr-2" aria-hidden="true">{icon}</span>
                {title}
            </h3>
            <ul className="space-y-4 text-slate-600 dark:text-slate-300">
                {skills.map((skill, index) => (
                    <li key={index} className="flex items-start group">
                        <span className="text-orange-600 mr-4 mt-1 text-xl transition-transform group-hover:scale-125 duration-300" aria-hidden="true">
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
                <h1 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-orange-900 dark:text-orange-400">
                    <span aria-hidden="true" className="mr-3">💡</span>
                    Habilidades
                </h1>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
                    <SkillCategory
                        title="Herramientas y conocimientos"
                        icon="🛠️"
                        skills={toolsSkills}
                        animationClass="slide-in-from-left-8"
                    />
                    <SkillCategory
                        title="Competencias y habilidades"
                        icon="🧠"
                        skills={competencySkills}
                        animationClass="slide-in-from-right-8"
                    />
                </div>
            </section>
        </>
    );
}
