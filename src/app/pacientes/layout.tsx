import { AppFooter } from "@/components/footer";
import { Header } from "@/components/header";

export default function PacientesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 w-full container mx-auto py-12 px-4">
        {children}
      </main>
      <AppFooter />
    </div>
  );
}
