import { Redo03Icon, Undo03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
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

import { Button } from "@/components/ui/button";
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
} from "@/components/ui/coss-ui/toolbar";

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
      <Toolbar className="border-0 border-b rounded-none">
        <ToolbarGroup>
          <ToolbarButton render={<Button variant="ghost" />}>
            <HugeiconsIcon icon={Undo03Icon} />
          </ToolbarButton>
          <ToolbarButton render={<Button variant="ghost" />}>
            <HugeiconsIcon icon={Redo03Icon} />
          </ToolbarButton>
        </ToolbarGroup>
      </Toolbar>
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            className="h-full px-8 py-4 outline-none"
            aria-placeholder={"Enter some text..."}
            placeholder={<div>Enter somess text...</div>}
          />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <OnChangePlugin onChange={handleChange} />
    </LexicalComposer>
  );
}
