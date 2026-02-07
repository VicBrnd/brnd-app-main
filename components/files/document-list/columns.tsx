"use client";

import Link from "next/link";

import { Folder01Icon, MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ColumnDef } from "@tanstack/react-table";

import { CellStatus } from "@/components/files/document-list/cell-status";
import { MdxIcon } from "@/components/icons/mdx-icons";
import { Badge } from "@/components/ui/brnd-ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DocumentsProps } from "@/lib/data/documents/get-documents";

interface ColumnsOptions {
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export const getColumns = ({
  onDelete,
  isDeleting,
}: ColumnsOptions): ColumnDef<DocumentsProps>[] => [
  {
    accessorKey: "title",
    header: () => (
      <div className="text-xs font-medium text-muted-foreground">Name</div>
    ),
    cell: ({ row }) => {
      return (
        <Badge
          variant="outline"
          className="gap-1.5 rounded-md px-2 py-1 items-center text-xs cursor-default"
          render={
            <Link
              href={`/dashboard/${row.original.collectionSlug}/${row.original.slug}`}
            />
          }
        >
          <MdxIcon
            className="size-6"
            style={{ color: row.original.collectionColor }}
          />
          {row.original.title}
        </Badge>
      );
    },
  },

  {
    accessorKey: "collectionTitle",
    header: () => (
      <div className="text-xs font-medium text-muted-foreground text-right">
        Collection
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-sm text-muted-foreground text-right">
          <Badge
            variant="outline"
            className="gap-1.5 rounded-md px-2 py-1 items-center text-xs cursor-default"
            render={<Link href={`/dashboard/${row.original.collectionSlug}`} />}
          >
            <HugeiconsIcon
              icon={Folder01Icon}
              className="size-5"
              style={{ color: row.original.collectionColor }}
            />
            {row.original.collectionTitle}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => (
      <div className="text-xs font-medium text-muted-foreground text-right">
        Modified
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-sm text-muted-foreground text-right">
          {row.original.updatedAt.toLocaleDateString("fr-FR")}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className="text-xs font-medium text-muted-foreground text-right">
        Created
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-sm text-muted-foreground text-right">
          {row.original.createdAt.toLocaleDateString("fr-FR")}
        </div>
      );
    },
  },
  {
    accessorKey: "Status",
    header: () => (
      <div className="text-xs font-medium text-muted-foreground text-right">
        Status
      </div>
    ),
    cell: ({ row }) => {
      return (
        <CellStatus
          documentId={row.original.id}
          isPublished={row.original.isPublished}
        />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
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
                <DropdownMenuItem>Download</DropdownMenuItem>
                <DropdownMenuItem>Rename</DropdownMenuItem>
                <DropdownMenuItem>Share</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => onDelete(row.original.id)}
                disabled={isDeleting}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
