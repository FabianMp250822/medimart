import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Marco Legal - Clínica de la Costa',
  description: 'Información sobre el marco legal y normativo que rige la operación y servicios de la Clínica de la Costa.',
};

export default function MarcoLegalPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
            <Scale className="mx-auto h-16 w-16 text-accent mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Marco Legal</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Nuestro compromiso con el cumplimiento normativo y la legalidad.
            </p>
        </div>
        
        <main className="mt-12">
            <Card>
                <CardHeader>
                    <CardTitle>Normatividad Aplicable</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                    <p>
                        Clínica de la Costa S.A.S. opera en estricto cumplimiento con la legislación y normatividad vigente en Colombia para la prestación de servicios de salud. Nuestro compromiso con la legalidad es un pilar fundamental de nuestra operación y garantiza la seguridad y confianza de nuestros pacientes y colaboradores.
                    </p>
                    <p>
                        Regulamos nuestras actividades bajo las directrices del Ministerio de Salud y Protección Social, la Superintendencia Nacional de Salud, y demás entes de control pertinentes.
                    </p>
                    <p>
                        Esta sección se encuentra en desarrollo para proporcionar un acceso más detallado a las principales normas que nos rigen.
                    </p>
                </CardContent>
            </Card>
        </main>
      </div>
    </div>
  );
}
