import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProjectCard } from "./ProjectCard";

const mockProject = {
    id: "1",
    title: "Test Project",
    category: "Web Development",
    description: "A test project description",
    tags: ["React", "TypeScript"],
    icon: "Cpu",
    link: "https://example.com",
    github: "https://github.com/test",
};

describe("ProjectCard", () => {
    it("renders project title", () => {
        render(<ProjectCard project={mockProject} index={0} />);
        expect(screen.getByText("Test Project")).toBeInTheDocument();
    });

    it("renders project description", () => {
        render(<ProjectCard project={mockProject} index={0} />);
        expect(screen.getByText("A test project description")).toBeInTheDocument();
    });

    it("renders project category", () => {
        render(<ProjectCard project={mockProject} index={0} />);
        expect(screen.getByText("Web Development")).toBeInTheDocument();
    });

    it("renders project tags", () => {
        render(<ProjectCard project={mockProject} index={0} />);
        expect(screen.getByText("React")).toBeInTheDocument();
        expect(screen.getByText("TypeScript")).toBeInTheDocument();
    });
});
