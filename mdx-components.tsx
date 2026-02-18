import type { MDXComponents } from "mdx/types";

import * as hugeIcons from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import defaultMdxComponents from "@/components/markdown/mdx";

const iconComponents = Object.fromEntries(
  Object.entries(hugeIcons)
    .filter(([, icon]) => typeof icon === "object" && icon !== null)
    .map(([name, icon]) => [
      name,
      (props: Omit<React.ComponentProps<typeof HugeiconsIcon>, "icon">) => (
        <HugeiconsIcon
          color="currentColor"
          strokeWidth={1.5}
          {...props}
          icon={icon as React.ComponentProps<typeof HugeiconsIcon>["icon"]}
        />
      ),
    ]),
) as unknown as MDXComponents;

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...iconComponents,
    ...defaultMdxComponents,
    ...components,
  };
}
