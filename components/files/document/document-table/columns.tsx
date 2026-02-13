"use client";

import Link from "next/link";

import { Folder01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ColumnDef } from "@tanstack/react-table";

import { ActionsCell } from "@/components/files/document/document-table/cell/actions-cell";
import { StatusCell } from "@/components/files/document/document-table/cell/status-cell";
import { MdxIcon } from "@/components/icons/mdx-icons";
import { Badge } from "@/components/ui/brnd-ui/badge";
import { CollectionsProps } from "@/lib/data/collections/get-collections";
import { DocumentsProps } from "@/lib/data/documents/get-documents";

interface ColumnsProps {
  collectionsData: CollectionsProps[];
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export const getColumns = (
  props: ColumnsProps,
): ColumnDef<DocumentsProps>[] => [
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
      <div className="text-xs font-medium text-muted-foreground">
        Collection
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-sm text-muted-foreground">
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
      <div className="text-xs font-medium text-muted-foreground">Modified</div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-sm text-muted-foreground">
          {row.original.updatedAt.toLocaleDateString("fr-FR")}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className="text-xs font-medium text-muted-foreground">Created</div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-sm text-muted-foreground">
          {row.original.createdAt.toLocaleDateString("fr-FR")}
        </div>
      );
    },
  },
  {
    accessorKey: "Status",
    header: () => (
      <div className="text-xs font-medium text-muted-foreground">Status</div>
    ),
    cell: ({ row }) => {
      return (
        <StatusCell
          documentId={row.original.id}
          isPublished={row.original.isPublished}
        />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionsCell
        collectionsData={props.collectionsData}
        documentData={row.original}
        onDelete={props.onDelete}
        isDeleting={props.isDeleting}
      />
    ),
  },
];
