"use client";

import { useState, useEffect, useCallback } from "react";
import { portfolioData } from "@/data/portfolio";
import { Download, ArrowLeft, Loader2, Globe } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import type { Locale } from "@/data/locales";
import Link from "next/link";

async function renderResumeBlob(locale: Locale): Promise<Blob> {
    const [{ pdf }, { default: CVDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/components/CVDocument"),
    ]);
    return pdf(<CVDocument locale={locale} />).toBlob();
}

function triggerBlobDownload(url: string, filename: string) {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export default function CVPage() {
    const { language, toggleLanguage, t } = useLanguage();
    const [loading, setLoading] = useState(false);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 0);
        let cancelled = false;
        let currentUrl: string | null = null;

        const generatePdf = async () => {
            try {
                const blob = await renderResumeBlob(language);
                if (cancelled) return;
                const url = URL.createObjectURL(blob);
                currentUrl = url;
                setPdfUrl(url);
            } catch (error) {
                console.error("Error generating PDF:", error);
            }
        };

        generatePdf();

        return () => {
            cancelled = true;
            clearTimeout(timer);
            if (currentUrl) {
                URL.revokeObjectURL(currentUrl);
            }
        };
    }, [language]);

    const handleDownload = useCallback(async () => {
        const filename = `${portfolioData.name.replace(/\s+/g, "_")}_Resume_${language.toUpperCase()}.pdf`;
        if (pdfUrl) {
            triggerBlobDownload(pdfUrl, filename);
            return;
        }

        setLoading(true);
        try {
            const blob = await renderResumeBlob(language);
            const url = URL.createObjectURL(blob);
            triggerBlobDownload(url, filename);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setLoading(false);
        }
    }, [language, pdfUrl]);

    if (!mounted) {
        return (
            <div className="flex items-center justify-center h-screen bg-zinc-100 dark:bg-zinc-900">
                <Loader2 size={48} className="animate-spin text-cyan-600" />
            </div>
        );
    }

    return (
        <div className="h-screen w-screen overflow-hidden bg-zinc-100 dark:bg-zinc-900 relative">
            {/* Header flotante */}
            <div className="fixed top-4 left-4 z-50">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-white dark:hover:bg-zinc-800 transition-colors shadow-sm"
                >
                    <ArrowLeft size={18} />
                    {t.cv.back}
                </Link>
            </div>

            {/* Controles flotantes derechos */}
            <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
                <button
                    onClick={toggleLanguage}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700 rounded-lg text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-white dark:hover:bg-zinc-800 transition-colors shadow-sm"
                    aria-label={t.nav.languageToggle}
                >
                    <Globe size={14} className="text-cyan-600 dark:text-cyan-400" />
                    {language === "es" ? (
                        <span>
                            <strong className="text-cyan-600 dark:text-cyan-400">ES</strong> / EN
                        </span>
                    ) : (
                        <span>
                            ES / <strong className="text-cyan-600 dark:text-cyan-400">EN</strong>
                        </span>
                    )}
                </button>

                <button
                    onClick={handleDownload}
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium disabled:opacity-50 shadow-sm text-sm"
                >
                    {loading ? (
                        <Loader2 size={18} className="animate-spin" />
                    ) : (
                        <Download size={18} />
                    )}
                    {loading ? t.cv.generating : t.cv.download}
                </button>
            </div>

            {/* PDF Viewer */}
            {pdfUrl ? (
                <iframe
                    src={pdfUrl}
                    className="w-full h-full border-none pt-16 md:pt-0"
                    title="Resume PDF"
                />
            ) : (
                <div className="flex items-center justify-center h-full">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 size={48} className="animate-spin text-cyan-600" />
                        <p className="text-zinc-600 dark:text-zinc-400">{t.cv.loading}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
