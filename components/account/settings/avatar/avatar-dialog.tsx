"use client";

import { useState, useTransition } from "react";

import { default as NextImage } from "next/image";

import {
  AiImageIcon,
  Cancel01Icon,
  Delete01Icon,
  ImageAdd02Icon,
  ImageDone01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { User } from "better-auth";
import { goeyToast } from "goey-toast";

import { addAvatar } from "@/actions/account/add-avatar.action";
import { deleteAvatar } from "@/actions/account/delete-avatar.action";
import { updateUser } from "@/actions/account/update-user.action";
import { AvatarCropper } from "@/components/account/settings/avatar/avatar-cropper";
import { AvatarSelection } from "@/components/account/settings/avatar/avatar-selection";
import { AvatarUploader } from "@/components/account/settings/avatar/avatar-uploader";
import { SlidingNumber } from "@/components/ui/animate-ui/sliding-number";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFileUpload } from "@/hooks/use-file-upload";
import { authClient } from "@/lib/auth/auth-client";
import { Area, getCroppedImg } from "@/lib/cropper";
import { AvatarsProps } from "@/lib/data/account/get-images";

async function cropImageToFile(
  preview: string,
  cropArea: Area,
  fileName: string,
): Promise<File> {
  const croppedBlob = await getCroppedImg(preview, cropArea);
  if (!croppedBlob) throw new Error("Failed to crop image");
  return new File([croppedBlob], fileName, { type: croppedBlob.type });
}

interface AvatarDialogProps {
  userData: User;
  userAvatars: AvatarsProps[];
}

const maxSizeMB = 10;
const maxSize = maxSizeMB * 1024 * 1024;

