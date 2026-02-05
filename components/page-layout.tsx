import * as React from "react";

export function Page({
  title,
  description,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  title: string;
  description: string;
}) {
  const Comp = "div";

  return (
    <Comp
      data-slot="page"
      className="flex flex-col max-w-5xl mx-auto"
      {...props}
    >
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base pb-5">
        {description}
      </p>
      <div className="space-y-4">{children}</div>
    </Comp>
  );
}
