---
version: alpha
name: Large Type
description: Oversized display typography drives the page while components stay compact and grounded.
colorScheme: light
colors:
  background: "#fbfbf8"
  foreground: "#101010"
  card: "#ffffff"
  primary: "#1f3b73"
  primary-foreground: "#ffffff"
  secondary: "#e5e9f2"
  muted: "#ecece6"
  muted-foreground: "#5f5f58"
  border: "#d8d8cf"
  input: "#d8d8cf"
  ring: "#1f3b73"
  accent: "#1f3b73"
typography:
  body-md:
    fontFamily: "SF Pro Text"
  headline-display:
    fontFamily: "Avenir Next"
rounded:
  base: 10px
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

# Large Type — Design Reference

> Oversized display typography drives the page while components stay compact and grounded.

**Theme:** light
**Flavor:** Large Type

## Visual Character
Let type dominate the first impression. Use edge aligned headings and compact support UI.

## Tokens
Canvas is white. Text is near black. Accent is deep blue. Display scale is oversized.

## Components
Buttons are simple. Cards stay low and wide. Labels must not compete with headings.

## Do's and Don'ts
Do balance large headings with disciplined spacing. Do not enlarge every component.
