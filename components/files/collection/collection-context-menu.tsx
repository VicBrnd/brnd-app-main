import { useState, useTransition } from "react";

import Link from "next/link";

import { goeyToast } from "goey-toast";

import { deleteCollection } from "@/actions/files/collection/delete-collection.action";
import { CollectionEditDialog } from "@/components/files/collection/collection-edit-dialog";
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
import { resolveActionResult } from "@/lib/safe-action/resolve-action";

interface CollectionContextMenuProps {
  children: React.ReactNode;
  collectionData: CollectionsProps;
  removeOptimistic: (action: string) => void;
}

export function CollectionContextMenu(props: CollectionContextMenuProps) {
  const [isLoading, startTransition] = useTransition();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDeleteCollection = () => {
    startTransition(async () => {
      props.removeOptimistic(props.collectionData.id);
      goeyToast.promise(
        resolveActionResult(
          deleteCollection({ ids: [props.collectionData.id] }),
        ),
        {
          loading: "Deleting...",
          success: "Collection deleted successfully",
          error: (err: unknown) =>
            err instanceof Error ? err.message : "Failed to delete collection",
        },
      );
    });
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>{props.children}</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuLabel>{props.collectionData.title}</ContextMenuLabel>
            <ContextMenuItem
              render={<Link href={`/dashboard/${props.collectionData.slug}`} />}
            >
              Open
            </ContextMenuItem>
            <ContextMenuItem onClick={() => setDialogOpen(true)}>
              Edit
            </ContextMenuItem>
          </ContextMenuGroup>
          <ContextMenuSeparator />
          <ContextMenuGroup>
            <ContextMenuItem
              variant="destructive"
              onClick={handleDeleteCollection}
              disabled={isLoading}
            >
              Delete
            </ContextMenuItem>
          </ContextMenuGroup>
        </ContextMenuContent>
      </ContextMenu>
      <CollectionEditDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        collectionData={props.collectionData}
      />
    </>
  );
}
