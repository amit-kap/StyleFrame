---
version: alpha
name: Industrial
description: Modular, mechanical, and operational with hard edges, grid rhythm, and safety color accents.
colorScheme: dark
colors:
  background: "#181818"
  foreground: "#f2efe6"
  card: "#1f1f1f"
  primary: "#ff7a1a"
  primary-foreground: "#1b1208"
  secondary: "#313131"
  muted: "#272727"
  muted-foreground: "#a8a195"
  border: "#4a4a4a"
  input: "#4a4a4a"
  ring: "#ff7a1a"
  accent: "#ff7a1a"
typography:
  body-md:
    fontFamily: "Avenir Next Condensed"
  headline-display:
    fontFamily: "Avenir Next Condensed"
rounded:
  base: 4px
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

# Industrial — Design Reference

> Modular, mechanical, and operational with hard edges, grid rhythm, and safety color accents.

**Theme:** dark
**Flavor:** Industrial

## Visual Character
Use robust structure, exposed dividers, utilitarian labels, and dense information surfaces.

## Tokens
Canvas is charcoal. Accent is safety orange. Borders are visible. Radius is tight.

## Components
Buttons feel like controls. Cards resemble modules. Tables should look durable and precise.

## Do's and Don'ts
Do preserve operational clarity. Do not soften the system until it loses its mechanical character.
