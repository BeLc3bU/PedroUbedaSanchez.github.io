---
name: frontend-design
description: Frontend UI/UX design patterns, responsive design, and Augusto Polonio-inspired portfolio aesthetics
license: MIT
compatibility: opencode
metadata:
  audience: developers
  workflow: design
---

## What I do
- Create responsive, mobile-first designs
- Apply Augusto Polonio portfolio aesthetic
- Design with accessibility (WCAG 2.1) in mind
- Implement smooth animations and transitions
- Use modern UI patterns

## When to use me
Use this when:
- Creating new UI components
- Improving existing component design
- Adding animations to components
- Making designs responsive
- Following Augusto Polonio's portfolio style

## Key Design Patterns

### Mobile-First Approach
```tsx
// ✅ Correcto - Mobile first
<div className="w-full md:w-1/2 lg:w-1/3">
  Content
</div>
```

### Augusto Polonio Style Elements
- Hero section with avatar photo (top centered, rounded corners)
- Interactive terminal for exploring content
- Minimalist color scheme (zinc/neutral with accent color)
- Smooth scroll animations
- Social links in hero section
- Grid-based project cards

### Accessibility (WCAG 2.1)
- Use semantic HTML (header, main, section, footer)
- Ensure color contrast ratios meet AA standards
- Add aria-labels to interactive elements
- Support keyboard navigation
- Use focus indicators

### Animations
- Use Framer Motion for complex animations
- Keep animations subtle (opacity, transform)
- Respect prefers-reduced-motion
- Animate on scroll with viewport detection

## Project Context
This portfolio features:
- Hero section with avatar, typing animation, tags
- Interactive terminal
- Project cards grid
- Smooth scroll sections
- Dark/light mode support
- Custom color scheme (cyan accents, hueso/crema backgrounds)
