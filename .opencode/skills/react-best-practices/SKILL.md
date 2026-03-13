---
name: react-best-practices
description: React best practices, hooks usage, and component patterns for modern React applications
license: MIT
compatibility: opencode
metadata:
  audience: developers
  workflow: development
---

## What I do
- Apply React 19 best practices
- Use functional components with hooks (useState, useEffect, useContext, useRef)
- Implement proper component composition patterns
- Optimize performance with useMemo and useCallback
- Follow proper TypeScript typing for React components

## When to use me
Use this when:
- Creating new React components
- Refactoring existing React code
- Adding new features to React applications
- Optimizing React component performance

## Key Principles

### Component Structure
```tsx
// ✅ Correcto - Componentes funcionales con tipos
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn btn-${variant}`}>
      {children}
    </button>
  );
}
```

### Hooks Rules
- Always call hooks at the top level (not inside loops, conditions, or nested functions)
- Only call hooks from React functions (components or custom hooks)
- Use useMemo for expensive calculations
- Use useCallback for function references that change infrequently

### Performance
- Use React.memo for components that render often with same props
- Implement code splitting with React.lazy() for large components
- Avoid inline functions in JSX that recreate on every render
- Use proper key props in lists

## Project Context
This portfolio uses:
- React 19 with TypeScript
- Vite as build tool
- Tailwind CSS for styling
- Framer Motion for animations
