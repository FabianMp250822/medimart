import { AppFooter } from "@/components/footer";
import { Header } from "@/components/header";
import { ServiciosSidebar } from "@/components/servicios/sidebar";
import Image from "next/image";

export default function ServiciosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
       <div className="relative bg-primary/80 text-white py-20 sm:py-24 md:py-28 flex items-center justify-center text-center">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/banner%2Fmisionvision_(1)-transformed.jpeg?alt=media&token=fc787cf2-c0e8-4f7a-a5a4-da0291536d42"
          alt="Banner Servicios"
          layout="fill"
          objectFit="cover"
          className="z-0 opacity-20"
          data-ai-hint="medical services"
          priority
        />
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-bold">Nuestros Servicios</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            Atención integral y especializada para su bienestar.
          </p>
        </div>
      </div>
      <div className="container mx-auto py-12 px-4 flex-grow">
        <div className="grid lg:grid-cols-4 gap-12">
          <aside className="lg:col-span-1">
            <ServiciosSidebar />
          </aside>
          <main className="lg:col-span-3">{children}</main>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}
