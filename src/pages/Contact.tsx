import { Helmet } from 'react-helmet';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Mail, Phone, Linkedin, MessageSquare, Send, Globe } from 'lucide-react';

interface FormState {
    name: string;
    email: string;
    message: string;
}

interface ErrorsState {
    name?: string;
    email?: string;
    message?: string;
    general?: string;
}

export default function Contact() {
    const [isPhoneRevealed, setIsPhoneRevealed] = useState(false);
    const phoneNumberEncoded = 'KzM0IDYzNSA5NDUgNzc5'; // +34 635 945 779
    const [formData, setFormData] = useState<FormState>({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState<ErrorsState>({});

    const handlePhoneClick = (e: React.MouseEvent) => {
        if (!isPhoneRevealed) {
            e.preventDefault();
            setIsPhoneRevealed(true);
        }
    };

    const getPhoneNumber = () => {
        try { return atob(phoneNumberEncoded); } catch { return ''; }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof ErrorsState]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validate = (): boolean => {
        const newErrors: ErrorsState = {};
        if (!formData.name.trim()) newErrors.name = 'Identidad requerida.';
        if (!formData.email.trim()) {
            newErrors.email = 'Canal de retorno requerido.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Formato de comunicación no válido.';
        }
        if (!formData.message.trim()) newErrors.message = 'Mensaje vacío.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setIsSubmitting(true);
        try {
            const formPayload = new FormData();
            formPayload.append('name', formData.name);
            formPayload.append('email', formData.email);
            formPayload.append('message', formData.message);
            formPayload.append('_subject', 'Transmisión técnica desde Portfolio');

            const response = await fetch("https://formsubmit.co/ajax/contacto@pedroubedasanchez.es", {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formPayload
            });

            const data = await response.json();
            if (data.success === "true" || data.success === true) {
                setIsSuccess(true);
                setFormData({ name: '', email: '', message: '' });
            } else {
                throw new Error(data.message || 'Fallo en la transmisión.');
            }
        } catch (error) {
            setErrors({ general: 'Error crítico en el enlace de comunicación. Reintegre el envío.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-grid-pattern min-h-screen pt-24 md:pt-32 pb-24">
            <Helmet>
                <title>Contacto | Pedro Úbeda Sánchez</title>
                <meta name="description" content="Establezca comunicación con Pedro Úbeda Sánchez para consultas técnicas o profesionales." />
                <link rel="canonical" href="https://pedroubedasanchez.es/contacto" />
            </Helmet>

            <section className="container mx-auto px-6 max-w-6xl">
                <div className="max-w-4xl mx-auto mb-16 text-center">
                    <h1 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white flex flex-wrap items-center justify-center gap-3">
                        <MessageSquare size={32} className="text-cyan-600 dark:text-cyan-400" />
                        Canales de <span className="text-accent-gradient">Comunicación</span>
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 font-light">
                        Disponible para consultas técnicas, colaboraciones profesionales y oportunidades en el sector IT y defensa.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                    {/* Side Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="card-tech backdrop-blur-3xl">
                            <h3 className="text-xl font-bold mb-8 text-slate-900 dark:text-white flex items-center gap-2">
                                <Globe size={20} className="text-cyan-600 dark:text-cyan-400" /> Detalle de Contacto
                            </h3>

                            <div className="space-y-8">
                                <div className="flex gap-4 group">
                                    <div className="p-3 bg-white/5 rounded-xl text-slate-400 group-hover:text-cyan-400 transition-colors">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Email</p>
                                        <a href="mailto:contacto@pedroubedasanchez.es" className="text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                                            contacto@pedroubedasanchez.es
                                        </a>
                                    </div>
                                </div>

                                <div className="flex gap-4 group">
                                    <div className="p-3 bg-white/5 rounded-xl text-slate-400 group-hover:text-cyan-400 transition-colors">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Teléfono</p>
                                        <button onClick={handlePhoneClick} className="text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors text-left">
                                            {isPhoneRevealed ? getPhoneNumber() : 'Verificación de identidad requerida'}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex gap-4 group">
                                    <div className="p-3 bg-white/5 rounded-xl text-slate-400 group-hover:text-cyan-400 transition-colors">
                                        <Linkedin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">LinkedIn</p>
                                        <a href="https://linkedin.com/in/pubesan" target="_blank" rel="noopener noreferrer" className="text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                                            linkedin.com/in/pubesan
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Panel */}
                    <div className="lg:col-span-3">
                        <div className="card-tech p-6 md:p-12 relative overflow-hidden">
                            {/* Decorative Glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] -z-10"></div>

                            {isSuccess ? (
                                <div className="text-center py-12 animate-in zoom-in duration-500">
                                    <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 mx-auto mb-8 shadow-inner">
                                        <Send size={40} />
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">¡Transmisión Exitosa!</h3>
                                    <p className="text-slate-400 font-light mb-8 max-w-md mx-auto leading-relaxed">
                                        He recibido su mensaje encriptado. Procederé a revisarlo y emitir una respuesta a la brevedad.
                                    </p>
                                    <button
                                        onClick={() => setIsSuccess(false)}
                                        className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold py-3 px-8 rounded-full hover:bg-cyan-600 dark:hover:bg-cyan-400 transition-all active:scale-95"
                                    >
                                        Nueva comunicación
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Identificación</label>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Su nombre"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={`input-tech ${errors.name ? 'border-red-500/50' : ''}`}
                                            />
                                            {errors.name && <p className="text-red-400 text-xs italic">{errors.name}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Procedencia</label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="su@email.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`input-tech ${errors.email ? 'border-red-500/50' : ''}`}
                                            />
                                            {errors.email && <p className="text-red-400 text-xs italic">{errors.email}</p>}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Mensaje técnico</label>
                                        <textarea
                                            name="message"
                                            rows={6}
                                            placeholder="Describa el motivo de su consulta..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            className={`input-tech resize-none ${errors.message ? 'border-red-500/50' : ''}`}
                                        />
                                        {errors.message && <p className="text-red-400 text-xs italic">{errors.message}</p>}
                                    </div>

                                    {errors.general && (
                                        <p className="text-red-400 text-sm text-center bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                                            {errors.general}
                                        </p>
                                    )}

                                    <div className="pt-4 flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="group relative flex items-center gap-3 bg-cyan-600 text-white font-black py-4 px-10 rounded-xl hover:bg-cyan-500 transition-all shadow-[0_10px_30px_-10px_rgba(34,211,238,0.3)] disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-1 active:scale-95 overflow-hidden"
                                        >
                                            {isSubmitting ? (
                                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            ) : (
                                                <>
                                                    <span>INICIAR ENVÍO</span>
                                                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
