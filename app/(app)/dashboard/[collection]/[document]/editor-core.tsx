import { $isCodeNode } from "@lexical/code";
import { $convertToMarkdownString, TRANSFORMERS } from "@lexical/markdown";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { $getRoot, EditorState, LexicalEditor } from "lexical";

import { Card } from "@/components/ui/card";

interface EditorProps {
  markdownData: string;
  editorRef: React.RefObject<LexicalEditor | null>;
  onChange: (markdown: string) => void;
}

export function EditorCore(props: EditorProps) {
  const initialConfig = {
    namespace: "EditorCore",
    theme: {},
    onError: (error: Error) => {
      console.error(error);
    },
  };

  const handleChange = (editorState: EditorState) => {
    editorState.read(() => {
      const root = $getRoot();
      const firstChild = root.getFirstChild();
      const isMarkdownCode =
        $isCodeNode(firstChild) && firstChild.getLanguage() === "markdown";
      const md = isMarkdownCode
        ? firstChild.getTextContent()
        : $convertToMarkdownString(TRANSFORMERS);
      props.onChange(md);
    });
  };

  return (
    <Card className=" h-full flex flex-col p-0">
      <LexicalComposer initialConfig={initialConfig}>
        <EditorRefPlugin editorRef={props.editorRef} />
        <OnChangePlugin onChange={handleChange} />
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className="h-full px-8 py-4 outline-none"
              aria-placeholder={"Enter some text..."}
              placeholder={<div>Enter some text...</div>}
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <AutoFocusPlugin />
      </LexicalComposer>
    </Card>
  );
}
