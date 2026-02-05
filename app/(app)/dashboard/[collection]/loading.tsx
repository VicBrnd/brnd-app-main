import { CollectionHeaderSkeleton } from "@/app/(app)/dashboard/[collection]/collection-header";
import { DataTableSkeleton } from "@/components/ui/dice-ui/data-table-skeleton";

export default function CollectionLoading() {
  return (
    <>
      <CollectionHeaderSkeleton />
      <DataTableSkeleton
        columnCount={5}
        withViewOptions={false}
        withPagination={false}
      />
    </>
  );
}
