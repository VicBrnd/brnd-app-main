import type { ComponentPropsWithoutRef } from "react";

import { Link01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";

type Types = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingProps<T extends Types> = Omit<ComponentPropsWithoutRef<T>, "as"> & {
  as?: T;
};

export function Heading<T extends Types = "h1">({
  as,
  className,
  ...props
}: HeadingProps<T>): React.ReactElement {
  const As = as ?? "h1";

  if (!props.id) return <As className={className} {...props} />;

  return (
    <As
      className={cn("flex scroll-m-28 flex-row items-center gap-2", className)}
      {...props}
    >
      <a data-card="" href={`#${props.id}`} className="peer">
        {props.children}
      </a>
      <HugeiconsIcon
        icon={Link01Icon}
        aria-label="Link to section"
        className="size-3.5 shrink-0 text-fd-muted-foreground opacity-0 transition-opacity peer-hover:opacity-100"
      />
    </As>
  );
}
