"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { DashboardSquare02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
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
  {
    label: "Documentations",
    href: "/docs",
    match: "/docs",
    value: "documentation",
  },
  { label: "Dashboard", href: "/dashboard", match: "/dashboard", value: null },
  {
    label: "Account",
    href: "/dashboard/account/settings",
    match: "/dashboard/account",
    value: "account",
  },
];

export function BreadcrumbHome() {
  const router = useRouter();
  const pathname = usePathname();

  const currentValue =
    AppOverview.find((item) => item.value && pathname.startsWith(item.match))
      ?.value ?? null;

  const getAppItem = (value: string | null) =>
    AppOverview.find((i) => i.value === value) ?? AppOverview[0];

  return (
    <BreadcrumbItem>
      <Select
        items={AppOverview}
        value={currentValue}
        onValueChange={(value: string | null) => {
          const item = getAppItem(value);
          router.push(item.href);
        }}
      >
        <ButtonGroup>
          <Button
            nativeButton={false}
            render={<Link href={getAppItem(currentValue).href} />}
            variant="outline"
            size="sm"
          >
            <HugeiconsIcon icon={DashboardSquare02Icon} />
            <SelectValue />
          </Button>
          <SelectTrigger
            className="w-full max-w-48"
            size="sm"
            aria-label="Select app section"
          >
            <span className="sr-only">Arrow select</span>
          </SelectTrigger>
        </ButtonGroup>
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
  );
}
