---
version: alpha
name: Soft Gradients
description: Gentle surfaces, pastel accents, and soft depth without visual noise.
colorScheme: light
colors:
  background: "#f8f3ff"
  foreground: "#24172f"
  card: "#fffbff"
  primary: "#7c3aed"
  primary-foreground: "#ffffff"
  secondary: "#eadcfb"
  muted: "#efe4fb"
  muted-foreground: "#75647e"
  border: "#e4d4f4"
  input: "#e4d4f4"
  ring: "#a855f7"
  accent: "#ec4899"
typography:
  body-md:
    fontFamily: "Poppins"
  headline-display:
    fontFamily: "Poppins"
rounded:
  base: 18px
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

# Soft Gradients — Design Reference

> Gentle surfaces, pastel accents, and soft depth without visual noise.

**Theme:** light
**Flavor:** Soft Gradients

## Visual Character
Create a calm modern mood with blurred color washes, rounded cards, and smooth transitions.

## Tokens
Canvas is pale lavender white. Accent is violet. Cards use translucent surfaces and plush radius.

## Components
Buttons are rounded and softly colored. Cards may use subtle tint and internal glow.

## Do's and Don'ts
Do keep gradients quiet and supportive. Do not let pastel color reduce contrast or readability.
