"use client";

import { FileType } from "@/components/files/mock-data/files";
import { MdxIcon } from "@/components/icons/mdx-icons";
import { cn } from "@/lib/utils";

interface FileIconProps {
  type: FileType;
  className?: string;
}

const iconMap = {
  image: { icon: MdxIcon, color: "text-violet-500" },
  video: { icon: MdxIcon, color: "text-pink-500" },
  document: { icon: MdxIcon, color: "text-amber-500" },
  archive: { icon: MdxIcon, color: "text-emerald-500" },
  audio: { icon: MdxIcon, color: "text-cyan-500" },
  code: { icon: MdxIcon, color: "text-blue-500" },
  other: { icon: MdxIcon, color: "text-muted-foreground" },
};

export function FileIcon({ type, className }: FileIconProps) {
  const { icon: Icon, color } = iconMap[type] || iconMap.other;

  return <Icon className={cn("size-5", color, className)} />;
}
