import { useEffect, useRef, useState } from "react";

import { Redo03Icon, Undo03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { HorizontalRuleNode } from "@lexical/extension";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS,
} from "@lexical/markdown";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { EditorRefPlugin } from "@lexical/react/LexicalEditorRefPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import {
  $getRoot,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  type EditorState,
  type LexicalEditor,
  REDO_COMMAND,
  UNDO_COMMAND,
} from "lexical";

import { Button } from "@/components/ui/button";
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
} from "@/components/ui/coss-ui/toolbar";

const theme = {
  heading: {
    h1: "text-3xl font-bold",
    h2: "text-2xl font-bold",
    h3: "text-xl font-bold",
    h4: "text-lg font-bold",
    h5: "text-base font-bold",
    h6: "text-sm font-bold",
  },
  list: {
    ul: "list-disc ml-6",
    ol: "list-decimal ml-6",
    listitem: "my-1",
  },
  quote:
    "border-l-4 border-muted-foreground/30 pl-4 italic text-muted-foreground",
  code: "bg-muted px-1.5 py-0.5 rounded text-sm font-mono",
  link: "text-primary underline cursor-pointer",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
    strikethrough: "line-through",
    code: "bg-muted px-1.5 py-0.5 rounded text-sm font-mono",
  },
};

const nodes = [
  HeadingNode,
  ListNode,
  ListItemNode,
  QuoteNode,
  CodeNode,
  CodeHighlightNode,
  LinkNode,
  AutoLinkNode,
  HorizontalRuleNode,
];

const placeholder = "Press / for commands...";

interface LexicalEditorProps {
  markdownData: string;
  editorRef: React.RefObject<LexicalEditor | null>;
  onChange: (markdown: string) => void;
}

function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  useEffect(() => {
    const unregisterUndo = editor.registerCommand(
      CAN_UNDO_COMMAND,
      (payload: boolean) => {
        setCanUndo(payload);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
    const unregisterRedo = editor.registerCommand(
      CAN_REDO_COMMAND,
      (payload: boolean) => {
        setCanRedo(payload);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
    return () => {
      unregisterUndo();
      unregisterRedo();
    };
  }, [editor]);

  return (
    <Toolbar className="border-0 border-b rounded-none">
      <ToolbarGroup>
        <ToolbarButton
          onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
          render={<Button variant="ghost" disabled={!canUndo} />}
        >
          <HugeiconsIcon icon={Undo03Icon} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
          render={<Button variant="ghost" disabled={!canRedo} />}
        >
          <HugeiconsIcon icon={Redo03Icon} />
        </ToolbarButton>
      </ToolbarGroup>
    </Toolbar>
  );
}

export function LexicalEditorCore(props: LexicalEditorProps) {
  const isInitialMount = useRef(true);

  const initialConfig = {
    namespace: "LexicalEditorCore",
    theme,
    nodes,
    editorState: () => {
      $convertFromMarkdownString(props.markdownData, TRANSFORMERS);
    },
    onError: (error: Error) => {
      console.error(error);
    },
  };

  const handleChange = (editorState: EditorState) => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    editorState.read(() => {
      const root = $getRoot();
      if (root.getTextContent().trim() === "") {
        props.onChange("");
        return;
      }
      props.onChange($convertToMarkdownString(TRANSFORMERS));
    });
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <EditorRefPlugin editorRef={props.editorRef} />
      <ToolbarPlugin />
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            className="h-full px-8 py-4 outline-none"
            aria-placeholder={placeholder}
            placeholder={
              <div className="pointer-events-none absolute top-0 left-0 px-8 py-4 text-muted-foreground">
                {placeholder}
              </div>
            }
          />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <ListPlugin />
      <LinkPlugin />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <OnChangePlugin onChange={handleChange} />
    </LexicalComposer>
  );
}
