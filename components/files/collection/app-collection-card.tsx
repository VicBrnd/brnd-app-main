"use client";

import { useOptimistic } from "react";

import Link from "next/link";

import { Folder01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { CollectionContextMenu } from "@/components/files/collection/collection-context-menu";
import { Badge } from "@/components/ui/brnd-ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
            collection={collection}
            collectionId={collection.id}
            removeOptimistic={removeOptimistic}
          >
            <div className="flex flex-col rounded-xl border bg-background dark:bg-sidebar/50 p-2 gap-2 cursor-default">
              <div className="flex flex-col rounded-lg bg-sidebar dark:bg-input/30">
                <div className="p-2">
                  <Checkbox className="absolute rounded-full" />
                </div>
                <div className="flex items-center justify-center p-7">
                  <div
                    className="flex items-center justify-center size-10 rounded-lg"
                    style={{ backgroundColor: `${collection.color}15` }}
                  >
                    <HugeiconsIcon
                      icon={Folder01Icon}
                      className="size-5"
                      style={{ color: collection.color }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center overflow-auto">
                <Badge
                  variant="outline"
                  className="gap-1.5 rounded-md px-2 py-1 items-center text-xs cursor-default max-w-40 overflow-hidden"
                  render={<Link href={`/dashboard/${collection.slug}`} />}
                >
                  <HugeiconsIcon
                    icon={Folder01Icon}
                    className="size-5 shrink-0"
                    style={{ color: collection.color }}
                  />
                  <span className="overflow-x-auto whitespace-nowrap">
                    {collection.title}
                  </span>
                </Badge>
                <span className="text-xs leading-relaxed text-muted-foreground ml-auto">
                  <span className="font-bold">{collection.filesCount}</span>{" "}
                  {collection.filesCount > 1 ? "files" : "file"}
                </span>
              </div>
            </div>
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
          <Skeleton
            key={i}
            className="flex flex-col rounded-xl border bg-card p-2 gap-2 cursor-default"
          >
            <div className="flex flex-col items-center justify-center p-5 rounded-lg bg-sidebar dark:bg-input/30 ">
              <div className="flex items-center justify-center size-10 rounded-lg" />
            </div>
            <div className="flex items-center">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-15 ml-auto" />
            </div>
          </Skeleton>
        ))}
      </div>
    </div>
  );
}
