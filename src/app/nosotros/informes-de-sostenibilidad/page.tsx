import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Informes de Sostenibilidad - Clínica de la Costa',
  description: 'Acceda a nuestros informes de sostenibilidad y conozca nuestro impacto y compromiso con la sociedad y el medio ambiente.',
};

export default function SostenibilidadPage() {
  return (
    <div className="w-full">
      <div className="text-center mb-12">
          <BarChart3 className="mx-auto h-16 w-16 text-accent mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary">Informes de Sostenibilidad</h1>
          <p className="mt-4 text-lg text-muted-foreground">
              Transparencia en nuestra gestión social, ambiental y económica.
          </p>
      </div>
      
      <main>
          <Card>
              <CardHeader>
                  <CardTitle>Nuestro Impacto y Progreso</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                 <p>
                      Creemos en la transparencia como pilar de la confianza. En esta sección, publicaremos nuestros informes anuales de sostenibilidad, donde detallamos nuestro desempeño y avances en las áreas económica, social y ambiental.
                 </p>
                 <p>
                      Estamos trabajando para poner a su disposición los informes más recientes. A través de ellos, podrá conocer más sobre nuestras iniciativas de responsabilidad social, gestión ambiental y gobierno corporativo.
                 </p>
              </CardContent>
          </Card>
      </main>
    </div>
  );
}
