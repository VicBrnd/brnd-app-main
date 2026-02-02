"use client";

import { usePathname } from "next/navigation";

import {
  DashboardSquare01Icon,
  LeftToRightListBulletIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Kbd } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useFilesStore } from "@/store/files-store";

export function ViewSwitcher() {
  const { viewMode, setViewMode } = useFilesStore();

  const pathname = usePathname();

  if (["/user", "/other..."].includes(pathname)) {
    return null;
  }

  return (
    <ButtonGroup>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setViewMode("grid")}
              className={cn(viewMode === "grid" && "bg-muted")}
            >
              <HugeiconsIcon icon={DashboardSquare01Icon} />
            </Button>
          }
        />
        <TooltipContent className="flex items-center gap-2 pr-1">
          Files Grid <Kbd>G</Kbd>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setViewMode("list")}
              className={cn(viewMode === "list" && "bg-muted")}
            >
              <HugeiconsIcon icon={LeftToRightListBulletIcon} />
            </Button>
          }
        />
        <TooltipContent className="flex items-center gap-2 pr-1">
          Files List <Kbd>L</Kbd>
        </TooltipContent>
      </Tooltip>
    </ButtonGroup>
  );
}
