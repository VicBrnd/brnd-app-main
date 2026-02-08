"use client";

import { useState } from "react";

import { useAction } from "next-safe-action/hooks";

import { getCollectionsAction } from "@/actions/files/collection/get-collections.action";
import { CreateCollectionStep } from "@/components/files/create/create-collection-step";
import { CreateDocumentStep } from "@/components/files/create/create-document-step";
import { SelectFilesStep } from "@/components/files/create/select-files-step";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CollectionsProps } from "@/lib/data/collections/get-collections";

export type OptionType = "collection" | "document";

interface AppFilesDialogProps {
  children?: React.ReactNode;
  collectionId?: CollectionsProps["id"];
}

export function AppFilesDialog({
  children,
  collectionId,
}: AppFilesDialogProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentOption, setOption] = useState<OptionType | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const { execute, result, isPending } = useAction(getCollectionsAction);
  const collectionsData = result.data ?? [];

  const nextStep = () => {
    if (currentOption && currentStep < 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleOpenDialog = (open: boolean) => {
    setOpenDialog(open);
    if (open) {
      execute();
      setOption(null);
      setCurrentStep(0);
    }
    if (collectionId) {
      setOption("document");
      setCurrentStep(1);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={handleOpenDialog}>
      {children}
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
          <CreateDocumentStep
            collectionsData={collectionsData}
            isLoadingCollections={isPending}
            collectionId={collectionId}
            onBack={() => setCurrentStep(0)}
            onClose={() => setOpenDialog(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
