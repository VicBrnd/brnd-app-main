import { SelectBlockFormat } from "@/components/editor/lexical-editor/toolbar/block-format/select-block-format";
import { HistoryToolbarPlugin } from "@/components/editor/lexical-editor/toolbar/history-toolbar-plugin";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/ui/coss-ui/toolbar";

export function LexicalPlugins() {
  return (
    <Toolbar className="border-0 border-b rounded-none">
      <div className="p-0.5">
        <ToolbarGroup>
          {/* Undo / Redo */}
          <HistoryToolbarPlugin />
          <ToolbarSeparator className="m-1" />
          {/* Select */}
          <SelectBlockFormat />
        </ToolbarGroup>
      </div>
    </Toolbar>
  );
}
