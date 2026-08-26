"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { portfolioData } from "@/data/portfolio";
import { ProjectCard } from "@/components/ProjectCard";
import TimelineItem from "@/components/TimelineItem";
import HeroInteractive from "@/components/HeroInteractive";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import {
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
import GameSection from "@/components/GameSection";

const projectIcons = ["Cpu", "Settings", "Database", "Layout"];

export default function HomeContent() {
    const { t } = useLanguage();

    const hobbyIcons = [
        <Dumbbell key="1" className="w-4 h-4" />,
        <Droplets key="2" className="w-4 h-4" />,
        <Bike key="3" className="w-4 h-4" />,
        <Gamepad2 key="4" className="w-4 h-4" />,
        <Monitor key="5" className="w-4 h-4" />,
    ];

    const statIcons = [
        <Laptop key="1" className="w-12 h-12 text-primary" />,
        <Award key="2" className="w-12 h-12 text-primary" />,
        <Cpu key="3" className="w-12 h-12 text-primary" />,
    ];

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
                            {t.terminal.title}
                        </h2>
                        <p className="text-muted-foreground text-center mb-6">
                            {t.terminal.subtitle}{" "}
                            <code className="bg-secondary px-2 py-1 rounded font-mono">help</code>{" "}
                            {t.terminal.helpHint}
                        </p>
                        <ClientTerminal />
                    </AnimateOnScroll>
                </div>
            </section>

            {/* 2D Retro Hangar Game Section */}
            <GameSection />

            {/* Featured Projects Section */}
            <section id="projects" className="py-16 px-4 bg-card/30">
                <div className="max-w-6xl mx-auto">
                    <AnimateOnScroll>
                        <h2 className="text-3xl font-bold mb-4 font-display">{t.projects.title}</h2>
                        <p className="text-muted-foreground mb-8 max-w-2xl">
                            {t.projects.subtitle}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {t.projects.items.map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={{
                                        ...project,
                                        icon: projectIcons[index % projectIcons.length],
                                        github: portfolioData.social.github,
                                    }}
                                    index={index}
                                />
                            ))}
                        </div>
                    </AnimateOnScroll>
                </div>
            </section>

            {/* Work Experience Section */}
            <section id="experience" className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <AnimateOnScroll>
                        <h2 className="text-3xl font-bold mb-4 font-display">
                            {t.experience.title}
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-2xl">
                            {t.experience.subtitle}
                        </p>

                        <div className="space-y-0">
                            {t.experience.items.map((exp) => (
                                <TimelineItem
                                    key={exp.id}
                                    title={exp.title}
                                    company={exp.company}
                                    period={exp.period}
                                    highlights={exp.highlights}
                                    technologies={exp.technologies}
                                />
                            ))}
                        </div>
                    </AnimateOnScroll>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-16 px-4 bg-card/30">
                <div className="max-w-4xl mx-auto">
                    <AnimateOnScroll>
                        <h2 className="text-3xl font-bold mb-4 font-display">{t.skills.title}</h2>
                        <p className="text-muted-foreground mb-8">{t.skills.subtitle}</p>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-lg font-semibold mb-4">
                                    {t.skills.technicalTitle}
                                </h3>
                                <div className="space-y-3">
                                    {t.skills.tools.map((skill, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 text-muted-foreground"
                                        >
                                            <span className="text-primary">•</span>
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-4">
                                    {t.skills.competenciesTitle}
                                </h3>
                                <div className="space-y-3">
                                    {t.skills.competencies.map((skill, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 text-muted-foreground"
                                        >
                                            <span className="text-primary">•</span>
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </AnimateOnScroll>
                </div>
            </section>

            {/* Education Section */}
            <section id="education" className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <AnimateOnScroll>
                        <h2 className="text-3xl font-bold mb-4 font-display">
                            {t.education.title}
                        </h2>
                        <p className="text-muted-foreground mb-8">{t.education.subtitle}</p>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-4">
                                    {t.education.certificationsTitle}
                                </h3>
                                <div className="space-y-4">
                                    {t.education.certifications.map((cert, index) => (
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
                                <h3 className="text-lg font-semibold mb-4">
                                    {t.education.honorsTitle}
                                </h3>
                                <div className="space-y-4">
                                    {t.education.honors.map((honor, index) => (
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
                        <h2 className="text-3xl font-bold mb-8 font-display">{t.about.title}</h2>

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
                                    {t.about.bio1}
                                </p>
                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    {t.about.bio2}
                                </p>

                                {/* Stats */}
                                <div className="grid md:grid-cols-3 gap-4 mb-8">
                                    {t.about.stats.map((stat, index) => (
                                        <div
                                            key={index}
                                            className="p-6 bg-card rounded-lg border border-border"
                                        >
                                            <div className="flex justify-center mb-4">
                                                {statIcons[index % statIcons.length]}
                                            </div>
                                            <h3 className="text-xl font-semibold text-center">
                                                {stat.value}
                                            </h3>
                                            <p className="text-muted-foreground text-center">
                                                {stat.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Hobbies */}
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Sparkles className="w-5 h-5 text-primary" />
                                        <h3 className="text-lg font-semibold">
                                            {t.about.hobbiesTitle}
                                        </h3>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {t.about.hobbies.map((hobby, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary rounded-full flex items-center gap-2"
                                            >
                                                {hobbyIcons[index % hobbyIcons.length]} {hobby}
                                            </span>
                                        ))}
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
                        <h2 className="text-3xl font-bold mb-4 font-display">
                            {t.contact.connectTitle}
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                            {t.contact.connectSubtitle}
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
                            {t.contact.linkedinBtn}
                        </a>
                    </AnimateOnScroll>
                </div>
            </section>
        </div>
    );
}
