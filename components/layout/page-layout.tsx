import * as React from "react";

interface PageProps {
  title: string;
  description: string;
}

export function Page({
  title,
  description,
  children,
  ...props
}: PageProps & React.ComponentProps<"div">) {
  const Comp = "div";

  return (
    <Comp
      data-slot="page"
      className="flex flex-col gap-5 max-w-6xl mx-auto"
      {...props}
    >
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
          {description}
        </p>
      </div>
      <div className="flex flex-col gap-6">{children}</div>
    </Comp>
  );
}
