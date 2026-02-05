"use client";

import { AtIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { User } from "better-auth";

import { Input } from "@/components/ui/brnd-ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth/auth-client";

export function EmailCard(props: { user: User }) {
  const { data } = authClient.useSession();
  const user = data?.user || props.user;

  return (
    <Card className="bg-background pb-0 py-0 gap-0 overflow-auto">
      <div className="flex gap-0 flex-col justify-between p-6 space-y-4.5">
        <CardHeader className="flex-1 px-0">
          <CardTitle className="text-xl">
            Email <span className="text-destructive">*</span>
          </CardTitle>
          <CardDescription>
            Enter the email addresses you want to use to log in with Brnd. Your
            primary email will be used for account-related notifications.
          </CardDescription>
        </CardHeader>
        <div className="flex items-start justify-center md:justify-start gap-2">
          <CardContent className="px-0 w-full">
            <Input
              startAdornment={
                <HugeiconsIcon icon={AtIcon} size={16} strokeWidth={2} />
              }
              value={user.email || ""}
              disabled
            />
          </CardContent>
        </div>
      </div>
      <CardFooter className="flex h-auto justify-between rounded-b-xl bg-gray-100 p-0 px-8 py-4 dark:bg-sidebar">
        <CardDescription>
          Emails must be verified to be able to login with them or be used as
          primary email.
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
