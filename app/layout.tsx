import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/BackToTop";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "500", "800"],
    variable: "--font-jetbrains-mono",
});

import ClientBackground from "@/components/ClientBackground";

export const metadata: Metadata = {
    title: {
        template: "%s | Pedro Úbeda Sánchez",
        default: "Pedro Úbeda Sánchez | Software Developer & IT Infrastructure",
    },
    description:
        "Portfolio personal de Pedro Úbeda Sánchez, especialista en mantenimiento de sistemas de aviónica, redes y desarrollo de software.",
    metadataBase: new URL("https://pedroubedasanchez.es"),
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        locale: "es_ES",
        url: "https://pedroubedasanchez.es/",
        siteName: "Pedro Úbeda Sánchez Portfolio",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Pedro Úbeda Sánchez Portfolio",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Pedro Úbeda Sánchez",
        description:
            "Portfolio personal de Pedro Úbeda Sánchez, especialista en mantenimiento de sistemas de aviónica, redes y desarrollo de software.",
        images: ["/og-image.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="es"
            className={`${jetbrainsMono.variable} scroll-smooth`}
            suppressHydrationWarning
        >
            <head>
                {/* Script de bloqueo de parpadeo para el tema oscuro */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
                    }}
                />
            </head>
            <body className="flex flex-col min-h-screen bg-background dark:bg-slate-900 text-foreground dark:text-slate-200 antialiased">
                <ClientBackground />

                {/* Skip to main content link for accessibility */}
                <a href="#main-content" className="skip-to-content">
                    Saltar al contenido principal
                </a>

                <Header />
                <main id="main-content" className="flex-grow flex flex-col">
                    {children}
                </main>
                <BackToTop />
                <Footer />
                <Toaster position="bottom-right" theme="dark" richColors />
            </body>
        </html>
    );
}
