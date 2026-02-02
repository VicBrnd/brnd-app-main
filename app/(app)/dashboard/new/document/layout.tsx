import { NewDocumentnHeader } from "@/app/(app)/dashboard/new/document/new-document-header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col gap-4 md:gap-6 h-full">
      <NewDocumentnHeader />
      <div className="flex h-full justify-center">
        <div className="w-full max-w-3xl">{children}</div>
      </div>
    </main>
  );
}
