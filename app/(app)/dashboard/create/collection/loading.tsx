import { Page } from "@/components/page-layout";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CreateCollectionLoading() {
  return (
    <Page
      title="Create Collection"
      description="Define the details of your new collection"
    >
      <Card className="bg-background">
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-10" />
              <Skeleton className="h-9 w-full" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-8" />
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Skeleton className="h-8 w-32" />
        </CardFooter>
      </Card>
    </Page>
  );
}
