"use client";

import type { CollectionsProps } from "@/lib/data/collections/get-collections";
import type { DocumentsProps } from "@/lib/data/documents/get-documents";

import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

import {
  ArrowRight01Icon,
  DashboardSquare02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { BreadcrumbCollections } from "@/components/breadcrumb/breadcrumb-collections";
import { BreadcrumbDocuments } from "@/components/breadcrumb/breadcrumb-documents";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import { Skeleton } from "@/components/ui/skeleton";
import { BreadcrumbData } from "@/config/dashboard.config";

interface AppBreadcrumbProps {
  collectionsData: CollectionsProps[];
  documentsData: DocumentsProps[];
}

export function AppBreadcrumb(props: AppBreadcrumbProps) {
  const params = useParams<{ collection?: string; document?: string }>();
  const collectionSlug = params.collection;
  const documentSlug = params.document;

  const router = useRouter();
  const pathname = usePathname();

  const documentsByCollection = props.documentsData.filter(
    (document) => document.collectionSlug === collectionSlug,
  );

  const currentValue =
    [...BreadcrumbData]
      .sort((a, b) => b.match.length - a.match.length)
      .find((item) => item.value && pathname.startsWith(item.match))?.value ??
    null;

  const getAppItem = (value: string | null) =>
    BreadcrumbData.find((i) => i.value === value) ?? BreadcrumbData[0];

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex-nowrap">
        <BreadcrumbItem>
          <Select
            items={BreadcrumbData}
            value={currentValue}
            onValueChange={(value: string | null) => {
              const item = getAppItem(value);
              router.push(item.url);
            }}
          >
            <ButtonGroup>
              <Button
                nativeButton={false}
                render={<Link href={getAppItem(currentValue).url} />}
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
                {BreadcrumbData.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </BreadcrumbItem>
        {collectionSlug && props.collectionsData.length > 0 && (
          <>
            <BreadcrumbSeparator>
              <HugeiconsIcon icon={ArrowRight01Icon} />
            </BreadcrumbSeparator>
            <BreadcrumbCollections
              collectionsData={props.collectionsData}
              currentSlug={collectionSlug}
            />
          </>
        )}
        {documentSlug && documentsByCollection.length > 0 && (
          <>
            <BreadcrumbSeparator>
              <HugeiconsIcon icon={ArrowRight01Icon} />
            </BreadcrumbSeparator>
            <BreadcrumbDocuments
              documentsData={documentsByCollection}
              currentSlug={documentSlug}
            />
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export function AppBreadcrumbSkeleton() {
  return (
    <Breadcrumb>
      <BreadcrumbList className="flex-nowrap">
        <Skeleton className="h-7 w-35" />
        <BreadcrumbSeparator>
          <HugeiconsIcon icon={ArrowRight01Icon} />
        </BreadcrumbSeparator>
        <Skeleton className="h-7 w-29" />
        <BreadcrumbSeparator>
          <HugeiconsIcon icon={ArrowRight01Icon} />
        </BreadcrumbSeparator>
        <Skeleton className="h-7 w-45" />
      </BreadcrumbList>
    </Breadcrumb>
  );
}
