import { Redo03Icon, Undo03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { ToolbarButton } from "@/components/ui/coss-ui/toolbar";

export function HistoryToolbarPlugin() {
  return (
    <ButtonGroup>
      <ToolbarButton render={<Button variant="outline" />}>
        <HugeiconsIcon icon={Undo03Icon} />
      </ToolbarButton>
      <ToolbarButton render={<Button variant="outline" />}>
        <HugeiconsIcon icon={Redo03Icon} />
      </ToolbarButton>
    </ButtonGroup>
  );
}
