---
version: alpha
name: Book of Shapes
description: A quiet, monochrome design system where strict editorial typography and hairline structure frame expressive, algorithmic pattern previews.
colorScheme: dark
colors:
  background: "#111111"
  foreground: "#cccccc"
  card: "#161616"
  primary: "#cccccc"
  primary-foreground: "#111111"
  secondary: "#222222"
  muted: "#1a1a1a"
  muted-foreground: "#999999"
  border: "color-mix(in srgb, #ccc 10%, transparent)"
  input: "color-mix(in srgb, #ccc 20%, transparent)"
  ring: "#cccccc"
  accent: "#cccccc"
typography:
  body-md:
    fontFamily: "Geist Variable"
  headline-display:
    fontFamily: "Geist Variable"
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

# Book of Shapes — Design Reference

> A quiet, monochrome design system where strict editorial typography and hairline structure frame expressive, algorithmic pattern previews.

**Source:** https://bookofshapes.com/  
**Audit:** 2026-09-09  
**Theme:** mixed — dark default with a light inverted mode  
**Flavor:** Monochrome / Generative Editorial  
**Mode:** DESIGN.md examples / AI design resources / Design prompts

## Visual Character

- Treat the interface as a gallery and tool index, not a conventional marketing site.
- Keep the chrome almost invisible: near-black canvas, muted off-white text, low-contrast dividers, and very little ornament.
- Use large, blunt, tightly tracked sans-serif type for editorial hierarchy.
- Let the visual content carry the intensity. Pattern previews are the only high-detail surfaces.
- Balance mathematical order with controlled irregularity: regular grids, circular controls, and categorical labels surround organic SVG behavior.
- Prefer generous negative space above the first content row and compact spacing inside controls and metadata.
- Make every page feel like part of one collection: the header, footer, theme control, and content container repeat consistently.

## Tokens — Colors

Values below are observed from the live site. The border is intentionally translucent and should remain subtle.

| Name | Value | Token | Role |
|---|---|---|---|
| Dark canvas | `#111111` | `--color-background` | Default page background |
| Dark surface | `#161616` | `--color-surface` | Pattern tile surface / raised content |
| Dark foreground | `#cccccc` | `--color-foreground` | Main text, strokes, controls |
| Dark border | `color-mix(in srgb, #ccc 10%, transparent)` | `--color-border` | Hairline separators and quiet outlines |
| Light canvas | `#f5f5f0` | `--color-background` | Inverted page background |
| Light surface | `#efefe9` | `--color-surface` | Light tile surface |
| Light foreground | `#222222` | `--color-foreground` | Light-mode text and strokes |
| Pattern stroke | `#cccccc` in dark mode | `--stroke-color` | SVG line and dot work |
| Pattern fill | `#cccccc` in dark mode | `--fill-color` | SVG fills |
| Pattern occlusion | `#1a1a1a` in dark mode | `--occlusion-color` | Masking/negative space inside SVG patterns |

### Color guidance

- Do not introduce gradients, saturated accents, glass blur, or glossy shadows for primary UI.
- In light mode, invert the tonal relationship rather than inventing a new palette.
- Use opacity to establish hierarchy: muted metadata can sit around 60–70% foreground; dividers around 10%.
- Keep previews mostly two-tone. Variation should come from geometry, density, and motion—not color.

## Tokens — Typography

The site loads Geist Variable locally and falls back to a system sans stack.

