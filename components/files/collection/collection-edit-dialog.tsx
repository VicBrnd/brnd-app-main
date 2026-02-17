"use client";

import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { goeyToast } from "goey-toast";
import * as z from "zod";

import { editCollection } from "@/actions/files/collection/edit-collection.action";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ui/coss-ui/color-picker";
import {
  Dialog,
  DialogClose,
  DialogContent,
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
import { CollectionsProps } from "@/lib/data/collections/get-collections";
import { EditCollectionFormSchema } from "@/schemas/files/collection/edit-collection.schema";

interface CollectionEditDialogProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  collection: CollectionsProps;
}

export function CollectionEditDialog(props: CollectionEditDialogProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof EditCollectionFormSchema>>({
    resolver: zodResolver(EditCollectionFormSchema),
    defaultValues: {
      id: props.collection.id,
      title: props.collection.title,
      slug: props.collection.slug,
      color: props.collection.color,
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

  function onSubmit(data: z.infer<typeof EditCollectionFormSchema>) {
    startTransition(() => {
      goeyToast.promise(
        (async () => {
          const result = await editCollection(data);
          if (result?.data?.error) throw new Error(result.data.error);
          return result.data;
        })(),
        {
          loading: "Updating collection...",
          success: () => {
            props.setDialogOpen(false);
            return "Collection updated successfully";
          },
          error: (err) =>
            err instanceof Error ? err.message : "Updating collection failed",
        },
      );
    });
  }

  return (
    <Dialog onOpenChange={props.setDialogOpen} open={props.dialogOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Collection</DialogTitle>
          <DialogDescription>
            Group and organize related documents
          </DialogDescription>
        </DialogHeader>
        <form
          id="form-edit-collection"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-edit-collection-title">
                    Title <span className="text-destructive -ml-1.5">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-edit-collection-title"
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
                  <FieldLabel htmlFor="form-edit-collection-slug">
                    Slug <span className="text-destructive -ml-1.5">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-edit-collection-slug"
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
            <Controller
              name="color"
              control={form.control}
              render={({ fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-edit-collection-color">
                    Color <span className="text-destructive -ml-1.5">*</span>
                  </FieldLabel>
                  <ColorPicker
                    color={props.collection.color}
                    onChange={(newColor) => {
                      form.setValue("color", newColor);
                    }}
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
          <DialogClose
            render={
              <Button variant="outline-destructive" size="sm">
                Cancel
              </Button>
            }
          />
          <Button
            variant="outline"
            size="sm"
            type="submit"
            form="form-edit-collection"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
