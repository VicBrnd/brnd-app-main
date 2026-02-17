"use client";

import { useOptimistic, useState, useTransition } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowLeft02Icon,
  Delete01Icon,
  Folder01Icon,
  PaintBoardIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { goeyToast } from "goey-toast";

import { deleteCollection } from "@/actions/files/collection/delete-collection.action";
import { editCollection } from "@/actions/files/collection/edit-collection.action";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ui/coss-ui/color-picker";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Collection } from "@/lib/db/types";

interface CollectionHeaderProps {
  collectionData: Collection;
}

export function CollectionHeader(props: CollectionHeaderProps) {
  const router = useRouter();

  const [isDeleting, startDeleteTransition] = useTransition();
  const [, startSaveTransition] = useTransition();

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(props.collectionData.title);

  const [optimisticTitle, setOptimisticTitle] = useOptimistic(
    props.collectionData.title,
  );
  const [optimisticColor, setOptimisticColor] = useOptimistic(
    props.collectionData.color,
  );

  const handleDeleteCollection = (collectionId: string) => {
    startDeleteTransition(async () => {
      const res = await deleteCollection({ ids: [collectionId] });
      if (res?.data?.error) goeyToast.error(res.data.error);
      if (res?.data?.success)
        goeyToast.success("Collection deleted successfully");
      router.push("/dashboard");
    });
  };

  const handleSaveTitle = () => {
    if (editValue === props.collectionData.title) return;
    startSaveTransition(async () => {
      setOptimisticTitle(editValue);
      const res = await editCollection({
        id: props.collectionData.id,
        title: editValue,
      });
      if (res?.data?.error) {
        goeyToast.error(res.data.error);
        setEditValue(props.collectionData.title);
      }
    });
  };

  const handleSaveColor = (newColor: string) => {
    startSaveTransition(async () => {
      setOptimisticColor(newColor);
      const res = await editCollection({
        id: props.collectionData.id,
        color: newColor,
      });
      if (res?.data?.error) goeyToast.error(res.data.error);
    });
  };

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        {/* Back button */}
        <Button
          nativeButton={false}
          variant="ghost"
          size="icon-sm"
          className="-ml-1"
          render={<Link href="/dashboard" />}
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} />
          <span className="sr-only">Back</span>
        </Button>

        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        {/* Folder icon with optimistic color */}
        <HugeiconsIcon
          icon={Folder01Icon}
          size={14}
          className="shrink-0"
          style={{ color: optimisticColor }}
        />

        {/* Inline title editing */}
        {isEditing ? (
          <input
            className="text-sm font-semibold border-none outline-none px-0 py-0 bg-transparent"
            autoFocus
            value={editValue.charAt(0).toUpperCase() + editValue.slice(1)}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={() => {
              setIsEditing(false);
              handleSaveTitle();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsEditing(false);
                handleSaveTitle();
              }
              if (e.key === "Escape") {
                setEditValue(props.collectionData.title);
                setIsEditing(false);
              }
            }}
          />
        ) : (
          <Tooltip>
            <TooltipTrigger
              render={
                <h1
                  className="text-sm font-semibold"
                  onClick={() => {
                    setEditValue(optimisticTitle);
                    setIsEditing(true);
                  }}
                />
              }
            >
              {optimisticTitle.charAt(0).toUpperCase() +
                optimisticTitle.slice(1)}
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Click to edit the title
            </TooltipContent>
          </Tooltip>
        )}

        <div className="ml-auto flex items-center gap-2">
          {/* Color picker */}
          <Popover>
            <PopoverTrigger
              render={
                <Button variant="outline" size="sm">
                  <HugeiconsIcon
                    icon={PaintBoardIcon}
                    style={{ color: optimisticColor }}
                  />
                  <span className="sr-only sm:not-sr-only">Color</span>
                </Button>
              }
            />
            <PopoverContent className="w-auto" align="end">
              <PopoverHeader>
                <PopoverTitle>Color Picker</PopoverTitle>
              </PopoverHeader>
              <ColorPicker
                color={optimisticColor}
                onChange={(newColor) => handleSaveColor(newColor)}
              />
            </PopoverContent>
          </Popover>

          {/* Delete button */}
          <Button
            variant="outline-destructive"
            size="sm"
            onClick={() => handleDeleteCollection(props.collectionData.id)}
          >
            {isDeleting ? <Spinner /> : <HugeiconsIcon icon={Delete01Icon} />}
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
        <Skeleton className="h-4 w-6" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Skeleton className="h-4 w-30" />
        <div className="ml-auto flex items-center gap-2">
          <Skeleton className="h-4 w-20.5" />
        </div>
      </div>
    </header>
  );
}
