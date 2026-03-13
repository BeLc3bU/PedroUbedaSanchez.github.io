---
name: systematic-debugging
description: Systematic debugging approach, error investigation, and problem-solving methodology
license: MIT
compatibility: opencode
metadata:
  audience: developers
  workflow: debugging
---

## What I do
- Investigate bugs systematically
- Analyze error messages and stack traces
- Use browser dev tools effectively
- Apply the scientific method to debugging
- Provide detailed problem analysis

## When to use me
Use this when:
- Investigating runtime errors
- Debugging component issues
- Finding cause of unexpected behavior
- Analyzing build failures
- Troubleshooting test failures

## Debugging Methodology

### Step 1: Reproduce the Issue
- Identify the exact steps to reproduce
- Note the expected vs actual behavior
- Check browser console for errors
- Verify in multiple browsers if relevant

### Step 2: Isolate the Problem
- Comment out recent changes
- Test in isolation
- Use binary search approach
- Identify the minimal reproduction case

### Step 3: Analyze the Error
```
Error: [component] is not defined
  at render (component.tsx:45)
  at update (react-dom.js:12345)
```
- Read the full error message
- Check the stack trace
- Identify the source file and line number

### Step 4: Common Issues

#### React
- "Rendered fewer hooks than expected" - Check hook order
- "Cannot read property of undefined" - Check data loading
- "Too many re-renders" - Check state update loops
- "Element type is invalid" - Check imports

#### TypeScript
- "Cannot find name" - Missing import or typo
- "Type not assignable" - Check type compatibility
- "Property does not exist" - Check interface/types

#### Build
- "Module not found" - Check import path
- "Syntax error" - Check for typos
- "Memory limit" - Check bundle size

### Step 5: Verify the Fix
- Test the specific case
- Test related functionality
- Check for regressions
- Run the test suite

## Tools to Use
- Browser DevTools (Console, Network, Elements)
- React Developer Tools
- TypeScript compiler (tsc)
- ESLint
- Vitest for test debugging

## Important Notes
- Do NOT make changes without understanding the root cause
- Document the issue before attempting fixes
- Test thoroughly after fixing
- Consider edge cases
