import { Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { cn } from "@/lib/utils";

const COLORS = [
  { value: "#8B5CF6", label: "Violet" },
  { value: "#06B6D4", label: "Cyan" },
  { value: "#F59E0B", label: "Amber" },
  { value: "#EC4899", label: "Pink" },
  { value: "#10B981", label: "Emerald" },
] as const;

type CollectionColor = (typeof COLORS)[number]["value"];

interface ColorPickerProps {
  color?: string;
  onChange?: (color: CollectionColor) => void;
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  return (
    <div className="flex gap-1.5">
      {COLORS.map(({ value, label }) => (
        <label key={value} className="relative cursor-pointer">
          <input
            type="radio"
            name="color"
            value={value}
            defaultChecked={color === value}
            onChange={() => onChange?.(value)}
            className="sr-only peer"
          />
          <span
            aria-label={label}
            className={cn(
              "flex items-center justify-center size-6 rounded-full ring-offset-2 ring-offset-background peer-focus-visible:ring-2 peer-focus-visible:ring-ring",
              "peer-checked:ring-2 peer-checked:ring-current",
              "[&_svg]:opacity-0 peer-checked:[&_svg]:opacity-100 [&_svg]:transition-opacity",
            )}
            style={{ backgroundColor: value, color: value }}
          >
            <HugeiconsIcon
              icon={Tick02Icon}
              strokeWidth={3}
              className="size-3 text-white"
            />
          </span>
        </label>
      ))}
    </div>
  );
}
