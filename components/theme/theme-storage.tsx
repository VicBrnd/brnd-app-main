/* eslint-disable @next/next/no-head-element */

import { META_THEME_COLORS } from "@/hooks/use-meta-color";

export function ThemeStorage() {
  return (
    <head>
      <script
        dangerouslySetInnerHTML={{
          __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
                if (localStorage.layout) {
                  document.documentElement.classList.add('layout-' + localStorage.layout)
                }
              } catch (_) {}
            `,
        }}
      />
      <meta name="theme-color" content={META_THEME_COLORS.light} />
    </head>
  );
}
