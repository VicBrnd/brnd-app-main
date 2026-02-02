"use client";

import Link from "next/link";

import { Folder01Icon, MoreVerticalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { CollectionWithCount } from "@/lib/db/types";
import { cn } from "@/lib/utils";

interface FolderGridProps {
  collectionsData: CollectionWithCount[];
}

export function FolderGrid({ collectionsData }: FolderGridProps) {
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
              render={<Link href="/dashboard/new/collection" />}
            >
              New Collection
            </Button>
          </EmptyContent>
        </Empty>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-muted-foreground">Folders</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {collectionsData.map((collection) => (
          <Link
            key={collection.id}
            href={`/dashboard/${collection.id}`}
            className={cn(
              "p-4 rounded-xl border bg-card hover:bg-accent/50 transition-all cursor-pointer group block",
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
              <DropdownMenu>
                <DropdownMenuTrigger
                // render={
                //   <Button variant="ghost" size="icon" className="size-7" />
                // }
                >
                  <HugeiconsIcon icon={MoreVerticalIcon} className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Open</DropdownMenuItem>
                    <DropdownMenuItem>Rename</DropdownMenuItem>
                    <DropdownMenuItem>Share</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="font-medium text-sm truncate mb-0.5">
              {collection.title}
            </p>
            <p className="text-xs text-muted-foreground">
              {collection.filesCount} files
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
