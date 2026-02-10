"use client";

import Link from "next/link";

import { MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

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

interface ActionsCellProps {
  collectionsData: CollectionsProps[];
  documentData: DocumentsProps;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export function ActionsCell({
  collectionsData,
  documentData,
  onDelete,
  isDeleting,
}: ActionsCellProps) {
  const availableCollections = collectionsData.filter(
    (collection) => collection.id !== documentData.collectionId,
  );

  const handleMoveDocument = async (collectionId: string) => {
    await moveDocumentAction({
      documentId: documentData.id,
      collectionId,
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
                  href={`/dashboard/${documentData.collectionSlug}/${documentData.slug}`}
                />
              }
            >
              Open
            </DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSub>
              {/* <DropdownMenuSubTrigger disabled={isMoving}> */}
              <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Collections</DropdownMenuLabel>

                    {availableCollections.map((collection) => (
                      <DropdownMenuItem
                        key={collection.id}
                        // disabled={isMoving}
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
            onClick={() => onDelete(documentData.id)}
            disabled={isDeleting}
            // disabled={isDeleting || isMoving}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