export function AvatarDialog(props: AvatarDialogProps) {
  const [
    { files, isDragging },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      getInputProps,
      addFiles,
    },
  ] = useFileUpload({
    accept: "image/*",
    maxSize,
  });

  const [isLoading, startTransition] = useTransition();
  const [selected, setSelected] = useState<AvatarsProps[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropArea, setCropArea] = useState<Area | null>(null);
  const [cropZoom, setCropZoom] = useState(1);

  const { data, isPending, refetch } = authClient.useSession();
  const user = data?.user || props.userData;

  const resetCropper = () => {
    setCropArea(null);
    setCropZoom(1);
  };

  const handleUpload = () => {
    if (files.length === 0) {
      goeyToast.error("Please select an image to continue");
      return;
    }
    setCropModalOpen(true);
    resetCropper();
  };

  const handleUploadSave = async () => {
    if (!files[0]?.file || !cropArea) {
      goeyToast.error("Please select an image to continue");
      return;
    }

    const preview = files[0].preview || "";
    const fileName = files[0].file.name;
    const fileId = files[0].id;

    try {
      const croppedFile = await cropImageToFile(preview, cropArea, fileName);

      startTransition(() => {
        goeyToast.promise(addAvatar([croppedFile]), {
          loading: "Uploading your image...",
          success: () => {
            removeFile(fileId);
            setSelected([]);
            setDialogOpen(false);
            setCropModalOpen(false);
            refetch();

            return "Uploaded successfully";
          },
          error: (err) => {
            if (err instanceof Error) return err.message;
            return "Upload failed";
          },
        });
      });
    } catch (error) {
      goeyToast.error("Failed to process image");
      console.error("Upload error:", error);
    }
  };

  const handleEdit = async () => {
    if (selected.length !== 1) {
      goeyToast.error("Please select exactly one image");
      return;
    }

    const editSelectedImage = async () => {
      const response = await fetch(selected[0].url);
      const blob = await response.blob();
      const file = new File([blob], selected[0].name, { type: blob.type });
      addFiles([file]);
    };

    goeyToast.promise(editSelectedImage(), {
      loading: "Preparing image for editing...",
      success: () => {
        setCropModalOpen(true);
        resetCropper();

        return "Image ready for editing";
      },
      error: "Unable to prepare image for editing",
    });
  };

  const handleDelete = async () => {
    if (selected.length === 0) {
      goeyToast.error("Please select an image to continue");
      return;
    }

    const imageCount = selected.length;
    const imageText = imageCount === 1 ? "image" : "images";

    startTransition(async () => {
      goeyToast.promise(
        deleteAvatar({ keys: selected.map((item) => item.key) }),
        {
          loading: `Deleting ${imageCount} ${imageText}...`,
          success: () => {
            setSelected([]);
            refetch();

            return `Successfully deleted ${imageCount} ${imageText}`;
          },
          error: (error) => {
            console.error("Delete error:", error);
            return "Unable to delete the selected image(s)";
          },
        },
      );
    });
  };

  const handleSave = async () => {
    if (selected.length === 0) {
      goeyToast.error("Please select an image to continue");
      return;
    }
    if (selected.length !== 1) {
      goeyToast.error("Please select only one image");
      return;
    }

    startTransition(async () => {
      goeyToast.promise(updateUser({ image: selected[0].url }), {
        loading: "Saving your changes...",
        success: () => {
          setSelected([]);
          setDialogOpen(false);
          refetch();
          return "Changes saved successfully";
        },
        error: (error) => {
          console.error("Save error:", error);
          return "Unable to save your changes. Please try again";
        },
      });
    });
  };

  const handleSelect = (id: string) => {
    const isSelected = selected.some((item) => item.id === id);
    const matchingFile = props.userAvatars.find((img) => img.id === id);

    if (matchingFile) {
      setSelected((prev) =>
        isSelected
          ? prev.filter((item) => item.id !== id)
          : [...prev, matchingFile],
      );
    }
  };

  const handleCancel = () => {
    if (files[0]?.id) removeFile(files[0].id);
    setSelected([]);
    setCropModalOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <div className="relative">
        <DialogTrigger
          nativeButton={false}
          render={<Avatar className="size-20 overflow-hidden" />}
        >
          {user.image && (
            <NextImage
              src={user.image}
              alt={user.name}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              loading="eager"
              fill
              priority
            />
          )}
          {!user.image && (
            <AvatarFallback className="size-20 text-2xl">
              {user.name?.slice(0, 2)}
            </AvatarFallback>
          )}
        </DialogTrigger>
        {user.image && user.image.length > 0 && (
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  type="button"
                  size="icon"
                  aria-label="Remove avatar"
                  className="absolute bottom-0 right-0 size-6 rounded-full"
                  disabled={isLoading || isPending}
                  onClick={() => {
                    startTransition(() => {
                      goeyToast.promise(updateUser({ image: "" }), {
                        loading: "Removing avatar...",
                        success: () => {
                          refetch();
                          return "Avatar removed";
                        },
                        error: "Failed to remove avatar",
                      });
                    });
                  }}
                />
              }
            >
              <HugeiconsIcon icon={Delete01Icon} className="size-4 shrink-0" />
            </TooltipTrigger>
            <TooltipContent side="left">Remove image</TooltipContent>
          </Tooltip>
        )}
      </div>

      <DialogContent className="sm:max-w-lg">
        <div className="size-full space-y-4">
          {!cropModalOpen && (
            <>
              <AvatarSelection
                selected={selected}
                handleSelect={handleSelect}
                userImages={props.userAvatars}
                disabled={files.length > 0}
              />
              <AvatarUploader
                files={files}
                isDragging={isDragging}
                openFileDialog={openFileDialog}
                handleDragEnter={handleDragEnter}
                handleDragLeave={handleDragLeave}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
                getInputProps={getInputProps}
                removeFile={removeFile}
              />
            </>
          )}
          {cropModalOpen && files && (
            <AvatarCropper
              filePreview={files[0]?.preview || ""}
              cropZoom={cropZoom}
              setCropZoom={setCropZoom}
              setCropArea={setCropArea}
            />
          )}
        </div>

        <DialogFooter>
          <div className="flex justify-end gap-2">
            {!files || files.length === 0 ? (
              <>
                <Button
                  variant="outline-destructive"
                  size="sm"
                  disabled={selected.length === 0 || isLoading || isPending}
                  onClick={handleDelete}
                >
                  <HugeiconsIcon icon={Delete01Icon} className="size-4" />
                  Delete
                  {selected.length > 0 && (
                    <span className="text-muted-foreground -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                      <SlidingNumber
                        number={selected.length}
                        className="whitespace-nowrap"
                        inView
                      />
                    </span>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={selected.length !== 1 || isLoading || isPending}
                  onClick={handleEdit}
                >
                  <HugeiconsIcon icon={AiImageIcon} className="size-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={selected.length !== 1 || isLoading || isPending}
                  onClick={handleSave}
                >
                  <HugeiconsIcon icon={ImageDone01Icon} className="size-4" />
                  Save
                </Button>
              </>
            ) : !cropModalOpen ? (
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                disabled={isLoading || isPending}
                onClick={handleUpload}
              >
                <HugeiconsIcon icon={ImageAdd02Icon} className="size-4" />
                Upload
              </Button>
            ) : (
              <>
                <Button
                  variant="outline-destructive"
                  size="sm"
                  disabled={isLoading || isPending}
                  onClick={handleCancel}
                >
                  <HugeiconsIcon icon={Cancel01Icon} className="size-4" />
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={files.length !== 1 || isLoading || isPending}
                  onClick={handleUploadSave}
                >
                  <HugeiconsIcon icon={ImageAdd02Icon} className="size-4" />
                  Save
                </Button>
              </>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
