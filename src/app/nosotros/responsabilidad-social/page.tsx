import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartHandshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Responsabilidad Social y Empresarial - Clínica de la Costa',
  description: 'Conozca nuestras iniciativas y compromiso con el desarrollo social y el bienestar de la comunidad.',
};

export default function ResponsabilidadSocialPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
            <HeartHandshake className="mx-auto h-16 w-16 text-accent mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Responsabilidad Social y Empresarial</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Comprometidos con la salud y el bienestar de nuestra comunidad.
            </p>
        </div>
        
        <main className="mt-12">
            <Card>
                <CardHeader>
                    <CardTitle>Nuestro Compromiso Social</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                    <p>
                        En Clínica de la Costa, creemos que nuestro rol va más allá de la atención médica. Como actor fundamental en la comunidad, tenemos la responsabilidad de contribuir activamente a su desarrollo social, económico y ambiental.
                    </p>
                    <p>
                        Nuestros programas de responsabilidad social se enfocan en:
                    </p>
                    <ul>
                        <li><strong>Jornadas de Salud:</strong> Llevamos atención preventiva y especializada a comunidades vulnerables.</li>
                        <li><strong>Educación para la Salud:</strong> Realizamos campañas y talleres para promover hábitos de vida saludable.</li>
                        <li><strong>Sostenibilidad Ambiental:</strong> Implementamos prácticas para reducir nuestro impacto ambiental, como el manejo adecuado de residuos y el ahorro de recursos.</li>
                        <li><strong>Apoyo a la Comunidad:</strong> Colaboramos con fundaciones y organizaciones locales para apoyar diversas causas sociales.</li>
                    </ul>
                    <p>
                        Estamos construyendo un futuro más saludable para todos, juntos.
                    </p>
                </CardContent>
            </Card>
        </main>
      </div>
    </div>
  );
}
