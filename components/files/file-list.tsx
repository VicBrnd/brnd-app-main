"use client";

import Link from "next/link";

import {
  ArrowRight02Icon,
  Folder,
  Folder01Icon,
  MoreVerticalIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { MdxIcon } from "@/components/icons/mdx-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { DocumentWithCollection } from "@/lib/db/types";
import { useFilesStore } from "@/store/files-store";

interface FileListProps {
  documentsData: DocumentWithCollection[];
}

export function FileList({ documentsData }: FileListProps) {
  const { viewMode } = useFilesStore();

  const title = "All Files";

  if (documentsData.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 bg-background p-6 px-4 md:p-10">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <HugeiconsIcon icon={Folder01Icon} />
            </EmptyMedia>
            <EmptyTitle>No Projects Yet</EmptyTitle>
            <EmptyDescription>
              You haven&apos;t created any projects yet. Get started by creating
              your first project.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            <Button>Create Project</Button>
            <Button variant="outline">Import Project</Button>
          </EmptyContent>
          <Button
            variant="link"
            className="text-muted-foreground"
            size="sm"
            nativeButton={false}
            render={
              <a href="#">
                Learn More <HugeiconsIcon icon={ArrowRight02Icon} />
              </a>
            }
          />
        </Empty>
      </div>
    );
  }

  if (viewMode === "grid") {
    return (
      <div className="space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {documentsData.map((document) => (
            <Link
              href={`/dashboard/${document.collectionSlug}/${document.slug}`}
              key={document.id}
            >
              <div
                key={document.id}
                className="p-4 rounded-xl border bg-card hover:bg-accent/50 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <MdxIcon style={{ color: document.collectionColor }} />
                  <div className="flex items-center gap-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        onClick={(e) => e.preventDefault()}
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-7"
                          >
                            <HugeiconsIcon
                              icon={MoreVerticalIcon}
                              className="size-4"
                            />
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="end">
                        <DropdownMenuGroup>
                          <DropdownMenuItem>Download</DropdownMenuItem>
                          <DropdownMenuItem>Rename</DropdownMenuItem>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <p className="font-medium text-sm truncate mb-0.5">
                  {document.title}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span> {document.createdAt.toLocaleDateString("fr-FR")}</span>
                  {document.isPublished === true && (
                    <HugeiconsIcon icon={Folder} className="size-3" />
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="hidden sm:grid grid-cols-[1fr_100px_100px_100px_70px] gap-4 px-4 py-3 border-b bg-muted/50 text-xs font-medium text-muted-foreground">
          <span>Name</span>
          <span>Collection</span>
          <span>Modified</span>
          <span>Created</span>
        </div>
        <div className="divide-y">
          {documentsData.map((document) => (
            <Link
              href={`/dashboard/${document.collectionSlug}/${document.slug}`}
              key={document.id}
              className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_100px_100px_100px_70px] gap-2 sm:gap-4 px-4 py-3 hover:bg-accent/50 transition-colors cursor-pointer group items-center"
            >
              <div className="flex items-center gap-3 min-w-0">
                <MdxIcon style={{ color: document.collectionColor }} />
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">
                    {document.title}
                  </p>
                  <p className="text-xs text-muted-foreground sm:hidden">
                    {document.collectionTitle}
                  </p>
                  <p className="text-xs text-muted-foreground sm:hidden">
                    {document.updatedAt.toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>
              <span className="hidden sm:block text-sm text-muted-foreground">
                {document.collectionTitle}
              </span>
              <span className="hidden sm:block text-sm text-muted-foreground">
                {document.updatedAt.toLocaleDateString("fr-FR")}
              </span>
              <span className="hidden sm:block text-sm text-muted-foreground">
                {document.createdAt.toLocaleDateString("fr-FR")}
              </span>
              <div className="flex items-center gap-1">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    onClick={(e) => e.preventDefault()}
                    render={
                      <Button variant="ghost" size="icon" className="size-7">
                        <HugeiconsIcon
                          icon={MoreVerticalIcon}
                          className="size-4"
                        />
                      </Button>
                    }
                  />
                  <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Download</DropdownMenuItem>
                      <DropdownMenuItem>Rename</DropdownMenuItem>
                      <DropdownMenuItem>Share</DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
