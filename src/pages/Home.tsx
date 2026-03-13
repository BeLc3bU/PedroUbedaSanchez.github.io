import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Terminal } from '../components/Terminal';
import { ProjectCard } from '../components/ProjectCard';
import { SocialLinks } from '../components/SocialLinks';
import { portfolioData } from '../data/portfolio';
import { Sparkles, Wrench, Settings, Cpu, CircleCheck, Laptop, Dumbbell, Droplets, Bike, Gamepad2, Monitor, Award } from 'lucide-react';

function TypingTitle() {
  const titles = [
    'Pedro Úbeda',
    'a Software Developer',
    'IT Infrastructure',
    'Avionic Maintenance'
  ];

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = titles[currentTitleIndex];

    const timeout = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentFullText.substring(0, displayText.length - 1)
          : currentFullText.substring(0, displayText.length + 1)
      );
    }, isDeleting ? 75 : 150);

    if (!isDeleting && displayText === currentFullText) {
      setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTitleIndex, titles]);

  return (
    <div className="flex flex-col items-center">
      <span className="text-4xl md:text-7xl font-bold font-display">Hi, I'm</span>
      <span className="text-4xl md:text-7xl font-bold font-display text-primary">
        {displayText}
        <span className="inline-block w-[3px] h-[1em] bg-primary ml-1 animate-cursor-blink align-middle"></span>
      </span>
    </div>
  );
}

