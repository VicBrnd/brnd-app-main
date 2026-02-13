"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { MdxIcon } from "@/components/icons/mdx-icons";
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

type NavDocumentItem = { value: string; label: string; collectionSlug: string };

export function NavDocument({
  items,
  currentSlug,
}: {
  items: NavDocumentItem[];
  currentSlug: string;
}) {
  const router = useRouter();

  const currentItem = items.find((d) => d.value === currentSlug) ?? items[0];

  return (
    <BreadcrumbItem>
      <Select
        items={items}
        value={currentSlug}
        onValueChange={(slug: string | null) => {
          if (!slug) return;
          const doc = items.find((d) => d.value === slug);
          if (doc) router.push(`/dashboard/${doc.collectionSlug}/${slug}`);
        }}
      >
        <ButtonGroup>
          <Button
            nativeButton={false}
            render={
              <Link
                href={`/dashboard/${currentItem?.collectionSlug}/${currentSlug}`}
              />
            }
            variant="outline"
            size="sm"
          >
            <MdxIcon />
            <SelectValue />
          </Button>
          <SelectTrigger className="w-full max-w-48" size="sm">
            <span className="sr-only">Arrow select</span>
          </SelectTrigger>
        </ButtonGroup>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Documents</SelectLabel>
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
