import { useState, useTransition } from "react";

import Link from "next/link";

import {
  Delete01Icon,
  FolderOpenIcon,
  PencilEdit02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";

import { deleteCollection } from "@/actions/files/collection/delete-collection.action";
import { EditCollectionDialog } from "@/components/files/collection/edit-collection-dialog";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { CollectionsProps } from "@/lib/data/collections/get-collections";

interface CollectionContextMenuProps {
  children: React.ReactNode;
  collection: CollectionsProps;
  collectionId: string;
  removeOptimistic: (action: string) => void;
}

export function CollectionContextMenu({
  children,
  collection,
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

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>{children}</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuLabel>{collection.title}</ContextMenuLabel>
            <ContextMenuItem
              render={<Link href={`/dashboard/${collection.slug}`} />}
            >
              <HugeiconsIcon icon={FolderOpenIcon} />
              Open
            </ContextMenuItem>
            <ContextMenuItem onClick={() => setDialogOpen(true)}>
              <HugeiconsIcon icon={PencilEdit02Icon} />
              Edit
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
              Delete
            </ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
      <EditCollectionDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        collection={collection}
      />
    </>
  );
}
