"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as z from "zod";

import { NewCollectionAction } from "@/actions/new-collection.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { NewCollectionFormSchema } from "@/schemas/new-collection.schema";

export default function Page() {
  const [isLoading, startTransition] = React.useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof NewCollectionFormSchema>>({
    resolver: zodResolver(NewCollectionFormSchema),
    defaultValues: {
      title: "",
      slug: "",
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    form.setValue("title", value);
    form.setValue(
      "slug",
      value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\da-z-]/g, ""),
    );
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    form.setValue(
      "slug",
      value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\da-z-]/g, ""),
    );
  };

  async function onSubmit(data: z.infer<typeof NewCollectionFormSchema>) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("slug", data.slug);
    startTransition(() => {
      toast.promise(
        async () => {
          const result = await NewCollectionAction(formData);

          if (!result.success) {
            throw new Error(result.error || "Erreur inconnue");
          }
          return result;
        },
        {
          loading: "Create collection...",
          success: (result) => {
            router.push(`/dashboard/${result.collection.slug}`);
            return "Collection created successfully";
          },
          error: (err) => `${err.message}`,
        },
      );
    });
  }

  return (
    <Card>
      <CardContent>
        <form
          id="form-new-collection"
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-new-collection-title">
                    Title <span className="text-destructive -ml-1.5">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-new-collection-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Collection Title"
                    autoComplete="off"
                    onChange={handleTitleChange}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="slug"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-new-collection-slug">
                    Slug <span className="text-destructive -ml-1.5">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-new-collection-slug"
                    aria-invalid={fieldState.invalid}
                    placeholder="collection-slug"
                    autoComplete="off"
                    onChange={handleSlugChange}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="justify-end">
        <Button disabled={isLoading} type="submit" form="form-new-collection">
          {isLoading && <Spinner />}
          Create Collection
        </Button>
      </CardFooter>
    </Card>
  );
}
