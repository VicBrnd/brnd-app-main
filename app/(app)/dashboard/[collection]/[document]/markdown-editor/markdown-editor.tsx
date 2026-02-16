"use client";

import { markdown } from "@codemirror/lang-markdown";
import { githubDark, githubLight } from "@uiw/codemirror-themes-all";
import CodeMirror, { EditorView } from "@uiw/react-codemirror";
import { useTheme } from "next-themes";

// import { mdxComponentLinter } from "@/components/editor/code-mirror/lint-plugin";
// import { getMDXComponents } from "@/mdx-components";

interface MarkdownEditorProps {
  documentData: string;
  onChange?: (documentData: string) => void;
}

export function MarkdownEditor(props: MarkdownEditorProps) {
  const { resolvedTheme } = useTheme();
  // const allowedMdxComponentNames = Object.keys(getMDXComponents());

  return (
    <CodeMirror
      theme={resolvedTheme === "dark" ? githubDark : githubLight}
      style={{ height: "100%" }}
      value={props.documentData}
      onChange={(val) => props.onChange?.(val)}
      extensions={[
        markdown(),
        EditorView.lineWrapping,
        EditorView.theme({
          "&": { height: "100%" },
          ".cm-scroller": { overflow: "auto" },
          ".cm-content": { minHeight: "100%" },
          ".cm-gutters": { minHeight: "100%" },
        }),
      ]}
      basicSetup={{
        allowMultipleSelections: true,
        autocompletion: false,
        bracketMatching: false,
        closeBrackets: false,
        closeBracketsKeymap: false,
        completionKeymap: false,
        crosshairCursor: false,
        dropCursor: false,
        foldGutter: false,
        foldKeymap: false,
        highlightActiveLine: false,
        highlightActiveLineGutter: false,
        highlightSelectionMatches: true,
        indentOnInput: false,
        lineNumbers: true,
        lintKeymap: false,
        rectangularSelection: false,
        searchKeymap: false,
      }}
    />
  );
}
