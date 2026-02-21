"use client";

import { useOptimistic, useTransition } from "react";

import { goeyToast } from "goey-toast";

import { updateStatusDocument } from "@/actions/files/document/update-status-document.action";
import { Badge } from "@/components/ui/brnd-ui/badge";
import { resolveActionResult } from "@/lib/safe-action/resolve-action";

interface StatusCellProps {
  documentId: string;
  isPublished: boolean;
}

export function StatusCell(props: StatusCellProps) {
  const [isPending, startTransition] = useTransition();
  const [optimisticValues, setOptimistic] = useOptimistic(props.isPublished);

  const handleToggleStatus = () => {
    startTransition(async () => {
      setOptimistic(!props.isPublished);
      goeyToast.promise(
        resolveActionResult(updateStatusDocument({ id: props.documentId })),
        {
          loading: optimisticValues ? "Unpublishing..." : "Publishing...",
          success: optimisticValues
            ? "Document unpublished"
            : "Document published",
          error: (err: unknown) =>
            err instanceof Error ? err.message : "Failed to update status",
        },
      );
    });
  };

  return (
    <Badge
      variant="outline"
      className="gap-1.5 rounded-md px-2 py-1 items-center text-xs cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={handleToggleStatus}
      aria-disabled={isPending}
    >
      <span
        className={`size-1.5 rounded-full ${
          optimisticValues ? "bg-emerald-500" : "bg-amber-500"
        } ${isPending ? "animate-pulse" : ""}`}
        aria-hidden="true"
      />
      {optimisticValues ? "Published" : "Draft"}
    </Badge>
  );
}
