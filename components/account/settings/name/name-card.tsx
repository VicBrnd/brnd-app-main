"use client";

import { useTransition } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "better-auth";
import { toast } from "sonner";

import { updateUser } from "@/actions/account/update-user.action";
import { Input } from "@/components/ui/brnd-ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth/auth-client";
import {
  UpdateUserSchema,
  updateUserSchema,
} from "@/schemas/account/update-user.schema";

interface NameCardProps {
  userData: User;
}

export function NameCard(props: NameCardProps) {
  const [isLoading, startTransition] = useTransition();

  const { data, isPending, refetch } = authClient.useSession();
  const user = data?.user || props.userData;

  const methods = useForm({
    resolver: zodResolver(updateUserSchema),
    mode: "onChange",
    defaultValues: {
      name: user?.name || "",
    },
  });

  const onSubmit: SubmitHandler<UpdateUserSchema> = (values) => {
    if (values.name === user?.name) {
      toast.info("No changes detected");
      return;
    }
    startTransition(async () => {
      toast.promise(updateUser({ name: values.name }), {
        loading: "Saving your changes...",
        success: () => {
          methods.reset(values);
          refetch();
          return "Changes saved successfully";
        },
        error: (error) => {
          console.error("Save error:", error);
          return "Unable to save your changes. Please try again";
        },
      });
    });
  };

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={methods.control}
          render={({ field, fieldState }) => (
            <Card className="bg-background">
              <CardHeader>
                <CardTitle>
                  Display Name <span className="text-destructive">*</span>
                </CardTitle>
                <CardDescription>
                  Please enter your full name or a display name you are
                  comfortable with
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Input
                    fieldState={fieldState}
                    isLoading={isLoading || isPending}
                    submitButton={true}
                    {...field}
                  />
                </FieldGroup>
              </CardContent>
              <CardFooter>
                <span className="text-muted-foreground text-sm">
                  {fieldState?.error
                    ? fieldState.error.message
                    : "Please use 32 characters at maximum."}
                </span>
              </CardFooter>
            </Card>
          )}
        />
      </FieldGroup>
    </form>
  );
}

export function NameCardSkeleton() {
  return (
    <Card className="bg-background">
      <CardHeader className="flex-1">
        <CardTitle>
          <Skeleton className="h-5 w-28" />
        </CardTitle>
        <CardDescription className="flex flex-col gap-1">
          <Skeleton className="h-5 max-w-114" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-9.5 max-w-full" />
      </CardContent>

      <CardFooter>
        <Skeleton className="h-5 w-62" />
      </CardFooter>
    </Card>
  );
}
