import { CollectionHeaderSkeleton } from "@/app/(app)/dashboard/[collection]/collection-header";
import { DataTableSkeleton } from "@/components/ui/dice-ui/data-table-skeleton";

export default function CollectionLoading() {
  return (
    <>
      <CollectionHeaderSkeleton />
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-medium text-muted-foreground">
          All Documents
        </h2>
        <DataTableSkeleton
          columnCount={5}
          withViewOptions={false}
          withPagination={false}
        />
      </div>
    </>
  );
}
