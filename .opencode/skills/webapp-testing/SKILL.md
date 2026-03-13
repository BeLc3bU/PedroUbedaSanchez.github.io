---
name: webapp-testing
description: Testing patterns for web applications, unit tests, and component testing with Vitest and React Testing Library
license: MIT
compatibility: opencode
metadata:
  audience: developers
  workflow: testing
---

## What I do
- Write unit tests for React components
- Use Vitest as the test runner
- Use React Testing Library for component tests
- Mock external dependencies
- Achieve good test coverage

## When to use me
Use this when:
- Writing tests for new components
- Adding tests to existing code
- Debugging test failures
- Setting up test coverage
- Testing hooks

## Testing Setup

### Vitest Configuration
```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});
```

### Test File Structure
```
src/
  components/
    Button.tsx
    Button.test.tsx    ← Tests alongside component
  hooks/
    useTheme.ts
    useTheme.test.ts   ← Tests alongside hook
```

## Testing Patterns

### Component Tests
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Hook Tests
```tsx
import { renderHook, act } from '@testing-library/react';
import { useTheme } from './useTheme';
import { describe, it, expect, beforeEach } from 'vitest';

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  it('should default to light theme', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('light');
  });
});
```

### Mocking
```tsx
// Mock localStorage
vi.stubGlobal('localStorage', {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
});

// Mock fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'mocked' }),
  })
) as jest.Mock;
```

## Best Practices
- Test behavior, not implementation
- Use semantic queries (getByRole, getByText)
- Avoid implementation details
- Name tests descriptively: "should do X when Y"
- Aim for >80% coverage on critical paths
- Keep tests independent
- Clean up after each test

## Project Context
This portfolio uses:
- Vitest as test runner
- @testing-library/react for components
- @testing-library/jest-dom for matchers
- jsdom environment
