import { notFound } from "next/navigation";

import { DocumentHeader } from "@/app/(app)/dashboard/[collection]/[document]/document-header";
import { getAuthContext } from "@/lib/auth/auth-context";
import { getDocumentBySlug } from "@/lib/data/documents/get-document-slug";

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ collection: string; document: string }>;
}) {
  const { collection, document } = await params;
  const ctx = await getAuthContext();
  const documentData = await getDocumentBySlug(
    ctx.user.id,
    collection,
    document,
  );
  if (!documentData) {
    return notFound();
  }

  return <DocumentHeader documentData={documentData} />;
}
