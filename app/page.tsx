import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
    title: "Pedro Úbeda Sánchez | Software Developer & IT Infrastructure",
    description:
        "Portfolio personal de Pedro Úbeda Sánchez, especialista en mantenimiento de sistemas de aviónica, redes y desarrollo de software.",
    alternates: {
        canonical: "https://pedroubedasanchez.es/",
    },
};

export default function HomePage() {
    return <HomeContent />;
}
