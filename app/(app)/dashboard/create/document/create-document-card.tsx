"use client";

import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { parseAsString, useQueryState } from "nuqs";
import { toast } from "sonner";
import * as z from "zod";

import { createDocument } from "@/actions/files/create-document.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { CollectionsProps } from "@/lib/data/collections/get-collections";
import { CreateDocumentFormSchema } from "@/schemas/files/create-document.schema";

interface CreateDocumentCardProps {
  collectionsData: CollectionsProps[];
}

export function CreateDocumentCard({
  collectionsData,
}: CreateDocumentCardProps) {
  const [isLoading, startTransition] = useTransition();
  const [collectionId, setCollectionId] = useQueryState(
    "collectionId",
    parseAsString.withDefault(""),
  );
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateDocumentFormSchema>>({
    resolver: zodResolver(CreateDocumentFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      collection: collectionId,
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

  function onSubmit(data: z.infer<typeof CreateDocumentFormSchema>) {
    startTransition(() => {
      toast.promise(
        async () => {
          const result = await createDocument(data);

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
          loading: "Creating document...",
          success: (result) => {
            form.reset();
            router.push(`/dashboard/${result.collectionSlug}`);
            return "Document created successfully";
          },
          error: (err) => `${err.message}`,
        },
      );
    });
  }

  return (
    <Card className="bg-background">
      <CardContent>
        <form
          id="form-new-document"
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-new-document-title">
                    Title <span className="text-destructive -ml-1.5">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-new-document-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Document Title"
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
                  <FieldLabel htmlFor="form-new-document-slug">
                    Slug <span className="text-destructive -ml-1.5">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-new-document-slug"
                    aria-invalid={fieldState.invalid}
                    placeholder="document-slug"
                    autoComplete="off"
                    onChange={handleSlugChange}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="collection"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-new-document-collection">
                    Collection
                    <span className="text-destructive -ml-1.5">*</span>
                  </FieldLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setCollectionId(value);
                    }}
                    aria-invalid={fieldState.invalid}
                    items={collectionsData.map((c) => ({
                      value: c.id,
                      label: c.title,
                    }))}
                  >
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Select a collection" />
                    </SelectTrigger>
                    <SelectContent>
                      {collectionsData.map((collection) => (
                        <SelectItem key={collection.id} value={collection.id}>
                          {collection.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
        <Button
          variant="outline"
          size="sm"
          type="submit"
          form="form-new-document"
          disabled={isLoading}
        >
          {isLoading && <Spinner />}
          Create Document
        </Button>
      </CardFooter>
    </Card>
  );
}

export function CreateDocumentSkeleton() {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-9 w-full rounded-lg" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-9 w-full rounded-lg" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-9 w-full rounded-lg" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end">
        <Skeleton className="h-7 w-36 rounded-lg" />
      </CardFooter>
    </Card>
  );
}
