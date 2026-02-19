import { EditorThemeClasses } from "lexical";

export const LexicalTheme: EditorThemeClasses = {
  // paragraph: "leading-7 [&:not(:first-child)]:mt-6",

  heading: {
    h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
    h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mt-12 first:mt-0",
    h3: "scroll-m-20 text-2xl font-semibold mt-12 tracking-tight first:mt-0",
    h4: "scroll-m-20 text-xl font-semibold mt-12 tracking-tight first:mt-0",
    h5: "scroll-m-20 text-lg font-semibold mt-12 tracking-tight first:mt-0",
    h6: "scroll-m-20 text-base font-semibold mt-12 tracking-tight first:mt-0",
  },

  link: "underline text-sm text-blue-600 hover:text-blue-800",
  ul: "list-disc list-inside",
  ol: "list-decimal list-inside",
  listitem: "pl-5 -indent-5",
};
