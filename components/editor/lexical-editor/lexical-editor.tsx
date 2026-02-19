"use client";

import dynamic from "next/dynamic";

import { LexicalEditor as LexicalEditorSource } from "lexical";

interface LexicalEditorProps {
  editorRef: React.RefObject<LexicalEditorSource | null>;
  onChange: (markdown: string) => void;
  markdownData: string;
}

export function LexicalEditor(props: LexicalEditorProps) {
  console.log(`markdownData Editor: ${props.markdownData}`);

  return (
    <>
      <EditorCore
        editorRef={props.editorRef}
        onChange={props.onChange}
        markdownData={props.markdownData}
      />
    </>
  );
}

const EditorCore = dynamic(
  () =>
    import("@/components/editor/lexical-editor/lexical-editor-core").then(
      (mod) => mod.LexicalEditorCore,
    ),
  { ssr: false },
);
