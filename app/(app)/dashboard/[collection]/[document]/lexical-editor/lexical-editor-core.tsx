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

import { LexicalPlugins } from "@/app/(app)/dashboard/[collection]/[document]/lexical-editor/lexical-plugins";

interface LexicalEditorProps {
  markdownData: string;
  editorRef: React.RefObject<LexicalEditor | null>;
  onChange: (markdown: string) => void;
}

export function LexicalEditorCore(props: LexicalEditorProps) {
  const initialConfig = {
    namespace: "LexicalEditorCore",
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
    <LexicalComposer initialConfig={initialConfig}>
      <EditorRefPlugin editorRef={props.editorRef} />
      <LexicalPlugins />
      <div className="relative flex-1 min-h-0">
        <RichTextPlugin
          contentEditable={
            <ContentEditable
              className="h-full px-8 py-4 outline-none"
              aria-placeholder={"Press / for commands..."}
              placeholder={
                <div className="absolute top-0 left-0 px-8 py-4 text-muted-foreground pointer-events-none">
                  Press / for commands...
                </div>
              }
            />
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
      <HistoryPlugin />
      <AutoFocusPlugin />
      <OnChangePlugin onChange={handleChange} />
    </LexicalComposer>
  );
}
