"use client";

import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export function PageContent() {
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
              render={<Link href="/user" />}
            >
              <Avatar size="sm">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              Victor Brnd
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </main>
  );
}
