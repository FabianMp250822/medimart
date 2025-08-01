import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookUser } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Reglamento Interno de Trabajo - Clínica de la Costa',
  description: 'Consulte el reglamento interno de trabajo que rige las relaciones laborales en la Clínica de la Costa.',
};

export default function ReglamentoInternoPage() {
  return (
    <div className="w-full">
        <div className="text-center mb-12">
            <BookUser className="mx-auto h-16 w-16 text-accent mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Reglamento Interno de Trabajo</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Derechos y deberes en nuestra comunidad laboral.
            </p>
        </div>
        
        <main>
            <Card>
                <CardHeader>
                    <CardTitle>Nuestro Compromiso Laboral</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                   <p>
                        En esta sección, podrá consultar el documento completo de nuestro Reglamento Interno de Trabajo. Este reglamento establece las condiciones, derechos y deberes que guían las relaciones entre la Clínica de la Costa y todos sus colaboradores.
                   </p>
                   <p>
                        Nuestro objetivo es fomentar un ambiente de trabajo justo, respetuoso y seguro para todos. El documento se encuentra actualmente en proceso de digitalización para su fácil acceso en esta plataforma.
                   </p>
                </CardContent>
            </Card>
        </main>
    </div>
  );
}
