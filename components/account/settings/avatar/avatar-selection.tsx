"use client";

import type { KeyboardEvent } from "react";

import NextImage from "next/image";

import { motion } from "motion/react";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AvatarsProps } from "@/lib/data/account/get-images";
import { cn } from "@/lib/utils";

export type AvatarSelectionProps = {
  selected: AvatarsProps[];
  userImages?: AvatarsProps[];
  handleSelect: (id: string) => void;
  disabled?: boolean;
};

export function AvatarSelection(props: AvatarSelectionProps) {
  const handleKeyDown = (e: KeyboardEvent, id: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!props.disabled) props.handleSelect(id);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Previously Uploaded</DialogTitle>
        <DialogDescription>Previously user files uploaded.</DialogDescription>
      </DialogHeader>
      <div className="flex flex-wrap items-center gap-1.5 py-2">
        {props.userImages?.map((userImage) => (
          <motion.div
            key={userImage.id}
            role="button"
            tabIndex={props.disabled ? -1 : 0}
            whileHover={{
              scale: 1.07,
              transition: { duration: 0.2, ease: "easeInOut" },
            }}
            className={cn(
              "relative m-1 size-16 overflow-hidden rounded-full border shadow-sm",
              props.disabled && "cursor-not-allowed opacity-50",
              props.selected.some(
                (selectedFile) => selectedFile.id === userImage.id,
              ) &&
                "shadow-sm outline-dashed outline-1 outline-offset-2 outline-muted-foreground/40",
            )}
            onClick={() => !props.disabled && props.handleSelect(userImage.id)}
            onKeyDown={(e) => handleKeyDown(e, userImage.id)}
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
