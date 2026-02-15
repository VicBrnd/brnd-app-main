"use client";

import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { FingerAccessIcon, Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { goeyToast } from "goey-toast";
import * as z from "zod";

import { AuthCard } from "@/components/auth/auth-card";
import { GitHubIcon, GoogleIcon } from "@/components/icons/providers-icons";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth/auth-client";

type Provider = "email" | "google" | "github";

const socialProviders = [
  { id: "google" as const, label: "Google", icon: GoogleIcon },
  { id: "github" as const, label: "Github", icon: GitHubIcon },
];

const formSchema = z.object({
  email: z
    .email({ message: "Invalid email address" })
    .max(255, "Email Field must be at most 255 characters"),
});

export default function Page() {
  const [isLoading, startTransition] = useTransition();
  const [provider, setProvider] = useState<Provider | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    setProvider("email");
    startTransition(async () => {
      await authClient.signIn.magicLink({
        email: data.email,
        fetchOptions: {
          onSuccess: () => {
            goeyToast.success("Check your inbox", {
              description: `A sign-in link has been sent to ${data.email}`,
            });
          },
          onError: (error) => {
            goeyToast.error(error.error.message);
          },
        },
      });
    });
  }

  const handleSocialSignIn = (provider: Provider) => {
    setProvider(provider);
    startTransition(async () => {
      await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
        errorCallbackURL: "/error",
        newUserCallbackURL: "/dashboard",
      });
    });
  };

  return (
    <AuthCard
      title="Sign In"
      description="Use your email or a provider to continue"
    >
      <CardContent className="flex flex-col gap-4.5">
        <form id="form-sign-in" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-2.5 sm:gap-4">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-sign-in-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="form-sign-in-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="m@example.com"
                    autoComplete="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button
              variant="outline"
              type="submit"
              form="form-sign-in"
              disabled={isLoading}
            >
              {isLoading && provider === "email" ? (
                <Spinner />
              ) : (
                <HugeiconsIcon icon={Mail01Icon} />
              )}
              Continue with email
            </Button>
          </FieldGroup>
        </form>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <div className="flex flex-col gap-2.5 sm:gap-4">
          <div className="flex flex-col gap-2.5 sm:grid sm:grid-cols-2 sm:gap-4">
            {socialProviders.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant="outline"
                className="w-full"
                onClick={() => handleSocialSignIn(id)}
                disabled={isLoading}
              >
                {isLoading && provider === id ? <Spinner /> : <Icon />}
                {label}
              </Button>
            ))}
          </div>
          <Button variant="outline" className="w-full" disabled={isLoading}>
            <HugeiconsIcon icon={FingerAccessIcon} />
            PassKey
          </Button>
        </div>
        <div className="flex justify-center gap-1.5 text-sm text-muted-foreground">
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
