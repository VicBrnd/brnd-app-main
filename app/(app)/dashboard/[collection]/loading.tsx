import { CollectionHeaderSkeleton } from "@/components/files/collection/collection-header";
import { Page } from "@/components/layout/page-layout";
import { DataTableSkeleton } from "@/components/ui/dice-ui/data-table-skeleton";

export default function CollectionLoading() {
  return (
    <>
      <CollectionHeaderSkeleton />
      <Page
        title="Overview"
        description="View, edit, and manage the documents in this collection"
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-medium text-muted-foreground">
            Documents
          </h2>

          <DataTableSkeleton
            columnCount={5}
            withViewOptions={false}
            withPagination={false}
          />
        </div>
      </Page>
    </>
  );
}
