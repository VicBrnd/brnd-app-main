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

interface CollectionContextMenuProps {
  children: React.ReactNode;
  collection: CollectionsProps;
  removeOptimistic: (action: string) => void;
}

export function CollectionContextMenu(props: CollectionContextMenuProps) {
  const [isLoading, startTransition] = useTransition();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDeleteCollection = () => {
    startTransition(async () => {
      props.removeOptimistic(props.collection.id);
      const res = await deleteCollection({ ids: [props.collection.id] });

      if (res?.data?.error) {
        goeyToast.error(res.data.error, {
          bounce: 0.8,
        });
      }
      if (res.data?.success) {
        goeyToast.success(`${props.collection.title} successfully deleted`);
      }
    });
  };

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
      <CollectionEditDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        collection={props.collection}
      />
    </>
  );
}
