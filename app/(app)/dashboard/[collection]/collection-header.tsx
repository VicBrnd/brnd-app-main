"use client";

import Link from "next/link";

import {
  ArrowLeft02Icon,
  CalendarAdd01Icon,
  CalendarSetting01Icon,
  Delete01Icon,
  Folder01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Collection } from "@/lib/db/types";

interface CollectionHeaderProps {
  collectionData: Collection;
}

export default function CollectionHeader({
  collectionData,
}: CollectionHeaderProps) {
  return (
    <header>
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="flex gap-4 md:items-center">
          <Button
            nativeButton={false}
            variant="outline"
            render={<Link href="/dashboard" />}
          >
            <HugeiconsIcon icon={ArrowLeft02Icon} />
            Back
          </Button>
          <div className="flex-1 text-center overflow-hidden md:text-start">
            <h1
              className="text-2xl font-extrabold truncate first-letter:uppercase md:text-4xl"
              style={{ color: collectionData.color }}
            >
              {collectionData.title}
            </h1>
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground md:justify-start">
              <HugeiconsIcon
                icon={Folder01Icon}
                size={14}
                strokeWidth={2.5}
                style={{ color: collectionData.color }}
              />
              <span>Collection</span>
            </div>
          </div>

          <Button variant="outline-destructive">
            <HugeiconsIcon icon={Delete01Icon} /> Delete
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <Separator />
          <div className="flex items-center text-sm text-muted-foreground capitalize">
            <div className="flex flex-col items-start gap-1 md:flex-row">
              <div className="flex items-center gap-1">
                <HugeiconsIcon
                  icon={CalendarAdd01Icon}
                  size={14}
                  strokeWidth={2.5}
                  style={{ color: collectionData.color }}
                />
                <span>Created at:</span>
              </div>
              <span>
                {collectionData.createdAt.toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="ml-auto flex flex-col items-start gap-1 md:flex-row">
              <div className="flex items-center gap-1">
                <HugeiconsIcon
                  icon={CalendarSetting01Icon}
                  size={14}
                  strokeWidth={2.5}
                  style={{ color: collectionData.color }}
                />
                <span> Last update:</span>
              </div>
              <span>
                {collectionData.updatedAt.toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
