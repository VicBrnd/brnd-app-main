import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound({ className }: React.ComponentProps<"div">) {
  return (
    <main
      className={cn(
        "flex h-full flex-col items-center justify-center gap-4 bg-background p-6 px-4 md:p-10",
        className,
      )}
    >
      <div className="space-y-3 text-center">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          404
        </code>
        <div className="space-y-1">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Page not found
          </h1>
          <p className="text-base text-muted-foreground">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/dashboard" />}
        >
          Go back home
        </Button>
      </div>
    </main>
  );
}
