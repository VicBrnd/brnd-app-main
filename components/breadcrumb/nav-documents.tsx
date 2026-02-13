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

interface NavDocumentsProps {
  documentsData: { slug: string; title: string; collectionSlug: string }[];
  currentSlug: string;
}

export function NavDocuments(props: NavDocumentsProps) {
  const router = useRouter();

  const items = props.documentsData.map((document) => ({
    value: document.slug,
    label: document.title,
    collectionSlug: document.collectionSlug,
  }));

  const currentItem =
    items.find((d) => d.value === props.currentSlug) ?? items[0];

  return (
    <BreadcrumbItem>
      <Select
        items={items}
        value={props.currentSlug}
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
                href={`/dashboard/${currentItem?.collectionSlug}/${props.currentSlug}`}
              />
            }
            variant="outline"
            size="sm"
          >
            <MdxIcon />
            <SelectValue />
          </Button>
          <SelectTrigger
            className="w-full max-w-48"
            size="sm"
            aria-label="Select document"
          >
            <span className="sr-only">Arrow select</span>
          </SelectTrigger>
        </ButtonGroup>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Documents</SelectLabel>
            {items.map((document) => (
              <SelectItem key={document.value} value={document.value}>
                {document.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </BreadcrumbItem>
  );
}
