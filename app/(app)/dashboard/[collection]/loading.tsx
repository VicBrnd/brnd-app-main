import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <header>
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="flex gap-4 md:items-center">
          <Skeleton className="h-8 w-20 rounded-lg" />
          <div className="flex-1 flex flex-col gap-1 md:items-start">
            <Skeleton className="h-8 w-48 md:h-10" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
        <div className="flex flex-col gap-2">
          <Separator />
          <div className="flex items-center">
            <Skeleton className="h-4 w-52" />
            <Skeleton className="ml-auto h-4 w-52" />
          </div>
        </div>
      </div>
    </header>
  );
}
