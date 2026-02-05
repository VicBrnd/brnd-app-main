"use client";

import NextImage from "next/image";

import { motion } from "motion/react";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserImagesProps } from "@/lib/data/account/get-images";

export type FileSelectionProps = {
  selected: UserImagesProps[];
  userImages?: UserImagesProps[];
  handleSelect: (id: string) => void;
  disabled?: boolean;
};

export function AvatarSelection({
  selected,
  userImages,
  handleSelect,
  disabled,
}: FileSelectionProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Previously Uploaded</DialogTitle>
        <DialogDescription>Previously user files uploaded.</DialogDescription>
      </DialogHeader>
      <div className="flex flex-wrap items-center gap-1.5 py-2">
        {userImages?.map((userImage) => (
          <motion.div
            key={userImage.id}
            whileHover={{
              scale: 1.07,
              transition: { duration: 0.2, ease: "easeInOut" },
            }}
            className={`relative m-1 size-16 ${
              disabled ? "cursor-not-allowed opacity-50" : ""
            } overflow-hidden rounded-full border shadow-sm ${
              selected.some((selectedFile) => selectedFile.id === userImage.id)
                ? "shadow-sm outline-dashed outline-1 outline-offset-2 outline-muted-foreground/40"
                : ""
            }`}
            onClick={() => !disabled && handleSelect(userImage.id)}
          >
            <NextImage
              alt={userImage.name || ""}
              src={userImage.url || ""}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-md object-cover"
              onDragStart={(event) => event.preventDefault()}
            />
          </motion.div>
        ))}
      </div>
    </>
  );
}
