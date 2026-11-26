"use client";

import { useMemo, useState } from "react";
import { Mail, Phone, MessageSquare, Send, AlertCircle } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/BrandIcons";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { portfolioData } from "@/data/portfolio";
import { useLanguage } from "@/hooks/useLanguage";

const MAX_MESSAGE_LENGTH = 2000;

interface ContactValidationMessages {
    nameRequired: string;
    nameMin: string;
    emailInvalid: string;
    messageRequired: string;
    messageMin: string;
    messageMax: string;
}

function createContactSchema(messages: ContactValidationMessages) {
    return z.object({
        name: z.string().trim().min(1, messages.nameRequired).min(2, messages.nameMin),
        email: z.string().trim().email(messages.emailInvalid),
        message: z
            .string()
            .trim()
            .min(1, messages.messageRequired)
            .min(10, messages.messageMin)
            .max(MAX_MESSAGE_LENGTH, messages.messageMax),
        website_hp: z.string().optional(),
    });
}

type FormValues = z.infer<ReturnType<typeof createContactSchema>>;

export default function ContactForm() {
    const { t } = useLanguage();
    const [isPhoneRevealed, setIsPhoneRevealed] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const phoneNumberEncoded = "KzM0IDYzNSA5NDUgNzc5"; // +34 635 945 779

    const formSchema = useMemo(
        () => createContactSchema(t.contact.validation),
        [t.contact.validation]
    );

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: "onTouched",
        reValidateMode: "onChange",
        defaultValues: { name: "", email: "", message: "", website_hp: "" },
    });

    const watchedMessage = useWatch({ control, name: "message", defaultValue: "" });
    const messageLength = watchedMessage?.length ?? 0;

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
        setSubmitError(null);

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
            setSubmitError(t.contact.toastErrorDesc);
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
                                    <LinkedinIcon size={20} />
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
                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
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
                            <label
                                htmlFor="contact-name"
                                className="text-xs font-mono text-muted-foreground uppercase tracking-wider"
                            >
                                {t.contact.nameLabel}
                            </label>
                            <input
                                id="contact-name"
                                {...register("name")}
                                placeholder={t.contact.namePlaceholder}
                                aria-invalid={Boolean(errors.name)}
                                aria-describedby={errors.name ? "contact-name-error" : undefined}
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-cyan-500/50 aria-[invalid=true]:border-rose-500/70 transition-colors"
                            />
                            {errors.name && (
                                <p
                                    id="contact-name-error"
                                    role="alert"
                                    className="text-xs text-rose-500 font-mono"
                                >
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="contact-email"
                                className="text-xs font-mono text-muted-foreground uppercase tracking-wider"
                            >
                                {t.contact.emailInputLabel}
                            </label>
                            <input
                                id="contact-email"
                                {...register("email")}
                                type="email"
                                placeholder={t.contact.emailPlaceholder}
                                aria-invalid={Boolean(errors.email)}
                                aria-describedby={errors.email ? "contact-email-error" : undefined}
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-cyan-500/50 aria-[invalid=true]:border-rose-500/70 transition-colors"
                            />
                            {errors.email && (
                                <p
                                    id="contact-email-error"
                                    role="alert"
                                    className="text-xs text-rose-500 font-mono"
                                >
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                                <label
                                    htmlFor="contact-message"
                                    className="text-xs font-mono text-muted-foreground uppercase tracking-wider"
                                >
                                    {t.contact.messageLabel}
                                </label>
                                <span
                                    aria-live="polite"
                                    className="text-[11px] font-mono text-muted-foreground"
                                >
                                    {messageLength}/{MAX_MESSAGE_LENGTH}{" "}
                                    {t.contact.validation.charCount}
                                </span>
                            </div>
                            <textarea
                                id="contact-message"
                                {...register("message")}
                                rows={5}
                                maxLength={MAX_MESSAGE_LENGTH}
                                placeholder={t.contact.messagePlaceholder}
                                aria-invalid={Boolean(errors.message)}
                                aria-describedby={
                                    errors.message ? "contact-message-error" : undefined
                                }
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-cyan-500/50 aria-[invalid=true]:border-rose-500/70 transition-colors resize-none"
                            />
                            {errors.message && (
                                <p
                                    id="contact-message-error"
                                    role="alert"
                                    className="text-xs text-rose-500 font-mono"
                                >
                                    {errors.message.message}
                                </p>
                            )}
                        </div>

                        {submitError && (
                            <div
                                role="alert"
                                className="flex items-center gap-2 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-xs font-mono text-rose-400"
                            >
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span>{submitError}</span>
                            </div>
                        )}

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
