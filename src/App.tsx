import * as React from "react";
import {
  AlertTriangleIcon,
  AppleIcon,
  ArrowUpIcon,
  BracesIcon,
  CheckIcon,
  ChevronDownIcon,
  CreditCardIcon,
  CopyIcon,
  DownloadIcon,
  EllipsisIcon,
  FileTextIcon,
  Grid2X2Icon,
  ListIcon,
  MicIcon,
  PackageIcon,
  PlusIcon,
  SearchIcon,
  ShoppingBagIcon,
  TagIcon,
  UserRoundIcon,
  WalletCardsIcon,
  XIcon,
} from "lucide-react";
import { AspectRatio } from "@comp/components/ui/aspect-ratio";
import { Alert, AlertTitle } from "@comp/components/ui/alert";
import { Badge } from "@comp/components/ui/badge";
import { Button } from "@comp/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@comp/components/ui/card";
import { Checkbox } from "@comp/components/ui/checkbox";
import { Input } from "@comp/components/ui/input";
import { Label } from "@comp/components/ui/label";
import { Message, MessageContent } from "@comp/components/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@comp/components/ui/message-scroller";
import { NativeSelect, NativeSelectOption } from "@comp/components/ui/native-select";
import { RadioGroup, RadioGroupItem } from "@comp/components/ui/radio-group";
import { Separator } from "@comp/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@comp/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@comp/components/ui/table";
import { Textarea } from "@comp/components/ui/textarea";
import { flavors, type Flavor, type InspectorEntry } from "@/data/flavors";

function useReveal() {
  React.useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".reveal, .tagline-word");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.2 },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function cssVars(flavor: Flavor | null) {
  if (!flavor || flavor.diagnostics.some((diagnostic) => diagnostic.severity === "error")) return undefined;
  return {
    ...flavor.cssVars,
    colorScheme: flavor.colorScheme,
  } as React.CSSProperties;
}

const PANEL_MIN = 20;
const PANEL_MAX = 40;
const PANEL_DEFAULT_LEFT = 24;
const PANEL_DEFAULT_RIGHT = 22;

function clampPanelWidth(width: number) {
  return Math.min(PANEL_MAX, Math.max(PANEL_MIN, width));
}

function usePanelWidth(defaultWidth: number) {
  const [width, setWidth] = React.useState(defaultWidth);
  const dragRef = React.useRef<{ startX: number; startWidth: number; direction: 1 | -1 } | null>(null);

  const startResize = React.useCallback((event: React.PointerEvent<HTMLButtonElement>, direction: 1 | -1) => {
    event.preventDefault();
    dragRef.current = { startX: event.clientX, startWidth: width, direction };
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    const handleMove = (moveEvent: PointerEvent) => {
      if (!dragRef.current) return;
      const { startX, startWidth, direction: resizeDirection } = dragRef.current;
      const delta = ((moveEvent.clientX - startX) / window.innerWidth) * 100 * resizeDirection;
      setWidth(clampPanelWidth(startWidth + delta));
    };
    const handleEnd = () => {
      dragRef.current = null;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleEnd);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleEnd);
  }, [width]);

  const handleKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
    const step = event.shiftKey ? 5 : 2;
    if (event.key === "Home") {
      event.preventDefault();
      setWidth(PANEL_MIN);
    } else if (event.key === "End") {
      event.preventDefault();
      setWidth(PANEL_MAX);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      setWidth((current) => clampPanelWidth(current + step));
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      setWidth((current) => clampPanelWidth(current - step));
    }
  }, []);

  return { width, startResize, handleKeyDown };
}

function ResizeHandle({
  label,
  width,
  onPointerDown,
  onKeyDown,
  side,
}: {
  label: string;
  width: number;
  onPointerDown: (event: React.PointerEvent<HTMLButtonElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  side: "left" | "right";
}) {
  return (
    <button
      type="button"
      className={`panel-resize-handle panel-resize-handle-${side}`}
      aria-label={label}
      aria-valuemin={PANEL_MIN}
      aria-valuemax={PANEL_MAX}
      aria-valuenow={Math.round(width)}
      aria-valuetext={`${Math.round(width)}% of view`}
      role="separator"
      onPointerDown={onPointerDown}
      onKeyDown={onKeyDown}
    />
  );
}

function AppHeader() {
  return (
    <header className="app-header flex h-16 items-center border-b border-[#252936] bg-[#0f1117] px-5 text-[#f7f7f3]">
      <div className="flex items-center gap-3">
        <div className="flex size-8 items-center justify-center rounded-full border border-[#303746] bg-[#f7f7f3] text-[#0f1117]">
          <BracesIcon className="size-4" />
        </div>
        <div className="flex items-baseline gap-3">
          <span className="text-base font-semibold tracking-tight">StyleFrame</span>
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9ba3b4]">design.md lab</span>
        </div>
      </div>
    </header>
  );
}

