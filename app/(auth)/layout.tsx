export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-full flex items-center justify-center">
      <div className="w-full max-w-sm">{children}</div>
    </main>
  );
}
