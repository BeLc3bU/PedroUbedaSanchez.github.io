import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TimelineItem from "./TimelineItem";

describe("TimelineItem Component", () => {
    const mockProps = {
        title: "Ingeniero de Sistemas",
        company: "Fuerzas Armadas",
        period: "2015 - 2024",
        highlights: ["Mantenimiento preventivo", "Diagnóstico de aviónica"],
        technologies: ["Electrónica", "Simuladores", "Redes"],
    };

    it("should render title, company and period correctly", () => {
        render(<TimelineItem {...mockProps} />);

        expect(screen.getByText(/Ingeniero de Sistemas @ Fuerzas Armadas/i)).toBeInTheDocument();
        expect(screen.getByText("Fuerzas Armadas")).toBeInTheDocument();
        expect(screen.getByText("2015 - 2024")).toBeInTheDocument();
    });

    it("should render all highlights and technologies", () => {
        render(<TimelineItem {...mockProps} />);

        expect(screen.getByText("Mantenimiento preventivo")).toBeInTheDocument();
        expect(screen.getByText("Diagnóstico de aviónica")).toBeInTheDocument();
        expect(screen.getByText("Electrónica")).toBeInTheDocument();
        expect(screen.getByText("Simuladores")).toBeInTheDocument();
        expect(screen.getByText("Redes")).toBeInTheDocument();
    });
});
