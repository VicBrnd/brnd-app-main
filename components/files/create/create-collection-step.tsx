"use client";

import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { goeyToast } from "goey-toast";
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
import { resolveActionResult } from "@/lib/safe-action/resolve-action";
import { slugify } from "@/lib/utils";
import { CreateCollectionFormSchema } from "@/schemas/files/collection/create-collection.schema";

interface CreateCollectionStepProps {
  onBack: () => void;
  onClose: () => void;
}

export function CreateCollectionStep(props: CreateCollectionStepProps) {
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
    form.setValue("title", e.target.value);
    form.setValue("slug", slugify(e.target.value));
  };

  function onSubmit(data: z.infer<typeof CreateCollectionFormSchema>) {
    startTransition(async () => {
      goeyToast.promise(resolveActionResult(createCollection(data)), {
        loading: "Creating collection...",
        success: (result) => {
          props.onClose();
          router.push(`/dashboard/${result.collection.slug}`);
          return "Collection created successfully";
        },
        error: (err: unknown) =>
          err instanceof Error ? err.message : "Failed to create collection",
      });
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
                  disabled
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
        <Button variant="outline-destructive" size="sm" onClick={props.onBack}>
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
          Create collection
        </Button>
      </DialogFooter>
    </>
  );
}
