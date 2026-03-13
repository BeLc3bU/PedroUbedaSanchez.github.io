import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { portfolioData } from '../data/portfolio';

export default function WorkExperience() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <Helmet>
        <title>Work Experience | {portfolioData.name}</title>
        <meta name="description" content={`Work experience of ${portfolioData.name}, ${portfolioData.title}`} />
      </Helmet>

      <div className="container mx-auto px-6">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <Briefcase size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Work Experience</h1>
              <p className="text-muted-foreground mt-1">
                Over two decades of professional experience in critical systems and IT
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {portfolioData.experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border rounded-4xl p-8"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">{exp.title}</h2>
                    <p className="text-primary mt-1">{exp.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-foreground font-medium">{exp.period}</p>
                    <p className="text-muted-foreground text-sm">{exp.location}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                    Key Highlights
                  </h3>
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1.5 rounded-full bg-secondary text-sm text-secondary-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-card border border-border rounded-4xl text-center">
            <h2 className="text-xl font-semibold mb-4">Interested in my background?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Let's discuss how my experience can benefit your team. I'm always open to new opportunities where I can apply my skills in critical systems and technical support.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href={portfolioData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium"
              >
                View LinkedIn Profile
              </a>
              <button
                onClick={() => navigate('/cv')}
                className="px-6 py-3 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 transition-colors font-medium"
              >
                View Resume
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
