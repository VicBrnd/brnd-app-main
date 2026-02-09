import { useTransition } from "react";

import {
  Delete01Icon,
  FolderOpenIcon,
  PencilEdit02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";

import { deleteCollection } from "@/actions/files/collection/delete-collection.action";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface CollectionContextMenuProps {
  children: React.ReactNode;
  collectionId: string;
  removeOptimistic: (action: string) => void;
}

export function CollectionContextMenu({
  children,
  collectionId,
  removeOptimistic,
}: CollectionContextMenuProps) {
  const [isLoading, startTransition] = useTransition();

  const handleDeleteCollection = (id: string) => {
    startTransition(async () => {
      removeOptimistic(id);
      const res = await deleteCollection({ ids: [id] });
      if (res?.data?.error) {
        toast.error(res.data.error);
      }
    });
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel>Collection</ContextMenuLabel>
          <ContextMenuItem>
            <HugeiconsIcon icon={FolderOpenIcon} />
            Open
          </ContextMenuItem>
          <ContextMenuItem>
            <HugeiconsIcon icon={PencilEdit02Icon} />
            Rename
          </ContextMenuItem>
        </ContextMenuGroup>

        <ContextMenuSeparator />
        <ContextMenuGroup>
          <ContextMenuItem
            variant="destructive"
            onClick={() => handleDeleteCollection(collectionId)}
            disabled={isLoading}
          >
            <HugeiconsIcon icon={Delete01Icon} />
            Delete collection
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
