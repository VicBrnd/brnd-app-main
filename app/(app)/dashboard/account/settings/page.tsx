import { Suspense } from "react";

import {
  AvatarCard,
  AvatarCardSkeleton,
} from "@/components/account/settings/avatar/avatar-card";
import {
  EmailCard,
  EmailCardSkeleton,
} from "@/components/account/settings/email/email-card";
import {
  NameCard,
  NameCardSkeleton,
} from "@/components/account/settings/name/name-card";
import { Page } from "@/components/layout/page-layout";
import { getAuthContext } from "@/lib/auth/auth-context";
import { getImages } from "@/lib/data/account/get-images";

export default function AccountSettingsPage() {
  return (
    <Page title="General" description="Manage your account settings">
      <Suspense fallback={<AccountSettingsSkeleton />}>
        <AccountSettingsAsync />
      </Suspense>
    </Page>
  );
}

export async function AccountSettingsAsync() {
  const [ctx, userAvatars] = await Promise.all([getAuthContext(), getImages()]);

  return (
    <>
      <AvatarCard userData={ctx.user} userAvatars={userAvatars} />
      <NameCard userData={ctx.user} />
      <EmailCard userData={ctx.user} />
    </>
  );
}

export function AccountSettingsSkeleton() {
  return (
    <>
      <AvatarCardSkeleton />
      <NameCardSkeleton />
      <EmailCardSkeleton />
    </>
  );
}
