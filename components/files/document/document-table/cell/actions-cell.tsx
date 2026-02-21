"use client";

import { useTransition } from "react";

import Link from "next/link";

import { MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { goeyToast } from "goey-toast";

import { moveDocumentAction } from "@/actions/files/document/move-document.action";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CollectionsProps } from "@/lib/data/collections/get-collections";
import { DocumentsProps } from "@/lib/data/documents/get-documents";
import { resolveActionResult } from "@/lib/safe-action/resolve-action";

interface ActionsCellProps {
  collectionsData: CollectionsProps[];
  documentData: DocumentsProps;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export function ActionsCell(props: ActionsCellProps) {
  const [isLoading, startTransition] = useTransition();

  const availableCollections = props.collectionsData.filter(
    (collection) => collection.id !== props.documentData.collectionId,
  );

  const handleMoveDocument = (collectionId: string) => {
    startTransition(async () => {
      goeyToast.promise(
        resolveActionResult(
          moveDocumentAction({
            documentId: props.documentData.id,
            collectionId,
          }),
        ),
        {
          loading: "Moving...",
          success: (result) =>
            `Document moved to ${result.collectionTitle} successfully`,
          error: (err: unknown) =>
            err instanceof Error ? err.message : "Failed to move document",
        },
      );
    });
  };

  return (
    <div className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="ghost" className="h-8 w-8 p-0" />}
        >
          <span className="sr-only">Open menu</span>
          <HugeiconsIcon icon={MoreHorizontalIcon} className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem
              render={
                <Link
                  href={`/dashboard/${props.documentData.collectionSlug}/${props.documentData.slug}`}
                />
              }
            >
              Open
            </DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger disabled={isLoading}>
                Move to
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Collections</DropdownMenuLabel>

                    {availableCollections.map((collection) => (
                      <DropdownMenuItem
                        key={collection.id}
                        disabled={isLoading}
                        onClick={() => handleMoveDocument(collection.id)}
                      >
                        {collection.title}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => props.onDelete(props.documentData.id)}
            disabled={props.isDeleting || isLoading}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
