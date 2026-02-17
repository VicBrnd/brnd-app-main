"use client";

import type { CollectionsProps } from "@/lib/data/collections/get-collections";
import type { DocumentsProps } from "@/lib/data/documents/get-documents";

import { useParams } from "next/navigation";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { BreadcrumbCollections } from "@/components/breadcrumb/breadcrumb-collections";
import { BreadcrumbDocuments } from "@/components/breadcrumb/breadcrumb-documents";
import { BreadcrumbHome } from "@/components/breadcrumb/breadcrumb-home";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";

interface AppBreadcrumbProps {
  collectionsData: CollectionsProps[];
  documentsData: DocumentsProps[];
}

export function AppBreadcrumb(props: AppBreadcrumbProps) {
  const params = useParams<{ collection?: string; document?: string }>();
  const collectionSlug = params.collection;
  const documentSlug = params.document;
  const documentsByCollection = props.documentsData.filter(
    (document) => document.collectionSlug === collectionSlug,
  );

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex-nowrap">
        <BreadcrumbHome />
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
