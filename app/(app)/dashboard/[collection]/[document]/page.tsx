import { notFound } from "next/navigation";

import DocumentHeader from "@/app/(app)/dashboard/[collection]/[document]/document-header";
import { getDocumentBySlug } from "@/lib/data/get-document-slug";

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ collection: string; document: string }>;
}) {
  const { collection, document } = await params;
  const documentData = await getDocumentBySlug(collection, document);

  if (!documentData) {
    return notFound();
  }

  return (
    <div>
      <DocumentHeader documentData={documentData} />
    </div>
  );
}
