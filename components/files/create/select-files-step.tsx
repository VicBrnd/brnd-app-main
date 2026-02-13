"use client";

import { type OptionType } from "@/components/files/create/app-files-dialog";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface SelectFilesStepProps {
  currentOption: OptionType | null;
  onOptionChange: (value: OptionType) => void;
  onNext: () => void;
}

export function SelectFilesStep(props: SelectFilesStepProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Quick Create</DialogTitle>
        <DialogDescription>Choose what you want to create</DialogDescription>
      </DialogHeader>
      <RadioGroup
        value={props.currentOption}
        onValueChange={props.onOptionChange}
        className="max-w-full"
      >
        <FieldLabel htmlFor="create-collection">
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>Collection</FieldTitle>
              <FieldDescription>
                Group and organize related documents
              </FieldDescription>
            </FieldContent>
            <RadioGroupItem value="collection" id="create-collection" />
          </Field>
        </FieldLabel>
        <FieldLabel htmlFor="create-document">
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>Document</FieldTitle>
              <FieldDescription>
                Write content within an existing collection
              </FieldDescription>
            </FieldContent>
            <RadioGroupItem value="document" id="create-document" />
          </Field>
        </FieldLabel>
      </RadioGroup>
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
          onClick={props.onNext}
          disabled={!props.currentOption}
        >
          Continue
        </Button>
      </DialogFooter>
    </>
  );
}
