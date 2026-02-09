"use client";

import type { CollectionsProps } from "@/lib/data/collections/get-collections";
import type { DocumentsProps } from "@/lib/data/documents/get-documents";

import { useParams } from "next/navigation";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { NavApp } from "@/components/breadcrumb/nav-app";
import { NavCollection } from "@/components/breadcrumb/nav-collection";
import { NavDocument } from "@/components/breadcrumb/nav-document";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function AppBreadcrumb({
  collections,
  documents,
}: {
  collections: CollectionsProps[];
  documents: DocumentsProps[];
}) {
  const params = useParams<{ collection?: string; document?: string }>();
  const collectionSlug = params.collection;
  const documentSlug = params.document;

  const collectionItems = collections.map((c) => ({
    value: c.slug,
    label: c.title,
  }));

  const documentItems = documents
    .filter((doc) => doc.collectionSlug === collectionSlug)
    .map((d) => ({
      value: d.slug,
      label: d.title,
      collectionSlug: d.collectionSlug,
    }));

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex-nowrap">
        <NavApp />

        {collectionSlug && collectionItems.length > 0 && (
          <>
            <BreadcrumbSeparator>
              <HugeiconsIcon icon={ArrowRight01Icon} />
            </BreadcrumbSeparator>
            <NavCollection
              items={collectionItems}
              currentSlug={collectionSlug}
            />
          </>
        )}

        {documentSlug && documentItems.length > 0 && (
          <>
            <BreadcrumbSeparator>
              <HugeiconsIcon icon={ArrowRight01Icon} />
            </BreadcrumbSeparator>
            <NavDocument
              items={documentItems}
              currentSlug={documentSlug}
            />
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
