"use client";
import { forwardRef } from "react";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";

import { cn } from "@/lib/utils";

const Collapsible = CollapsiblePrimitive.Root;

const CollapsibleTrigger = CollapsiblePrimitive.Trigger;

const CollapsibleContent = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Panel>
>(({ children, ...props }, ref) => {
  return (
    <CollapsiblePrimitive.Panel
      ref={ref}
      {...props}
      className={cn(
        "overflow-hidden",
        "data-open:animate-fd-collapsible-down data-closed:animate-fd-collapsible-up",
        props.className,
      )}
    >
      {children}
    </CollapsiblePrimitive.Panel>
  );
});

CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
