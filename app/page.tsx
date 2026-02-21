import { Suspense } from "react";

import NextImage from "next/image";
import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { getSession } from "@/lib/data/account/get-session";

export default function Page() {
  return (
    <main className="flex min-h-full flex-col items-center justify-center px-4 py-12">
      <div className="flex w-full max-w-4xl flex-col items-center gap-3">
        <div className="text-center">
          <h1 className="text-5xl font-normal tracking-tighter text-spektr-cyan-50 md:text-7xl">
            Brnd <span className="font-mono">Write</span>.
          </h1>
          <p className="text-lg leading-relaxed tracking-tight text-muted-foreground md:text-xl">
            Keep your best ideas safe <span className="font-mono">forever</span>
            .
          </p>
        </div>
        <div>
          <Suspense>
            <HomeButton />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

export async function HomeButton() {
  const ctx = await getSession();

  if (ctx?.session) {
    return (
      <ButtonGroup>
        <Button
          variant="outline"
          size="lg"
          nativeButton={false}
          render={<Link href="/docs" />}
        >
          Documentation
        </Button>
        <Button
          variant="outline"
          size="lg"
          nativeButton={false}
          render={<Link href="/dashboard" />}
        >
          Dashboard
        </Button>
        <Button
          variant="outline"
          size="lg"
          nativeButton={false}
          render={<Link href="/dashboard/account/settings" />}
        >
          <Avatar className="rounded-full overflow-hidden" size="sm">
            {ctx.user.image && (
              <NextImage
                src={ctx.user.image}
                alt={ctx.user.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                priority
                loading="eager"
              />
            )}
            <AvatarFallback className="rounded-lg">
              {ctx.user.name?.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          {ctx.user.name}
        </Button>
      </ButtonGroup>
    );
  }
  return (
    <ButtonGroup>
      <Button
        variant="outline"
        size="lg"
        nativeButton={false}
        render={<Link href="/docs" />}
      >
        Documentation
      </Button>
      <Button
        variant="outline"
        size="lg"
        nativeButton={false}
        render={<Link href="/sign-in" />}
      >
        Sign-in
      </Button>
    </ButtonGroup>
  );
}
