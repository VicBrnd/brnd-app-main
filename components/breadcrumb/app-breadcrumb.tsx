import {
  ArrowRight01Icon,
  DashboardSquare02Icon,
  Folder01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { MdxIcon } from "@/components/icons/mdx-icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AppOverview = [
  { label: "Dashboard", value: null },
  { label: "Documentation", value: "documentation" },
];

const Collections = [
  { label: "Uploadthing", value: null },
  { label: "Zustand", value: "zustand" },
  { label: "React", value: "react" },
  { label: "Nextjs", value: "nextjs" },
  { label: "BetterAuth", value: "betterauth" },
  { label: "Redis", value: "redis" },
];

const Documents = [
  { label: "API", value: null },
  { label: "Sidebar Store", value: "zustand" },
  { label: "useActionSate", value: "react" },
  { label: "Rate-Limiter", value: "nextjs" },
  { label: "Auth Config", value: "betterauth" },
  { label: "@upstash/redis", value: "redis" },
];

export function AppBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList className="overflow-auto flex-nowrap">
        <BreadcrumbItem>
          <Select items={AppOverview}>
            <SelectTrigger className="w-full max-w-48">
              <HugeiconsIcon icon={DashboardSquare02Icon} />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>App Overview</SelectLabel>
                {AppOverview.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <HugeiconsIcon icon={ArrowRight01Icon} />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <Select items={Collections}>
            <SelectTrigger className="w-full max-w-48">
              <HugeiconsIcon icon={Folder01Icon} />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Collections</SelectLabel>
                {Collections.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <HugeiconsIcon icon={ArrowRight01Icon} />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <Select items={Collections}>
            <SelectTrigger className="w-full max-w-48">
              <MdxIcon />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Documents</SelectLabel>
                {Documents.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
