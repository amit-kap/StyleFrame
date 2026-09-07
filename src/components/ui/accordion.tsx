import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { CaretDownIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn("border-b border-[var(--border)] last:border-b-0", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          "flex flex-1 items-center justify-between gap-4 py-4 text-left text-base font-semibold transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <CaretDownIcon className="size-4 shrink-0 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="grid data-[state=closed]:grid-rows-[0fr] data-[state=open]:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
      {...props}
    >
      <div className={cn("overflow-hidden pb-4 text-base leading-6 text-[var(--muted-foreground)]", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
