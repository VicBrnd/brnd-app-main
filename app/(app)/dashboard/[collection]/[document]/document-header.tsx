"use client";

import Link from "next/link";

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
import { DocumentBySlugProps } from "@/lib/data/documents/get-document-slug";

interface DocumentHeaderProps {
  documentData: DocumentBySlugProps;
}

export function DocumentHeader({ documentData }: DocumentHeaderProps) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) -m-4 md:-m-6 mb-4 md:mb-6">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        {/* Back button */}
        <Button
          nativeButton={false}
          variant="ghost"
          size="icon-sm"
          className="-ml-1"
          render={<Link href={`/dashboard/${documentData.collectionSlug}`} />}
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
          icon={File01Icon}
          size={14}
          className="shrink-0"
          style={{ color: documentData.collectionColor }}
        />
        <h1 className="text-sm font-semibold">{documentData.title}</h1>

        <div className="ml-auto flex items-center gap-2">
          {/* Button Save */}
          <Button variant="outline" size="sm">
            <HugeiconsIcon icon={FloppyDiskIcon} />
            Save
          </Button>
          <div className="hidden items-center gap-2 md:flex">
            <ButtonGroup>
              {/* Button Publish */}
              <Button variant="outline" size="sm">
                <HugeiconsIcon icon={ViewIcon} /> Publish
              </Button>
              {/* Button Link */}
              <Button variant="outline" size="sm">
                <HugeiconsIcon icon={Link01Icon} />
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              {/* Button Text */}
              <Button variant="outline" size="sm">
                <HugeiconsIcon icon={TextCreationIcon} />
              </Button>
              {/* Button Mdx */}
              <Button variant="outline" size="sm">
                <MdxIcon />
              </Button>
            </ButtonGroup>
            {/* Button Delete */}
            <Button variant="outline-destructive" size="sm">
              <HugeiconsIcon icon={Delete01Icon} />
              <span className="flex items-center gap-1 sr-only md:not-sr-only">
                Delete
              </span>
            </Button>
          </div>
          {/* Mobile: Overflow menu */}
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
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) -m-4 md:-m-6 mb-4 md:mb-6">
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
