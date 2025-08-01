import { AppFooter } from "@/components/footer";
import { Header } from "@/components/header";

export default function NosotrosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <AppFooter />
    </div>
  );
}
