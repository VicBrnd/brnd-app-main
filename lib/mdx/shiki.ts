import type { BundledTheme } from "shiki/themes";

import {
  type BundledHighlighterOptions,
  type BundledLanguage,
  type Highlighter,
} from "shiki";

export const defaultThemes = {
  light: "github-light",
  dark: "github-dark",
};

const highlighters = new Map<string, Promise<Highlighter>>();

/**
 * Get Shiki highlighter instance of Fumadocs (mostly for internal use, don't recommend you to use it).
 *
 * @param engineType - engine type, the engine specified in `options` will only be effective when this is set to `custom`.
 * @param options - Shiki options.
 */
export async function getHighlighter(
  engineType: "js" | "oniguruma" | "custom",
  options: BundledHighlighterOptions<BundledLanguage, BundledTheme>,
) {
  const { createHighlighter } = await import("shiki");
  let highlighter = highlighters.get(engineType);

  if (!highlighter) {
    let engine;

    if (engineType === "js") {
      engine = import("shiki/engine/javascript").then((res) =>
        res.createJavaScriptRegexEngine(),
      );
    } else if (engineType === "oniguruma" || !options.engine) {
      engine = import("shiki/engine/oniguruma").then((res) =>
        res.createOnigurumaEngine(import("shiki/wasm")),
      );
    } else {
      engine = options.engine;
    }

    highlighter = createHighlighter({
      ...options,
      engine,
    });

    highlighters.set(engineType, highlighter);
    return highlighter;
  }

  return highlighter.then(async (instance) => {
    await Promise.all([
      // @ts-expect-error unknown
      instance.loadLanguage(...options.langs),
      // @ts-expect-error unknown
      instance.loadTheme(...options.themes),
    ]);

    return instance;
  });
}

