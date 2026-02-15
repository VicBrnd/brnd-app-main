import { useState, useTransition } from "react";

import Link from "next/link";

import { goeyToast } from "goey-toast";

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
  removeOptimistic: (action: string) => void;
}

export function CollectionContextMenu(props: CollectionContextMenuProps) {
  const [isLoading, startTransition] = useTransition();

  const handleDeleteCollection = () => {
    startTransition(async () => {
      props.removeOptimistic(props.collection.id);
      const res = await deleteCollection({ ids: [props.collection.id] });
      if (res?.data?.error) {
        goeyToast.error(res.data.error);
      }
    });
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>{props.children}</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuGroup>
            <ContextMenuLabel>{props.collection.title}</ContextMenuLabel>
            <ContextMenuItem
              render={<Link href={`/dashboard/${props.collection.slug}`} />}
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
      <EditCollectionDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        collection={props.collection}
      />
    </>
  );
}
