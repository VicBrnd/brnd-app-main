import { useCallback } from "react";

import { SearchAddIcon, SearchMinusIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  Cropper,
  CropperCropArea,
  CropperDescription,
  CropperImage,
} from "@/components/ui/base-ui/cropper";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Area } from "@/lib/cropper";

interface AvatarCropperProps {
  filePreview: string;
  cropZoom: number;
  setCropZoom: (zoom: number) => void;
  setCropArea: (pixels: Area | null) => void;
}

export function AvatarCropper({
  filePreview,
  cropZoom,
  setCropZoom,
  setCropArea,
}: AvatarCropperProps) {
  const handleCropChange = useCallback(
    (pixels: Area | null) => {
      setCropArea(pixels);
    },
    [setCropArea],
  );
  return (
    <>
      <DialogHeader>
        <DialogTitle>Avatar Cropper</DialogTitle>
        <DialogDescription>
          Crop your avatar image and save it.
        </DialogDescription>
      </DialogHeader>
      {filePreview && (
        <div className="flex flex-col items-center justify-center gap-4">
          <Cropper
            className="aspect-square size-80 rounded-full"
            cropPadding={0}
            image={filePreview}
            zoom={cropZoom}
            onCropChange={handleCropChange}
            onZoomChange={setCropZoom}
          >
            <CropperDescription />
            <CropperImage />
            <CropperCropArea className="rounded-full border-2 border-dashed" />
          </Cropper>
          <div className="mx-auto flex w-full max-w-80 items-center gap-4">
            <HugeiconsIcon
              icon={SearchMinusIcon}
              className="shrink-0 opacity-60"
              size={16}
              aria-hidden="true"
            />

            <Slider
              defaultValue={[1]}
              value={[cropZoom]}
              min={1}
              max={3}
              step={0.1}
              onValueChange={(value) => setCropZoom(Array.isArray(value) ? value[0] : value)}
              aria-label="Zoom slider"
            />
            <HugeiconsIcon
              icon={SearchAddIcon}
              className="shrink-0 opacity-60"
              size={16}
              aria-hidden="true"
            />
          </div>
        </div>
      )}
    </>
  );
}
