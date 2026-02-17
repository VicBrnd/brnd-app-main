import { Folder01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function CollectionEmpty() {
  return (
    <Empty className="flex flex-col justify-center items-center">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HugeiconsIcon icon={Folder01Icon} />
        </EmptyMedia>
        <EmptyTitle>No Collections Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any collections yet. Get started by creating
          your first collection.
        </EmptyDescription>
      </EmptyHeader>
      {/* <EmptyContent className="flex-row justify-center gap-2">
            <Button
              nativeButton={false}
              variant="outline"
              render={<Link href="/dashboard/create/collection" />}
            >
              New Collection
            </Button>
          </EmptyContent> */}
    </Empty>
  );
}
