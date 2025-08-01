import { AppFooter } from "@/components/footer";
import { Header } from "@/components/header";
import Image from "next/image";

export default function ContactoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
       <div className="relative bg-primary/80 text-white py-20 sm:py-28 md:py-32 flex items-center justify-center text-center">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/banner%2Fmisionvision_(1)-transformed.jpeg?alt=media&token=fc787cf2-c0e8-4f7a-a5a4-da0291536d42"
          alt="Banner de Contacto"
          layout="fill"
          objectFit="cover"
          className="z-0 opacity-20"
          data-ai-hint="contact banner"
        />
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-bold">Contáctenos</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            Estamos aquí para ayudarte. Encuentra la información que necesitas o envíanos un mensaje.
          </p>
        </div>
      </div>
      <main className="flex-1 w-full container mx-auto py-12 px-4">
        {children}
      </main>
      <AppFooter />
    </div>
  );
}