function FlavorSidebar({
  activeFlavor,
  onFlavorChange,
  width,
  onResize,
  onResizeKeyDown,
}: {
  activeFlavor: Flavor | null;
  onFlavorChange: (flavor: Flavor | null) => void;
  width: number;
  onResize: (event: React.PointerEvent<HTMLButtonElement>) => void;
  onResizeKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}) {
  useReveal();

  return (
    <aside className="app-panel app-panel-left relative hidden overflow-y-auto border-r border-[#252936] bg-[#0f1117] p-5 text-[#f7f7f3] shadow-[0_24px_80px_rgb(0_0_0_/_0.28)] lg:flex lg:flex-col" style={{ width: `${width}%` }}>
      <ResizeHandle side="left" label="Resize Flavors panel" width={width} onPointerDown={onResize} onKeyDown={onResizeKeyDown} />
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase text-[#9ba3b4]">
          Flavors ({flavors.length})
        </p>
        <div className="grid gap-2">
          <button
            type="button"
            aria-pressed={!activeFlavor}
            onClick={() => onFlavorChange(null)}
            className={[
              "flavor-option flex h-8 w-full items-center rounded-full border px-3 text-left transition-[background-color,color,border-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f7f7f3]/70",
              !activeFlavor
                ? "border-[#5f6878] bg-[#252b35] text-[#f0f2f5]"
                : "border-[#252d3b] bg-[#141923] text-[#b9c0cc] hover:border-[#313a4a] hover:bg-[#171c26] hover:text-[#d2d7df]",
            ].join(" ")}
          >
            No flavor
          </button>
          {flavors.map((flavor) => {
            const isActive = flavor.id === activeFlavor?.id;
            return (
              <div
                key={flavor.id}
                className={[
                  "flavor-option flex h-8 w-full items-center gap-1 rounded-lg border pr-1 transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  isActive
                    ? "border-[#5f6878] bg-[#252b35] text-[#f0f2f5]"
                    : "border-[#252d3b] bg-[#141923] text-[#b9c0cc] hover:border-[#313a4a] hover:bg-[#171c26] hover:text-[#d2d7df]",
                ].join(" ")}
              >
                <button
                  type="button"
                  aria-label={`${flavor.name}: ${flavor.description}`}
                  aria-pressed={isActive}
                  onClick={() => onFlavorChange(flavor)}
                  className="flex h-full min-w-0 flex-1 items-center px-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f7f7f3]/70"
                >
                  <span className="truncate">{flavor.name}</span>
                </button>
                <Sheet>
                  <SheetTrigger render={
                    <button
                      type="button"
                      className="flex size-6 shrink-0 items-center justify-center rounded-md text-[#8f98aa] transition-colors hover:bg-[#202735] hover:text-[#f0f2f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f7f7f3]/70"
                      aria-label={`Open ${flavor.name} DESIGN.md`}
                    >
                      <FileTextIcon className="size-3.5" />
                    </button>
                  } />
                  <SheetContent className="max-h-[90vh] overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>{flavor.name} source</SheetTitle>
                      <SheetDescription>
                        The readable design file paired with this coded theme.
                      </SheetDescription>
                    </SheetHeader>
                    <div
                      className="mt-6 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--card)] p-4 text-[var(--foreground)]"
                      style={cssVars(flavor)}
                    >
                      <h2 className="text-lg font-semibold">{flavor.name}</h2>
                      <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
                        {flavor.description}
                      </p>
                      <div className="mt-4 grid gap-2">
                        {[['Color scheme', flavor.colorScheme], ['Diagnostics', flavor.diagnostics.length ? `${flavor.diagnostics.length} finding(s)` : 'None']].map(([label, value]) => (
                          <div key={label} className="flex items-center justify-between text-sm">
                            <span className="text-[var(--muted-foreground)]">{label}</span>
                            <span className="rounded-full border border-[var(--border)] px-2 py-1 text-xs font-semibold text-[var(--foreground)]">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <pre className="mt-4 overflow-x-auto rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--muted)] p-4 text-sm leading-6 text-[var(--foreground)]">
                      {flavor.md}
                    </pre>
                    {flavor.diagnostics.length > 0 && (
                      <div className="mt-4 rounded-[var(--radius-card)] border border-amber-500/40 bg-amber-500/10 p-4 text-sm text-[var(--foreground)]">
                        <p className="font-semibold">This document needs attention</p>
                        {flavor.diagnostics.map((diagnostic) => <p key={`${diagnostic.path}-${diagnostic.message}`} className="mt-1 text-[var(--muted-foreground)]">{diagnostic.path ? `${diagnostic.path}: ` : ""}{diagnostic.message}</p>)}
                      </div>
                    )}
                  </SheetContent>
                </Sheet>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

function CopyTokenButton({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false);

  const copyValue = async () => {
    await navigator.clipboard?.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button
      type="button"
      className="inspector-copy inline-flex shrink-0 items-center gap-1 rounded-md border border-[#303746] px-1.5 py-1 font-mono text-[11px] text-[#b9c0cc] transition-colors hover:border-[#69758a] hover:text-[#f7f7f3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f7f7f3]/70"
      onClick={copyValue}
      aria-label={`Copy ${value}`}
    >
      {copied ? <CheckIcon className="size-3" /> : <CopyIcon className="size-3" />}
      <span className="max-w-[120px] truncate">{value}</span>
    </button>
  );
}

function InspectorTokenRows({ entries, swatches = false }: { entries: InspectorEntry[]; swatches?: boolean }) {
  if (entries.length === 0) {
    return <p className="text-sm text-[#8f98aa]">No values declared.</p>;
  }

  return (
    <div className="grid gap-2">
      {entries.map((entry) => (
        <div key={`${entry.label}-${entry.value}`} className="flex min-w-0 items-center justify-between gap-3 border-b border-[#252936] pb-2 last:border-0 last:pb-0">
          <div className="flex min-w-0 items-center gap-2">
            {swatches && <span className="size-3 shrink-0 rounded-sm border border-white/15" style={{ backgroundColor: entry.value }} aria-hidden="true" />}
            <span className="min-w-0 truncate text-sm text-[#c5cad4]">{entry.label}</span>
          </div>
          <CopyTokenButton value={entry.value} />
        </div>
      ))}
    </div>
  );
}

function InspectorSection({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  return (
    <details className="inspector-section group border-b border-[#252936] py-3" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-[#f0f2f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f7f7f3]/70 [&::-webkit-details-marker]:hidden">
        <span>{title}</span>
        <ChevronDownIcon className="size-4 text-[#8f98aa] transition-transform group-open:rotate-180" />
      </summary>
      <div className="grid gap-4 pb-2 pt-4">{children}</div>
    </details>
  );
}

function GuidelineList({ title, items, tone }: { title: string; items: string[]; tone: "do" | "dont" }) {
  return (
    <div className="grid gap-2">
      <p className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${tone === "do" ? "text-emerald-300" : "text-rose-300"}`}>{title}</p>
      {items.length > 0 ? items.map((item) => <p key={item} className="text-sm leading-5 text-[#b9c0cc]">{item}</p>) : <p className="text-sm text-[#8f98aa]">No guidelines declared.</p>}
    </div>
  );
}

function FlavorInspector({
  activeFlavor,
  width,
  onResize,
  onResizeKeyDown,
}: {
  activeFlavor: Flavor | null;
  width: number;
  onResize: (event: React.PointerEvent<HTMLButtonElement>) => void;
  onResizeKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}) {
  const inspector = activeFlavor?.inspector;

  return (
    <aside className="app-panel app-panel-right relative hidden overflow-y-auto border-l border-[#252936] bg-[#0f1117] p-5 text-[#f7f7f3] lg:block" style={{ width: `${width}%` }}>
      <ResizeHandle side="right" label="Resize Flavor Inspector panel" width={width} onPointerDown={onResize} onKeyDown={onResizeKeyDown} />
      <div className="inspector-content">
        <InspectorSection title="Flavor info" defaultOpen>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase text-[#9ba3b4]">Active flavor</p>
            <p className="text-lg font-medium">{activeFlavor?.name ?? "No flavor"}</p>
            <p className="text-sm leading-6 text-[#9ba3b4]">
              {activeFlavor?.description ?? "Select a flavor to transform the main content preview."}
            </p>
          </div>
          <div className="grid gap-2 rounded-lg border border-[#252936] bg-[#141923] p-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[#9ba3b4]">Theme scope</span>
              <span className="font-medium">Main content</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-[#9ba3b4]">Color scheme</span>
              <span className="font-medium">{activeFlavor?.colorScheme ?? "Default"}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-[#9ba3b4]">Panel width</span>
              <span className="font-medium">{Math.round(width)}%</span>
            </div>
          </div>
        </InspectorSection>
        {inspector ? (
          <div className="inspector-sections">
            <InspectorSection title="Color palette" defaultOpen>
              <div className="grid gap-4">
                <div><p className="inspector-kicker">Brand</p><InspectorTokenRows entries={inspector.colors.brand} swatches /></div>
                <div><p className="inspector-kicker">Accent</p><InspectorTokenRows entries={inspector.colors.accent} swatches /></div>
                <div><p className="inspector-kicker">Neutrals</p><InspectorTokenRows entries={inspector.colors.neutrals} swatches /></div>
              </div>
            </InspectorSection>
            <InspectorSection title="Typography">
              <div><p className="inspector-kicker">Type scale</p><InspectorTokenRows entries={inspector.typography.typeScale} /></div>
              <div><p className="inspector-kicker">Fonts</p><InspectorTokenRows entries={inspector.typography.fonts} /></div>
            </InspectorSection>
            <InspectorSection title="Spacing & shapes">
              <div><p className="inspector-kicker">Spacing</p><InspectorTokenRows entries={inspector.spacing} /></div>
              <div><p className="inspector-kicker">Border radius</p><InspectorTokenRows entries={inspector.radii} /></div>
            </InspectorSection>
            <InspectorSection title="Guidelines">
              <GuidelineList title="Do" items={inspector.guidelines.do} tone="do" />
              <GuidelineList title="Don't" items={inspector.guidelines.dont} tone="dont" />
            </InspectorSection>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-[#303746] p-4 text-sm leading-6 text-[#9ba3b4]">
            Select a flavor to inspect its design tokens and guidelines.
          </div>
        )}
      </div>
    </aside>
  );
}

function MobileFlavorBar({
  activeFlavor,
  onFlavorChange,
}: {
  activeFlavor: Flavor | null;
  onFlavorChange: (flavor: Flavor | null) => void;
}) {
  return (
    <div className="sticky top-0 z-30 border-b border-[#252936] bg-[#0f1117] p-3 text-[#f7f7f3] lg:hidden">
      <label className="sr-only" htmlFor="flavor-select">
        Select flavor
      </label>
      <select
        id="flavor-select"
        value={activeFlavor?.id ?? "no-flavor"}
        onChange={(event) => {
          if (event.target.value === "no-flavor") {
            onFlavorChange(null);
            return;
          }
          const next = flavors.find((flavor) => flavor.id === event.target.value);
          if (next) onFlavorChange(next);
        }}
        className="h-11 w-full rounded-full border border-[#303746] bg-[#151923] px-3 text-sm font-semibold text-[#f7f7f3]"
      >
        <option value="no-flavor">No flavor</option>
        {flavors.map((flavor) => (
          <option key={flavor.id} value={flavor.id}>
            {flavor.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function HomePreview({
  flavor,
  onFlavorChange,
}: {
  flavor: Flavor | null;
  onFlavorChange: (flavor: Flavor | null) => void;
}) {
  return (
    <main id="main-content" className="min-w-0 flex-1">
      <MobileFlavorBar activeFlavor={flavor} onFlavorChange={onFlavorChange} />
      <div className="relative min-h-screen px-6 py-6 md:px-8 lg:px-10">
        <div className="motif pointer-events-none absolute inset-0" />
        <PreviewFrame />
      </div>
    </main>
  );
}

function PreviewFrame() {
  return (
    <Card data-theme-preview="true" className="relative mx-auto w-full max-w-[1200px] gap-0 overflow-hidden py-0">
      <StudioSection />
      <ReferenceSections />
    </Card>
  );
}

function StudioSection() {
  const navItems = ["Shop", "New In", "Stories", "Help"];

  return (
    <section className="relative w-full">
      <nav aria-label="Theme preview navigation" className="mx-2 grid h-12 grid-cols-[1fr_auto_1fr] items-center px-2 sm:mx-4">
        <span className="text-base font-medium">Studio</span>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Button
              key={item}
              variant={item === "Shop" ? "secondary" : "ghost"}
              size="sm"
              aria-current={item === "Shop" ? "page" : undefined}
              className="h-8"
            >
              {item}
            </Button>
          ))}
        </div>
        <div className="hidden items-center justify-self-end md:flex">
          <div className="flex items-center gap-0.5">
            <Button variant="ghost" size="icon" aria-label="Search"><SearchIcon /></Button>
            <Button variant="ghost" size="icon" aria-label="Account"><UserRoundIcon /></Button>
            <Button variant="ghost" size="icon" aria-label="Cart"><ShoppingBagIcon /></Button>
          </div>
          <Button size="sm" className="ml-2 h-8">Sign in</Button>
        </div>
      </nav>
      <div className="px-6 pb-0 pt-6">
        <div className="w-full space-y-10">
          <div className="flex justify-center text-center">
            <div className="max-w-[560px] space-y-4">
              <h2 className="preview-hero-title text-foreground">Little joys,<br />everywhere you go</h2>
              <p className="preview-body text-[var(--muted-foreground)]">We believe the smallest details are the ones that matter most. Turn an ordinary day into something worth remembering.</p>
            </div>
          </div>
          <StudioProducts />
        </div>
      </div>
    </section>
  );
}

function StudioProducts() {
  const products = [
    ["Minimalist Watch", "Clean design meets everyday durability.", "New", "https://astryx.atmeta.com/neutral/preview-watch.png"],
    ["Wireless Headphones", "Immersive sound, all-day comfort.", "Popular", "https://astryx.atmeta.com/neutral/preview-headphones.png"],
    ["Canvas Backpack", "Water-resistant canvas with a quiet, modern profile.", "Limited", "https://astryx.atmeta.com/neutral/preview-backpack.png"],
  ];

  return (
    <div className="mb-px grid w-full gap-4 md:grid-cols-3">
      {products.map(([name, description, label, image]) => {
        const inputId = `quantity-${name.toLowerCase().replaceAll(" ", "-")}`;

        return (
          <Card key={name} className="h-full gap-0 py-0">
            <AspectRatio ratio={1}>
              <img src={image} alt={name} className="size-full object-cover" />
            </AspectRatio>
            <CardContent className="flex flex-1 flex-col gap-2 p-4">
              <Badge>{label}</Badge>
              <CardTitle className="preview-card-title text-center">{name}</CardTitle>
              <CardDescription className="preview-card-description flex-1 text-center">{description}</CardDescription>
              <div className="grid w-full min-w-0 grid-cols-2 gap-2">
                <div className="min-w-0">
                  <Label className="sr-only" htmlFor={inputId}>Quantity</Label>
                  <Input id={inputId} defaultValue="1" aria-label="Quantity" className="h-7 w-full text-sm" />
                </div>
                <Button variant="secondary" size="sm" className="h-7 w-full min-w-0">Add to cart</Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function ReferenceSections() {
  return (
    <div className="relative w-full space-y-4 bg-[var(--card)] px-6 py-6">
      <div className="grid gap-4 lg:grid-cols-[0.36fr_0.64fr]">
        <ReferenceCheckout />
        <ReferenceStudioAi />
      </div>
      <div className="grid gap-4 lg:grid-cols-[1fr_260px]">
        <ReferenceInventory />
        <ReferenceRevenue />
      </div>
    </div>
  );
}

function ReferenceCheckout() {
  const shipping = [
    ["economy", "Economy Shipping", "Delivered in 5–7 business days", "$12.00"],
    ["standard", "Standard Shipping", "Delivered in 3–5 business days", "$16.00"],
    ["express", "Express Shipping", "Delivered in 1–2 business days", "$24.00"],
  ];

  return (
    <Card className="gap-5 py-5">
      <CardHeader className="px-5"><CardTitle className="text-xl font-semibold">Checkout</CardTitle></CardHeader>
      <CardContent className="grid gap-4 px-5">
        <div className="grid gap-2">
          <Label htmlFor="checkout-email">Email</Label>
          <Input id="checkout-email" type="email" placeholder="you@studio.com" />
        </div>
        <div className="grid gap-2">
          <div><p className="text-sm font-medium">Shipping method</p><p className="mt-1 text-xs text-[var(--muted-foreground)]">Delivery time may vary based on location and availability.</p></div>
          <RadioGroup defaultValue="economy" aria-label="Shipping method" className="gap-2">
            {shipping.map(([value, title, detail, price]) => (
              <Label key={value} className="flex cursor-pointer items-center gap-3 text-sm font-normal">
                <RadioGroupItem value={value} />
                <span className="min-w-0 flex-1"><span className="block font-medium">{title}</span><span className="block text-xs text-[var(--muted-foreground)]">{detail}</span></span>
                <strong className="text-sm">{price}</strong>
              </Label>
            ))}
          </RadioGroup>
        </div>
        <div className="grid gap-2">
          <p className="text-sm font-medium">Payment method</p>
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" className="h-16 flex-col gap-1 text-xs"><CreditCardIcon className="size-4" /><span>Card</span></Button>
            <Button variant="outline" className="h-16 flex-col gap-1 text-xs"><AppleIcon className="size-4" /><span>Apple Pay</span></Button>
            <Button variant="outline" className="h-16 flex-col gap-1 text-xs"><WalletCardsIcon className="size-4" /><span>Google Pay</span></Button>
          </div>
        </div>
        <div className="grid gap-2"><Label htmlFor="card-number">Card number</Label><Input id="card-number" placeholder="1234 1234 1234 1234" /></div>
        <div className="grid grid-cols-2 gap-2">
          <div className="grid gap-2"><Label htmlFor="expiry">Expiry</Label><Input id="expiry" placeholder="MM / YY" /></div>
          <div className="grid gap-2"><Label htmlFor="cvc">CVC</Label><Input id="cvc" placeholder="123" /></div>
        </div>
        <div className="grid gap-2"><Label htmlFor="country">Country</Label><NativeSelect id="country" className="w-full"><NativeSelectOption value="us">United States</NativeSelectOption></NativeSelect></div>
        <Label className="items-start gap-2 text-sm font-normal"><Checkbox defaultChecked aria-label="Securely save my information for 1-click checkout" /><span><span className="block">Securely save my information for 1-click checkout</span><span className="mt-1 block text-xs text-[var(--muted-foreground)]">Pay faster on Studio and everywhere Link is accepted.</span></span></Label>
        <Button className="w-full"><CreditCardIcon />Pay now</Button>
      </CardContent>
    </Card>
  );
}

function ReferenceStudioAi() {
  return (
    <Card className="py-0">
      <CardHeader className="border-b border-border px-4 py-4"><div className="flex items-center justify-between"><CardTitle className="text-xl font-semibold">Studio AI</CardTitle><div className="flex gap-1"><Button variant="ghost" size="icon-sm" aria-label="Export conversation"><DownloadIcon /></Button><Button variant="ghost" size="icon-sm" aria-label="Close chat"><XIcon /></Button></div></div></CardHeader>
      <CardContent className="grid gap-5 px-4 pb-4 pt-0">
        <MessageScrollerProvider defaultScrollPosition="end">
          <MessageScroller className="max-h-[480px]">
            <MessageScrollerViewport>
              <MessageScrollerContent>
                <MessageScrollerItem messageId="order-question" scrollAnchor>
                  <Message align="end"><MessageContent><div className="w-fit max-w-[80%] self-end rounded-lg bg-muted px-4 py-3 text-sm">Where’s my order?</div></MessageContent></Message>
                </MessageScrollerItem>
                <MessageScrollerItem messageId="order-answer">
                  <Message><MessageContent><p className="text-sm leading-5">Your order #1043 — the Minimalist Watch and Linen Throw — shipped this morning from the Aisle 3 warehouse and is currently in transit with UPS. It’s on track to arrive at your address by end of day tomorrow.</p><p className="text-sm leading-5">Let me know if you’d like to reschedule the delivery, redirect it to a pickup point, or start a return once it arrives.</p></MessageContent></Message>
                </MessageScrollerItem>
                <MessageScrollerItem messageId="order-details-question" scrollAnchor>
                  <Message align="end"><MessageContent><div className="w-fit max-w-[80%] self-end rounded-lg bg-muted px-4 py-3 text-sm">Can you show me the full details?</div></MessageContent></Message>
                </MessageScrollerItem>
                <MessageScrollerItem messageId="order-details">
                  <Message><MessageContent><p className="text-sm">Here’s everything I have on order #1043:</p><Card className="mx-px grid min-w-0 gap-3 px-4 py-4"><div className="flex min-w-0 justify-between gap-4"><span className="min-w-0">Items<span className="block text-xs text-[var(--muted-foreground)]">Minimalist Watch · Linen Throw</span></span><strong>$248</strong></div><div className="min-w-0"><span>Shipping</span><span className="ml-2 text-xs text-[var(--muted-foreground)]">UPS Ground · $12</span></div><div className="flex min-w-0 justify-between gap-4"><span className="min-w-0">Estimated arrival<span className="block text-xs text-[var(--muted-foreground)]">Tomorrow by 8pm</span></span><Badge>On time</Badge></div><div className="flex min-w-0 justify-between gap-4"><span className="min-w-0">Tracking<span className="block break-all text-xs text-[var(--muted-foreground)]">UPS 1Z 999 AA1 0123 4567 84</span></span><Button variant="link" size="xs">Track →</Button></div></Card></MessageContent></Message>
                </MessageScrollerItem>
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>
        <div className="flex flex-wrap justify-center gap-1"><Button variant="secondary" size="sm">Reschedule delivery</Button><Button variant="secondary" size="sm">Update shipping address</Button><Button variant="secondary" size="sm">Start a return</Button></div>
        <Card className="py-2"><Textarea placeholder="Ask Studio AI..." aria-label="Message input" className="min-h-14 resize-none border-0 bg-transparent p-2 shadow-none focus-visible:ring-0" /><div className="flex items-center justify-between px-2"><Button variant="ghost" size="icon-sm" aria-label="Attach"><PlusIcon /></Button><div className="flex gap-1"><Button variant="ghost" size="icon-sm" aria-label="Voice input"><MicIcon /></Button><Button size="icon-sm" aria-label="Send" disabled><ArrowUpIcon /></Button></div></div></Card>
      </CardContent>
    </Card>
  );
}

function ReferenceInventory() {
  const items = [
    [false, "Minimalist Watch", "Stainless steel, sapphire crystal", "42", "Aisle 3", "New", "https://astryx.atmeta.com/template-assets/Neutral-Watch.png"],
    [true, "Wireless Headphones", "ANC, 30hr battery", "128", "Aisle 1", "Popular", "https://astryx.atmeta.com/template-assets/Neutral-Headphones.png"],
    [false, "Canvas Backpack", "Water-resistant, 25L", "63", "Aisle 2", "Limited", "https://astryx.atmeta.com/template-assets/Neutral-Backpack.png"],
    [true, "Leather Wallet", "Full-grain, RFID blocking", "15", "Aisle 4", "Leather", "https://astryx.atmeta.com/template-assets/Neutral-Wallet.png"],
    [false, "Travel Tumbler", "Vacuum insulated, 16oz", "87", "Aisle 5", "Drinkware", "https://astryx.atmeta.com/template-assets/Neutral-Tumbler.png"],
    [true, "Linen Throw", "Heavyweight, oat", "24", "Aisle 6", "Home", "https://astryx.atmeta.com/template-assets/Neutral-Blanket.png"],
  ];

  return (
    <Card className="py-0">
      <CardHeader className="flex-row items-center justify-between border-b border-border px-5 py-4"><CardTitle className="text-xl font-semibold">Inventory</CardTitle><Button size="sm"><PlusIcon />Add item</Button></CardHeader>
      <CardContent className="grid gap-4 p-5">
        <div className="flex flex-wrap items-center gap-3"><div className="relative"><SearchIcon className="pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-[var(--muted-foreground)]" /><Input className="h-7 w-48 pl-7" placeholder="Type and hit enter..." aria-label="Search inventory" /></div><Button variant="ghost" size="sm"><TagIcon />Filters</Button><div className="ml-auto flex gap-1"><Button variant="ghost" size="icon-sm" aria-label="List view"><ListIcon /></Button><Button variant="ghost" size="icon-sm" aria-label="Grid view"><Grid2X2Icon /></Button></div></div>
        <Alert><AlertTriangleIcon /><AlertTitle>2 items are running low</AlertTitle></Alert>
        <Table><TableHeader className="[&_tr]:border-border"><TableRow><TableHead className="w-10" /><TableHead>Item</TableHead><TableHead>Available</TableHead><TableHead>Location</TableHead><TableHead>Tags</TableHead><TableHead className="w-10" /></TableRow></TableHeader><TableBody>{items.map(([selected, name, details, available, location, tag, image]) => <TableRow key={name} className="border-border"><TableCell><Checkbox defaultChecked={Boolean(selected)} aria-label={`Select ${name}`} /></TableCell><TableCell><div className="flex items-center gap-3"><img src={image} alt="" className="size-10 rounded-lg object-cover" /><span><span className="block font-medium">{name}</span><span className="block text-xs text-[var(--muted-foreground)]">{details}</span></span></div></TableCell><TableCell>{available}</TableCell><TableCell>{location}</TableCell><TableCell><Badge>{tag}</Badge></TableCell><TableCell><Button variant="ghost" size="icon-sm" aria-label="Row actions"><EllipsisIcon /></Button></TableCell></TableRow>)}</TableBody></Table>
      </CardContent>
    </Card>
  );
}

function ReferenceRevenue() {
  const activity = [["order", "Order #1043", "Placed · 1:59 pm", "+$248"], ["refund", "Order #1041", "Refunded · 12:40 pm", "−$89"], ["order", "Order #1040", "Placed · 10:30 am", "+$156"], ["order", "Order #1038", "Placed · 9:11 am", "+$412"], ["order", "Order #1037", "Placed · 8:42 am", "+$95"]];
  return (
    <Card className="py-0"><CardHeader className="px-5 py-4"><CardTitle className="text-xl font-semibold">Revenue</CardTitle></CardHeader><CardContent className="grid gap-5 px-5 pb-5"><div className="grid grid-cols-2 gap-4"><div><p className="text-2xl font-semibold">18K</p><p className="text-xs text-[var(--muted-foreground)]">Monthly revenue</p></div><div><p className="text-2xl font-semibold">+12%</p><p className="text-xs text-[var(--muted-foreground)]">Order growth</p></div></div><Separator /><div className="flex items-center justify-between"><h3 className="font-semibold">Activity</h3><Button variant="link" size="xs">See all</Button></div><div className="grid gap-4">{activity.map(([icon, title, detail, amount]) => <div key={title} className="flex items-center gap-2 text-sm"><span className="flex size-8 items-center justify-center rounded-full bg-muted text-xs">{icon === "refund" ? <ArrowUpIcon className="size-4 rotate-180" /> : <PackageIcon className="size-4" />}</span><span className="min-w-0 flex-1"><span className="block font-medium">{title}</span><span className="block text-xs text-[var(--muted-foreground)]">{detail}</span></span><strong>{amount}</strong></div>)}</div></CardContent></Card>
  );
}

export default function App() {
  const [selectedFlavorId, setSelectedFlavorId] = React.useState<string | null>(null);
  const activeFlavor = flavors.find((flavor) => flavor.id === selectedFlavorId) ?? null;
  const setActiveFlavor = (flavor: Flavor | null) => setSelectedFlavorId(flavor?.id ?? null);
  const leftPanel = usePanelWidth(PANEL_DEFAULT_LEFT);
  const rightPanel = usePanelWidth(PANEL_DEFAULT_RIGHT);

  return (
    <div className="app-shell min-h-screen bg-[#0f1117]">
      <AppHeader />
      <div className="app-body flex min-h-[calc(100vh-4rem)] items-stretch">
        <FlavorSidebar
          activeFlavor={activeFlavor}
          onFlavorChange={setActiveFlavor}
          width={leftPanel.width}
          onResize={(event) => leftPanel.startResize(event, 1)}
          onResizeKeyDown={leftPanel.handleKeyDown}
        />
        <div className={activeFlavor?.colorScheme === "dark" ? "theme-root dark min-w-0 flex-1" : "theme-root min-w-0 flex-1"} style={cssVars(activeFlavor)}>
          <HomePreview flavor={activeFlavor} onFlavorChange={setActiveFlavor} />
        </div>
        <FlavorInspector
          activeFlavor={activeFlavor}
          width={rightPanel.width}
          onResize={(event) => rightPanel.startResize(event, -1)}
          onResizeKeyDown={rightPanel.handleKeyDown}
        />
      </div>
    </div>
  );
}
