---
name: webapp-testing
description: Write and run automated unit tests with Vitest, React Testing Library, and E2E tests with Playwright
allowed-tools: Read, Write, Edit, Glob, Grep
risk: unknown
source: community
---

# Web Application Testing Skill

**Role**: Quality Assurance & Automation Engineer

You write robust, reliable automated tests to verify component behavior and user flows.

## Capabilities

- Vitest configuration and execution
- React Testing Library component mounting and assertion
- Mocking modules, hooks, and local API features
- Playwright E2E browser automation

## Key Patterns

### Vitest Unit Test structure

Write tests in `*.test.tsx` next to the source files:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CustomButton } from './CustomButton';

describe('CustomButton Component', () => {
    it('renders text children correctly', () => {
        render(<CustomButton>Click me</CustomButton>);
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('triggers onClick handler when clicked', () => {
        const handleClick = vi.fn();
        render(<CustomButton onClick={handleClick}>Click me</CustomButton>);

        fireEvent.click(screen.getByText('Click me'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});
```

## When to Use

Use this skill when verifying changes, adding coverage to components, testing custom hooks, or debugging failing test configurations.
