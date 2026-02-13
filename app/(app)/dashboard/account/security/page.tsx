import { Suspense } from "react";

import { DeleteCard } from "@/components/account/security/delete/delete-card";
import {
  SessionsCard,
  SessionsCardSkeleton,
} from "@/components/account/security/sessions/sessions-card";
import { Page } from "@/components/layout/page-layout";
import { getAuthContext } from "@/lib/auth/auth-context";
import { getSessions } from "@/lib/data/account/get-sessions";

export default function AccountSecurityPage() {
  return (
    <Page title="Security" description="Manage your account security">
      <Suspense fallback={<SessionsCardSkeleton />}>
        <AccountSecurityAsync />
      </Suspense>
      <DeleteCard />
    </Page>
  );
}

export async function AccountSecurityAsync() {
  const [ctx, listSessions] = await Promise.all([
    getAuthContext(),
    getSessions(),
  ]);

  return (
    <SessionsCard listSessions={listSessions} currentSession={ctx.session.id} />
  );
}
