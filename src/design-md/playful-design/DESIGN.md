---
version: alpha
name: Playful Design
description: Friendly product energy with rounded forms, bright accents, and approachable component states.
colorScheme: light
colors:
  background: "#fff8dc"
  foreground: "#24201a"
  card: "#fffdf1"
  primary: "#ff5f57"
  primary-foreground: "#ffffff"
  secondary: "#bff4d2"
  muted: "#ffeab3"
  muted-foreground: "#725f3d"
  border: "#f1d992"
  input: "#f1d992"
  ring: "#ff5f57"
  accent: "#13b981"
typography:
  body-md:
    fontFamily: "Poppins"
  headline-display:
    fontFamily: "Poppins"
rounded:
  base: 20px
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

# Playful Design — Design Reference

> Friendly product energy with rounded forms, bright accents, and approachable component states.

**Theme:** light
**Flavor:** Playful Design

## Visual Character
The design should feel optimistic and tactile while staying useful. Use color and shape to lower friction.

## Tokens
Canvas is bright cream. Accent is coral with mint support. Radius is large and shadows are soft.

## Components
Buttons are chunky. Cards feel touchable. Badges can be colorful. Empty states are warm and human.

## Do's and Don'ts
Do keep the system charming and readable. Do not turn every surface into a toy.
