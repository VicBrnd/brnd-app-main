import { useTransition } from "react";

import {
  Delete01Icon,
  FileAddIcon,
  FolderOpenIcon,
  PencilEdit02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";

import { deleteCollection } from "@/actions/files/collection/delete-collection.action";
import { AppFilesDialog } from "@/components/files/create/app-files-dialog";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { DialogTrigger } from "@/components/ui/dialog";

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
    <AppFilesDialog collectionId={collectionId}>
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
          <ContextMenuGroup>
            <ContextMenuLabel>Document</ContextMenuLabel>
            <DialogTrigger nativeButton={false} render={<ContextMenuItem />}>
              <HugeiconsIcon icon={FileAddIcon} />
              Create Document
            </DialogTrigger>
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
    </AppFilesDialog>
  );
}
