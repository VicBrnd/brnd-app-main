import { Suspense } from "react";

import {
  SessionsCard,
  SessionsCardSkeleton,
} from "@/components/account/security/sessions/sessions-card";
import { Page } from "@/components/page-layout";
import { getAuthContext } from "@/lib/auth/auth-context";
import { getSessions } from "@/lib/data/account/get-sessions";

export default function AccountSecurityPage() {
  return (
    <Page title="Security" description="Manage your account security">
      <Suspense fallback={<SessionsCardSkeleton />}>
        <AccountSecurityAsync />
      </Suspense>
    </Page>
  );
}

export async function AccountSecurityAsync() {
  const [ctx, sessions] = await Promise.all([getAuthContext(), getSessions()]);

  return (
    <>
      <SessionsCard listSessions={sessions} currentSession={ctx.session.id} />
    </>
  );
}
