import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import perfectionist from "eslint-plugin-perfectionist";
import unicorn from "eslint-plugin-unicorn";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),

  {
    plugins: {
      "unused-imports": unusedImports,
      perfectionist,
      unicorn,
    },
    rules: {
      "perfectionist/sort-imports": [
        "warn",
        {
          type: "natural",
          groups: [
            "react",
            ["type-import", "type-internal"],
            "next",
            ["value-builtin", "value-external"],
            "value-internal",
            ["type-parent", "type-sibling", "type-index"],
            ["value-parent", "value-sibling", "value-index"],
            "side-effect",
            "style",
            "unknown",
          ],
          customGroups: [
            {
              groupName: "react",
              elementNamePattern: ["^react$", "^react-.+"],
            },
            {
              groupName: "next",
              elementNamePattern: "^next(/.*)?$",
            },
          ],
          internalPattern: ["^@/.*", "^~/.*"],
        },
      ],


      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],


      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-img-element": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react/display-name": "off",
      "react/no-unescaped-entities": "off",
      "import/no-anonymous-default-export": "off",
      "unicorn/better-regex": "error",
    },
  },
]);

export default eslintConfig;
