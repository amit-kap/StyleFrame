---
version: alpha
name: Neon
description: Electric dark interface with luminous accents, glowing focus, and energetic contrast.
colorScheme: dark
colors:
  background: "#050711"
  foreground: "#f5f7ff"
  card: "#0b0e1c"
  primary: "#44f7ff"
  primary-foreground: "#031015"
  secondary: "#23113a"
  muted: "#101223"
  muted-foreground: "#a2a9c7"
  border: "#34405f"
  input: "#34405f"
  ring: "#44f7ff"
  accent: "#ff4fd8"
typography:
  body-md:
    fontFamily: "Avenir Next"
  headline-display:
    fontFamily: "SFMono-Regular"
rounded:
  base: 14px
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

# Neon — Design Reference

> Electric dark interface with luminous accents, glowing focus, and energetic contrast.

**Theme:** dark
**Flavor:** Neon

## Visual Character
Use neon as a precise signal system. The page should glow at the edges, not drown in effects.

## Tokens
Canvas is almost black. Accent is electric cyan with pink support. Cards are dark with bright borders.

## Components
Buttons carry glow. Cards use rim light. Badges can feel like lit signage.

## Do's and Don'ts
Do ration glow to actions and key moments. Do not make body text luminous.
