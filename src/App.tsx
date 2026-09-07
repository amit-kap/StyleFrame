import * as React from "react";
import {
  ArrowRightIcon,
  BracketsCurlyIcon,
  ChartLineUpIcon,
  CheckCircleIcon,
  CircuitryIcon,
  CopyIcon,
  FileTextIcon,
  GaugeIcon,
  SparkleIcon,
} from "@phosphor-icons/react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { defaultFlavor, flavors, type Flavor } from "@/data/flavors";

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

function cssVars(flavor: Flavor) {
  return flavor.cssVars as React.CSSProperties;
}

function FlavorSidebar({
  activeFlavor,
  onFlavorChange,
}: {
  activeFlavor: Flavor;
  onFlavorChange: (flavor: Flavor) => void;
}) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-80 overflow-y-auto border-r border-[#252936] bg-[#0f1117] p-5 text-[#f7f7f3] shadow-[0_24px_80px_rgb(0_0_0_/_0.28)] lg:flex lg:flex-col">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-full border border-[#303746] bg-[#f7f7f3] text-[#0f1117]">
          <BracketsCurlyIcon className="size-6" weight="bold" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase text-[#9ba3b4]">DESIGN.md lab</p>
          <h1 className="text-2xl font-semibold">Styleframe</h1>
        </div>
      </div>

      <Separator className="my-5 bg-[#252936]" />

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase text-[#9ba3b4]">
          Flavors ({flavors.length})
        </p>
        <div className="grid gap-2">
          {flavors.map((flavor) => {
            const isActive = flavor.id === activeFlavor.id;
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
                  <SheetTrigger asChild>
                    <button
                      type="button"
                      className="flex size-6 shrink-0 items-center justify-center rounded-md text-[#8f98aa] transition-colors hover:bg-[#202735] hover:text-[#f0f2f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f7f7f3]/70"
                      aria-label={`Open ${flavor.name} DESIGN.md`}
                    >
                      <FileTextIcon className="size-3.5" />
                    </button>
                  </SheetTrigger>
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
                        {[
                          ["Mood", flavor.mood],
                          ["Density", flavor.density],
                          ["Motion", flavor.motion],
                        ].map(([label, value]) => (
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

function MobileFlavorBar({
  activeFlavor,
  onFlavorChange,
}: {
  activeFlavor: Flavor;
  onFlavorChange: (flavor: Flavor) => void;
}) {
  return (
    <div className="sticky top-0 z-30 border-b border-[#252936] bg-[#0f1117] p-3 text-[#f7f7f3] lg:hidden">
      <label className="sr-only" htmlFor="flavor-select">
        Select flavor
      </label>
      <select
        id="flavor-select"
        value={activeFlavor.id}
        onChange={(event) => {
          const next = flavors.find((flavor) => flavor.id === event.target.value);
          if (next) onFlavorChange(next);
        }}
        className="h-11 w-full rounded-full border border-[#303746] bg-[#151923] px-3 text-sm font-semibold text-[#f7f7f3]"
      >
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
  flavor: Flavor;
  onFlavorChange: (flavor: Flavor) => void;
}) {
  useReveal();

  const metrics = [
    ["Flavor files", "13"],
    ["Theme tokens", "31"],
    ["shadcn parts", "10"],
  ];

  return (
    <main id="main-content" className="min-h-screen lg:ml-80">
      <MobileFlavorBar activeFlavor={flavor} onFlavorChange={onFlavorChange} />
      <div className="relative overflow-hidden">
        <div className="motif pointer-events-none absolute inset-0" />
        <div className="relative flex min-h-screen w-full flex-col px-6 py-8 md:px-10 lg:px-12">
          <nav className="reveal flex items-center justify-between gap-4 rounded-[var(--radius-button)] border border-[var(--border)] bg-[var(--card)] px-4 py-3 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent-soft)] text-[var(--accent)]">
                <CircuitryIcon className="size-5" weight="bold" />
              </div>
              <span className="text-base font-semibold">Frameworks</span>
            </div>
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" size="sm" aria-current="page">
                Preview
              </Button>
              <Button variant="ghost" size="sm">
                Tokens
              </Button>
              <Button variant="ghost" size="sm">
                Library
              </Button>
            </div>
          </nav>

          <section className="grid flex-1 items-center gap-10 py-24 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="reveal max-w-[680px] space-y-6">
              <Badge variant="secondary">Active flavor: {flavor.name}</Badge>
              <h2 className="hero-title">
                One page.
                <br />
                Thirteen design systems.
              </h2>
              <p className="copy max-w-[680px] text-[var(--muted-foreground)]">
                Styleframe applies a flavor specific DESIGN.md file to one homepage, so the same
                structure can feel calm, technical, expressive, or electric in a single click.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg">
                  Try the active flavor
                  <ArrowRightIcon className="size-5" />
                </Button>
                <Button size="lg" variant="outline">
                  Compare tokens
                </Button>
              </div>
              <p className="text-sm text-[var(--muted-foreground)]">
                Built from real shadcn primitives with Tailwind v4 CSS variables.
              </p>
            </div>

            <Card className="reveal overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <Badge>{flavor.name}</Badge>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button size="icon" variant="ghost" aria-label="Copy token summary">
                          <CopyIcon className="size-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Copy token summary</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <CardTitle>Applied theme snapshot</CardTitle>
                <CardDescription>
                  The same components stay mounted while variables change around them.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {metrics.map(([label, value]) => (
                    <div key={label} className="rounded-[var(--radius-input)] bg-[var(--muted)] p-4">
                      <p className="text-3xl font-semibold">{value}</p>
                      <p className="mt-1 text-sm text-[var(--muted-foreground)]">{label}</p>
                    </div>
                  ))}
                </div>
                <Tabs defaultValue="tokens" className="mt-6">
                  <TabsList>
                    <TabsTrigger value="tokens">Tokens</TabsTrigger>
                    <TabsTrigger value="rules">Rules</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tokens">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Role</TableHead>
                          <TableHead>Value</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>Accent</TableCell>
                          <TableCell>{flavor.cssVars["--accent"]}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Card radius</TableCell>
                          <TableCell>{flavor.cssVars["--radius-card"]}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Section rhythm</TableCell>
                          <TableCell>{flavor.cssVars["--section-space"]}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TabsContent>
                  <TabsContent value="rules">
                    <p className="copy rounded-[var(--radius-input)] bg-[var(--muted)] p-4 text-base leading-6 text-[var(--muted-foreground)]">
                      Preserve the page structure. Change the visual grammar through tokens,
                      density, shape, and component state behavior.
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>

      <ContentSections flavor={flavor} />
    </main>
  );
}

function ContentSections({ flavor }: { flavor: Flavor }) {
  const benefits = [
    {
      icon: <GaugeIcon className="size-6" weight="bold" />,
      title: "Switch taste without rebuilding",
      body: "The homepage uses one component tree. Flavor files alter the tokens, density, and surface behavior.",
    },
    {
      icon: <FileTextIcon className="size-6" weight="bold" />,
      title: "Keep markdown visible",
      body: "Every coded theme has a matching DESIGN.md file, so the source reference stays readable.",
    },
    {
      icon: <ChartLineUpIcon className="size-6" weight="bold" />,
      title: "See component impact",
      body: "Buttons, cards, tables, forms, tabs, overlays, and badges all respond to the selected flavor.",
    },
  ];

  const words =
    "A design reference becomes tangible when the same interface changes shape color rhythm and voice".split(
      " ",
    );

  return (
    <div>
      <section className="grid w-full gap-6 px-6 py-20 md:px-10 lg:grid-cols-3 lg:px-12">
        {benefits.map((benefit) => (
          <Card key={benefit.title} className="reveal">
            <CardHeader>
              <div className="flex size-12 items-center justify-center rounded-[var(--radius-input)] bg-[var(--accent-soft)] text-[var(--accent)]">
                {benefit.icon}
              </div>
              <CardTitle>{benefit.title}</CardTitle>
              <CardDescription>{benefit.body}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="w-full px-6 py-20 md:px-10 lg:px-12">
        <div className="reveal max-w-[680px]">
          <Badge variant="outline">Tagline reveal</Badge>
          <p className="mt-6 text-5xl font-bold leading-none text-balance md:text-6xl">
            {words.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="tagline-word mr-3 inline-block"
                style={{ transitionDelay: `${index * 45}ms` }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </section>

      <section className="grid w-full gap-8 px-6 py-20 md:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
        <div className="reveal space-y-5">
          <Badge>How it works</Badge>
          <h2 className="text-5xl font-bold leading-none text-balance">The flavor file acts like a design contract.</h2>
          <p className="copy text-lg leading-7 text-[var(--muted-foreground)]">
            Phase 1 keeps parsing out of scope. That makes it easier to tune the feeling of each
            style before the app accepts arbitrary markdown.
          </p>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">Amit Kaplan</p>
              <p className="text-sm text-[var(--muted-foreground)]">Design systems reviewer</p>
            </div>
          </div>
        </div>

        <Card className="reveal">
          <CardHeader>
            <CardTitle>Theme handoff checklist</CardTitle>
            <CardDescription>
              Each flavor has enough structure to become a proper runtime later.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible defaultValue="tokens">
              <AccordionItem value="tokens">
                <AccordionTrigger>Tokens are explicit</AccordionTrigger>
                <AccordionContent>
                  Colors, radius, spacing, shadow, type, and motif variables are named and applied
                  through the preview root.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="components">
                <AccordionTrigger>Components are shared</AccordionTrigger>
                <AccordionContent>
                  The same shadcn primitives are used across flavors. The app changes their visual
                  contract, not their markup.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="markdown">
                <AccordionTrigger>Markdown remains inspectable</AccordionTrigger>
                <AccordionContent>
                  The active DESIGN.md file is visible in a drawer, making the connection between
                  readable guidance and rendered UI easy to inspect.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </section>

      <section className="w-full px-6 py-20 md:px-10 lg:px-12">
        <Card className="reveal overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[1fr_0.8fr]">
            <div className="p-6 md:p-8">
              <Badge variant="secondary">Newsletter component</Badge>
              <h2 className="mt-5 text-4xl font-bold leading-10 text-balance">
                Follow the Phase 2 parser work.
              </h2>
              <p className="copy mt-4 text-lg leading-7 text-[var(--muted-foreground)]">
                The form is here to prove inputs, validation affordances, and buttons inherit the
                selected flavor.
              </p>
              <form
                className="mt-6 flex flex-col gap-3 sm:flex-row"
                onSubmit={(event) => event.preventDefault()}
              >
                <Input type="email" required placeholder="amit@example.com" aria-label="Email address" />
                <Button type="submit">Join preview</Button>
              </form>
            </div>
            <div className="flex min-h-80 items-center justify-center bg-[var(--muted)] p-8">
              <div className="relative flex aspect-square w-56 items-center justify-center rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-card)]">
                <SparkleIcon className="size-20 text-[var(--accent)]" weight="duotone" />
                <div className="absolute inset-8 rounded-[var(--radius-card)] border border-[var(--accent)] opacity-40" />
              </div>
            </div>
          </div>
        </Card>
      </section>

      <footer className="border-t border-[var(--border)] bg-[var(--card)] px-6 py-10 md:px-10 lg:px-12">
        <div className="flex w-full flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xl font-semibold">Styleframe</p>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              Current flavor: {flavor.name}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted-foreground)]">
            <a className="hover:text-[var(--foreground)]" href="#main-content">
              Back to preview
            </a>
            <span>Privacy</span>
            <span>Terms</span>
            <span className="inline-flex items-center gap-1 text-[var(--foreground)]">
              <CheckCircleIcon className="size-4" weight="fill" />
              Phase 1
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [activeFlavor, setActiveFlavor] = React.useState<Flavor>(defaultFlavor);

  React.useEffect(() => {
    const root = document.documentElement;
    Object.entries(activeFlavor.cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    return () => {
      Object.keys(activeFlavor.cssVars).forEach((key) => {
        root.style.removeProperty(key);
      });
    };
  }, [activeFlavor]);

  return (
    <div>
      <FlavorSidebar activeFlavor={activeFlavor} onFlavorChange={setActiveFlavor} />
      <div className="theme-root" style={cssVars(activeFlavor)}>
        <HomePreview flavor={activeFlavor} onFlavorChange={setActiveFlavor} />
      </div>
    </div>
  );
}
