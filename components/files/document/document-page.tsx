"use client";

import { startTransition, useCallback, useRef, useState } from "react";

import { goeyToast } from "goey-toast";
import { LexicalEditor as LexicalEditorSource } from "lexical";

import { updateDocument } from "@/actions/files/document/update-document.action";
import { LexicalEditor } from "@/components/editor/lexical-editor/lexical-editor";
import { MarkdownEditor } from "@/components/editor/markdown-editor/markdown-editor";
import { DocumentHeader } from "@/components/files/document/document-header";
import { AppPageLayout } from "@/components/layout/app-page-layout";
import { Card } from "@/components/ui/card";
import { DocumentBySlugProps } from "@/lib/data/documents/get-document-slug";
import { resolveActionResult } from "@/lib/safe-action/resolve-action";

interface DocumentEditorProps {
  documentBySlugData: DocumentBySlugProps;
}

export function DocumentEditor(props: DocumentEditorProps) {
  const editorRef = useRef<LexicalEditorSource | null>(null);
  const [markdownData, setMarkdownData] = useState(
    props.documentBySlugData.content,
  );
  const [currentEditor, setCurrentEditor] = useState<
    "markdown-editor" | "lexical-editor"
  >("lexical-editor");

  console.log(`markdownData: ${markdownData}`);

  const getCurrentMarkdown = useCallback(() => {
    return markdownData;
  }, [markdownData]);

  const handleSaveDocument = () => {
    const contentToSave = getCurrentMarkdown();

    if (contentToSave === props.documentBySlugData.content)
      return goeyToast.info("No changes detected");

    startTransition(async () => {
      goeyToast.promise(
        resolveActionResult(
          updateDocument({
            id: props.documentBySlugData.id,
            collection: props.documentBySlugData.collectionId,
            content: contentToSave,
          }),
        ),
        {
          loading: "Saving document...",
          success: "Document saved successfully",
          error: (err: unknown) =>
            err instanceof Error ? err.message : "Failed to save document",
        },
      );
    });
  };

  return (
    <>
      <DocumentHeader
        onSave={handleSaveDocument}
        documentData={props.documentBySlugData}
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
