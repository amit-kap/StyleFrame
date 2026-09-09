import yaml from "js-yaml";

export type DesignDiagnostic = {
  severity: "error" | "warning" | "info";
  message: string;
  path?: string;
};

export type ParsedDesignMd = {
  frontmatter: Record<string, unknown>;
  body: string;
  name: string;
  description: string;
  colorScheme: "light" | "dark";
  cssVars: Record<string, string>;
  diagnostics: DesignDiagnostic[];
};

export const STYLEFRAME_CSS_VARS = [
  "--background", "--foreground", "--card", "--card-foreground",
  "--popover", "--popover-foreground", "--primary", "--primary-hover",
  "--primary-foreground", "--secondary", "--secondary-hover",
  "--secondary-foreground", "--muted", "--muted-foreground", "--accent",
  "--accent-soft", "--border", "--input", "--ring", "--destructive",
  "--radius", "--radius-card", "--radius-button", "--radius-input",
  "--radius-badge", "--font-sans", "--font-heading", "--font-mono",
  "--duration-fast", "--duration-normal", "--ease-standard",
] as const;

const topLevelKeys = new Set(["version", "name", "description", "colorScheme", "colors", "typography", "rounded", "spacing", "components"]);

const colorMap: Record<string, string> = {
  background: "--background", canvas: "--background", page: "--background",
  foreground: "--foreground", text: "--foreground", ink: "--foreground",
  card: "--card", surface: "--card", "card-foreground": "--card-foreground",
  primary: "--primary", "primary-hover": "--primary-hover",
  "primary-foreground": "--primary-foreground", secondary: "--secondary",
  "secondary-hover": "--secondary-hover", "secondary-foreground": "--secondary-foreground",
  muted: "--muted", "muted-foreground": "--muted-foreground",
  accent: "--accent", "accent-soft": "--accent-soft", border: "--border",
  input: "--input", ring: "--ring", destructive: "--destructive",
};

function scalar(value: unknown) {
  return typeof value === "string" || typeof value === "number" ? String(value) : null;
}

function resolvePath(root: unknown, path: string) {
  return path.split(".").reduce<unknown>((value, key) => (
    value && typeof value === "object" ? (value as Record<string, unknown>)[key] : undefined
  ), root);
}

function resolveValue(root: Record<string, unknown>, value: unknown, seen = new Set<string>()): unknown {
  if (typeof value !== "string") return value;
  const reference = value.match(/^\{([^}]+)\}$/)?.[1];
  if (!reference) return value;
  if (seen.has(reference)) return undefined;
  seen.add(reference);
  return resolveValue(root, resolvePath(root, reference), seen);
}

function frontmatterFrom(source: string) {
  if (!source.startsWith("---\n")) return { data: {}, body: source, error: "Missing YAML front matter." };
  const end = source.indexOf("\n---", 4);
  if (end < 0) return { data: {}, body: source, error: "Unclosed YAML front matter." };
  const raw = source.slice(4, end);
  const body = source.slice(end + 4).replace(/^\n/, "");
  try {
    const data = yaml.load(raw);
    return { data: data && typeof data === "object" ? data as Record<string, unknown> : {}, body };
  } catch (error) {
    return { data: {}, body, error: error instanceof Error ? error.message : "Invalid YAML front matter." };
  }
}

