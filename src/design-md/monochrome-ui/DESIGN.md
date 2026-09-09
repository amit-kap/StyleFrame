---
version: alpha
name: Monochrome UI
description: A grayscale interface where hierarchy comes from tone, border, scale, and density.
colorScheme: dark
colors:
  background: "#000000"
  foreground: "#ffffff"
  card: "#181818"
  primary: "#ffffff"
  primary-foreground: "#000000"
  secondary: "#272727"
  muted: "#1f1f1f"
  muted-foreground: "#9b9b9b"
  border: "#313131"
  input: "#313131"
  ring: "#ffffff"
  accent: "#ffffff"
typography:
  body-md:
    fontFamily: "Manrope"
  headline-display:
    fontFamily: "Manrope"
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

# Monochrome UI — Design Reference

> A grayscale interface where hierarchy comes from tone, border, scale, and density.

**Theme:** dark
**Flavor:** Monochrome UI

## Visual Character
Work almost entirely in black, white, and gray. Make the interface feel deliberate and exact.

## Tokens
Canvas is black. Surfaces step through dark gray. Text is white with muted gray support.

## Components
Buttons are outline or white filled. Cards use strict borders. Tables should feel like instruments.

## Do's and Don'ts
Do use contrast and spacing to separate ideas. Do not introduce colorful accents unless required for state.
