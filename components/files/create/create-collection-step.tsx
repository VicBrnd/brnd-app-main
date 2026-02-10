"use client";

import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as z from "zod";

import { createCollection } from "@/actions/files/collection/create-collection.action";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { CreateCollectionFormSchema } from "@/schemas/files/collection/create-collection.schema";

interface CreateCollectionStepProps {
  onBack: () => void;
  onClose: () => void;
}

export function CreateCollectionStep({
  onBack,
  onClose,
}: CreateCollectionStepProps) {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateCollectionFormSchema>>({
    resolver: zodResolver(CreateCollectionFormSchema),
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

  function onSubmit(data: z.infer<typeof CreateCollectionFormSchema>) {
    startTransition(() => {
      toast.promise(
        async () => {
          const result = await createCollection(data);
          if (result?.serverError) {
            throw new Error(result.serverError);
          }
          if (result?.data?.error) {
            throw new Error(result.data.error);
          }
          if (!result?.data?.success) {
            throw new Error("Erreur inconnue");
          }
          return result.data;
        },
        {
          loading: "Creating collection...",
          success: (result) => {
            onClose();
            router.push(`/dashboard/${result.collection.slug}`);
            return "Collection created successfully";
          },
          error: (err) => `${err.message}`,
        },
      );
    });
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Create Collection</DialogTitle>
        <DialogDescription>
          Group and organize related documents
        </DialogDescription>
      </DialogHeader>
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
      <DialogFooter>
        <Button variant="outline-destructive" size="sm" onClick={onBack}>
          Back
        </Button>
        <Button
          variant="outline"
          size="sm"
          type="submit"
          form="form-new-collection"
          disabled={isLoading}
        >
          {isLoading && <Spinner className="mr-1" />}
          Create Collection
        </Button>
      </DialogFooter>
    </>
  );
}
