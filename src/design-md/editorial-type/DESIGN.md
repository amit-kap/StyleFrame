---
version: alpha
name: Editorial Type
description: Magazine scale typography, generous rhythm, and a composed publishing mood.
colorScheme: light
colors:
  background: "#f3eadc"
  foreground: "#1d1814"
  card: "#fbf5ea"
  primary: "#4d1724"
  primary-foreground: "#fff8ee"
  secondary: "#e5dac8"
  muted: "#e5dac8"
  muted-foreground: "#6b6259"
  border: "#cdbda7"
  input: "#cdbda7"
  ring: "#8f2f45"
  accent: "#8f2f45"
typography:
  body-md:
    fontFamily: "Avenir Next"
  headline-display:
    fontFamily: "Georgia"
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

# Editorial Type — Design Reference

> Magazine scale typography, generous rhythm, and a composed publishing mood.

**Theme:** light
**Flavor:** Editorial Type

## Visual Character
Let typography create the drama. Use strong headlines, long measures, and restrained supporting UI.

## Tokens
Canvas is paper toned. Text is ink. Accent is wine. Radius is small and shadows are nearly absent.

## Components
Buttons are compact and typographic. Cards feel like article modules. Badges read like section labels.

## Do's and Don'ts
Do use large type with deliberate line breaks. Do not make every component large or ornate.
