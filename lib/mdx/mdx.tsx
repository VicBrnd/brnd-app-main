import type { Message } from "esbuild";

import { bundleMDX } from "mdx-bundler";
import remarkGfm from "remark-gfm";

import { rehypeCode } from "@/lib/mdx/plugins/rehype-code";
import { remarkInstall } from "@/lib/mdx/plugins/remark-install";

type CompiledMdxResult = {
  code: string;
  frontmatter: Record<string, any>;
};

export async function compileMDX(source: string): Promise<CompiledMdxResult> {
  if (!source) return { code: "", frontmatter: {} };

  const result = await bundleMDX({
    source,
    mdxOptions(options, frontmatter) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
        [remarkInstall, { persist: { id: "package-manager" } }],
      ];
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypeCode];

      return options;
    },
  });

  // ✅ Vérification des erreurs retournées par bundleMDX
  if (result.errors && result.errors.length > 0) {
    const formatted = result.errors
      .map((e: Message) => {
        const loc = e.location
          ? ` (ligne ${e.location.line}, colonne ${e.location.column})`
          : "";
        return `${e.text}${loc}`;
      })
      .join("\n");

    console.error("Erreur(s) MDX :", formatted);
    throw new Error(formatted);
  }
  return result;
}

export const MDXStorage = {
  serialize: (result: CompiledMdxResult): string => {
    try {
      return JSON.stringify(result);
    } catch {
      return JSON.stringify({ code: "", frontmatter: {} });
    }
  },

  deserialize: (serialized: string | null): CompiledMdxResult | null => {
    if (!serialized) return null;
    try {
      return JSON.parse(serialized) as CompiledMdxResult;
    } catch (error) {
      console.error("Error deserializing MDX:", error);
      return null;
    }
  },
};

