import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BentoCard, BentoGrid } from "./BentoCard";

describe("BentoGrid", () => {
    it("renders children successfully", () => {
        render(
            <BentoGrid>
                <div data-testid="child-1">Child 1</div>
                <div data-testid="child-2">Child 2</div>
            </BentoGrid>
        );

        expect(screen.getByTestId("child-1")).toBeInTheDocument();
        expect(screen.getByTestId("child-2")).toBeInTheDocument();
    });

    it("applies default grid styles", () => {
        const { container } = render(<BentoGrid>Test</BentoGrid>);
        const gridDiv = container.firstChild as HTMLElement;

        expect(gridDiv).toHaveClass("grid");
        expect(gridDiv).toHaveClass("grid-cols-1");
    });
});

describe("BentoCard", () => {
    it("renders children successfully", () => {
        render(
            <BentoCard>
                <div data-testid="card-child">Card Child</div>
            </BentoCard>
        );

        expect(screen.getByTestId("card-child")).toBeInTheDocument();
    });

    it("applies colSpan custom classes", () => {
        render(
            <BentoCard colSpan="md:col-span-2">
                <div>Content</div>
            </BentoCard>
        );

        const card = screen.getByText("Content").parentElement;
        expect(card).toHaveClass("md:col-span-2");
    });

    it("applies extra className custom styles", () => {
        render(
            <BentoCard className="bg-red-500">
                <div>Content</div>
            </BentoCard>
        );

        const card = screen.getByText("Content").parentElement;
        expect(card).toHaveClass("bg-red-500");
    });
});