function cssColor(value: unknown) {
  if (typeof value !== "string") return false;
  return /^(#|rgb\(|rgba\(|hsl\(|hsla\(|hwb\(|oklch\(|oklab\(|lch\(|lab\(|color-mix\(|[a-z]+$)/i.test(value.trim());
}

function cssDimension(value: unknown) {
  return typeof value === "number" || (typeof value === "string" && /^-?\d+(\.\d+)?(px|rem|em|%)?$/.test(value.trim()));
}

export function parseDesignMd(source: string, fallbackName: string): ParsedDesignMd {
  const parsed = frontmatterFrom(source);
  const data = parsed.data;
  const diagnostics: DesignDiagnostic[] = [];
  if (parsed.error) diagnostics.push({ severity: "error", message: parsed.error });
  if (!scalar(data.name)) diagnostics.push({ severity: "error", message: "Design files must declare a name in YAML front matter.", path: "name" });
  if (!scalar(data.colorScheme) && !scalar(data.theme)) diagnostics.push({ severity: "warning", message: "Declare colorScheme as light or dark; defaulting to light.", path: "colorScheme" });
  for (const key of Object.keys(data)) {
    if (!topLevelKeys.has(key)) diagnostics.push({ severity: "info", message: `Preserved unsupported design section: ${key}.`, path: key });
  }

  const name = scalar(data.name) ?? source.match(/^#\s+(.+?)(?:\s+—.*)?$/m)?.[1]?.trim() ?? fallbackName;
  const description = scalar(data.description) ?? source.match(/^>\s+(.+)$/m)?.[1]?.trim() ?? "A design language defined by its DESIGN.md source.";
  const schemeValue = scalar(data.colorScheme) ?? scalar(data.theme) ?? "light";
  const colorScheme = schemeValue.toLowerCase().includes("dark") ? "dark" : "light";
  const cssVars: Record<string, string> = {};
  const colors = data.colors && typeof data.colors === "object" ? data.colors as Record<string, unknown> : {};

  for (const [sourceName, target] of Object.entries(colorMap)) {
    const value = resolveValue(data, colors[sourceName]);
    if (value === undefined) continue;
    if (!cssColor(value)) {
      diagnostics.push({ severity: "error", message: `Invalid color value for ${sourceName}.`, path: `colors.${sourceName}` });
      continue;
    }
    cssVars[target] = String(value);
  }

  const typography = data.typography && typeof data.typography === "object" ? data.typography as Record<string, unknown> : {};
  const fontRole = Object.entries(typography).find(([key]) => /body|base|text/i.test(key))?.[1];
  const headingRole = Object.entries(typography).find(([key]) => /headline|heading|display|h1/i.test(key))?.[1];
  const fontValue = (role: unknown) => role && typeof role === "object" ? (role as Record<string, unknown>).fontFamily : undefined;
  const bodyFont = resolveValue(data, fontValue(fontRole));
  const headingFont = resolveValue(data, fontValue(headingRole));
  if (typeof bodyFont === "string") cssVars["--font-sans"] = bodyFont;
  if (typeof headingFont === "string") cssVars["--font-heading"] = headingFont;
  const monoRole = Object.entries(typography).find(([key]) => /mono|code/i.test(key))?.[1];
  const monoFont = resolveValue(data, fontValue(monoRole));
  if (typeof monoFont === "string") cssVars["--font-mono"] = monoFont;

  const rounded = data.rounded && typeof data.rounded === "object" ? data.rounded as Record<string, unknown> : {};
  const baseRadius = rounded.base ?? rounded.md ?? rounded.sm;
  if (baseRadius !== undefined) {
    const value = resolveValue(data, baseRadius);
    if (cssDimension(value)) cssVars["--radius"] = String(value);
    else diagnostics.push({ severity: "error", message: "Invalid rounded token.", path: "rounded.base" });
  }

  const components = data.components && typeof data.components === "object" ? data.components as Record<string, unknown> : {};
  const componentRole = (name: string) => components[name] && typeof components[name] === "object"
    ? components[name] as Record<string, unknown>
    : undefined;
  const componentColor = (name: string, property: string) => {
    const value = resolveValue(data, componentRole(name)?.[property]);
    return cssColor(value) ? String(value) : undefined;
  };
  const primaryButton = componentRole("button-primary");
  if (primaryButton) {
    cssVars["--primary"] = componentColor("button-primary", "backgroundColor") ?? cssVars["--primary"];
    cssVars["--primary-foreground"] = componentColor("button-primary", "textColor") ?? cssVars["--primary-foreground"];
  }
  const primaryHover = componentColor("button-primary-hover", "backgroundColor");
  const secondaryButton = componentColor("button-secondary", "backgroundColor");
  const secondaryForeground = componentColor("button-secondary", "textColor");
  const secondaryHover = componentColor("button-secondary-hover", "backgroundColor");
  if (primaryHover) cssVars["--primary-hover"] = primaryHover;
  if (secondaryButton) cssVars["--secondary"] = secondaryButton;
  if (secondaryForeground) cssVars["--secondary-foreground"] = secondaryForeground;
  if (secondaryHover) cssVars["--secondary-hover"] = secondaryHover;

  const allowed = new Set<string>(STYLEFRAME_CSS_VARS);
  for (const key of Object.keys(cssVars)) if (!allowed.has(key)) delete cssVars[key];
  return { frontmatter: data, body: parsed.body, name, description, colorScheme, cssVars, diagnostics };
}
