---
version: alpha
name: Minimal Design
description: Quiet structure with generous whitespace, crisp typography, and almost invisible UI.
colorScheme: light
colors:
  background: "#f7f5ef"
  foreground: "#171717"
  card: "#fffdf8"
  primary: "#171717"
  primary-foreground: "#ffffff"
  secondary: "#ece8df"
  muted: "#ece8df"
  muted-foreground: "#69645c"
  border: "#d8d1c6"
  input: "#d8d1c6"
  ring: "#171717"
  accent: "#a26745"
typography:
  body-md:
    fontFamily: "Avenir Next"
  headline-display:
    fontFamily: "Avenir Next"
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

# Minimal Design — Design Reference

> Quiet structure with generous whitespace, crisp typography, and almost invisible UI.

**Theme:** light
**Flavor:** Minimal Design

## Visual Character
Use restraint as the main material. Pages should feel calm, precise, and lightly editorial without calling attention to decoration.

## Tokens
Canvas is warm off white. Text is near black. Accent is muted clay. Cards use thin borders, soft shadows, and moderate radius.

## Components
Buttons are simple pills. Cards are open and quiet. Badges are outline first. Inputs are calm and spacious.

## Do's and Don'ts
Do preserve whitespace, readable copy, and subtle contrast. Do not add loud gradients, heavy shadows, or dense panels.
