"use client";
import { type ComponentProps, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface DocsPageProps {
  children: ReactNode;
}

export function DocsPage({ ...props }: DocsPageProps) {
  return (
    <main className="flex w-full min-w-0 flex-col">
      <article className="flex flex-1 flex-col w-full max-w-[1160px] gap-6 px-4 py-8 md:px-6 md:mx-auto">
        {props.children}
      </article>
    </main>
  );
}

export function DocsBody(props: ComponentProps<"div">) {
  return (
    <div {...props} className={cn("prose", props.className)}>
      {props.children}
    </div>
  );
}

export function DocsDescription(props: ComponentProps<"p">) {
  // don't render if no description provided
  if (props.children === undefined) return null;

  return (
    <p
      {...props}
      className={cn("mb-8 text-lg text-fd-muted-foreground", props.className)}
    >
      {props.children}
    </p>
  );
}

export function DocsTitle(props: ComponentProps<"h1">) {
  return (
    <h1 {...props} className={cn("text-3xl font-semibold", props.className)}>
      {props.children}
    </h1>
  );
}
