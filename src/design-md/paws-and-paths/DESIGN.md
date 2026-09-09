---
version: alpha
name: Paws & Paths
colorScheme: light
colors:
  surface: "#f9f9ff"
  surface-dim: "#d3daea"
  surface-bright: "#f9f9ff"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#f0f3ff"
  surface-container: "#e7eefe"
  surface-container-high: "#e2e8f8"
  surface-container-highest: "#dce2f3"
  on-surface: "#151c27"
  on-surface-variant: "#534434"
  inverse-surface: "#2a313d"
  inverse-on-surface: "#ebf1ff"
  outline: "#867461"
  outline-variant: "#d8c3ad"
  surface-tint: "#855300"
  primary: "#855300"
  on-primary: "#ffffff"
  primary-container: "#f59e0b"
  on-primary-container: "#613b00"
  inverse-primary: "#ffb95f"
  secondary: "#0058be"
  on-secondary: "#ffffff"
  secondary-container: "#2170e4"
  on-secondary-container: "#fefcff"
  tertiary: "#00658b"
  on-tertiary: "#ffffff"
  tertiary-container: "#1abdff"
  on-tertiary-container: "#004966"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  background: "#f9f9ff"
  on-background: "#151c27"
  surface-variant: "#dce2f3"
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 44px
    fontWeight: "800"
    lineHeight: 52px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: "700"
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: "700"
    lineHeight: 32px
  title-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: "600"
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: "600"
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: "500"
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 16px
  margin: 24px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  button-primary-hover:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.on-primary-container}"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.on-secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  button-secondary-hover:
    backgroundColor: "{colors.secondary-container}"
    textColor: "{colors.on-secondary-container}"
  card-profile:
    backgroundColor: "{colors.surface-container-lowest}"
    rounded: "{rounded.xl}"
    padding: "{spacing.md}"
  input-field:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.DEFAULT}"
    padding: "{spacing.sm}"
  badge-status:
    backgroundColor: "{colors.tertiary-container}"
    textColor: "{colors.on-tertiary-container}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    padding: "{spacing.xs}"
---
## Brand & Style

The design system is built to evoke the joyful energy of a walk in the park balanced with the reliability of a premium professional service. The brand personality is optimistic, trustworthy, and active.

The chosen style is Modern Corporate with a friendly, human-centric twist. It utilizes clean layouts and significant whitespace to reduce cognitive load for busy pet owners. The interface feels light and airy, avoiding heavy borders in favor of soft shadows and tonal shifts to create a welcoming, best-in-class digital environment.

## Colors

The palette centers on Golden Retriever orange to drive action and signal energy. This is balanced by Sky Walk blue, which provides a calming counterpoint for administrative tasks and scheduling.

- Primary: Use for main actions, active states, and highlights.
- Secondary: Use for secondary information, trust indicators, and navigation accents.
- Neutral: A range of soft grays used for backgrounds and borders to keep the UI feeling premium.
- Deep Charcoal: Used for all primary text to ensure high legibility and a grounded, professional feel.

## Typography

This design system utilizes Plus Jakarta Sans for its friendly, rounded terminals and exceptional legibility. It maintains a contemporary look while feeling more approachable than standard geometric sans-serifs.

- Headlines: Bold weights are used to create a clear hierarchy and guide the eye quickly to key information.
- Body: Generous line heights are applied to the body text to maintain the premium and clean feel.
- Labels: Used for buttons and small metadata, utilizing a medium or semi-bold weight to remain distinct even at small scales.

## Layout & Spacing

The layout follows a Fixed Grid model for mobile-first consistency, utilizing a 4-column system for handheld devices.

- Whitespace: A generous philosophy is applied. Never crowd elements; use lg and xl spacing for section vertical separation.
- Rhythm: Spacing is strictly based on an 8px scale.
- Containers: Content should be centered with a maximum width on larger screens.

## Shapes

The shape language is defined by Rounded corners, mirroring the soft features of a pet and making the app feel safe and friendly.

- Buttons: Main CTA buttons use a 12px radius to feel substantial and clickable.
- Cards: Dog profiles and walker cards use a 1.5rem radius to create a soft, containerized look.
- Inputs: Form fields use a 0.5rem radius to maintain a professional yet modern appearance.

## Do's and Don'ts

### Do

- Do use clear hierarchy, generous whitespace, and friendly rounded typography.
- Do use the orange primary color for actions and blue for supporting navigation accents.

### Don't

- Don't crowd the interface or rely on heavy borders to create hierarchy.
- Don't use low-contrast text for important pet-owner actions.
