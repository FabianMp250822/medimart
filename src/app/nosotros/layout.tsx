import { AppFooter } from "@/components/footer";
import { Header } from "@/components/header";
import { NosotrosSidebar } from "@/components/nosotros/sidebar";

export default function NosotrosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="container mx-auto py-12 px-4 flex-grow">
        <div className="grid lg:grid-cols-4 gap-12">
          <aside className="lg:col-span-1">
            <NosotrosSidebar />
          </aside>
          <main className="lg:col-span-3">{children}</main>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}
