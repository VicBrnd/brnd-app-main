"use client";

import { useOptimistic, useTransition } from "react";

import { deleteDocument } from "@/actions/files/document/delete-document.action";
import { getColumns } from "@/components/files/document/document-list/columns";
import { DataTable } from "@/components/files/document/document-list/data-table";
import { DataTableSkeleton } from "@/components/ui/dice-ui/data-table-skeleton";
import { CollectionsProps } from "@/lib/data/collections/get-collections";
import { DocumentsProps } from "@/lib/data/documents/get-documents";

interface AppDocumentListProps {
  collectionsData: CollectionsProps[];
  documentsData: DocumentsProps[];
}

export function AppDocumentList({
  collectionsData,
  documentsData,
}: AppDocumentListProps) {
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

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-medium text-muted-foreground">Documents</h2>
      <DataTable
        columns={getColumns({
          collectionsData: collectionsData,
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
        rowCount={5}
        withViewOptions={false}
        withPagination={false}
      />
    </div>
  );
}
