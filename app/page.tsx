import type { Metadata } from "next";

import { portfolioData } from "@/data/portfolio";
import { ProjectCard } from "@/components/ProjectCard";
import HeroInteractive from "@/components/HeroInteractive";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import {
    CircleCheck,
    Laptop,
    Award,
    Cpu,
    Sparkles,
    Dumbbell,
    Droplets,
    Bike,
    Gamepad2,
    Monitor,
} from "lucide-react";
import { SocialLinks } from "@/components/SocialLinks";

import ClientTerminal from "@/components/ClientTerminal";
import ClientSkillsMap from "@/components/ClientSkillsMap";

export const metadata: Metadata = {
    title: "Pedro Úbeda Sánchez | Software Developer & IT Infrastructure",
    description:
        "Portfolio personal de Pedro Úbeda Sánchez, especialista en mantenimiento de sistemas de aviónica, redes y desarrollo de software.",
    alternates: {
        canonical: "https://pedroubedasanchez.es/",
    },
};

export default function HomePage() {
    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section
                id="hero"
                className="min-h-screen flex items-center justify-center pt-20 pb-16 px-4"
            >
                <HeroInteractive />
            </section>

            {/* Interactive Terminal Section */}
            <section id="terminal" className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <AnimateOnScroll>
                        <h2 className="text-2xl font-bold mb-6 text-center font-display">
                            Interactive Terminal
                        </h2>
                        <p className="text-muted-foreground text-center mb-6">
                            Explore my portfolio the developer way. Type{" "}
                            <code className="bg-secondary px-2 py-1 rounded font-mono">help</code>{" "}
                            to get started.
                        </p>
                        <ClientTerminal />
                    </AnimateOnScroll>
                </div>
            </section>

            {/* Featured Projects Section */}
            <section id="projects" className="py-16 px-4 bg-card/30">
                <div className="max-w-6xl mx-auto">
                    <AnimateOnScroll>
                        <h2 className="text-3xl font-bold mb-4 font-display">Featured Projects</h2>
                        <p className="text-muted-foreground mb-8 max-w-2xl">
                            A showcase of my technical projects and achievements.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {portfolioData.projects.map((project, index) => (
                                <ProjectCard key={project.id} project={project} index={index} />
                            ))}
                        </div>
                    </AnimateOnScroll>
                </div>
            </section>

            {/* Work Experience Section */}
            <section id="experience" className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <AnimateOnScroll>
                        <h2 className="text-3xl font-bold mb-4 font-display">Work experience</h2>
                        <p className="text-muted-foreground mb-8 max-w-2xl">
                            Over two decades of professional experience in critical systems and IT.
                        </p>

                        <div className="space-y-0">
                            {portfolioData.experience.map((exp) => (
                                <div
                                    key={exp.id}
                                    className="relative pl-8 border-l-2 border-primary/30 hover:border-primary transition-colors"
                                >
                                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                                    <div className="pb-12">
                                        <div className="mb-4">
                                            <h3 className="text-xl font-bold mb-2">
                                                {exp.title} @ {exp.company}
                                            </h3>
                                            <p className="text-lg font-medium mb-1 text-primary">
                                                {exp.company}
                                            </p>
                                            <p className="text-primary font-medium">{exp.period}</p>
                                        </div>
                                        <ul className="space-y-3 mb-6">
                                            {exp.highlights.map((highlight, i) => (
                                                <li key={i} className="flex items-start">
                                                    <CircleCheck className="w-5 h-5 text-primary mt-0.5 mr-2 shrink-0" />
                                                    <span className="text-muted-foreground/90">
                                                        {highlight}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex flex-wrap gap-2">
                                            {exp.technologies.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AnimateOnScroll>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-16 px-4 bg-card/30">
                <div className="max-w-4xl mx-auto">
                    <AnimateOnScroll>
                        <h2 className="text-3xl font-bold mb-4 font-display">
                            Skills & Competencies
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            A comprehensive set of technical and professional skills.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Technical Skills</h3>
                                <div className="space-y-3">
                                    {portfolioData.skills.tools.map((skill, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 text-muted-foreground"
                                        >
                                            <span className="text-primary">•</span>
                                            {skill.description}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Competencies</h3>
                                <div className="space-y-3">
                                    {portfolioData.skills.competencies.map((skill, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 text-muted-foreground"
                                        >
                                            <span className="text-primary">•</span>
                                            {skill.description}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Interactive Skills Map */}
                        <div className="mt-12">
                            <h3 className="text-lg font-semibold mb-6 text-center">
                                Mapa de Habilidades Interactivo
                            </h3>
                            <ClientSkillsMap />
                        </div>
                    </AnimateOnScroll>
                </div>
            </section>

            {/* Education Section */}
            <section id="education" className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <AnimateOnScroll>
                        <h2 className="text-3xl font-bold mb-4 font-display">
                            Education & Certifications
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            Academic background and professional certifications.
                        </p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Certifications</h3>
                                <div className="space-y-4">
                                    {portfolioData.education.certifications.map((cert, index) => (
                                        <div
                                            key={index}
                                            className="bg-card border border-border rounded-2xl p-4"
                                        >
                                            <p className="font-medium">{cert.title}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {cert.institution}
                                            </p>
                                            <p className="text-xs text-primary">{cert.year}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Honors & Awards</h3>
                                <div className="space-y-4">
                                    {portfolioData.education.honors.map((honor, index) => (
                                        <div
                                            key={index}
                                            className="bg-card border border-border rounded-2xl p-4"
                                        >
                                            <p className="font-medium">{honor.title}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {honor.institution}
                                            </p>
                                            {honor.year && (
                                                <p className="text-xs text-primary">{honor.year}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </AnimateOnScroll>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-16 px-4 bg-card/30">
                <div className="max-w-4xl mx-auto">
                    <AnimateOnScroll>
                        <h2 className="text-3xl font-bold mb-8 font-display">About Me</h2>

                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="w-40 h-56 md:w-48 md:h-72 rounded-[2rem] overflow-hidden border-4 border-primary shadow-2xl flex-shrink-0 relative">
                                <img
                                    src="/foto.webp"
                                    alt={portfolioData.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    {portfolioData.bio.new}
                                </p>
                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    Mi trayectoria en el ámbito militar me ha proporcionado una
                                    disciplina férrea, capacidad de adaptación bajo presión y un
                                    fuerte compromiso con la excelencia. Siempre estoy en continua
                                    formación, explorando nuevas tecnologías y metodologías que me
                                    permitan ofrecer soluciones innovadoras y eficientes.
                                </p>

                                {/* Stats */}
                                <div className="grid md:grid-cols-3 gap-4 mb-8">
                                    <div className="p-6 bg-card rounded-lg border border-border">
                                        <div className="flex justify-center mb-4">
                                            <Laptop className="w-12 h-12 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-center">
                                            20+ Years
                                        </h3>
                                        <p className="text-muted-foreground text-center">
                                            IT & Aviónica
                                        </p>
                                    </div>

                                    <div className="p-6 bg-card rounded-lg border border-border">
                                        <div className="flex justify-center mb-4">
                                            <Award className="w-12 h-12 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-center">
                                            17+ Years
                                        </h3>
                                        <p className="text-muted-foreground text-center">
                                            Military Service
                                        </p>
                                    </div>

                                    <div className="p-6 bg-card rounded-lg border border-border">
                                        <div className="flex justify-center mb-4">
                                            <Cpu className="w-12 h-12 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-center">1000+</h3>
                                        <p className="text-muted-foreground text-center">
                                            Systems Maintained
                                        </p>
                                    </div>
                                </div>

                                {/* Hobbies */}
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Sparkles className="w-5 h-5 text-primary" />
                                        <h3 className="text-lg font-semibold">Hobbies</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        <span className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-full flex items-center gap-2">
                                            <Dumbbell className="w-4 h-4" /> Running
                                        </span>
                                        <span className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-full flex items-center gap-2">
                                            <Droplets className="w-4 h-4" /> Natación
                                        </span>
                                        <span className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-full flex items-center gap-2">
                                            <Bike className="w-4 h-4" /> Ciclismo
                                        </span>
                                        <span className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-full flex items-center gap-2">
                                            <Gamepad2 className="w-4 h-4" /> Gaming
                                        </span>
                                        <span className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-full flex items-center gap-2">
                                            <Monitor className="w-4 h-4" /> Computación
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimateOnScroll>
                </div>
            </section>

            {/* Let's Connect Section */}
            <section id="contact" className="py-16 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <AnimateOnScroll>
                        <h2 className="text-3xl font-bold mb-4 font-display">Let's Connect</h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                            I'm always open to discussing new projects, creative ideas or
                            opportunities to be part of your vision.
                        </p>
                        <div className="flex justify-center mb-8">
                            <SocialLinks />
                        </div>
                        <a
                            href={portfolioData.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium"
                        >
                            Connect on LinkedIn
                        </a>
                    </AnimateOnScroll>
                </div>
            </section>
        </div>
    );
}
