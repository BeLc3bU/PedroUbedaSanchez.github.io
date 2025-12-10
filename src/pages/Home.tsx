import { Helmet } from 'react-helmet';
import { Linkedin, Github, FileText } from 'lucide-react';

export default function Home() {
    const handlePrintCv = (e: React.MouseEvent) => {
        e.preventDefault();
        let iframe = document.getElementById('print-iframe-cv') as HTMLIFrameElement | null;
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.id = 'print-iframe-cv';
            iframe.src = '/curriculum.html';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            iframe.onload = () => {
                iframe?.contentWindow?.focus();
                iframe?.contentWindow?.print();
            };
        } else {
            iframe.contentWindow?.focus();
            iframe.contentWindow?.print();
        }
    };

    return (
        <>
            <Helmet>
                <title>Pedro Úbeda Sánchez | Técnico en Informática, Aviónica y Administración</title>
                <meta name="description" content="Técnico especialista con más de 20 años de experiencia en informática, aviónica y administración." />
                <link rel="canonical" href="https://pedroubedasanchez.es/" />
            </Helmet>

            <section className="container mx-auto px-6 py-12 mb-24 flex flex-col md:flex-row items-center md:items-start gap-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700" id="about">
                <div className="flex-shrink-0">
                    {/* Imagen Responsiva y Optimizada */}
                    <picture>
                        <source media="(min-width: 768px)" srcSet="/foto-384.webp" type="image/webp" />
                        <source media="(max-width: 767px)" srcSet="/foto-320.webp" type="image/webp" />
                        <img
                            alt="Foto de Pedro Úbeda Sánchez"
                            className="w-40 h-56 md:w-48 md:h-64 rounded-full object-cover shadow-2xl transition-transform hover:scale-105 duration-500"
                            src="/foto-384.jpg"
                            width="192"
                            height="256"
                            decoding="async"
                            loading="eager"
                        />
                    </picture>
                </div>

                <div className="flex-grow text-center md:text-left md:ml-32">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-orange-900 dark:text-orange-400">
                        Técnico especialista en informática, aviónica y administración
                    </h1>
                    <p className="max-w-3xl mx-auto md:mx-0 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                        Técnico especialista con más de dos décadas de experiencia en el mantenimiento, diagnóstico y resolución de averías en equipos informáticos y de aviónica. Mi trayectoria en las Fuerzas Armadas me ha proporcionado sólidos valores como la disciplina, el compromiso y el trabajo en equipo, habilidades que aplico en mi día a día. En constante formación y motivado para asumir futuros retos que supongan un desarrollo profesional en mi carrera.
                    </p>

                    <div className="mt-8 flex justify-center md:justify-start space-x-6">
                        <a
                            href="https://www.linkedin.com/in/pubesan"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visitar perfil de LinkedIn"
                            className="text-slate-500 dark:text-slate-400 hover:text-orange-700 dark:hover:text-orange-400 transition-colors duration-300 transform hover:scale-110"
                        >
                            <Linkedin size={32} />
                        </a>
                        <a
                            href="https://github.com/BeLc3bU"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visitar perfil de GitHub"
                            className="text-slate-500 dark:text-slate-400 hover:text-orange-700 dark:hover:text-orange-400 transition-colors duration-300 transform hover:scale-110"
                        >
                            <Github size={32} />
                        </a>
                    </div>

                    <div className="mt-10 flex justify-center md:justify-start">
                        <a
                            href="/curriculum.html"
                            onClick={handlePrintCv}
                            className="inline-flex items-center gap-2 bg-orange-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-800 transition-all duration-300 shadow-lg hover:shadow-orange-900/20 transform hover:-translate-y-1 hover:scale-105"
                        >
                            <FileText size={20} />
                            Descargar CV
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
