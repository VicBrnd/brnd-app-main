import { Suspense } from "react";

import { SessionsCard } from "@/app/(app)/dashboard/account/security/sessions-card";
import { Page } from "@/components/page-layout";
import { getAuthContext } from "@/lib/auth/auth-context";
import { getSessions } from "@/lib/data/account/get-sessions";

export default function AccountSecurityPage() {
  return (
    <Page title="Security" description="Manage your account security">
      <Suspense fallback={<div>Loading...</div>}>
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
