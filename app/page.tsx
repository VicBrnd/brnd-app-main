import type { Metadata } from "next";

import { PageContent } from "@/app/page-content";

export const metadata: Metadata = {
  title: "Brnd Write — Keep your best ideas safe forever",
  description:
    "Create, organize, and manage your documents with Brnd Write. Keep your best ideas safe forever.",
};

export default function Page() {
  return <PageContent />;
}
