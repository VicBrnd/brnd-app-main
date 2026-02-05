import { Suspense } from "react";

import { Page } from "@/app/(app)/dashboard/account/page-layout";
import { AvatarDialog } from "@/components/account/settings/avatar/avatar-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthContext } from "@/lib/auth/auth-context";
import { getImages } from "@/lib/data/account/get-images";

export default function AccountSettingsPage() {
  return (
    <Page title="General" description="Manage your account settings">
      <Card className="bg-background pb-0 py-0 gap-0 overflow-auto">
        <div className="flex gap-0 flex-row justify-between p-6">
          <CardHeader className="flex-1 px-0">
            <CardTitle className="text-xl">Avatar</CardTitle>
            <CardDescription>
              This is your avatar. <br />
              Click on the avatar to upload a custom one from your files.
            </CardDescription>
          </CardHeader>
          <div className="flex items-start justify-center md:justify-start gap-2">
            <CardContent className="px-0">
              <Suspense>
                <AvatarDialogAsync />
              </Suspense>
            </CardContent>
          </div>
        </div>
        <CardFooter className="flex h-auto justify-between rounded-b-xl bg-gray-100 p-0 px-8 py-4 dark:bg-sidebar">
          <CardDescription>
            An avatar is optional but strongly recommended.
          </CardDescription>
        </CardFooter>
      </Card>
    </Page>
  );
}

export async function AvatarDialogAsync() {
  const ctx = await getAuthContext();
  const userImages = await getImages(ctx.user.id);

  return <AvatarDialog user={ctx.user} userImages={userImages} />;
}
