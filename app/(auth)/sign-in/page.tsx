"use client";

import Link from "next/link";

import { FingerAccessIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { AuthCard } from "@/components/auth/auth-card";
import { SignInForm } from "@/components/auth/email/sign-in-form";
import { GitHubIcon, GoogleIcon } from "@/components/icons/providers-icons";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { authClient } from "@/lib/auth/auth-client";

export default function Page() {
  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
      newUserCallbackURL: "/dashboard",
      disableRedirect: false,
    });
  };

  const handleGithubSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
      newUserCallbackURL: "/dashboard",
      disableRedirect: false,
    });
  };
  return (
    <AuthCard
      title="Sign In"
      description="Use your email or a provider to continue"
    >
      <CardContent className="flex flex-col gap-4.5">
        <SignInForm />
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <div className="flex flex-col gap-2.5 sm:gap-4">
          <div className="flex flex-col gap-2.5 sm:grid sm:grid-cols-2 sm:gap-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleSignIn}
            >
              <GoogleIcon className="mr-1" />
              Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGithubSignIn}
            >
              <GitHubIcon className="mr-1" />
              Github
            </Button>
          </div>
          <Button variant="outline" className="w-full">
            <HugeiconsIcon icon={FingerAccessIcon} />
            PassKey
          </Button>
        </div>
        <div className="flex justify-center gap-1.5 text-sm text-muted-foreground ">
          Don't have an account?
          <Link
            href="/sign-up"
            className="underline text-primary underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </CardContent>
    </AuthCard>
  );
}
