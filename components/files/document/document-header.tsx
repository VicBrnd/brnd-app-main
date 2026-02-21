"use client";

import { useOptimistic, useRef, useState, useTransition } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowLeft02Icon,
  Delete01Icon,
  File01Icon,
  FloppyDiskIcon,
  Link01Icon,
  MoreHorizontalIcon,
  TextCreationIcon,
  ViewIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { goeyToast } from "goey-toast";

import { deleteDocument } from "@/actions/files/document/delete-document.action";
import { updateDocument } from "@/actions/files/document/update-document.action";
import { updateStatusDocument } from "@/actions/files/document/update-status-document.action";
import { MdxIcon } from "@/components/icons/mdx-icons";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DocumentBySlugProps } from "@/lib/data/documents/get-document-slug";
import { resolveActionResult } from "@/lib/safe-action/resolve-action";
import { capitalize, slugify } from "@/lib/utils";

interface DocumentHeaderProps {
  onSave: () => void;
  setEditor: (type: "lexical-editor" | "markdown-editor") => void;
  documentData: DocumentBySlugProps;
}

export function DocumentHeader(props: DocumentHeaderProps) {
  const [isPending, startTransition] = useTransition();
  const [isEditing, startEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    title: props.documentData.title,
    slug: props.documentData.slug,
  });
  const [optimisticValues, setOptimistic] = useOptimistic({
    title: props.documentData.title,
    isPublished: props.documentData.isPublished,
  });
  const isCancel = useRef(false);
  const router = useRouter();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditValues({ title: value, slug: slugify(value) });
  };

  const handleSaveTitle = () => {
    if (
      isPending ||
      isCancel.current ||
      editValues.title === props.documentData.title
    )
      return;
    startTransition(async () => {
      setOptimistic((prev) => ({ ...prev, title: editValues.title }));
      goeyToast.promise(
        resolveActionResult(
          updateDocument({
            id: props.documentData.id,
            collection: props.documentData.collectionId,
            title: editValues.title,
            slug: editValues.slug,
          }),
        ).then((res) => {
          router.replace(
            `/dashboard/${props.documentData.collectionSlug}/${editValues.slug}`,
          );
          return res;
        }),
        {
          loading: "Saving...",
          success: "Title saved",
          error: (err: unknown) =>
            err instanceof Error ? err.message : "Failed to save title",
        },
      );
    });
  };

  const handleToggleStatus = () => {
    startTransition(async () => {
      setOptimistic((prev) => ({ ...prev, isPublished: !prev.isPublished }));
      goeyToast.promise(
        resolveActionResult(
          updateStatusDocument({ id: props.documentData.id }),
        ),
        {
          loading: optimisticValues.isPublished
            ? "Unpublishing..."
            : "Publishing...",
          success: optimisticValues.isPublished
            ? "Document unpublished"
            : "Document published",
          error: (err: unknown) =>
            err instanceof Error ? err.message : "Failed to update status",
        },
      );
    });
  };

  const handleDeleteDocument = (id: string) => {
    startTransition(async () => {
      goeyToast.promise(resolveActionResult(deleteDocument({ ids: [id] })), {
        loading: "Deleting...",
        success: () => {
          router.push(`/dashboard/${props.documentData.collectionSlug}`);
          return "Document deleted successfully";
        },
        error: (err: unknown) =>
          err instanceof Error ? err.message : "Failed to delete document",
      });
    });
  };

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <Button
          nativeButton={false}
          variant="ghost"
          size="icon-sm"
          className="-ml-1"
          render={
            <Link href={`/dashboard/${props.documentData.collectionSlug}`} />
          }
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} />
          <span className="sr-only">Back</span>
        </Button>
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <HugeiconsIcon
          icon={File01Icon}
          size={14}
          className="shrink-0"
          style={{ color: props.documentData.collectionColor }}
        />
        {isEditing ? (
          <input
            className="text-sm font-semibold border-none outline-none px-0 py-0 bg-transparent"
            autoFocus
            value={capitalize(editValues.title)}
            onChange={handleTitleChange}
            onBlur={() => {
              startEditing(false);
              handleSaveTitle();
              isCancel.current = false;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                startEditing(false);
                handleSaveTitle();
              }
              if (e.key === "Escape") {
                isCancel.current = true;
                setEditValues({
                  title: props.documentData.title,
                  slug: props.documentData.slug,
                });
                startEditing(false);
              }
            }}
            disabled={isPending}
          />
        ) : (
          <Tooltip>
            <TooltipTrigger
              render={
                <h1
                  className="text-sm font-semibold"
                  onClick={() => {
                    setEditValues((prev) => ({
                      ...prev,
                      title: optimisticValues.title,
                    }));
                    startEditing(true);
                  }}
                />
              }
            >
              {capitalize(optimisticValues.title)}
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Click to edit the title
            </TooltipContent>
          </Tooltip>
        )}

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={props.onSave}
            disabled={isPending}
          >
            <HugeiconsIcon icon={FloppyDiskIcon} />
            Save
          </Button>
          <div className="hidden items-center gap-2 md:flex">
            <ButtonGroup>
              <Button
                variant="outline"
                size="sm"
                onClick={handleToggleStatus}
                disabled={isPending}
              >
                {optimisticValues.isPublished ? (
                  <>
                    <HugeiconsIcon icon={ViewIcon} /> Unpublish
                  </>
                ) : (
                  <>
                    <HugeiconsIcon icon={ViewIcon} /> Publish
                  </>
                )}
              </Button>
              {optimisticValues.isPublished ? (
                <Button
                  nativeButton={false}
                  variant="outline"
                  size="sm"
                  render={
                    <Link
                      href={`/docs/${props.documentData.collectionSlug}/${props.documentData.slug}`}
                    />
                  }
                >
                  <HugeiconsIcon icon={Link01Icon} />
                </Button>
              ) : (
                <Button variant="outline" size="sm" disabled>
                  <HugeiconsIcon icon={Link01Icon} />
                </Button>
              )}
            </ButtonGroup>
            <ButtonGroup>
              <Button
                variant="outline"
                size="sm"
                onClick={() => props.setEditor("lexical-editor")}
                disabled={isPending}
              >
                <HugeiconsIcon icon={TextCreationIcon} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => props.setEditor("markdown-editor")}
                disabled={isPending}
              >
                <MdxIcon />
              </Button>
            </ButtonGroup>
            <Button
              variant="outline-destructive"
              size="sm"
              onClick={() => handleDeleteDocument(props.documentData.id)}
              disabled={isPending}
            >
              <HugeiconsIcon icon={Delete01Icon} />
              <span className="flex items-center gap-1 sr-only md:not-sr-only">
                Delete
              </span>
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon-sm" className="md:hidden" />
              }
            >
              <HugeiconsIcon icon={MoreHorizontalIcon} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <HugeiconsIcon icon={ViewIcon} />
                Publish
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HugeiconsIcon icon={Link01Icon} />
                Copy link
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <HugeiconsIcon icon={Delete01Icon} />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export function DocumentHeaderSkeleton() {
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
          {/* Button Save */}
          <Skeleton className="h-4 w-18" />
          <div className="hidden items-center gap-2 md:flex">
            <Skeleton className="h-4 w-29" />
            <Skeleton className="h-4 w-18" />
            {/* Button Delete */}
            <Skeleton className="h-4 w-20.5" />
          </div>
          {/* Mobile: Overflow menu */}
          <Skeleton className="h-4 w-22 md:hidden" />
        </div>
      </div>
    </header>
  );
}
