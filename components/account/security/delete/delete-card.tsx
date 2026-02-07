import { DeleteDialog } from "@/components/account/security/delete/delete-dialog";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function DeleteCard() {
  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle>Delete Account</CardTitle>
        <CardDescription>
          Permanently remove your Personal Account and all of its contents from
          the Brnd platform. This action is not reversible, so please continue
          with caution.
        </CardDescription>
      </CardHeader>
      {/* <CardContent className="px-0">x</CardContent> */}
      <CardFooter>
        <DeleteDialog />
      </CardFooter>
    </Card>
  );
}
