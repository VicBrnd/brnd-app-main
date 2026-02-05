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
import { authClient } from "@/lib/auth/auth-client";
import {
  UpdateUserSchema,
  updateUserSchema,
} from "@/schemas/account/update-user.schema";

export function NameCard(props: { user: User }) {
  const [isLoading, startTransition] = useTransition();

  const { data, isPending, refetch } = authClient.useSession();
  const user = data?.user || props.user;

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
            <Card className="bg-background pb-0 py-0 gap-0 overflow-auto">
              <div className="flex gap-0 flex-col justify-between p-6 space-y-4.5">
                <CardHeader className="flex-1 px-0">
                  <CardTitle className="text-xl">
                    Display Name <span className="text-destructive">*</span>
                  </CardTitle>
                  <CardDescription>
                    Please enter your full name or a display name you are
                    comfortable with.
                  </CardDescription>
                </CardHeader>
                <div className="flex items-start justify-center md:justify-start gap-2">
                  <CardContent className="px-0 w-full">
                    <FieldGroup>
                      <Input
                        fieldState={fieldState}
                        isLoading={isLoading || isPending}
                        submitButton={true}
                        {...field}
                      />
                    </FieldGroup>
                  </CardContent>
                </div>
              </div>
              <CardFooter className="flex h-auto justify-between rounded-b-xl bg-gray-100 p-0 px-8 py-4 dark:bg-sidebar">
                <CardDescription>
                  {fieldState?.error ? (
                    <span>{fieldState.error.message}</span>
                  ) : (
                    <p>Please use 32 characters at maximum.</p>
                  )}
                </CardDescription>
              </CardFooter>
            </Card>
          )}
        />
      </FieldGroup>
    </form>
  );
}
