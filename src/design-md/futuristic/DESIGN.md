---
version: alpha
name: Futuristic
description: Spatial product UI with glass surfaces, synthetic light, and precise geometry.
colorScheme: dark
colors:
  background: "#07111f"
  foreground: "#edf7ff"
  card: "#0f1d2f"
  primary: "#38d5ff"
  primary-foreground: "#03111a"
  secondary: "#14283f"
  muted: "#101f31"
  muted-foreground: "#91a4b8"
  border: "#254761"
  input: "#254761"
  ring: "#38d5ff"
  accent: "#38d5ff"
typography:
  body-md:
    fontFamily: "SF Pro Text"
  headline-display:
    fontFamily: "SF Pro Display"
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

# Futuristic — Design Reference

> Spatial product UI with glass surfaces, synthetic light, and precise geometry.

**Theme:** dark
**Flavor:** Futuristic

## Visual Character
Use depth and light to suggest advanced systems while keeping navigation and content clear.

## Tokens
Canvas is blue black. Accent is cyan. Cards use translucent panels, fine borders, and large radius.

## Components
Buttons are sleek pills. Cards can layer. Tabs and tables should feel like control room surfaces.

## Do's and Don'ts
Do tie futuristic effects to product meaning. Do not use vague sci fi decoration.
