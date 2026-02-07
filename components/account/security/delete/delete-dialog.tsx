"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth/auth-client";

export function DeleteDialog() {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      authClient.deleteUser({
        fetchOptions: {
          onSuccess: () => {
            router.refresh();
          },
        },
      });
    });
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="outline-destructive" size="sm" className="ml-auto" />
        }
      >
        Delete Account
      </DialogTrigger>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            You are about to permanently delete your account. All your
            collections, documents, and associated data will be removed.
            <br />
            <br />
            You will have a 30-day recovery period during which you can restore
            your account by signing back in. After this period, all data will be
            permanently and irreversibly deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex">
          <DialogClose render={<Button variant="outline" size="sm" />}>
            Cancel
          </DialogClose>
          <Button
            variant="outline-destructive"
            size="sm"
            onClick={handleDelete}
            disabled={isLoading}
          >
            Delete Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
