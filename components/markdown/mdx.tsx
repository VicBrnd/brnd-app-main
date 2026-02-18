import type {
  AnchorHTMLAttributes,
  ComponentProps,
  FC,
  HTMLAttributes,
  ImgHTMLAttributes,
  TableHTMLAttributes,
} from "react";

import { Image as FrameworkImage } from "@/components/markdown";
import { Callout } from "@/components/markdown/callout";
import { Card, Cards } from "@/components/markdown/card";
import { CodeBlock, Pre } from "@/components/markdown/codeblock";
import { Heading } from "@/components/markdown/heading";
import Link from "@/components/markdown/link";
import { Wrapper } from "@/components/markdown/wrapper";
import { cn } from "@/lib/utils";

const defaultMdxComponents = {
  Card,
  Cards,
  Wrapper,
  Callout,
  table: Table,
  // img: Image,
  a: Link as FC<AnchorHTMLAttributes<HTMLAnchorElement>>,
  blockquote: Callout as unknown as FC<ComponentProps<"blockquote">>,
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <CodeBlock {...props}>
      <Pre>{props.children}</Pre>
    </CodeBlock>
  ),
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Heading as="h1" {...props} />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Heading as="h2" {...props} />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Heading as="h3" {...props} />
  ),
  h4: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Heading as="h4" {...props} />
  ),
  h5: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Heading as="h5" {...props} />
  ),
  h6: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <Heading as="h6" {...props} />
  ),
};

export { defaultMdxComponents as default };

function Image(
  props: ImgHTMLAttributes<HTMLImageElement> & {
    sizes?: string;
  },
) {
  return (
    <FrameworkImage
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
      {...props}
      src={props.src as unknown as string}
      className={cn("rounded-lg", props.className)}
    />
  );
}

function Table(props: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="relative overflow-auto prose-no-margin my-6">
      <table {...props} />
    </div>
  );
}
