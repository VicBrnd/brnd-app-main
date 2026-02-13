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

interface NavCollectionsProps {
  collectionsData: { slug: string; title: string }[];
  currentSlug: string;
}

export function NavCollections(props: NavCollectionsProps) {
  const router = useRouter();

  const items = props.collectionsData.map((collection) => ({
    value: collection.slug,
    label: collection.title,
  }));

  return (
    <BreadcrumbItem>
      <Select
        items={items}
        value={props.currentSlug}
        onValueChange={(slug: string | null) => {
          if (slug) router.push(`/dashboard/${slug}`);
        }}
      >
        <ButtonGroup>
          <Button
            nativeButton={false}
            render={<Link href={`/dashboard/${props.currentSlug}`} />}
            variant="outline"
            size="sm"
          >
            <HugeiconsIcon icon={Folder01Icon} />
            <SelectValue />
          </Button>
          <SelectTrigger
            className="w-full max-w-48"
            size="sm"
            aria-label="Select collection"
          >
            <span className="sr-only">Arrow select</span>
          </SelectTrigger>
        </ButtonGroup>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Collections</SelectLabel>
            {items.map((collection) => (
              <SelectItem key={collection.value} value={collection.value}>
                {collection.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </BreadcrumbItem>
  );
}
