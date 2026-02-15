"use client";

import dynamic from "next/dynamic";

import { LexicalEditor } from "lexical";

const EditorCore = dynamic(
  () =>
    import("@/app/(app)/dashboard/[collection]/[document]/editor-core").then(
      (mod) => mod.EditorCore,
    ),
  { ssr: false },
);

interface EditorProps {
  editorRef: React.RefObject<LexicalEditor | null>;
  onChange: (markdown: string) => void;
  markdownData: string;
}

export function Editor(props: EditorProps) {
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
