import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";
import { parseDesignMd, STYLEFRAME_CSS_VARS } from "../src/lib/design-md.ts";

const root = new URL("../src/design-md/", import.meta.url);
const flavorDirectories = (await readdir(root, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

test("every flavor follows the DESIGN.md contract", async () => {
  assert.equal(flavorDirectories.length, 15);
  for (const id of flavorDirectories) {
    const source = await readFile(new URL(`${id}/DESIGN.md`, root), "utf8");
    const parsed = parseDesignMd(source, id);
    assert.equal(parsed.frontmatter.version, "alpha", id);
    assert.ok(parsed.frontmatter.colors, id);
    assert.ok(parsed.frontmatter.typography, id);
    assert.ok(parsed.frontmatter.rounded, id);
    assert.ok(parsed.frontmatter.spacing, id);
    assert.ok(parsed.frontmatter.components, id);
    assert.equal(parsed.diagnostics.some((diagnostic) => diagnostic.severity === "error"), false, id);
    assert.ok(Object.keys(parsed.cssVars).length > 0, id);
    assert.ok(Object.keys(parsed.cssVars).every((key) => STYLEFRAME_CSS_VARS.includes(key) || key.startsWith("--type-")), id);
  }
});

test("token references resolve into semantic CSS variables", () => {
  const parsed = parseDesignMd(`---
version: alpha
name: Reference test
colorScheme: dark
colors:
  primary: '#123456'
  foreground: '#ffffff'
  card: '#111111'
  secondary: '#222222'
typography:
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: 400
    lineHeight: 24px
rounded:
  base: 8px
spacing:
  md: 16px
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.foreground}'
---
# Reference test`, "reference-test");
  assert.equal(parsed.colorScheme, "dark");
  assert.equal(parsed.cssVars["--primary"], "#123456");
  assert.equal(parsed.cssVars["--primary-foreground"], "#ffffff");
  assert.equal(parsed.cssVars["--radius"], "8px");
  assert.equal(parsed.cssVars["--type-body-md-size"], "16px");
  assert.equal(parsed.cssVars["--type-body-md-weight"], "400");
  assert.equal(parsed.cssVars["--body-size"], "16px");
  assert.equal(parsed.cssVars["--body-leading"], "24px");
});
