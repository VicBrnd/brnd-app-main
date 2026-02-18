import Link from "next/link";
import { notFound } from "next/navigation";

import { Copy01Icon, PropertyEditIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import {
  DocsBody,
  DocsPage,
  DocsTitle,
} from "@/app/(app)/docs/[collection]/[document]/docs-page";
import { Button } from "@/components/ui/button";
import { getDocumentBySlug } from "@/lib/data/documents/get-document-slug";
import { MDXRenderer, MDXStorage } from "@/lib/mdx/mdx";

export default async function namePage(
  props: PageProps<"/docs/[collection]/[document]">,
) {
  const { collection, document } = await props.params;

  const documentData = await getDocumentBySlug(collection, document);

  if (!documentData) {
    return notFound();
  }

  const compiledMdx = MDXStorage.deserialize(documentData.compiledContent);
  if (!compiledMdx || !compiledMdx.code) notFound();

  return (
    <DocsPage>
      <DocsTitle className="text-3xl font-semibold">
        {documentData.title}
      </DocsTitle>
      <div className="flex gap-2">
        <Button variant="secondary" size="xs" disabled>
          <HugeiconsIcon icon={Copy01Icon} className="size-3" />
          Copy Markdown
        </Button>
        <Button
          nativeButton={false}
          variant="secondary"
          size="xs"
          render={
            <Link
              href={`/dashboard/${documentData.collectionSlug}/${documentData.slug}`}
            />
          }
        >
          <HugeiconsIcon icon={PropertyEditIcon} className="size-3" />
          Edit Document
        </Button>
      </div>
      <DocsBody>
        <MDXRenderer code={compiledMdx.code} />
      </DocsBody>
    </DocsPage>
  );
}
