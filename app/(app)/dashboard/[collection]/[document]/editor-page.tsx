"use client";

import { useRef, useState } from "react";

import { goeyToast } from "goey-toast";
import { LexicalEditor as LexicalEditorSource } from "lexical";

import { LexicalEditor } from "@/app/(app)/dashboard/[collection]/[document]/lexical-editor/lexical-editor";
import { MarkdownEditor } from "@/app/(app)/dashboard/[collection]/[document]/markdown-editor/markdown-editor";
import { DocumentHeader } from "@/components/files/document/document-header";
import { AppPageLayout } from "@/components/layout/app-page-layout";
import { Card } from "@/components/ui/card";
import { DocumentBySlugProps } from "@/lib/data/documents/get-document-slug";

interface EditorProps {
  documentData: DocumentBySlugProps;
}

export function EditorPage(props: EditorProps) {
  const editorRef = useRef<LexicalEditorSource | null>(null);
  const [markdownData, setMarkdownData] = useState(props.documentData.content);
  const [currentEditor, setCurrentEditor] = useState<
    "markdown-editor" | "lexical-editor"
  >("lexical-editor");

  const handleSave = async () => {
    goeyToast.success("Fake Saved", {
      description: (
        <div>
          <strong>Fake With Description</strong>
        </div>
      ),
    });
  };

  return (
    <>
      <DocumentHeader
        onSave={handleSave}
        documentData={props.documentData}
        setEditor={setCurrentEditor}
      />
      <AppPageLayout title="Editor" description="Editor Document">
        <Card className="h-full flex flex-col p-0">
          {currentEditor === "lexical-editor" ? (
            <LexicalEditor
              editorRef={editorRef}
              onChange={setMarkdownData}
              markdownData={markdownData}
            />
          ) : (
            <MarkdownEditor
              documentData={markdownData}
              onChange={setMarkdownData}
            />
          )}
        </Card>
      </AppPageLayout>
    </>
  );
}
