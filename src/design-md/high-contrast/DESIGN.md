---
version: alpha
name: High Contrast
description: Sharp black and white composition with direct hierarchy and bold action states.
colorScheme: light
colors:
  background: "#ffffff"
  foreground: "#000000"
  card: "#ffffff"
  primary: "#000000"
  primary-foreground: "#ffffff"
  secondary: "#fff066"
  muted: "#f1f1f1"
  muted-foreground: "#3f3f3f"
  border: "#000000"
  input: "#000000"
  ring: "#000000"
  accent: "#ffe500"
typography:
  body-md:
    fontFamily: "SF Pro Text"
  headline-display:
    fontFamily: "Avenir Next"
rounded:
  base: 0px
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

# High Contrast — Design Reference

> Sharp black and white composition with direct hierarchy and bold action states.

**Theme:** mixed
**Flavor:** High Contrast

## Visual Character
Use strong separation and decisive typography. Every section should read instantly.

## Tokens
Canvas is white. Text is black. Accent is signal yellow. Borders are strong and radius is minimal.

## Components
Buttons are high impact. Cards use visible frames. Tables should be crisp and accessible.

## Do's and Don'ts
Do privilege legibility and keyboard focus. Do not rely on subtle tint differences.
