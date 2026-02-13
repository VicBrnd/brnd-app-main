"use client";

import { useState } from "react";

import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { CreateCollectionStep } from "@/components/files/create/create-collection-step";
import { CreateDocumentStep } from "@/components/files/create/create-document-step";
import { SelectFilesStep } from "@/components/files/create/select-files-step";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CollectionsProps } from "@/lib/data/collections/get-collections";

export type OptionType = "collection" | "document";

interface AppFilesDialogProps {
  collectionsData: CollectionsProps[];
  collectionId?: CollectionsProps["id"];
}

export function AppFilesDialog(props: AppFilesDialogProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentOption, setOption] = useState<OptionType | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentOption && currentStep < 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleOpenDialog = (open: boolean) => {
    setOpenDialog(open);
    if (open) {
      setOption(null);
      setCurrentStep(0);
    }
    if (props.collectionId) {
      setOption("document");
      setCurrentStep(1);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={handleOpenDialog}>
      <DialogTrigger
        render={
          <Button
            size="icon"
            className="size-8 group-data-[collapsible=icon]:opacity-0"
            variant="outline"
          />
        }
      >
        <HugeiconsIcon icon={Add01Icon} strokeWidth={2} />
        <span className="sr-only">Quick Create</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {currentStep === 0 && (
          <SelectFilesStep
            currentOption={currentOption}
            onOptionChange={setOption}
            onNext={nextStep}
          />
        )}
        {currentStep === 1 && currentOption === "collection" && (
          <CreateCollectionStep
            onBack={() => setCurrentStep(0)}
            onClose={() => setOpenDialog(false)}
          />
        )}
        {currentStep === 1 && currentOption === "document" && (
          <>
            <CreateDocumentStep
              collectionsData={props.collectionsData}
              collectionId={props.collectionId}
              onBack={() => setCurrentStep(0)}
              onClose={() => setOpenDialog(false)}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
