"use client";

import { FileList } from "@/components/files/file-list";
import { FolderGrid } from "@/components/files/folder-grid";

export type ViewType =
  | "all"
  | "starred"
  | "recent"
  | "shared"
  | "trash"
  | "folder";

interface FilesContentProps {
  view: ViewType;
  folderId?: string;
}

export function FilesContent({ view, folderId }: FilesContentProps) {
  const showFolders = view === "all";

  return (
    <div className="flex-1 h-full space-y-6 min-w-0">
      {showFolders && <FolderGrid />}
      <FileList view={view} folderId={folderId} />
    </div>
  );
}
