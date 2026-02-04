"use client";

import Link from "next/link";

import {
  ArrowLeft02Icon,
  Delete01Icon,
  Folder01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Collection } from "@/lib/db/types";

interface CollectionHeaderProps {
  collectionData: Collection;
}

export default function CollectionHeader({
  collectionData,
}: CollectionHeaderProps) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        {/* Back button */}
        <Button
          nativeButton={false}
          variant="ghost"
          size="icon-sm"
          className="-ml-1"
          render={<Link href={`/dashboard`} />}
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} />
          <span className="sr-only">Back</span>
        </Button>
        {/* Separator */}
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {/* Title */}
        <HugeiconsIcon
          icon={Folder01Icon}
          size={14}
          className="shrink-0"
          style={{ color: collectionData.color }}
        />
        <h1 className="text-sm font-semibold">{collectionData.title}</h1>
        <div className="ml-auto flex items-center gap-2">
          {/* Button Delete */}
          <Button variant="outline-destructive" size="sm">
            <HugeiconsIcon icon={Delete01Icon} />
            <span className="flex items-center gap-1 sr-only md:not-sr-only">
              Delete
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}

export function CollectionHeaderSkeleton() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        {/* Back button */}
        <Skeleton className="h-4 w-6" />
        {/* Separator */}
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        {/* Title */}
        <Skeleton className="h-4 w-30" />
        <div className="ml-auto flex items-center gap-2">
          {/* Button Delete */}
          <Skeleton className="h-4 w-20.5" />
        </div>
      </div>
    </header>
  );
}
