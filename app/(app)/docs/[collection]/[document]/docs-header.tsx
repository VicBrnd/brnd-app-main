import Link from "next/link";

import {
  ArrowLeft02Icon,
  File01Icon,
  FloppyDiskIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DocumentBySlugProps } from "@/lib/data/documents/get-document-slug";
import { capitalize } from "@/lib/utils";

interface DocsHeaderProps {
  documentData: DocumentBySlugProps;
}

export function DocsHeader(props: DocsHeaderProps) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <Button
          nativeButton={false}
          variant="ghost"
          size="icon-sm"
          className="-ml-1"
          render={<Link href={`/docs/${props.documentData.collectionSlug}`} />}
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
        <h1 className="text-sm font-semibold">
          {capitalize(props.documentData.title)}
        </h1>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm">
            <HugeiconsIcon icon={FloppyDiskIcon} />
            Edit
          </Button>

          {/* <DropdownMenu>
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
          </DropdownMenu> */}
        </div>
      </div>
    </header>
  );
}
