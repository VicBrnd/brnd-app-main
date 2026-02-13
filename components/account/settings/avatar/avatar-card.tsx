import { User } from "better-auth";

import { AvatarDialog } from "@/components/account/settings/avatar/avatar-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AvatarsProps } from "@/lib/data/account/get-images";

interface AvatarCardProps {
  userData: User;
  userAvatars: AvatarsProps[];
}

export function AvatarCard(props: AvatarCardProps) {
  return (
    <Card className="bg-background">
      <div className="flex items-center">
        <CardHeader className="flex-1">
          <CardTitle>Avatar</CardTitle>
          <CardDescription>
            This is your avatar <br />
            Click on the avatar to upload a custom one from your files
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AvatarDialog
            userData={props.userData}
            userAvatars={props.userAvatars}
          />
        </CardContent>
      </div>
      <CardFooter>
        <span className="text-muted-foreground text-sm">
          An avatar is optional but strongly recommended
        </span>
      </CardFooter>
    </Card>
  );
}

export function AvatarCardSkeleton() {
  return (
    <Card className="bg-background">
      <div className="flex items-center gap-4">
        <CardHeader className="flex-1">
          <CardTitle>
            <Skeleton className="h-5 w-12" />
          </CardTitle>
          <CardDescription className="flex flex-col gap-1">
            <Skeleton className="h-5 max-w-29" />
            <Skeleton className="h-5 max-w-92" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="size-20 rounded-full" />
        </CardContent>
      </div>
      <CardFooter>
        <Skeleton className="h-5 w-76" />
      </CardFooter>
    </Card>
  );
}
