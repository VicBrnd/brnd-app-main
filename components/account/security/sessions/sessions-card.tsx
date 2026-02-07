import { Session } from "better-auth";

import { SessionCell } from "@/components/account/security/sessions/session-cell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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
      <CardContent className="flex flex-col gap-3">
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

export async function SessionsCardSkeleton() {
  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-5 w-17" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-5 w-78" />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Card className="flex-row items-center gap-3 px-4 py-3">
          <Skeleton className="h-6 w-6" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-5 w-27" />
            <Skeleton className="h-4 w-44" />
          </div>

          <Skeleton className="h-7 w-20 ml-auto" />
        </Card>
      </CardContent>
    </Card>
  );
}
