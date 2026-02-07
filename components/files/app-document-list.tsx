"use client";

import { useOptimistic, useTransition } from "react";

import Link from "next/link";

import { Folder, MoreVerticalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { deleteDocument } from "@/actions/files/delete-document.action";
import { getColumns } from "@/components/files/document-list/columns";
import { DataTable } from "@/components/files/document-list/data-table";
import { MdxIcon } from "@/components/icons/mdx-icons";
import { Button } from "@/components/ui/button";
import { DataTableSkeleton } from "@/components/ui/dice-ui/data-table-skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DocumentsProps } from "@/lib/data/documents/get-documents";
import { useFilesStore } from "@/store/files-store";

interface AppDocumentListProps {
  documentsData: DocumentsProps[];
}

export function AppDocumentList({ documentsData }: AppDocumentListProps) {
  const { viewMode } = useFilesStore();
  const [isLoading, startTransition] = useTransition();
  const [optimisticDocuments, removeOptimistic] = useOptimistic(
    documentsData,
    (state, deletedId: string) => state.filter((d) => d.id !== deletedId),
  );

  const handleDeleteDocument = (id: string) => {
    startTransition(async () => {
      removeOptimistic(id);
      await deleteDocument({ ids: [id] });
    });
  };

  if (viewMode === "grid") {
    return (
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-medium text-muted-foreground">Documents</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {optimisticDocuments.map((document) => (
            <Link
              href={`/dashboard/${document.collectionSlug}/${document.slug}`}
              key={document.id}
            >
              <div className="p-4 rounded-xl border bg-card hover:bg-accent/50 transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-3">
                  <MdxIcon style={{ color: document.collectionColor }} />
                  <div className="flex items-center gap-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        onClick={(e) => e.preventDefault()}
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7"
                          >
                            <HugeiconsIcon
                              icon={MoreVerticalIcon}
                              className="size-4"
                            />
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="end">
                        <DropdownMenuGroup>
                          <DropdownMenuItem>Download</DropdownMenuItem>
                          <DropdownMenuItem>Rename</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeleteDocument(document.id);
                          }}
                          disabled={isLoading}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <p className="font-medium text-sm truncate mb-0.5">
                  {document.title}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span> {document.createdAt.toLocaleDateString("fr-FR")}</span>
                  {document.isPublished === true && (
                    <HugeiconsIcon icon={Folder} className="size-3" />
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-medium text-muted-foreground">Documents</h2>
      <DataTable
        columns={getColumns({
          onDelete: handleDeleteDocument,
          isDeleting: isLoading,
        })}
        data={optimisticDocuments}
      />
    </div>
  );
}

export function AppDocumentListSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-medium text-muted-foreground">Documents</h2>
      <DataTableSkeleton
        columnCount={5}
        withViewOptions={false}
        withPagination={false}
      />
    </div>
  );
}
