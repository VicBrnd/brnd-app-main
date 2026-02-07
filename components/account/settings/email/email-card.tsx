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
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth/auth-client";

export function EmailCard(props: { user: User }) {
  const { data } = authClient.useSession();
  const user = data?.user || props.user;

  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>
          Email <span className="text-destructive">*</span>
        </CardTitle>
        <CardDescription>
          Enter the email addresses you want to use to log in with Brnd. Your
          primary email will be used for account-related notifications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          startAdornment={
            <HugeiconsIcon icon={AtIcon} size={16} strokeWidth={2} />
          }
          value={user.email || ""}
          disabled
        />
      </CardContent>
      <CardFooter>
        <span className="text-muted-foreground text-sm">
          Emails must be verified to be able to login with them or be used as
          primary email.
        </span>
      </CardFooter>
    </Card>
  );
}

export function EmailCardSkeleton() {
  return (
    <Card className="bg-background">
      <CardHeader className="flex-1">
        <CardTitle>
          <Skeleton className="h-5 w-12" />
        </CardTitle>
        <CardDescription className="flex flex-col gap-1">
          <Skeleton className="h-5 max-w-202" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-9.5 max-w-full" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-5 w-130" />
      </CardFooter>
    </Card>
  );
}
