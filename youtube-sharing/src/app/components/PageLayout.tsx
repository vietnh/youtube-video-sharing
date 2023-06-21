export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen h-full w-full flex items-center justify-center p-24">
      {children}
    </main>
  );
}
