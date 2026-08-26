"use client";

import { useState } from "react";
import { Mail, Phone, Linkedin, MessageSquare, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { portfolioData } from "@/data/portfolio";
import { useLanguage } from "@/hooks/useLanguage";

const formSchema = z.object({
    name: z.string().min(1, "Identidad requerida."),
    email: z.string().email("Formato de comunicación no válido."),
    message: z.string().min(1, "Mensaje vacío."),
    website_hp: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
    const { t } = useLanguage();
    const [isPhoneRevealed, setIsPhoneRevealed] = useState(false);
    const phoneNumberEncoded = "KzM0IDYzNSA5NDUgNzc5"; // +34 635 945 779

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: "", email: "", message: "", website_hp: "" },
    });

    const handlePhoneClick = (e: React.MouseEvent) => {
        (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({
            event: "contact_click",
            category: "engagement",
            label: "phone_reveal",
        });
        if (!isPhoneRevealed) {
            e.preventDefault();
            setIsPhoneRevealed(true);
        }
    };

    const getPhoneNumber = () => {
        try {
            return atob(phoneNumberEncoded);
        } catch {
            return "";
        }
    };

    const onSubmit = async (data: FormValues) => {
        // Blindaje Honeypot: si el bot llena el campo señuelo, simular éxito sin enviar a API
        if (data.website_hp && data.website_hp.trim().length > 0) {
            toast.success(t.contact.toastSuccessTitle, {
                description: t.contact.toastSuccessDesc,
                icon: <Send className="w-4 h-4 text-cyan-400" />,
            });
            reset();
            return;
        }

        try {
            const formPayload = new FormData();
            formPayload.append("name", data.name);
            formPayload.append("email", data.email);
            formPayload.append("message", data.message);
            formPayload.append("_subject", "Transmisión técnica desde Portfolio");

            const response = await fetch(
                "https://formsubmit.co/ajax/contacto@pedroubedasanchez.es",
                {
                    method: "POST",
                    headers: { Accept: "application/json" },
                    body: formPayload,
                }
            );

            const result = await response.json();
            if (result.success === "true" || result.success === true) {
                toast.success(t.contact.toastSuccessTitle, {
                    description: t.contact.toastSuccessDesc,
                    icon: <Send className="w-4 h-4 text-cyan-400" />,
                });
                reset();
            } else {
                throw new Error(result.message || "Fallo en la transmisión.");
            }
        } catch {
            toast.error(t.contact.toastErrorTitle, {
                description: t.contact.toastErrorDesc,
            });
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 md:px-6">
            {/* Header del formulario */}
            <div className="text-center max-w-2xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-mono mb-4 uppercase tracking-widest">
                    <MessageSquare size={12} className="animate-pulse" /> {t.contact.badge}
                </div>
                <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">
                    {t.contact.title}
                </h1>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    {t.contact.subtitle}
                </p>
            </div>

            <div className="grid md:grid-cols-12 gap-8 items-start">
                {/* Información de Enlace Lateral */}
                <div className="md:col-span-5 space-y-6">
                    <div className="bg-card border border-border rounded-3xl p-6 md:p-8 space-y-6">
                        <h2 className="text-xl font-bold tracking-tight mb-4">
                            {t.contact.channelsTitle}
                        </h2>

                        <div className="space-y-4">
                            <a
                                href={`mailto:${portfolioData.social.email}`}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/35 border border-transparent hover:border-cyan-500/20 hover:bg-cyan-950/5 transition-all group"
                            >
                                <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl group-hover:bg-cyan-500 group-hover:text-cyan-950 transition-all">
                                    <Mail size={20} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs text-muted-foreground font-mono">
                                        {t.contact.emailLabel}
                                    </p>
                                    <p className="text-sm font-medium truncate">
                                        {portfolioData.social.email}
                                    </p>
                                </div>
                            </a>

                            <a
                                href={isPhoneRevealed ? `tel:${getPhoneNumber()}` : "#"}
                                onClick={handlePhoneClick}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/35 border border-transparent hover:border-cyan-500/20 hover:bg-cyan-950/5 transition-all group"
                            >
                                <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl group-hover:bg-cyan-500 group-hover:text-cyan-950 transition-all">
                                    <Phone size={20} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs text-muted-foreground font-mono">
                                        {t.contact.phoneLabel}
                                    </p>
                                    <p className="text-sm font-medium">
                                        {isPhoneRevealed ? getPhoneNumber() : t.contact.phoneReveal}
                                    </p>
                                </div>
                            </a>

                            <a
                                href={portfolioData.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/35 border border-transparent hover:border-cyan-500/20 hover:bg-cyan-950/5 transition-all group"
                            >
                                <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl group-hover:bg-cyan-500 group-hover:text-cyan-950 transition-all">
                                    <Linkedin size={20} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs text-muted-foreground font-mono">
                                        {t.contact.linkedinLabel}
                                    </p>
                                    <p className="text-sm font-medium">
                                        linkedin.com/in/pedroubedasanchez
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Formulario de Transmisión */}
                <div className="md:col-span-7 bg-card border border-border rounded-3xl p-6 md:p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Campo señuelo Honeypot para mitigación de bots */}
                        <div className="hidden" aria-hidden="true">
                            <label htmlFor="website_hp">Website</label>
                            <input
                                id="website_hp"
                                type="text"
                                {...register("website_hp")}
                                tabIndex={-1}
                                autoComplete="off"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                                {t.contact.nameLabel}
                            </label>
                            <input
                                {...register("name")}
                                placeholder={t.contact.namePlaceholder}
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-cyan-500/50 transition-colors"
                            />
                            {errors.name && (
                                <p className="text-xs text-rose-500 font-mono">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                                {t.contact.emailInputLabel}
                            </label>
                            <input
                                {...register("email")}
                                type="email"
                                placeholder={t.contact.emailPlaceholder}
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-cyan-500/50 transition-colors"
                            />
                            {errors.email && (
                                <p className="text-xs text-rose-500 font-mono">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                                {t.contact.messageLabel}
                            </label>
                            <textarea
                                {...register("message")}
                                rows={5}
                                placeholder={t.contact.messagePlaceholder}
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                            />
                            {errors.message && (
                                <p className="text-xs text-rose-500 font-mono">
                                    {errors.message.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 px-6 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-[0_4px_20px_rgba(6,182,212,0.15)] flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <Send size={18} />
                            )}
                            {isSubmitting ? t.contact.submittingBtn : t.contact.submitBtn}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
