import {
  CheckListIcon,
  CodeSimpleIcon,
  Heading01Icon,
  Heading02Icon,
  Heading03Icon,
  LeftToRightListBulletIcon,
  LeftToRightListNumberIcon,
  Menu02Icon,
  QuoteDownIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const items = [
  { label: "Paragraph", value: "paragraph", icon: Menu02Icon },
  { label: "Heading 1", value: "heading-1", icon: Heading01Icon },
  { label: "Heading 2", value: "heading-2", icon: Heading02Icon },
  { label: "Heading 3", value: "heading-3", icon: Heading03Icon },
  {
    label: "Numbered List",
    value: "numbered-list",
    icon: LeftToRightListNumberIcon,
  },
  {
    label: "Bulleted List",
    value: "bulleted-list",
    icon: LeftToRightListBulletIcon,
  },
  { label: "Check List", value: "check-list", icon: CheckListIcon },
  { label: "Code Block", value: "code-block", icon: CodeSimpleIcon },
  { label: "Quot", value: "quote", icon: QuoteDownIcon },
];

export function SelectBlockFormat() {
  return (
    <Select defaultValue={items[0]} itemToStringValue={(item) => item.value}>
      <SelectTrigger>
        <SelectValue>
          {(item) => (
            <span className="flex items-center gap-2">
              <HugeiconsIcon icon={item.icon} />
              <span className="truncate">{item.label}</span>
            </span>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="start" alignItemWithTrigger={false}>
        <SelectGroup>
          {items.map((item) => (
            <SelectItem key={item.value} value={item}>
              <div className="flex items-center gap-2">
                <HugeiconsIcon icon={item.icon} />
                {item.label}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
