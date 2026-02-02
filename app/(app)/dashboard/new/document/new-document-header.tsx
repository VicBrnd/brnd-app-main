"use client";

import { FileAddIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Separator } from "@/components/ui/separator";

export function NewDocumentnHeader() {
  return (
    <header>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 md:items-center">
          <div className="flex-1 text-center overflow-hidden md:text-start">
            <h1 className="text-2xl font-extrabold truncate first-letter:uppercase md:text-4xl">
              New Document
            </h1>
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground md:justify-start">
              <HugeiconsIcon icon={FileAddIcon} size={14} strokeWidth={2.5} />
              <span>Provide the document information</span>
            </div>
          </div>
        </div>
        <Separator />
      </div>
    </header>
  );
}
