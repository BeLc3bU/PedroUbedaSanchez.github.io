import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
    title: "Contacto | Pedro Úbeda Sánchez",
    description:
        "Establezca comunicación con Pedro Úbeda Sánchez para consultas técnicas o profesionales.",
    alternates: {
        canonical: "https://pedroubedasanchez.es/contact",
    },
};

export default function ContactPage() {
    return (
        <div className="bg-grid min-h-screen pt-24 md:pt-32 pb-24 bg-background">
            <ContactForm />
        </div>
    );
}
