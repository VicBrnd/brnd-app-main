"use client";

import { useOptimistic, useTransition } from "react";

import { updateStatusDocument } from "@/actions/files/document/update-status-document.action";
import { Badge } from "@/components/ui/brnd-ui/badge";

interface PublishStatusBadgeProps {
  documentId: string;
  isPublished: boolean;
}

export function CellStatus({
  documentId,
  isPublished,
}: PublishStatusBadgeProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticPublished, setOptimisticPublished] =
    useOptimistic(isPublished);

  const handleToggle = () => {
    startTransition(async () => {
      setOptimisticPublished(!optimisticPublished);
      await updateStatusDocument({ id: documentId });
    });
  };

  return (
    <Badge
      variant="outline"
      className="gap-1.5 rounded-md px-2 py-1 items-center text-xs cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={handleToggle}
      aria-disabled={isPending}
    >
      <span
        className={`size-1.5 rounded-full ${
          optimisticPublished ? "bg-emerald-500" : "bg-amber-500"
        } ${isPending ? "animate-pulse" : ""}`}
        aria-hidden="true"
      />
      {optimisticPublished ? "Published" : "Draft"}
    </Badge>
  );
}
