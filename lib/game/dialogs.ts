import type { InteractiveStation } from "./types";

export const STATIONS: InteractiveStation[] = [
    {
        id: "avionics",
        npcId: "pedro",
        name: "Avionics & Systems Pod",
        icon: "✈️",
        color: "#38bdf8", // Sky Blue
        x: 120,
        y: 110,
        width: 100,
        height: 70,
        interactRadius: 65,
        portraitCol: 0,
        portraitRow: 0,
        tagline: {
            es: "Sistemas Críticos & Aviónica",
            en: "Critical Systems & Avionics",
        },
        action: {
            type: "scroll",
            target: "#projects",
            label: {
                es: "Explorar Sistemas de Aviónica",
                en: "Explore Avionics Systems",
            },
        },
        dialog: {
            es: {
                title: "Estación de Aviónica & Hardware",
                speaker: "Pedro Úbeda (Especialista en Aviónica)",
                role: "Mantenimiento Electrónico & Simuladores",
                lines: [
                    "¡Bienvenido al hangar de sistemas críticos! Aquí convergen más de 20 años de experiencia técnica.",
                    "He mantenido y diagnosticado electrónica de vuelo, aviónica de combate y simuladores para las Fuerzas Armadas.",
                    "La precisión, la tolerancia cero al fallo y la seguridad operacional son los pilares que aplico a toda la ingeniería que desarrollo.",
                ],
                highlights: [
                    "Fuerza Aérea Española",
                    "Sistemas Críticos",
                    "Diagnóstico Electrónico",
                ],
            },
            en: {
                title: "Avionics & Hardware Station",
                speaker: "Pedro Úbeda (Avionics Specialist)",
                role: "Electronic Maintenance & Simulators",
                lines: [
                    "Welcome to the critical systems hangar! Over 20 years of technical expertise converge right here.",
                    "I have maintained and diagnosed flight electronics, combat avionics, and flight simulators for the Spanish Armed Forces.",
                    "Precision, zero-tolerance for failure, and operational security are the core principles applied to all engineering I build.",
                ],
                highlights: ["Spanish Air Force", "Mission Critical", "Electronic Diagnostics"],
            },
        },
    },
    {
        id: "agents",
        npcId: "nexus",
        name: "AI & Software Lab",
        icon: "🤖",
        color: "#a855f7", // Purple
        x: 580,
        y: 110,
        width: 100,
        height: 70,
        interactRadius: 65,
        portraitCol: 1,
        portraitRow: 0,
        tagline: {
            es: "Agentes IA & Fullstack Lab",
            en: "AI Agents & Fullstack Lab",
        },
        action: {
            type: "link",
            target: "https://github.com/BeLc3bU",
            label: {
                es: "Ver Código en GitHub",
                en: "View GitHub Codebase",
            },
        },
        dialog: {
            es: {
                title: "Laboratorio de Agentes & Software",
                speaker: "Nexus (Agente Orquestador)",
                role: "Arquitectura AI-First & Desarrollo Moderno",
                lines: [
                    "¡Saludos! En este laboratorio coordinamos la evolución del software mediante metodologías AI-First y Spec-Driven Development.",
                    "Dominamos TypeScript estricto, React 19, Next.js 16, Three.js y orquestación modular de agentes inteligentes.",
                    "Cada componente cuenta con tipado riguroso, pruebas automatizadas en Vitest y pipeline de CI/CD continuo.",
                ],
                highlights: ["TypeScript 5.9", "React 19 & Next.js 16", "Spec-Driven Development"],
            },
            en: {
                title: "AI & Software Agents Lab",
                speaker: "Nexus (Orchestrator Agent)",
                role: "AI-First Architecture & Modern Dev",
                lines: [
                    "Greetings! In this lab we coordinate software evolution using AI-First methodologies and Spec-Driven Development.",
                    "Mastering strict TypeScript, React 19, Next.js 16, Three.js, and modular intelligent agent orchestration.",
                    "Every component features rigorous typing, automated Vitest suites, and a continuous CI/CD pipeline.",
                ],
                highlights: ["TypeScript 5.9", "React 19 & Next.js 16", "Spec-Driven Development"],
            },
        },
    },
    {
        id: "infra",
        npcId: "alex",
        name: "Infrastructure Core",
        icon: "🖥️",
        color: "#22c55e", // Emerald Green
        x: 120,
        y: 380,
        width: 100,
        height: 70,
        interactRadius: 65,
        portraitCol: 0,
        portraitRow: 1,
        tagline: {
            es: "Infraestructura IT & Servidores",
            en: "IT Infrastructure & Servers",
        },
        action: {
            type: "scroll",
            target: "#experience",
            label: {
                es: "Ver Trayectoria IT Completa",
                en: "View Complete IT Track Record",
            },
        },
        dialog: {
            es: {
                title: "Centro de Datos & Infraestructura",
                speaker: "Pedro Úbeda (Administrador de Sistemas)",
                role: "Servidores, Redes & Soporte Empresarial",
                lines: [
                    "Gestionando servidores Windows Server, Active Directory, políticas de grupo (GPO), copias de seguridad y redes empresariales.",
                    "Soporte técnico integral de nivel avanzado, resolución de incidentes complejos y despliegue de infraestructura sólida.",
                    "La estabilidad y la disponibilidad continua son la prioridad número uno.",
                ],
                highlights: ["Active Directory & GPOs", "Windows Server", "Redes & Conectividad"],
            },
            en: {
                title: "Data Center & Infrastructure",
                speaker: "Pedro Úbeda (Systems Administrator)",
                role: "Servers, Networks & Enterprise Support",
                lines: [
                    "Managing Windows Server environments, Active Directory, Group Policies (GPO), automated backups, and enterprise networks.",
                    "Advanced technical support, complex incident troubleshooting, and resilient infrastructure deployment.",
                    "High availability and uptime remain priority number one.",
                ],
                highlights: [
                    "Active Directory & GPOs",
                    "Windows Server",
                    "Networks & Connectivity",
                ],
            },
        },
    },
    {
        id: "command",
        npcId: "command",
        name: "Command Bridge",
        icon: "⭐",
        color: "#f59e0b", // Amber / Gold
        x: 580,
        y: 380,
        width: 100,
        height: 70,
        interactRadius: 65,
        portraitCol: 1,
        portraitRow: 1,
        tagline: {
            es: "Puente de Mando & Currículum",
            en: "Command Bridge & Resume",
        },
        action: {
            type: "route",
            target: "/cv",
            label: {
                es: "Ver y Descargar CV Oficial PDF",
                en: "View & Download Official PDF CV",
            },
        },
        secondaryAction: {
            type: "scroll",
            target: "#contact",
            label: {
                es: "Transmitir Mensaje Directo",
                en: "Transmit Direct Message",
            },
        },
        dialog: {
            es: {
                title: "Puente de Mando Central",
                speaker: "Terminal Central",
                role: "Perfil Profesional Completo",
                lines: [
                    "Estás en el núcleo de control. Desde aquí puedes acceder al Currículum Vitae oficial en PDF o ponerte en contacto directo.",
                    "Experiencia interdisciplinar que une ingeniería de hardware crítico, administración IT y desarrollo de aplicaciones web de última generación.",
                    "¡Gracias por explorar este hangar interactivo!",
                ],
                highlights: ["Descarga CV PDF", "Contacto Directo", "+20 Años Trayectoria"],
            },
            en: {
                title: "Central Command Bridge",
                speaker: "Main Terminal",
                role: "Full Professional Profile",
                lines: [
                    "You are in the central command core. Access the official CV in dynamic PDF format or get in touch directly.",
                    "An interdisciplinary career bridging critical hardware engineering, IT system administration, and next-generation web apps.",
                    "Thank you for exploring this interactive hangar experience!",
                ],
                highlights: ["Download PDF CV", "Direct Contact", "+20 Years Track Record"],
            },
        },
    },
];
