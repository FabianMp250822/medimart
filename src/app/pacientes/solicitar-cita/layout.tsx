
import { AppFooter } from "@/components/footer";
import { Header } from "@/components/header";

// Este es un layout simplificado para la página de solicitar cita,
// que no incluye el banner ni la sidebar del portal de pacientes.

export default function SolicitarCitaLayout({
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
