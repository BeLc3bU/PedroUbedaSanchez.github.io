---
name: react-testing
description: Write and maintain Vitest tests for React components
license: MIT
compatibility: opencode
metadata:
  audience: developers
  workflow: testing
---
## What I do
- Write unit tests using Vitest and @testing-library/react
- Create test files following naming conventions (*.test.tsx, *.spec.tsx)
- Test React hooks with @testing-library/react-hooks
- Mock dependencies and API calls
- Set up test environment with jsdom in vite.config.ts

## When to use me
Use this when you need to:
- Add new tests for components
- Fix failing tests
- Set up test infrastructure
- Write tests for custom hooks

## Testing patterns for this project
- Tests are in the same directory as components
- Use @testing-library/react for component testing
- Use describe/it/test blocks with Vitest
- Mock React hooks with vi.fn()
- Test user interactions with fireEvent or user-event
