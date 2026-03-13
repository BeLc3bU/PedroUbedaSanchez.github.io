import { Helmet } from 'react-helmet';
import { useState } from 'react';
import { Mail, Phone, Linkedin, MessageSquare, Send, Globe } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

const formSchema = z.object({
    name: z.string().min(1, 'Identidad requerida.'),
    email: z.string().email('Formato de comunicación no válido.'),
    message: z.string().min(1, 'Mensaje vacío.')
});
type FormValues = z.infer<typeof formSchema>;

export default function Contact() {
    const [isPhoneRevealed, setIsPhoneRevealed] = useState(false);
    const phoneNumberEncoded = 'KzM0IDYzNSA5NDUgNzc5'; // +34 635 945 779
    
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: '', email: '', message: '' }
    });

    const handlePhoneClick = (e: React.MouseEvent) => {
        // Track event
        (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({
            event: 'contact_click',
            category: 'engagement',
            label: 'phone_reveal'
        });
        if (!isPhoneRevealed) {
            e.preventDefault();
            setIsPhoneRevealed(true);
        }
    };

    const getPhoneNumber = () => {
        try { return atob(phoneNumberEncoded); } catch { return ''; }
    };

    const onSubmit = async (data: FormValues) => {
        try {
            const formPayload = new FormData();
            formPayload.append('name', data.name);
            formPayload.append('email', data.email);
            formPayload.append('message', data.message);
            formPayload.append('_subject', 'Transmisión técnica desde Portfolio');

            const response = await fetch("https://formsubmit.co/ajax/contacto@pedroubedasanchez.es", {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formPayload
            });

            const result = await response.json();
            if (result.success === "true" || result.success === true) {
                toast.success('¡Transmisión Exitosa!', {
                    description: 'He recibido su mensaje encriptado. Procederé a revisarlo a la brevedad.',
                    icon: <Send className="w-4 h-4 text-cyan-400" />
                });
                reset();
            } else {
                throw new Error(result.message || 'Fallo en la transmisión.');
            }
        } catch {
            toast.error('Error crítico', {
                description: 'Fallo en el enlace de comunicación. Reintegre el envío.',
            });
        }
    };

    return (
        <div className="bg-grid-pattern min-h-screen pt-24 md:pt-32 pb-24">
            <Helmet>
                <title>Contacto | Pedro Úbeda Sánchez</title>
                <meta name="description" content="Establezca comunicación con Pedro Úbeda Sánchez para consultas técnicas o profesionales." />
                <link rel="canonical" href="https://pedroubedasanchez.es/#contact" />
                
                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://pedroubedasanchez.es/#contact" />
                <meta property="og:title" content="Contacto | Pedro Úbeda Sánchez" />
                <meta property="og:description" content="Canales oficiales para contactar con Pedro Úbeda Sánchez." />
                <meta property="og:image" content="https://pedroubedasanchez.es/og-image.png" />
                
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Contacto | Pedro Úbeda Sánchez" />
                <meta name="twitter:description" content="Canales oficiales para contactar con Pedro Úbeda Sánchez." />
                <meta name="twitter:image" content="https://pedroubedasanchez.es/og-image.png" />
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
                                        <a 
                                            href="mailto:contacto@pedroubedasanchez.es" 
                                            onClick={() => {
                                                (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({
                                                    event: 'contact_click',
                                                    category: 'engagement',
                                                    label: 'email'
                                                });
                                            }}
                                            className="text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                                        >
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
                                        <a 
                                            href="https://linkedin.com/in/pubesan" 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            onClick={() => {
                                                (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({
                                                    event: 'contact_click',
                                                    category: 'engagement',
                                                    label: 'linkedin'
                                                });
                                            }}
                                            className="text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                                        >
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

                            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Identificación</label>
                                        <input
                                            type="text"
                                            placeholder="Su nombre"
                                            {...register("name")}
                                            className={`input-tech ${errors.name ? 'border-red-500/50' : ''}`}
                                        />
                                        {errors.name && <p className="text-red-400 text-xs italic">{errors.name.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Procedencia</label>
                                        <input
                                            type="email"
                                            placeholder="su@email.com"
                                            {...register("email")}
                                            className={`input-tech ${errors.email ? 'border-red-500/50' : ''}`}
                                        />
                                        {errors.email && <p className="text-red-400 text-xs italic">{errors.email.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Mensaje técnico</label>
                                    <textarea
                                        rows={6}
                                        placeholder="Describa el motivo de su consulta..."
                                        {...register("message")}
                                        className={`input-tech resize-none ${errors.message ? 'border-red-500/50' : ''}`}
                                    />
                                    {errors.message && <p className="text-red-400 text-xs italic">{errors.message.message}</p>}
                                </div>

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
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
