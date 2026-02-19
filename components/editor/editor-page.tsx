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

interface EditorProps {
  documentData: DocumentBySlugProps;
}

export function EditorPage(props: EditorProps) {
  const editorRef = useRef<LexicalEditorSource | null>(null);
  const [markdownData, setMarkdownData] = useState(props.documentData.content);
  const [currentEditor, setCurrentEditor] = useState<
    "markdown-editor" | "lexical-editor"
  >("lexical-editor");

  console.log(`markdownData: ${markdownData}`);

  const getCurrentMarkdown = useCallback(() => {
    return markdownData;
  }, [markdownData]);

  const handleSave = () => {
    const contentToSave = getCurrentMarkdown();
    startTransition(async () => {
      const res = await updateDocument({
        id: props.documentData.id,
        collection: props.documentData.collectionId,
        content: contentToSave,
      });
      if (res?.data?.error) {
        goeyToast.error(res.data.error);
      }
      if (res?.data?.success) {
        goeyToast.success("Successfully Updated");
      }
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
