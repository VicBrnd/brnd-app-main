import { Folder01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function DocumentEmpty() {
  return (
    <Empty className="flex flex-col justify-center items-center">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HugeiconsIcon icon={Folder01Icon} />
        </EmptyMedia>
        <EmptyTitle>No Documents Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any documents yet. Get started by creating
          your first document.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
