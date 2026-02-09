"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Folder01Icon } from "@hugeicons/core-free-icons";
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

type NavCollectionItem = { value: string; label: string };

export function NavCollection({
  items,
  currentSlug,
}: {
  items: NavCollectionItem[];
  currentSlug: string;
}) {
  const router = useRouter();

  return (
    <BreadcrumbItem>
      <Select
        items={items}
        value={currentSlug}
        onValueChange={(slug: string | null) => {
          if (slug) router.push(`/dashboard/${slug}`);
        }}
      >
        <ButtonGroup>
          <Button
            nativeButton={false}
            render={<Link href={`/dashboard/${currentSlug}`} />}
            variant="outline"
            size="sm"
          >
            <HugeiconsIcon icon={Folder01Icon} />
            <SelectValue />
          </Button>
          <SelectTrigger className="w-full max-w-48" size="sm" />
        </ButtonGroup>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Collections</SelectLabel>
            {items.map((item) => (
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
