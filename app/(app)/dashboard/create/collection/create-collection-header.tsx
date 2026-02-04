"use client";

import { FolderAddIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Separator } from "@/components/ui/separator";

export function CreateCollectionHeader() {
  return (
    <header>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 md:items-center">
          <div className="flex-1 text-center overflow-hidden md:text-start">
            <h1 className="text-2xl font-extrabold truncate first-letter:uppercase md:text-4xl">
              New Collection
            </h1>
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground md:justify-start">
              <HugeiconsIcon icon={FolderAddIcon} size={14} strokeWidth={2.5} />
              <span>Fill in the details for your new collection</span>
            </div>
          </div>
        </div>
        <Separator />
      </div>
    </header>
  );
}
