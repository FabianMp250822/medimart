import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BadgeCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Certificaciones y Acreditaciones - Clínica de la Costa',
  description: 'Conozca las certificaciones y acreditaciones que avalan la calidad y seguridad de nuestros servicios.',
};

export default function CertificacionesPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
            <BadgeCheck className="mx-auto h-16 w-16 text-accent mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Certificaciones y Acreditaciones</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Nuestro compromiso con la calidad, avalado por entidades expertas.
            </p>
        </div>
        
        <main className="mt-12">
            <Card>
                <CardHeader>
                    <CardTitle>Calidad Certificada</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                   <p>
                        En la Clínica de la Costa, la calidad no es una meta, es nuestro estándar de operación diario. Estamos orgullosos de contar con diversas certificaciones y acreditaciones que demuestran nuestro compromiso con la seguridad del paciente, la excelencia clínica y la mejora continua.
                   </p>
                   <p>
                        Actualmente, estamos actualizando esta sección para mostrar en detalle cada uno de nuestros logros y lo que significan para usted, nuestro paciente.
                   </p>
                   <p>
                        Algunas de nuestras áreas certificadas incluyen:
                   </p>
                   <ul>
                        <li>Certificación ISO 9001:2015 en procesos administrativos.</li>
                        <li>Acreditación en Salud por parte de ICONTEC.</li>
                        <li>Programa de Seguridad del Paciente.</li>
                   </ul>
                </CardContent>
            </Card>
        </main>
      </div>
    </div>
  );
}
