import { FileSearch, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const metadata: Metadata = {
  title: 'Tus Resultados Médicos - Clínica de la Costa',
  description: 'Accede a los resultados de tus exámenes y procedimientos médicos de forma segura y rápida. Próximamente disponible.',
};

export default function ResultadosMedicosPage() {
  return (
    <div className="space-y-8 flex items-center justify-center min-h-[50vh]">
      <Card className="w-full max-w-2xl text-center shadow-lg">
        <CardHeader>
          <div className="mx-auto bg-accent/10 p-4 rounded-full w-fit mb-4">
            <FileSearch className="h-12 w-12 text-accent" />
          </div>
          <CardTitle className="text-3xl text-primary">Portal de Resultados Médicos</CardTitle>
          <CardDescription className="text-lg pt-2">
            Muy pronto, un espacio seguro y confidencial para ti.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">
            Estamos finalizando los detalles de nuestro nuevo portal de resultados en línea. Pronto podrás acceder a los informes de tus exámenes y procedimientos de manera rápida, fácil y completamente segura desde la comodidad de tu hogar.
          </p>
          <Alert>
            <ShieldCheck className="h-4 w-4" />
            <AlertTitle>Tu Privacidad es Nuestra Prioridad</AlertTitle>
            <AlertDescription>
              La plataforma utilizará los más altos estándares de seguridad para garantizar que tu información médica esté siempre protegida y sea accesible únicamente por ti.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
