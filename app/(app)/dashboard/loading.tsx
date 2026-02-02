// app/(app)/dashboard/loading.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>
            Bienvenue, <Skeleton className="h-4 w-32 inline-block" /> 👋
          </CardTitle>
          <CardDescription>
            Vous êtes connecté avec l&apos;email :{" "}
            <Skeleton className="h-4 w-48 inline-block" />
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Informations de session</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32 mt-1" />
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
