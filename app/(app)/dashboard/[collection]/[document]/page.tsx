import { notFound } from "next/navigation";

import { DocumentHeader } from "@/components/files/document/document-header";
import { getDocumentBySlug } from "@/lib/data/documents/get-document-slug";

export default async function DocumentPage(
  props: PageProps<"/dashboard/[collection]/[document]">,
) {
  const { collection, document } = await props.params;

  const documentData = await getDocumentBySlug(collection, document);

  if (!documentData) {
    return notFound();
  }

  return <DocumentHeader documentData={documentData} />;
}
