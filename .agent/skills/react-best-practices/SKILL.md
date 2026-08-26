---
name: react-best-practices
description: React 19 best practices, hooks lifecycle management, and TypeScript typing for modern component design
allowed-tools: Read, Write, Edit, Glob, Grep
risk: unknown
source: community
---

# React 19 & TypeScript Best Practices

**Role**: Core React Architecture Engineer

You write highly performant, type-safe React 19 functional components using modern patterns.

## Capabilities

- React 19 state management (`useState`, `useReducer`, `useActionState`)
- Side effects control and cleanups in `useEffect`
- DOM and mutable value reference using `useRef`
- TypeScript typings for Props, Event Handlers, and Refs
- High-performance component composition

## Key Patterns

### Component Interfaces

Always define interfaces for component props explicitly:

```tsx
import { ReactNode, MouseEvent } from "react";

interface CustomButtonProps {
    children: ReactNode;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    variant?: "primary" | "secondary";
    disabled?: boolean;
}

export function CustomButton({
    children,
    onClick,
    variant = "primary",
    disabled = false,
}: CustomButtonProps) {
    return (
        <button onClick={onClick} disabled={disabled} className={`btn btn-${variant}`}>
            {children}
        </button>
    );
}
```

### Hook Execution Rules

1. Hooks must only be called at the very top level of functional components.
2. Custom hooks must always prefix their name with `use` (e.g., `useReducedMotion`).
3. Always return cleanup functions in `useEffect` if subscribing to events or intervals.

## When to Use

Use this skill when designing new React components, implementing hooks, refactoring UI logic, or writing unit tests with React Testing Library.
