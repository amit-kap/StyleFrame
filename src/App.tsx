/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import {
  BracketsCurlyIcon,
  DotsThreeIcon,
  FileTextIcon,
  HandbagIcon,
  ListBulletsIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  SquaresFourIcon,
  TagIcon,
  UserCircleIcon,
  WarningIcon,
} from "@phosphor-icons/react";
import { AspectRatio } from "@comp/components/ui/aspect-ratio";
import { Alert, AlertTitle } from "@comp/components/ui/alert";
import { Badge } from "@comp/components/ui/badge";
import { Button } from "@comp/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@comp/components/ui/card";
import { Checkbox } from "@comp/components/ui/checkbox";
import { Input } from "@comp/components/ui/input";
import { Label } from "@comp/components/ui/label";
import { Message, MessageContent, MessageGroup } from "@comp/components/ui/message";
import { NativeSelect, NativeSelectOption } from "@comp/components/ui/native-select";
import { RadioGroup, RadioGroupItem } from "@comp/components/ui/radio-group";
import { Separator } from "@comp/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@comp/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@comp/components/ui/table";
import { Textarea } from "@comp/components/ui/textarea";
import { flavors, type Flavor } from "@/data/flavors";

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
  return flavor ? flavor.cssVars as React.CSSProperties : undefined;
}