function TagsAnimation() {
  const slides = [
    {
      icon: <Sparkles className="w-5 h-5 text-primary" />,
      tagline: "Welcome to my portfolio",
      tags: ["IT Professional", "Aviónica", "Sistemas Críticos"]
    },
    {
      icon: <Wrench className="w-5 h-5 text-primary" />,
      tagline: "Maintaining critical systems",
      tags: ["Hardware", "Software", "Networking"]
    },
    {
      icon: <Settings className="w-5 h-5 text-primary" />,
      tagline: "Building robust infrastructure",
      tags: ["Active Directory", "Servers", "Databases"]
    },
    {
      icon: <Cpu className="w-5 h-5 text-primary" />,
      tagline: "Let's create something amazing together",
      tags: ["20+ Years Experience", "Technical Support", "Infrastructure"]
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="w-full mt-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          {/* Icon + Tagline */}
          <div className="flex items-center justify-center gap-2 text-sm md:text-2xl mb-6" style={{ color: 'hsl(var(--muted-foreground))' }}>
            <span className="text-primary">{slides[currentSlide].icon}</span>
            <p className="text-balance">{slides[currentSlide].tagline}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto h-[100px] sm:h-[80px] overflow-hidden">
            {slides[currentSlide].tags.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full text-sm md:text-base font-medium border transition-colors bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{portfolioData.name} | {portfolioData.title}</title>
        <meta name="description" content={portfolioData.bio.new} />
        <link rel="canonical" href="https://pedroubedasanchez.es/" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://pedroubedasanchez.es/" />
        <meta property="og:title" content={`${portfolioData.name} | ${portfolioData.title}`} />
        <meta property="og:description" content={portfolioData.bio.new} />
        <meta property="og:image" content="https://pedroubedasanchez.es/og-image.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${portfolioData.name} | ${portfolioData.title}`} />
        <meta name="twitter:description" content={portfolioData.bio.new} />
        <meta name="twitter:image" content="https://pedroubedasanchez.es/og-image.png" />
      </Helmet>

      {/* Hero Section - Like Augusto */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          {/* Avatar - Like Augusto (ON TOP, centered) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative mb-8"
          >
            <div className="w-40 h-56 md:w-48 md:h-72 rounded-[2rem] overflow-hidden border-4 border-primary shadow-2xl">
              <img
                src="/foto.webp"
                alt={portfolioData.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Text Content - Below avatar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center w-full"
          >
            {/* "Hi, I'm" + Animation - Like Augusto */}
            <TypingTitle />

            {/* Tags that transition - Like Augusto */}
            <TagsAnimation />

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="flex justify-center gap-4 mt-8"
            >
              <a
                href="#projects"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium"
              >
                View Projects
              </a>
              <a
                href="#about"
                className="px-6 py-3 border border-primary text-primary rounded-xl hover:bg-primary/10 transition-colors font-medium"
              >
                About Me
              </a>
            </motion.div>

            {/* Social Links en el Hero */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="flex justify-center mt-8"
            >
              <SocialLinks />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Terminal Section */}
      <section id="terminal" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center font-display">Interactive Terminal</h2>
            <p className="text-muted-foreground text-center mb-6">
              Explore my portfolio the developer way. Type <code className="bg-secondary px-2 py-1 rounded font-mono">help</code> to get started.
            </p>
            <Terminal />
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-16 px-4 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4 font-display">Featured Projects</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              A showcase of my technical projects and achievements.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolioData.projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="experience" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4 font-display">Work experience</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Over two decades of professional experience in critical systems and IT.
            </p>

            <div className="space-y-0">
              {portfolioData.experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-8 border-l-2 border-primary/30 hover:border-primary transition-colors"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                  <div className="pb-12">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-2">{exp.title} @ {exp.company}</h3>
                      <p className="text-lg font-medium mb-1 text-primary">{exp.company}</p>
                      <p className="text-primary font-medium">{exp.period}</p>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start">
                          <CircleCheck className="w-5 h-5 text-primary mt-0.5 mr-2 shrink-0" />
                          <span className="text-muted-foreground/90">{highlight}</span>
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
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4 font-display">Skills & Competencies</h2>
            <p className="text-muted-foreground mb-8">
              A comprehensive set of technical and professional skills.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Technical Skills</h3>
                <div className="space-y-3">
                  {portfolioData.skills.tools.map((skill, index) => (
                    <div key={index} className="flex items-center gap-3 text-muted-foreground">
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
                    <div key={index} className="flex items-center gap-3 text-muted-foreground">
                      <span className="text-primary">•</span>
                      {skill.description}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4 font-display">Education & Certifications</h2>
            <p className="text-muted-foreground mb-8">
              Academic background and professional certifications.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Certifications</h3>
                <div className="space-y-4">
                  {portfolioData.education.certifications.map((cert, index) => (
                    <div key={index} className="bg-card border border-border rounded-2xl p-4">
                      <p className="font-medium">{cert.title}</p>
                      <p className="text-sm text-muted-foreground">{cert.institution}</p>
                      <p className="text-xs text-primary">{cert.year}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Honors & Awards</h3>
                <div className="space-y-4">
                  {portfolioData.education.honors.map((honor, index) => (
                    <div key={index} className="bg-card border border-border rounded-2xl p-4">
                      <p className="font-medium">{honor.title}</p>
                      <p className="text-sm text-muted-foreground">{honor.institution}</p>
                      {honor.year && <p className="text-xs text-primary">{honor.year}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-8 font-display">About Me</h2>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-40 h-56 md:w-48 md:h-72 rounded-[2rem] overflow-hidden border-4 border-primary shadow-2xl flex-shrink-0">
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
                  Mi trayectoria en el ámbito militar me ha proporcionado una disciplina férrea, capacidad de adaptación bajo presión y un fuerte compromiso con la excelencia. Siempre estoy en continua formación, explorando nuevas tecnologías y metodologías que me permitan ofrecer soluciones innovadoras y eficientes.
                </p>

                {/* Stats con estilo Augusto Polonio */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="p-6 bg-card rounded-lg border border-border">
                    <div className="flex justify-center mb-4">
                      <Laptop className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-center">20+ Years</h3>
                    <p className="text-muted-foreground text-center">IT & Aviónica</p>
                  </div>

                  <div className="p-6 bg-card rounded-lg border border-border">
                    <div className="flex justify-center mb-4">
                      <Award className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-center">17+ Years</h3>
                    <p className="text-muted-foreground text-center">Military Service</p>
                  </div>

                  <div className="p-6 bg-card rounded-lg border border-border">
                    <div className="flex justify-center mb-4">
                      <Cpu className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-center">1000+</h3>
                    <p className="text-muted-foreground text-center">Systems Maintained</p>
                  </div>
                </div>

                {/* Hobbies con iconos */}
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
          </motion.div>
        </div>
      </section>

      {/* Let's Connect Section */}
      <section id="contact" className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4 font-display">Let's Connect</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
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
          </motion.div>
        </div>
      </section>
    </div>
  );
}