import { parseDesignMd, type DesignDiagnostic } from "@/lib/design-md";

export type Flavor = {
  id: string;
  name: string;
  description: string;
  colorScheme: "light" | "dark";
  md: string;
  cssVars: Record<string, string>;
  diagnostics: DesignDiagnostic[];
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
      cssVars: withSemanticAliases(parsed.cssVars),
      diagnostics: parsed.diagnostics,
    };
  });

export const defaultFlavor = flavors[0];
