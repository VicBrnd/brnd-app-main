import { notFound } from "next/navigation";

import { EditorPage } from "@/app/(app)/dashboard/[collection]/[document]/editor-page";
import { getDocumentBySlug } from "@/lib/data/documents/get-document-slug";

export default async function DocumentPage(
  props: PageProps<"/dashboard/[collection]/[document]">,
) {
  const { collection, document } = await props.params;

  const documentData = await getDocumentBySlug(collection, document);

  if (!documentData) {
    return notFound();
  }

  return <EditorPage documentData={documentData} />;
}
