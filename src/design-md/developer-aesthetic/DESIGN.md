---
version: alpha
name: Developer Aesthetic
description: A code adjacent design language with command surfaces, monospace details, and compact precision.
colorScheme: dark
colors:
  background: "#0b0f14"
  foreground: "#e6edf3"
  card: "#0f1620"
  primary: "#7ee787"
  primary-foreground: "#031006"
  secondary: "#161f2a"
  muted: "#111820"
  muted-foreground: "#8b949e"
  border: "#263241"
  input: "#263241"
  ring: "#7ee787"
  accent: "#7ee787"
typography:
  body-md:
    fontFamily: "SF Pro Text"
  headline-display:
    fontFamily: "SFMono-Regular"
rounded:
  base: 8px
spacing:
  base: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.body-md}"
    rounded: "{rounded.base}"
    padding: "{spacing.md}"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.foreground}"
  input-field:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.base}"
---

# Developer Aesthetic — Design Reference

> A code adjacent design language with command surfaces, monospace details, and compact precision.

**Theme:** dark
**Flavor:** Developer Aesthetic

## Visual Character
Make the product feel inspectable. Tabs, token panels, logs, and dense controls are part of the visual grammar.

## Tokens
Canvas is deep graphite. Accent is terminal green. Mono labels support a clean sans base.

## Components
Buttons are compact. Cards resemble panels. Tables and code snippets carry credibility.

## Do's and Don'ts
Do make technical details functional. Do not add fake code decoration.
