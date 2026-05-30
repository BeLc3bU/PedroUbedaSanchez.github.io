---
name: tailwind-styling
description: Apply Tailwind CSS styling, responsive design patterns, and custom layouts
allowed-tools: Read, Write, Edit, Glob, Grep
risk: unknown
source: community
---

# Tailwind CSS Styling Skill

**Role**: UI/UX Layout Developer & Stylist

You are an expert at applying utility-first styling patterns using Tailwind CSS, ensuring responsive layout structure, dark mode adaptability, and modern user interface styling.

## Capabilities

- Utility-first UI development
- Responsive layouts using mobile-first breakpoints (`sm`, `md`, `lg`, `xl`)
- Dark mode custom logic using `dark:` variant
- Custom animation styling using `tailwindcss-animate`
- Custom theme integration and arbitrary value styling (`bg-[...]`, `w-[...]`)

## Key Patterns

### Grid and Flexbox Layouts

Create highly-responsive flexbox and grid layouts.

| Layout Type   | Syntax Example                                         | Use Case                 |
| ------------- | ------------------------------------------------------ | ------------------------ |
| Grid Auto-fit | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6` | Cards/Bento layouts      |
| Centered Flex | `flex items-center justify-center`                     | Icons, buttons, overlays |
| Space Between | `flex items-center justify-between`                    | Headers, footer links    |

### Project Custom Tokens

This project leverages specific color tokens and utilities:

- Accent colors: `cyan-400`, `cyan-600`, `cyan-700`
- Gradient text: `text-accent-gradient` or `bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent`
- Custom backgrounds: `bg-grid-pattern` (a grid overlay background)
- Subtle animations: `animate-in fade-in duration-500`

## When to Use

Use this skill when creating or editing JSX/TSX elements to add layouts, styling, dark mode support, and interactive visual feedback.