| Name | Value | Token | Role |
|---|---|---|---|
| Sans family | `"Geist Variable", Geist, ui-sans-serif, system-ui, sans-serif` | `--font-sans` | All primary UI and editorial text |
| Mono family | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace` | `--font-mono` | Code and technical values |
| Small | `11px / 1.4` | `--text-xs` | Category counts, metadata, fine labels |
| Body | `18px / 1.5` | `--text-base` | Base content on smaller screens |
| Body large | `24px / 1.2` | `--text-md` | Intro copy and larger prose |
| Display | `44px / 1.1` | `--text-lg` | Medium display headings |
| Display large | `64px / 1` | `--text-xl` | Large headings at wide sizes |
| Hero | `96px / .95` | `--text-2xl` | Homepage title at desktop |

- Headings use weight 600, tight tracking (approximately `-0.05em` for the hero), and short line lengths.
- Body/introduction copy uses weight 500 and a deliberately narrow measure.
- Category and utility controls are uppercase, small, medium-weight, and widely tracked (`.05em`–`.1em`).
- Use sentence case for explanatory prose and uppercase for taxonomy, sort, and utility labels.
- Avoid thin display weights: the visual language is blunt and legible even at large scale.

## Tokens — Spacing & Shape

The layout is based on a 12-column square grid. At the audited 2560px viewport, the content container was 1320px wide with 40px outer padding, and the grid column/row unit was approximately 110px.

| Name | Value | Token | Role |
|---|---|---|---|
| Base spacing | `4px` | `--spacing` | Utility spacing unit |
| Container max | `1400px` | `--container-max-width` | Outer layout cap |
| Container padding | `40px` desktop | `--container-padding` | Outer gutter |
| Grid columns | `12` | `--grid-columns` | Layout math |
| Grid unit | `(container - gutters) / 12` | `--grid-column-width` / `--grid-row-height` | Square rhythm |
| Small radius | `4px` | `--radius-sm` | Small code/control surfaces |
| Medium radius | `6px` | `--radius-md` | Compact controls |
| Large radius | `8px` | `--radius-lg` | Code blocks / occasional cards |
| Pill radius | `9999px` | `rounded-full` | Filters and theme toggle |

- The homepage hero starts with roughly one grid unit of top padding after the sticky header and uses roughly two grid units below the main content.
- Pattern cards are square, borderless, and sit on the surface color; the observed desktop gallery uses three columns with approximately one quarter-grid-unit gaps.
- Use hairline borders only where they clarify grouping: header rule, footer rule, filter pills, and quiet separators.
- Avoid rounded cards. Rounded geometry is reserved for pills, circular controls, and rare technical blocks.

## Components

### Persistent header

- Sticky top bar spanning the viewport, with the constrained content aligned to the same container as the page.
- Left: wordmark/home link. Right: collected link and a circular half-light/half-dark theme toggle.
- Bottom hairline divider; no heavy navigation background or shadow.
- Header remains available across index, collection, learning, legal, detail, and poster pages.

### Theme toggle

- Circular control, approximately 46px at the audited desktop size.
- Visualizes the two modes as a split light/dark disc.
- Subtle rotation on hover and a short transform transition; preserve keyboard focus and an explicit accessible label.
- Theme changes the semantic tokens globally rather than recoloring individual components ad hoc.

### Taxonomy filter pills

- Uppercase pills for `GRID`, `RADIAL`, `NOISE`, `FLOW`, `ISOMETRIC`, `ORGANIC`, `DISTORTION`, and `PHYSICS`.
- Counts appear in parentheses and are part of the label hierarchy.
- Quiet outlined inactive state; active state becomes a solid foreground pill with background-colored text.
- Allow horizontal wrapping on narrow screens. Keep the pill group visually lighter than the pattern grid.

### Sort controls

- `RECENT`, `POPULAR`, and `LIKED` are a second control row, separated from taxonomy by a small vertical rule.
- Active sort uses the same solid pill treatment. The liked control includes a small heart icon.
- Heart/favorite actions show an anonymous numeric count and should remain compact.

### Pattern tile

- A square surface containing a centered, high-contrast SVG preview.
- Preview is the primary interaction target and routes to a detail page; title and heart metadata are revealed or emphasized around the tile without competing with the artwork.
- Keep linework crisp and preserve generous internal margins around the generated shape.
- Hover behavior is restrained: slight scale/opacity or metadata reveal is acceptable; avoid dramatic lift, glow, blur, or gradient effects.

### Pattern detail editor

- Detail pages use a two-part composition: a large pattern stage plus a technical/control area.
- Editable examples expose named numeric controls, seed values, node/connection summaries, and a `VARIATIONS` section.
- Controls should communicate the algorithm: parameter name, current value, and immediate visual consequence.
- A `Make a poster` action carries the current tuned pattern into a poster composition.
- Descriptive prose explains the generative rule in plain language and is followed by uppercase tags and related patterns.

### Learning page

- Technical education is presented as a calm article rather than a dashboard.
- Persistent side navigation groups `FUNCTIONS` (Normalize, Lerp, Clamp, Remap, Easing) and `TECHNIQUES` (The Value Pipeline, Envelope Shaping).
- Pair prose with small diagrams, formulas, code blocks, and a “Patterns using …” index.
- Code uses the mono fallback, dark surface, modest radius, and generous line height.

### Poster view

- A focused, print-like composition for a selected pattern with minimal surrounding UI.
- Keep the poster page quieter than the editor: pattern, title, and a route back to `Pattern` are the focus.
- The poster is a composition surface, not a generic card or modal.

### Legal/content page

- License and privacy pages use the same header/footer and constrained reading measure.
- Section headings are short and direct; paragraphs are practical, transparent, and low-drama.
- Preserve the visual rhythm of the gallery even when no generated artwork is present.

## Layout

### Homepage/index

1. Sticky header with rule.
2. Large left-aligned hero title split over two lines: “Book of / Shapes”.
3. Short description and creator credit below the title.
4. Taxonomy pills, then sort pills.
5. Dense square pattern gallery.
6. Footer with creator links, license, and privacy.

At wide sizes, use a 3-column gallery; at extra-wide sizes the source supports 4 columns. At medium sizes use 2 columns; at small sizes collapse to 1 column. Keep the hero left aligned and avoid centering the entire page.

### Detail/index relationship

- Detail pages preserve the same container and global controls so the gallery feels like an index into a coherent library.
- Related patterns return users to the same visual taxonomy through tags and compact previews.
- Page-specific controls should occupy space only when a pattern is genuinely interactive; static patterns should remain primarily visual.

### Responsive behavior

- Observed breakpoints: approximately 480px for compact row changes, 720px for two-column and larger type changes, 960px for desktop layout, and 1500px for four-column/extra-wide adjustments.
- Reduce the container gutter on small screens and keep filters horizontally scrollable or wrapped rather than forcing tiny labels.
- Preserve square previews and the same one-dimensional rhythm at every width.
- Do not let hero type create long, awkward wraps; the source uses large type with a short, intentional line break.

## Imagery & Iconography

- The visual asset language is procedural SVG: dots, lines, arcs, meshes, waves, grids, cubes, spheres, rings, and noise fields.
- Use iconography sparingly. The heart/favorite icon and theme toggle are the main recurring symbols.
- Prefer a single-stroke, understated icon set. Icons should inherit foreground color and never become colorful badges.
- Pattern artwork can be dense, but surrounding chrome must stay sparse.
- Do not require the source’s proprietary pattern definitions, logos, or copy. Recreate the visual logic with local generated assets or abstract placeholders.

## Motion & Interaction

- Motion is mostly functional: short color/opacity transitions, a restrained hover scale, and a small theme-toggle rotation.
- Generated patterns may animate or regenerate, but the surrounding interface should not constantly move.
- Parameter changes should update the artwork directly and make the relationship between control and output obvious.
- Use `prefers-reduced-motion` to disable nonessential pattern animation and hover transforms.
- Keep focus states visible even when the default visual language is low-contrast; accessibility wins over visual quietness.

## Accessibility Notes

- Maintain readable contrast in both token modes; muted metadata must remain distinguishable from the canvas.
- Every pattern tile needs an accessible name, not only an unlabeled SVG.
- Give the theme toggle, heart action, filters, sort controls, and numeric inputs explicit labels and states.
- Do not use uppercase styling as a substitute for semantic labeling.
- Preserve keyboard access to pattern routes, controls, poster actions, and learning navigation.
- Respect reduced-motion preferences and avoid communicating state only through color or animation.

## Do's and Don'ts

### Do

- Do use monochrome surfaces and a translucent hairline system.
- Do combine editorial type with technical metadata.
- Do make generated visuals the expressive layer.
- Do use a square 12-column rhythm and generous empty space.
- Do expose the logic behind interactive patterns through names, values, seeds, and short explanations.
- Do make the light mode a true token inversion of the dark mode.

