import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { goeyToast } from "goey-toast";
import * as z from "zod";

import { createDocument } from "@/actions/files/document/create-document.action";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { CollectionsProps } from "@/lib/data/collections/get-collections";
import { resolveActionResult } from "@/lib/safe-action/resolve-action";
import { slugify } from "@/lib/utils";
import { CreateDocumentFormSchema } from "@/schemas/files/document/create-document.schema";

interface CreateDocumentStepProps {
  collectionsData: CollectionsProps[];
  isLoadingCollections?: boolean;
  collectionId?: string;
  onBack: () => void;
  onClose: () => void;
}

export function CreateDocumentStep(props: CreateDocumentStepProps) {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateDocumentFormSchema>>({
    resolver: zodResolver(CreateDocumentFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      collection: props.collectionId ?? "",
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue("title", e.target.value);
    form.setValue("slug", slugify(e.target.value));
  };

  function onSubmit(data: z.infer<typeof CreateDocumentFormSchema>) {
    startTransition(async () => {
      goeyToast.promise(resolveActionResult(createDocument(data)), {
        loading: "Creating document...",
        success: (result) => {
          props.onClose();
          router.push(
            `/dashboard/${result.collection.slug}/${result.document.slug}`,
          );
          return "Document created successfully";
        },
        error: (err: unknown) =>
          err instanceof Error ? err.message : "Failed to create document",
      });
    });
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Create Document</DialogTitle>
        <DialogDescription>
          Write content within an existing collection
        </DialogDescription>
      </DialogHeader>
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
                  disabled
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
                  onValueChange={field.onChange}
                  disabled={props.isLoadingCollections}
                  aria-invalid={fieldState.invalid}
                  items={props.collectionsData.map((c) => ({
                    value: c.id,
                    label: c.title,
                  }))}
                >
                  <SelectTrigger aria-invalid={fieldState.invalid}>
                    {props.isLoadingCollections ? (
                      <Skeleton className="w-full h-4" />
                    ) : (
                      <SelectValue placeholder="Select a collection" />
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Collections</SelectLabel>
                      {props.collectionsData.map((collection) => (
                        <SelectItem key={collection.id} value={collection.id}>
                          {collection.title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
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
      <DialogFooter>
        <Button variant="outline-destructive" size="sm" onClick={props.onBack}>
          Back
        </Button>
        <Button
          variant="outline"
          size="sm"
          type="submit"
          form="form-new-document"
          disabled={isLoading}
        >
          {isLoading && <Spinner />}
          Create document
        </Button>
      </DialogFooter>
    </>
  );
}
