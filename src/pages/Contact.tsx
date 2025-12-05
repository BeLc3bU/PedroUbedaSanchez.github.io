import { Helmet } from 'react-helmet-async';
import { useState, type ChangeEvent, type FormEvent } from 'react';

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
    // ----- Phone Obfuscation Logic -----
    const [isPhoneRevealed, setIsPhoneRevealed] = useState(false);
    const phoneNumberEncoded = 'KzM0IDYzNSA5NDUgNzc5'; // +34 635 945 779

    // ----- Form State -----
    const [formData, setFormData] = useState<FormState>({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState<ErrorsState>({});

    // ----- Phone Handler -----
    const handlePhoneClick = (e: React.MouseEvent) => {
        if (!isPhoneRevealed) {
            e.preventDefault();
            setIsPhoneRevealed(true);
        }
    };

    const getPhoneNumber = () => {
        try {
            return atob(phoneNumberEncoded);
        } catch {
            return '';
        }
    };

    // ----- Form Handlers -----
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error for this field when user types
        if (errors[name as keyof ErrorsState]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const validate = (): boolean => {
        const newErrors: ErrorsState = {};
        if (!formData.name.trim()) newErrors.name = 'Este campo es obligatorio.';
        if (!formData.email.trim()) {
            newErrors.email = 'Este campo es obligatorio.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Por favor, introduce una dirección de correo válida.';
        }
        if (!formData.message.trim()) newErrors.message = 'Este campo es obligatorio.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        setIsSuccess(false); // Reset success state
        setErrors({});

        try {
            const formPayload = new FormData();
            formPayload.append('name', formData.name);
            formPayload.append('email', formData.email);
            formPayload.append('message', formData.message);
            formPayload.append('_subject', 'Nuevo mensaje desde pedroubedasanchez.es (React)');
            // Simple honeypot handling if needed, usually just hidden input in JSX

            const response = await fetch("https://formsubmit.co/ajax/contacto@pedroubedasanchez.es", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formPayload
            });

            const data = await response.json();

            if (data.success === "true" || data.success === true) {
                setIsSuccess(true);
                setFormData({ name: '', email: '', message: '' });
            } else {
                throw new Error(data.message || 'Hubo un problema con el envío.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ general: 'Error: No se pudo enviar el mensaje. Inténtalo más tarde.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Contacto | Pedro Úbeda Sánchez</title>
                <meta name="description" content="Contacta con Pedro Úbeda Sánchez para oportunidades profesionales, colaboraciones o cualquier consulta. Rellena el formulario o envía un correo electrónico." />
                <link rel="canonical" href="https://pedroubedasanchez.es/contacto" />
            </Helmet>

            <section className="container mx-auto px-6 py-12 mb-24 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center text-slate-800 dark:text-slate-100 flex items-center justify-center gap-2">
                    <span aria-hidden="true">📌</span>
                    Contacto
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 text-center max-w-2xl mx-auto">
                    ¿Tienes alguna pregunta o propuesta? No dudes en contactarme.
                </p>

                <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
                    {/* Contact Info Grid */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-8 border-b border-slate-200 dark:border-slate-700 pb-8">
                        <div className="text-center md:text-left flex-1">
                            <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-center md:justify-start gap-2">
                                <span aria-hidden="true">✉️</span> Correo electrónico
                            </h3>
                            <a href="mailto:contacto@pedroubedasanchez.es" className="text-orange-700 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-500 break-all transition-colors">
                                contacto@pedroubedasanchez.es
                            </a>
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-center md:justify-start gap-2">
                                <span aria-hidden="true">📞</span> Teléfono
                            </h3>
                            <a
                                href={isPhoneRevealed ? `tel:${getPhoneNumber().replace(/\s/g, '')}` : '#'}
                                onClick={handlePhoneClick}
                                className="text-orange-700 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-500 transition-colors cursor-pointer"
                            >
                                {isPhoneRevealed ? getPhoneNumber() : 'Mostrar número'}
                            </a>
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-center md:justify-start gap-2">
                                <span aria-hidden="true">🔗</span> LinkedIn
                            </h3>
                            <a href="https://linkedin.com/in/pubesan" target="_blank" rel="noopener noreferrer" className="text-orange-700 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-500 transition-colors">
                                linkedin.com/in/pubesan
                            </a>
                        </div>
                    </div>

                    <div className="max-w-xl mx-auto">
                        {isSuccess ? (
                            <div className="text-center bg-green-100 dark:bg-green-900/50 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 px-4 py-8 rounded-lg shadow-md animate-in zoom-in duration-300">
                                <h3 className="font-bold text-2xl mb-2">¡Mensaje Enviado!</h3>
                                <p>Gracias por ponerte en contacto. He recibido tu mensaje y te responderé lo antes posible.</p>
                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="mt-6 inline-block bg-orange-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-800 dark:bg-orange-600 dark:hover:bg-orange-700 transition-colors"
                                >
                                    Enviar otro mensaje
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-slate-700 dark:text-slate-300 font-bold mb-2">Nombre</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-slate-700 dark:text-white dark:border-slate-600 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-slate-700 dark:text-slate-300 font-bold mb-2">Tu correo electrónico</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-slate-700 dark:text-white dark:border-slate-600 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>

                                <div className="mb-6">
                                    <label htmlFor="message" className="block text-slate-700 dark:text-slate-300 font-bold mb-2">Mensaje</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        maxLength={1000}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white dark:bg-slate-700 dark:text-white dark:border-slate-600 ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    <div className="flex justify-between items-start mt-1">
                                        <p className="text-red-500 text-sm">{errors.message}</p>
                                        <p className={`text-sm ml-auto ${formData.message.length > 900 ? 'text-orange-600 font-bold' : 'text-slate-500 dark:text-slate-400'}`}>
                                            {formData.message.length} / 1000
                                        </p>
                                    </div>
                                </div>

                                {errors.general && (
                                    <p className="text-red-500 text-sm text-center mb-4">{errors.general}</p>
                                )}

                                <div className="text-center">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-48 inline-flex items-center justify-center bg-orange-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-800 transition-all duration-300 shadow-lg transform hover:scale-105 disabled:bg-slate-400 disabled:scale-100 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <span className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></span>
                                        ) : (
                                            'Enviar mensaje'
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