function FlavorSidebar({
  activeFlavor,
  onFlavorChange,
}: {
  activeFlavor: Flavor | null;
  onFlavorChange: (flavor: Flavor | null) => void;
}) {
  useReveal();

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
    <main id="main-content" className="min-h-screen lg:ml-80">
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
      <nav aria-label="Theme preview navigation" className="grid h-12 grid-cols-[1fr_auto_1fr] items-center px-2">
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
            <Button variant="ghost" size="icon" aria-label="Search"><MagnifyingGlassIcon /></Button>
            <Button variant="ghost" size="icon" aria-label="Account"><UserCircleIcon /></Button>
            <Button variant="ghost" size="icon" aria-label="Cart"><HandbagIcon /></Button>
          </div>
          <Button size="sm" className="ml-2 h-8">Sign in</Button>
        </div>
      </nav>
      <div className="px-6 pb-6 pt-6">
        <div className="mx-auto max-w-[880px] space-y-10">
          <div className="flex justify-center text-center">
            <div className="max-w-[560px] space-y-4">
              <h2 className="text-4xl font-normal text-foreground">Little joys,<br />everywhere you go</h2>
              <p className="text-sm leading-5 text-[var(--muted-foreground)]">We believe the smallest details are the ones that matter most. Turn an ordinary day into something worth remembering.</p>
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
    <div className="grid w-full gap-4 md:grid-cols-3">
      {products.map(([name, description, label, image]) => {
        const inputId = `quantity-${name.toLowerCase().replaceAll(" ", "-")}`;

        return (
          <Card key={name} className="h-full gap-0 py-0">
            <AspectRatio ratio={1}>
              <img src={image} alt={name} className="size-full object-cover" />
            </AspectRatio>
            <CardContent className="flex flex-1 flex-col gap-2 p-4">
              <Badge>{label}</Badge>
              <CardTitle className="text-center text-xl font-semibold leading-7">{name}</CardTitle>
              <CardDescription className="flex-1 text-center text-xs leading-5">{description}</CardDescription>
              <div className="flex w-full min-w-0 flex-wrap gap-2">
                <div className="w-[72px]">
                  <Label className="sr-only" htmlFor={inputId}>Quantity</Label>
                  <Input id={inputId} defaultValue="1" aria-label="Quantity" className="h-7 text-sm" />
                </div>
                <Button variant="secondary" size="sm" className="h-7 min-w-0 flex-1">Add to cart</Button>
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
            <Button variant="outline" className="h-16 flex-col gap-1 text-xs">▭<span>Card</span></Button>
            <Button variant="outline" className="h-16 flex-col gap-1 text-xs">▯<span>Apple Pay</span></Button>
            <Button variant="outline" className="h-16 flex-col gap-1 text-xs">▱<span>Google Pay</span></Button>
          </div>
        </div>
        <div className="grid gap-2"><Label htmlFor="card-number">Card number</Label><Input id="card-number" placeholder="1234 1234 1234 1234" /></div>
        <div className="grid grid-cols-2 gap-2">
          <div className="grid gap-2"><Label htmlFor="expiry">Expiry</Label><Input id="expiry" placeholder="MM / YY" /></div>
          <div className="grid gap-2"><Label htmlFor="cvc">CVC</Label><Input id="cvc" placeholder="123" /></div>
        </div>
        <div className="grid gap-2"><Label htmlFor="country">Country</Label><NativeSelect id="country" className="w-full"><NativeSelectOption value="us">United States</NativeSelectOption></NativeSelect></div>
        <Label className="items-start gap-2 text-sm font-normal"><Checkbox defaultChecked aria-label="Securely save my information for 1-click checkout" /><span><span className="block">Securely save my information for 1-click checkout</span><span className="mt-1 block text-xs text-[var(--muted-foreground)]">Pay faster on Studio and everywhere Link is accepted.</span></span></Label>
        <Button className="w-full">▢&nbsp; Pay now</Button>
      </CardContent>
    </Card>
  );
}

function ReferenceStudioAi() {
  return (
    <Card className="py-0">
      <CardHeader className="border-b border-border px-4 py-4"><div className="flex items-center justify-between"><CardTitle className="text-xl font-semibold">Studio AI</CardTitle><div className="flex gap-1"><Button variant="ghost" size="icon-sm" aria-label="Export conversation">⇩</Button><Button variant="ghost" size="icon-sm" aria-label="Close chat">×</Button></div></div></CardHeader>
      <CardContent className="grid gap-5 p-4">
        <p className="text-center text-xs text-[var(--muted-foreground)]">Today</p>
        <MessageGroup>
          <Message align="end"><MessageContent><div className="max-w-[80%] rounded-lg bg-muted px-4 py-3 text-sm">Where’s my order?</div></MessageContent></Message>
          <Message><MessageContent><p className="text-sm leading-5">Your order #1043 — the Minimalist Watch and Linen Throw — shipped this morning from the Aisle 3 warehouse and is currently in transit with UPS. It’s on track to arrive at your address by end of day tomorrow.</p><p className="text-sm leading-5">Let me know if you’d like to reschedule the delivery, redirect it to a pickup point, or start a return once it arrives.</p></MessageContent></Message>
          <Message align="end"><MessageContent><div className="max-w-[80%] rounded-lg bg-muted px-4 py-3 text-sm">Can you show me the full details?</div></MessageContent></Message>
          <Message><MessageContent><p className="text-sm">Here’s everything I have on order #1043:</p><Card className="grid gap-3 py-4"><div className="flex justify-between gap-4"><span>Items<span className="block text-xs text-[var(--muted-foreground)]">Minimalist Watch · Linen Throw</span></span><strong>$248</strong></div><div><span>Shipping</span><span className="ml-2 text-xs text-[var(--muted-foreground)]">UPS Ground · $12</span></div><div className="flex justify-between"><span>Estimated arrival<span className="block text-xs text-[var(--muted-foreground)]">Tomorrow by 8pm</span></span><Badge>On time</Badge></div><div className="flex justify-between"><span>Tracking<span className="block text-xs text-[var(--muted-foreground)]">UPS 1Z 999 AA1 0123 4567 84</span></span><Button variant="link" size="xs">Track →</Button></div></Card></MessageContent></Message>
        </MessageGroup>
        <div className="flex flex-wrap justify-center gap-1"><Button variant="secondary" size="sm">Reschedule delivery</Button><Button variant="secondary" size="sm">Update shipping address</Button><Button variant="secondary" size="sm">Start a return</Button></div>
        <Card className="py-2"><Textarea placeholder="Ask Studio AI..." aria-label="Message input" className="min-h-14 resize-none border-0 bg-transparent p-2 shadow-none focus-visible:ring-0" /><div className="flex items-center justify-between px-2"><Button variant="ghost" size="icon-sm" aria-label="Attach">+</Button><div className="flex gap-1"><Button variant="ghost" size="icon-sm" aria-label="Voice input">♩</Button><Button size="icon-sm" aria-label="Send" disabled>↑</Button></div></div></Card>
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
        <div className="flex flex-wrap items-center gap-3"><div className="relative"><MagnifyingGlassIcon className="pointer-events-none absolute left-2 top-1/2 size-3.5 -translate-y-1/2 text-[var(--muted-foreground)]" /><Input className="h-7 w-48 pl-7" placeholder="Type and hit enter..." aria-label="Search inventory" /></div><Button variant="ghost" size="sm"><TagIcon />Filters</Button><div className="ml-auto flex gap-1"><Button variant="ghost" size="icon-sm" aria-label="List view"><ListBulletsIcon /></Button><Button variant="ghost" size="icon-sm" aria-label="Grid view"><SquaresFourIcon /></Button></div></div>
        <Alert><WarningIcon /><AlertTitle>2 items are running low</AlertTitle></Alert>
        <Table><TableHeader className="[&_tr]:border-border"><TableRow><TableHead className="w-10" /><TableHead>Item</TableHead><TableHead>Available</TableHead><TableHead>Location</TableHead><TableHead>Tags</TableHead><TableHead className="w-10" /></TableRow></TableHeader><TableBody>{items.map(([selected, name, details, available, location, tag, image]) => <TableRow key={name} className="border-border"><TableCell><Checkbox defaultChecked={Boolean(selected)} aria-label={`Select ${name}`} /></TableCell><TableCell><div className="flex items-center gap-3"><img src={image} alt="" className="size-10 rounded-lg object-cover" /><span><span className="block font-medium">{name}</span><span className="block text-xs text-[var(--muted-foreground)]">{details}</span></span></div></TableCell><TableCell>{available}</TableCell><TableCell>{location}</TableCell><TableCell><Badge>{tag}</Badge></TableCell><TableCell><Button variant="ghost" size="icon-sm" aria-label="Row actions"><DotsThreeIcon /></Button></TableCell></TableRow>)}</TableBody></Table>
      </CardContent>
    </Card>
  );
}

function ReferenceRevenue() {
  const activity = [["▣", "Order #1043", "Placed · 1:59 pm", "+$248"], ["▤", "Order #1041", "Refunded · 12:40 pm", "−$89"], ["▣", "Order #1040", "Placed · 10:30 am", "+$156"], ["▣", "Order #1038", "Placed · 9:11 am", "+$412"], ["▣", "Order #1037", "Placed · 8:42 am", "+$95"]];
  return (
    <Card className="py-0"><CardHeader className="px-5 py-4"><CardTitle className="text-xl font-semibold">Revenue</CardTitle></CardHeader><CardContent className="grid gap-5 px-5 pb-5"><div className="grid grid-cols-2 gap-4"><div><p className="text-2xl font-semibold">18K</p><p className="text-xs text-[var(--muted-foreground)]">Monthly revenue</p></div><div><p className="text-2xl font-semibold">+12%</p><p className="text-xs text-[var(--muted-foreground)]">Order growth</p></div></div><Separator /><div className="flex items-center justify-between"><h3 className="font-semibold">Activity</h3><Button variant="link" size="xs">See all</Button></div><div className="grid gap-4">{activity.map(([icon, title, detail, amount]) => <div key={title} className="flex items-center gap-2 text-sm"><span className="flex size-8 items-center justify-center rounded-full bg-muted text-xs">{icon}</span><span className="min-w-0 flex-1"><span className="block font-medium">{title}</span><span className="block text-xs text-[var(--muted-foreground)]">{detail}</span></span><strong>{amount}</strong></div>)}</div></CardContent></Card>
  );
}

export default function App() {
  const [activeFlavor, setActiveFlavor] = React.useState<Flavor | null>(null);

  return (
    <div>
      <FlavorSidebar activeFlavor={activeFlavor} onFlavorChange={setActiveFlavor} />
      <div className="theme-root" style={cssVars(activeFlavor)}>
        <HomePreview flavor={activeFlavor} onFlavorChange={setActiveFlavor} />
      </div>
    </div>
  );
}
