import { notFound } from "next/navigation";

import { EditorPage } from "@/components/editor/editor-page";
import { getDocumentBySlug } from "@/lib/data/documents/get-document-slug";

export default async function DocumentPage(
  props: PageProps<"/dashboard/[collection]/[document]">,
) {
  const { collection, document } = await props.params;

  const documentBySlugData = await getDocumentBySlug(collection, document);

  if (!documentBySlugData) {
    return notFound();
  }

  return <EditorPage documentBySlugData={documentBySlugData} />;
}
