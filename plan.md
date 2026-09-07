# Styleframe Plan

## Concept

Styleframe is a React app for previewing how different `DESIGN.md` flavor files transform the same sample homepage. The first version is a visual proof of concept: select a flavor from the left panel, and the entire page changes as if that flavor's design reference has been applied.

## Phase 1: Controlled Flavor Demo

Goal: prove that 13 flavor-specific `DESIGN.md` files can meaningfully restyle one consistent homepage.

### App Structure

- React + Vite + TypeScript
- Tailwind CSS v4
- Real shadcn component library installed into the app, not hand-rolled lookalikes
- shadcn primitives used for the app shell and preview UI: Button, Card, Badge, Separator, Tabs, Sheet/Drawer, Dialog, Input, Navigation Menu, Accordion, Avatar, Table, Tooltip
- Fixed left flavor sidebar
- Main homepage preview
- Optional markdown viewer panel or drawer

### Component Library Requirement

Styleframe must prove that `DESIGN.md` flavors can theme a real component system. The MVP should install and use shadcn components directly, then adapt their Tailwind/CSS-variable theme layer per flavor.

The preview homepage should use the same component primitives across every flavor:

- `Button` for nav actions, hero CTAs, and footer actions
- `Card` for feature blocks and content tiles
- `Badge` for labels and metadata
- `Input` for newsletter/search-style affordances
- `Tabs` for small content switching
- `Accordion` for FAQ or expandable detail
- `Table` or dense list for a product/data section
- `Dialog` or `Sheet` for one interactive overlay
- `Tooltip` for compact controls

The point is that the flavor changes the tokens and composition rules applied to a real reusable component library. The app should not create thirteen separate bespoke homepages.

### Sample Homepage

The preview page should include:

- Header and navigation
- Hero section
- Two or three content sections
- Feature/card grid
- Testimonial or quote band
- Footer

The content stays mostly the same across flavors. The design grammar changes.

### Flavor Files

Create one `DESIGN.md` file per flavor:

```txt
/design-md/
  minimal-design.md
  clean-saas.md
  editorial-type.md
  soft-gradients.md
  monochrome-ui.md
  playful-design.md
  high-contrast.md
  premium-design.md
  developer-aesthetic.md
  industrial.md
  large-type.md
  futuristic.md
  neon.md
```

### Matching Theme Objects

For the MVP, each markdown file has a matching structured theme object in code:

```ts
minimalDesignTheme
cleanSaasTheme
editorialTypeTheme
softGradientsTheme
monochromeUiTheme
playfulDesignTheme
highContrastTheme
premiumDesignTheme
developerAestheticTheme
industrialTheme
largeTypeTheme
futuristicTheme
neonTheme
```

Each theme controls:

- Colors
- Typography
- Border radius
- Spacing
- Card treatment
- Button style
- shadcn component token mapping
- shadcn variant behavior where needed
- Section rhythm
- Decorative motif
- Motion intensity

### Interaction

- User clicks a flavor in the sidebar.
- App applies the matching theme object.
- The homepage restyles instantly.
- The matching `DESIGN.md` is shown as the source reference.

### Recommended First Flavor Set

Start with 5 high-contrast flavors before expanding to all 13:

- Minimal Design
- Clean SaaS
- Editorial Type
- Industrial
- Neon

## Phase 2: Real DESIGN.md Runtime

Goal: make the app actually read and apply `DESIGN.md` files dynamically.

### Add

- Markdown parser
- Frontmatter or structured token block
- Token extraction
- Validation and error states
- Live editing
- Import/upload flow
- Generated preview from arbitrary `DESIGN.md`

### Possible File Convention

```md
---
flavor: Neon
theme:
  color.bg: "#050711"
  color.text: "#f5f7ff"
  color.accent: "#44f7ff"
  radius.card: "20px"
  typography.heading: "Space Grotesk"
  density: "spacious"
---
```

### Runtime Behavior

- User selects or edits a markdown file.
- App parses the file.
- Tokens are mapped to CSS variables.
- The homepage updates from the actual file contents.
- Unsupported or missing tokens are shown clearly.
- Incomplete files fall back gracefully.

## Build Order

1. Build the sample homepage and fixed sidebar.
2. Install Tailwind CSS v4 and shadcn.
3. Add the required shadcn components.
4. Build the sample homepage using those shadcn components.
5. Implement 5 coded flavor themes.
6. Add matching `DESIGN.md` files.
7. Add markdown viewer.
8. Expand to all 13 flavors.
9. Add Phase 2 parser/runtime after the demo interaction feels strong.
