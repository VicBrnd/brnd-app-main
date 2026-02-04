import { type DragEvent, type InputHTMLAttributes } from "react";

import { Cancel01Icon, ImageUploadIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileWithPreview, formatBytes } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";

interface AvatarUploaderProps {
  files: FileWithPreview[];
  isDragging: boolean;
  maxSizeMB: number;
  handleDragEnter: (e: DragEvent<HTMLElement>) => void;
  handleDragLeave: (e: DragEvent<HTMLElement>) => void;
  handleDragOver: (e: DragEvent<HTMLElement>) => void;
  handleDrop: (e: DragEvent<HTMLElement>) => void;
  openFileDialog: () => void;
  removeFile: (id: string) => void;
  getInputProps: (
    props?: InputHTMLAttributes<HTMLInputElement>,
  ) => InputHTMLAttributes<HTMLInputElement> & {
    ref: React.Ref<HTMLInputElement>;
  };
}

export function AvatarUploader({
  files,
  isDragging,
  openFileDialog,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  getInputProps,
  removeFile,
  // maxSizeMB,
}: AvatarUploaderProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Upload files</DialogTitle>
        <DialogDescription>
          Drag and drop your files here or click to browse.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-2">
        <div
          role="button"
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className={cn(
            "relative flex min-h-52 flex-col items-center justify-center overflow-hidden",
            "rounded-xl border-2 border-dashed border-input",
            "p-4",
            "hover:bg-accent/50",
            "data-[dragging=true]:bg-accent/50",
            "has-[input:focus]:border-ring",
            "focus-visible:border-ring",
            "has-disabled:pointer-events-none",
            "has-disabled:opacity-50",
            "transition-all duration-200",
          )}
        >
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload file"
            disabled={!!files[0]?.file}
          />
          <div className="flex flex-col items-center justify-center px-4 py-3 text-center gap-2">
            <div
              className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-dashed"
              aria-hidden="true"
            >
              <HugeiconsIcon
                icon={ImageUploadIcon}
                className="size-5 opacity-30"
              />
            </div>
            <p className="font-medium text-muted-foreground cursor-default">
              Drag 'n' drop files here, or click to select files
            </p>
          </div>
        </div>
        {files[0]?.file && (
          <div className="space-y-2">
            <div className="bg-background flex items-center justify-between gap-2 rounded-lg border border-dashed p-2 pe-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="bg-accent aspect-square shrink-0 rounded">
                  <img
                    src={files[0]?.preview}
                    alt={files[0]?.file?.name}
                    className="size-10 rounded-[inherit] object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="line-clamp-1 text-sm font-medium">
                    {files[0]?.file?.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {formatBytes(files[0]?.file?.size)}
                  </p>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent dark:hover:bg-transparent"
                onClick={() => {
                  if (files[0]?.id) {
                    removeFile(files[0].id);
                  }
                }}
                aria-label="Remove file"
              >
                <HugeiconsIcon icon={Cancel01Icon} aria-hidden="true" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
