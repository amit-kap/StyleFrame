import { parseDesignMd, type DesignDiagnostic } from "@/lib/design-md";

export type Flavor = {
  id: string;
  name: string;
  description: string;
  colorScheme: "light" | "dark";
  md: string;
  frontmatter: Record<string, unknown>;
  cssVars: Record<string, string>;
  inspector: FlavorInspectorData;
  diagnostics: DesignDiagnostic[];
};

export type InspectorEntry = {
  label: string;
  value: string;
  detail?: string;
};

export type FlavorInspectorData = {
  colors: {
    brand: InspectorEntry[];
    accent: InspectorEntry[];
    neutrals: InspectorEntry[];
  };
  typography: {
    typeScale: InspectorEntry[];
    fonts: InspectorEntry[];
  };
  spacing: InspectorEntry[];
  radii: InspectorEntry[];
  guidelines: {
    do: string[];
    dont: string[];
  };
};

const designMdModules = import.meta.glob("../design-md/*/DESIGN.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function flavorIdFromPath(path: string) {
  return path.split("/").slice(-2, -1)[0] ?? path;
}

function withSemanticAliases(vars: Record<string, string>) {
  const next = { ...vars };
  const foreground = next["--foreground"];
  const card = next["--card"] ?? next["--background"];
  const secondary = next["--secondary"] ?? next["--muted"];

  if (foreground) {
    next["--card-foreground"] ??= foreground;
    next["--popover-foreground"] ??= foreground;
    next["--secondary-foreground"] ??= foreground;
  }
  if (card) next["--popover"] ??= card;
  if (secondary) next["--muted"] ??= secondary;
  if (next["--radius"]) {
    next["--radius-card"] ??= next["--radius"];
    next["--radius-button"] ??= next["--radius"];
    next["--radius-input"] ??= next["--radius"];
    next["--radius-badge"] ??= next["--radius"];
  }
  return next;
}

function record(value: unknown) {
  return value && typeof value === "object" ? value as Record<string, unknown> : {};
}

function text(value: unknown) {
  return typeof value === "string" || typeof value === "number" ? String(value) : null;
}

function humanize(value: string) {
  return value.replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function entriesFromVars(vars: Record<string, string>, keys: string[]) {
  return keys.flatMap((key) => {
    const value = vars[key];
    return value ? [{ label: humanize(key.replace(/^--/, "")), value }] : [];
  });
}

function entriesFromRecord(values: Record<string, unknown>) {
  return Object.entries(values).flatMap(([key, value]) => {
    const scalarValue = text(value);
    return scalarValue ? [{ label: humanize(key), value: scalarValue }] : [];
  });
}

function guidelineItems(source: string, heading: "Do" | "Don't") {
  const section = source.match(/##\s+Do's and Don'ts([\s\S]*?)(?=\n##\s|$)/i)?.[1] ?? "";
  const opposite = heading === "Do" ? "Don't" : "Do";
  const block = section.match(new RegExp("###\\s+" + heading + "\\s*([\\s\\S]*?)(?=###\\s+" + opposite + "|$)", "i"))?.[1];
  const textBlock = block ?? section;
  const lines = textBlock.split("\n").map((line) => line.replace(/^\s*[-*]\s*/, "").trim()).filter(Boolean);
  const items = lines.length > 1 ? lines : textBlock.split(/(?=\b(?:Do not|Don't|Do)\b)/i).map((item) => item.trim()).filter(Boolean);
  return items.filter((item) => heading === "Do"
    ? /^Do(?! not\b)/i.test(item)
    : /^(?:Do not|Don't)\b/i.test(item));
}

function buildInspectorData(parsed: ReturnType<typeof parseDesignMd>) {
  const typography = record(parsed.frontmatter.typography);
  const spacing = record(parsed.frontmatter.spacing);
  const rounded = record(parsed.frontmatter.rounded);
  const fonts = Object.entries(typography).flatMap(([key, value]) => {
    const role = record(value);
    const fontFamily = text(role.fontFamily);
    return fontFamily ? [{ label: humanize(key), value: fontFamily }] : [];
  });
  const typeScale = Object.entries(typography).flatMap(([key, value]) => {
    const role = record(value);
    const details = [role.fontSize, role.fontWeight, role.lineHeight].map(text).filter(Boolean).join(" · ");
    return details ? [{ label: humanize(key), value: details }] : [];
  });

  return {
    colors: {
      brand: entriesFromVars(parsed.cssVars, ["--primary", "--primary-hover", "--primary-foreground"]),
      accent: entriesFromVars(parsed.cssVars, ["--accent", "--accent-soft", "--ring"]),
      neutrals: entriesFromVars(parsed.cssVars, ["--background", "--foreground", "--card", "--muted", "--muted-foreground", "--border", "--input"]),
    },
    typography: {
      typeScale: typeScale.length ? typeScale : [{ label: "Declared scale", value: "Not specified" }],
      fonts: fonts.length ? fonts : [{ label: "Font family", value: parsed.cssVars["--font-sans"] ?? "System Sans-Serif" }],
    },
    spacing: entriesFromRecord(spacing),
    radii: entriesFromRecord(rounded),
    guidelines: {
      do: guidelineItems(parsed.body, "Do"),
      dont: guidelineItems(parsed.body, "Don't"),
    },
  } satisfies FlavorInspectorData;
}

export const flavors: Flavor[] = Object.entries(designMdModules)
  .sort(([left], [right]) => left.localeCompare(right))
  .map(([path, md]) => {
    const id = flavorIdFromPath(path);
    const parsed = parseDesignMd(md, id);
    return {
      id,
      name: parsed.name,
      description: parsed.description,
      colorScheme: parsed.colorScheme,
      md,
      frontmatter: parsed.frontmatter,
      cssVars: withSemanticAliases(parsed.cssVars),
      inspector: buildInspectorData(parsed),
      diagnostics: parsed.diagnostics,
    };
  });

export const defaultFlavor = flavors[0];
