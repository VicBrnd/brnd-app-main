"use client";

import { useOptimistic } from "react";

import Link from "next/link";

import { Folder01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { CollectionContextMenu } from "@/components/files/collection/collection-context-menu";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { CollectionsProps } from "@/lib/data/collections/get-collections";
import { cn } from "@/lib/utils";

interface AppCollectionCardProps {
  collectionsData: CollectionsProps[];
}

export function AppCollectionCard({ collectionsData }: AppCollectionCardProps) {
  const [optimisticCollections, removeOptimistic] = useOptimistic(
    collectionsData,
    (state, deletedId: string) => state.filter((c) => c.id !== deletedId),
  );

  if (collectionsData.length === 0) {
    return (
      <Card>
        <Empty className="flex flex-col justify-center items-center">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <HugeiconsIcon icon={Folder01Icon} />
            </EmptyMedia>
            <EmptyTitle>No Collections Yet</EmptyTitle>
            <EmptyDescription>
              You haven&apos;t created any collections yet. Get started by
              creating your first collection.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            <Button
              nativeButton={false}
              variant="outline"
              render={<Link href="/dashboard/create/collection" />}
            >
              New Collection
            </Button>
          </EmptyContent>
        </Empty>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-medium text-muted-foreground">Collections</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {optimisticCollections.map((collection) => (
          <CollectionContextMenu
            key={collection.id}
            collectionId={collection.id}
            removeOptimistic={removeOptimistic}
          >
            <Link
              href={`/dashboard/${collection.slug}`}
              className={cn(
                "p-4 rounded-xl border bg-background dark:bg-input/30 hover:bg-accent/50 transition-all cursor-pointer group block",
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="size-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${collection.color}15` }}
                >
                  <HugeiconsIcon
                    icon={Folder01Icon}
                    className="size-5"
                    style={{ color: collection.color }}
                  />
                </div>
              </div>
              <p className="font-medium text-sm truncate mb-0.5">
                {collection.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {collection.filesCount} files
              </p>
            </Link>
          </CollectionContextMenu>
        ))}
      </div>
    </div>
  );
}

export function AppCollectionCardSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm font-medium text-muted-foreground">Collections</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4 rounded-xl border bg-card">
            <div className="flex items-start justify-between mb-3">
              <Skeleton className="size-10 rounded-lg" />
              <Skeleton className="size-4 rounded" />
            </div>
            <Skeleton className="h-5 w-3/4 mb-0.5" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
