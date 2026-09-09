---
version: alpha
name: Clean SaaS
description: A practical product site with calm blue accents, clear cards, and conversion focused structure.
colorScheme: light
colors:
  background: "#f8fafc"
  foreground: "#101828"
  card: "#ffffff"
  primary: "#2563eb"
  primary-foreground: "#ffffff"
  secondary: "#e8eef8"
  muted: "#eef2f7"
  muted-foreground: "#667085"
  border: "#d9e2ef"
  input: "#d9e2ef"
  ring: "#2563eb"
  accent: "#2563eb"
typography:
  body-md:
    fontFamily: "Manrope"
  headline-display:
    fontFamily: "Manrope"
rounded:
  base: 12px
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

# Clean SaaS — Design Reference

> A practical product site with calm blue accents, clear cards, and conversion focused structure.

**Theme:** light
**Flavor:** Clean SaaS

## Visual Character
Prioritize clarity, trust, and product usefulness. The page should feel ready for a serious B2B workflow.

## Tokens
Canvas is cool white. Accent is confident blue. Cards use soft elevation, clear borders, and medium radius.

## Components
Buttons are solid for primary actions and soft for secondary actions. Tables and cards should scan quickly.

## Do's and Don'ts
Do use clear hierarchy and measured density. Do not make the page decorative before it is understandable.
