import {
    FileText,
    Wrench,
    Brain,
    Cpu,
    Database,
    Globe,
    Bot,
    Monitor,
    Cloud,
    ClipboardList,
    Search,
    TrendingUp,
    Calendar,
    Clipboard,
    MessageCircle,
    RefreshCw,
    Target,
    FolderOpen,
} from "lucide-react";

export interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    tags: string[];
    icon: string;
    link?: string;
    github?: string;
}

export interface Experience {
    id: string;
    title: string;
    company: string;
    period: string;
    location: string;
    highlights: string[];
    technologies: string[];
}

export interface Education {
    id: string;
    title: string;
    institution: string;
    year: string;
    type: "certification" | "honor";
}

export interface Skill {
    icon: React.ReactNode;
    description: string;
}

export const portfolioData = {
    name: "Pedro Úbeda Sánchez",
    title: "Sistemas Críticos & Aviónica Senior",
    subtitle: "IT Professional | Aviónica | Soporte Técnico",
    tags: ["Sistemas Críticos", "Aviónica", "Soporte Técnico", "IT Infrastructure"],

    avatar: "/foto.jpg",

    bio: {
        new: `Profesional IT y Aviónica con más de 20 años de experiencia en mantenimiento de sistemas críticos, soporte técnico avanzado y gestión de infraestructura. Especializado en diagnóstico, resolución de averías y administración de sistemas en entornos de alta exigencia. Buscando nuevos retos donde aplicar mi experiencia en entornos tecnológicos desafiantes.`,
        old: `Evolucionando infraestructuras complejas con disciplina militar y visión tecnológica. Especialista en IT y aviónica con más de 20 años de trayectoria en las Fuerzas Armadas, combinando precisión técnica con capacidad de gestión operativa.`,
    },

    stats: [
        { value: "20+", label: "Years IT & Aviónica" },
        { value: "17+", label: "Years Military Service" },
        { value: "1000+", label: "Systems Maintained" },
    ],

    hobbies: ["Running", "Natación", "Ciclismo", "Gaming", "Computación & Hardware"],

    projects: [
        {
            id: "avionics",
            title: "Sistemas de Aviónica FAS",
            category: "Hardware & Sistemas",
            description:
                "Mantenimiento y diagnóstico preventivo/correctivo de sistemas electrónicos en flota de aeronaves militares y simuladores de vuelo.",
            tags: ["Electrónica", "Diagnóstico", "Sistemas Críticos"],
            icon: "Cpu",
        },
        {
            id: "infrastructure",
            title: "Infraestructura IT & Redes",
            category: "Administración IT",
            description:
                "Implementación y administración de redes locales, Active Directory y servidores de gestión documental.",
            tags: ["SysAdmin", "Networking", "Active Directory"],
            icon: "Settings",
        },
        {
            id: "inventory",
            title: "Control de Inventario Técnico",
            category: "Software & Datos",
            description:
                "Desarrollo y mantenimiento de bases de datos para el seguimiento de componentes críticos de aviónica.",
            tags: ["BBDD", "Logística", "Excel Avanzado"],
            icon: "Database",
        },
        {
            id: "portfolio",
            title: "Portfolio Profesional",
            category: "Desarrollo Web",
            description:
                "Diseño y desarrollo de este portfolio personal utilizando React, TypeScript y Tailwind CSS.",
            tags: ["React", "TypeScript", "Tailwind"],
            icon: "Layout",
        },
    ] as Project[],

    skills: {
        tools: [
            {
                icon: <FileText size={20} />,
                description: "Microsoft 365 (Word, Excel, PowerPoint)",
            },
            { icon: <Globe size={20} />, description: "HTML5, CSS y JavaScript" },
            { icon: <Bot size={20} />, description: "Herramientas de IA para automatización" },
            { icon: <Monitor size={20} />, description: "Active Directory y VMs" },
            { icon: <Cloud size={20} />, description: "Gestión de hosting y servidores" },
            { icon: <Database size={20} />, description: "Bases de datos e inventario" },
            { icon: <ClipboardList size={20} />, description: "Gestión documental" },
            { icon: <Cpu size={20} />, description: "Esquemas eléctricos y manuales técnicos" },
            { icon: <Wrench size={20} />, description: "Instrumentación y diagnóstico" },
        ] as Skill[],
        competencies: [
            {
                icon: <Search size={20} />,
                description: "Análisis y diagnóstico en entornos críticos",
            },
            { icon: <TrendingUp size={20} />, description: "Gestión logística y administrativa" },
            { icon: <Calendar size={20} />, description: "Mantenimiento preventivo y correctivo" },
            { icon: <Clipboard size={20} />, description: "Control de documentación técnica" },
            { icon: <MessageCircle size={20} />, description: "Comunicación técnica y liderazgo" },
            { icon: <RefreshCw size={20} />, description: "Adaptabilidad a alta presión" },
            { icon: <Brain size={20} />, description: "Autoaprendizaje continuo" },
            { icon: <Target size={20} />, description: "Orientación a resultados" },
            { icon: <FolderOpen size={20} />, description: "Organización y disciplina" },
        ] as Skill[],
    },

    experience: [
        {
            id: "militar",
            title: "Militar (Informático/Aviónico)",
            company: "Fuerzas Armadas",
            period: "2008 - 2025",
            location: "España",
            highlights: [
                "Mantenimiento, diagnóstico y solución de averías de simuladores de vuelo y flota de aviones a nivel informativo y electrónico.",
                "Gestión administrativa y logística de componentes de aviónica.",
                "Elaboración de informes técnicos de precisión y control de calidad.",
                "Servicio de control de accesos y vigilancia operativa.",
            ],
            technologies: ["Electrónica", "Aviónica", "Simuladores de vuelo", "Gestión logística"],
        },
        {
            id: "icono",
            title: "Administrativo Contable",
            company: "ICONO TELECOM",
            period: "2007 - 2008",
            location: "España",
            highlights: [
                "Gestión integral de pagos a proveedores y conciliación de clientes.",
                "Contabilización de asientos, control bancario y facturación avanzada.",
                "Elaboración de informes ejecutivos y gestión optimizada de gastos.",
            ],
            technologies: ["Contabilidad", "Facturación", "Excel Avanzado"],
        },
        {
            id: "truccsa",
            title: "Auxiliar Administrativo",
            company: "TRUCCSA",
            period: "2006 - 2007",
            location: "España",
            highlights: [
                "Gestión de pedidos, albaranes y facturación.",
                "Contabilidad auxiliar, control de stock y gestión de registro.",
            ],
            technologies: ["Gestión comercial", "Almacén"],
        },
        {
            id: "militar-early",
            title: "Militar (Admin/Telecom)",
            company: "Fuerzas Armadas",
            period: "2002 - 2005",
            location: "España",
            highlights: [
                "Gestión de archivo, correspondencia oficial y registro de seguridad.",
                "Mantenimiento de bases de datos críticas e inventario de material.",
                "Instalación y mantenimiento de sistemas de telecomunicaciones.",
            ],
            technologies: ["Telecomunicaciones", "Bases de datos", "Archivo"],
        },
    ] as Experience[],

    education: {
        certifications: [
            {
                id: "1",
                title: "Técnico Especialista en Informática de Gestión",
                institution: "CIF CARLOS III, Cartagena",
                year: "1998-2001",
                type: "certification",
            },
            {
                id: "2",
                title: "Curso de Ciberseguridad",
                institution: "INCIBE, León",
                year: "2018",
                type: "certification",
            },
            {
                id: "3",
                title: "Curso NATO HPS CRYPTO",
                institution: "Ministerio de Defensa",
                year: "2024",
                type: "certification",
            },
        ] as Education[],
        honors: [
            {
                id: "1",
                title: "Cruz del Mérito Aeronáutico",
                institution: "Distintivo Blanco",
                year: "",
                type: "honor",
            },
            {
                id: "2",
                title: "Cruz a la Constancia en el Servicio",
                institution: "Categoría Bronce",
                year: "",
                type: "honor",
            },
            {
                id: "3",
                title: "Reconocimiento Especial DANA 2024",
                institution: "Operaciones de emergencia y apoyo",
                year: "2024",
                type: "honor",
            },
        ] as Education[],
    },

    social: {
        github: "https://github.com/BeLc3bU",
        linkedin: "https://www.linkedin.com/in/pubesan/",
        email: "contacto@pedroubedasanchez.es",
        whatsapp:
            "https://wa.me/34645945779?text=Hola%20Pedro,%20me%20interesa%20contactar%20contigo",
    },
};

export const terminalCommands = [
    { command: "help", description: "Show all available commands" },
    { command: "about", description: "Display new bio" },
    { command: "hobbies", description: "Show my hobbies" },
    { command: "projects", description: "List featured projects" },
    { command: "skills", description: "Show technical skills" },
    { command: "education", description: "Show education & certifications" },
    { command: "experience", description: "Show work experience summary" },
    { command: "contact", description: "Display contact information" },
    { command: "clear", description: "Clear terminal" },
];
