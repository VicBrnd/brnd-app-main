import { notFound } from "next/navigation";

import { DocumentHeader } from "@/components/files/document/document-header";
import { Page } from "@/components/layout/page-layout";
import { getDocumentBySlug } from "@/lib/data/documents/get-document-slug";

export default async function DocumentPage(
  props: PageProps<"/dashboard/[collection]/[document]">,
) {
  const { collection, document } = await props.params;

  const documentData = await getDocumentBySlug(collection, document);

  if (!documentData) {
    return notFound();
  }

  return (
    <>
      <DocumentHeader documentData={documentData} />
      <Page title="Editor" description="Editor Document"></Page>
    </>
  );
}
