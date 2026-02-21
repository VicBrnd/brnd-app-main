"use client";

import { useOptimistic, useTransition } from "react";

import { goeyToast } from "goey-toast";

import { deleteDocument } from "@/actions/files/document/delete-document.action";
import { DocumentTableColumns } from "@/components/files/document/document-table/document-table-columns";
import { DocumentTableData } from "@/components/files/document/document-table/document-table-data";
import { DataTableSkeleton } from "@/components/ui/dice-ui/data-table-skeleton";
import { CollectionsProps } from "@/lib/data/collections/get-collections";
import { DocumentsProps } from "@/lib/data/documents/get-documents";
import { resolveActionResult } from "@/lib/safe-action/resolve-action";

interface DocumentTableProps {
  collectionsData: CollectionsProps[];
  documentsData: DocumentsProps[];
}

export function DocumentTable(props: DocumentTableProps) {
  const [isLoading, startTransition] = useTransition();
  const [optimisticDocuments, removeOptimistic] = useOptimistic(
    props.documentsData,
    (state, deletedId: string) => state.filter((d) => d.id !== deletedId),
  );

  const handleDeleteDocument = (id: string) => {
    startTransition(async () => {
      removeOptimistic(id);
      goeyToast.promise(resolveActionResult(deleteDocument({ ids: [id] })), {
        loading: "Deleting...",
        success: "Document deleted successfully",
        error: (err: unknown) =>
          err instanceof Error ? err.message : "Failed to delete document",
      });
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-medium text-muted-foreground">Documents</h2>
      <DocumentTableData
        columns={DocumentTableColumns({
          collectionsData: props.collectionsData,
          onDelete: handleDeleteDocument,
          isDeleting: isLoading,
        })}
        data={optimisticDocuments}
      />
    </div>
  );
}

export function DocumentTableSkeleton() {
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
