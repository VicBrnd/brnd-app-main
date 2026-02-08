import { Page } from "@/components/page-layout";
import { getAuthContext } from "@/lib/auth/auth-context";

export default async function TrashPage() {
  await getAuthContext();

  return <Page title="Trash" description="Trash Page"></Page>;
}
