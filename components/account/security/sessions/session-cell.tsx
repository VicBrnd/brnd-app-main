"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import { LaptopIcon, SmartPhone01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Session } from "better-auth";
import { UAParser } from "ua-parser-js";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth/auth-client";

interface SessionCellProps {
  listSession: Session;
  currentSession: string;
}

export function SessionCell(props: SessionCellProps) {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();

  const parser = UAParser(props.listSession.userAgent || undefined);
  const isCurrentSession = props.listSession.id === props.currentSession;

  const handleSignOut = () => {
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.refresh();
          },
        },
      });
    });
  };

  const handleRevoke = async () => {
    startTransition(async () => {
      await authClient.revokeSession({
        token: props.listSession.token,
        fetchOptions: {
          onSuccess: () => {
            router.refresh();
          },
        },
      });
    });
  };

  return (
    <Card className="flex-row items-center gap-3 px-4 py-3">
      {parser.device.type === "mobile" ? (
        <HugeiconsIcon icon={SmartPhone01Icon} className="size-4" />
      ) : (
        <HugeiconsIcon icon={LaptopIcon} className="size-4" />
      )}

      <div className="flex flex-col">
        <span className="font-semibold text-sm">
          {isCurrentSession
            ? "Current Session"
            : props.listSession.ipAddress || "Unknown"}
        </span>

        <span className="text-muted-foreground text-xs">
          {parser.os.name || "Unknown OS"},{" "}
          {parser.browser.name || "Unknown Browser"}
        </span>
      </div>
      <Button
        size="sm"
        variant="outline"
        className="ml-auto"
        disabled={isLoading}
        onClick={isCurrentSession ? handleSignOut : handleRevoke}
      >
        {isLoading && <Spinner className="mr-1" />}
        {isCurrentSession ? "Sign Out" : "Revoke"}
      </Button>
    </Card>
  );
}
