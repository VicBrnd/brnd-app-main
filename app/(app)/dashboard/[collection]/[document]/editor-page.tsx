"use client";

import { useRef, useState } from "react";

import { goeyToast } from "goey-toast";
import { LexicalEditor } from "lexical";

import { Editor } from "@/app/(app)/dashboard/[collection]/[document]/editor";
import { DocumentHeader } from "@/components/files/document/document-header";
import { Page } from "@/components/layout/page-layout";
import { DocumentBySlugProps } from "@/lib/data/documents/get-document-slug";

interface EditorProps {
  documentData: DocumentBySlugProps;
}

export function EditorPage(props: EditorProps) {
  const editorRef = useRef<LexicalEditor | null>(null);
  const [markdownData, setMarkdownData] = useState(props.documentData.content);
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
      <DocumentHeader onSave={handleSave} documentData={props.documentData} />
      <Page title="Editor" description="Editor Document">
        <Editor
          editorRef={editorRef}
          onChange={setMarkdownData}
          markdownData={markdownData}
        />
      </Page>
    </>
  );
}
