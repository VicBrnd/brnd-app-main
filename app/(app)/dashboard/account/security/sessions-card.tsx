import { Session } from "better-auth";

import { SessionCell } from "@/app/(app)/dashboard/account/security/session-cell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SessionsCardProps {
  listSessions: Session[];
  currentSession: string;
}

export async function SessionsCard({
  listSessions,
  currentSession,
}: SessionsCardProps) {
  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>Sessions</CardTitle>
        <CardDescription>
          Manage your active sessions and revoke access.
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        {listSessions.map((listSession) => (
          <SessionCell
            key={listSession.id}
            currentSession={currentSession}
            listSession={listSession}
          />
        ))}
      </CardContent>
    </Card>
  );
}
