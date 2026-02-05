import { Suspense } from "react";

import { AvatarCard } from "@/components/account/settings/avatar/avatar-card";
import { EmailCard } from "@/components/account/settings/email/email-card";
import { NameCard } from "@/components/account/settings/name/name-card";
import { Page } from "@/components/page-layout";
import { getAuthContext } from "@/lib/auth/auth-context";

export default function AccountSettingsPage() {
  return (
    <Page title="General" description="Manage your account settings">
      <Suspense>
        <AvatarCard />
        <CardAsync />
      </Suspense>
    </Page>
  );
}

export async function CardAsync() {
  const ctx = await getAuthContext();
  return (
    <>
      <NameCard user={ctx.user} />
      <EmailCard user={ctx.user} />
    </>
  );
}
