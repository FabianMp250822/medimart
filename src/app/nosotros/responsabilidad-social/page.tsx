
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartHandshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Responsabilidad Social y Empresarial - Clínica de la Costa',
  description: 'Conozca nuestras iniciativas y compromiso con el desarrollo social, ambiental y el bienestar de la comunidad en la Región Caribe.',
};

export default function ResponsabilidadSocialPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
          <HeartHandshake className="mx-auto h-16 w-16 text-accent mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary">Responsabilidad Social y Empresarial</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprometidos con la salud y el bienestar de nuestra comunidad, fomentando un desarrollo sostenible y ético.
          </p>
      </div>
      
      <main className="space-y-8">
          <Card>
              <CardHeader>
                  <CardTitle>Nuestro Compromiso Social</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none text-muted-foreground">
                  <p>
                      En Clínica de la Costa, creemos que nuestro rol va más allá de la atención médica. Como actor fundamental en la comunidad, tenemos la responsabilidad de contribuir activamente a su desarrollo social, económico y ambiental.
                  </p>
                  <p>
                      Nuestra política de Responsabilidad Social Empresarial (RSE) se alinea con los principios éticos y los valores que definen nuestra institución, buscando siempre un impacto positivo en nuestros grupos de interés.
                  </p>
              </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
             <Card>
              <CardHeader>
                  <CardTitle>Misión y Visión en RSE</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none text-muted-foreground">
                   <ul>
                        <li><strong>Misión:</strong> Promover el desarrollo sostenible mediante iniciativas que contribuyan al bienestar de la comunidad y fortalezcan la relación con nuestros grupos de interés.</li>
                        <li><strong>Visión:</strong> Ser líderes en responsabilidad social en el sector salud, consolidando una operación ética y sostenible.</li>
                    </ul>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                  <CardTitle>Principios Fundamentales</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none text-muted-foreground">
                   <ul>
                        <li>Ética y Transparencia</li>
                        <li>Inclusión y Diversidad</li>
                        <li>Sostenibilidad Ambiental</li>
                        <li>Compromiso Comunitario</li>
                        <li>Innovación y Mejora Continua</li>
                    </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
              <CardHeader>
                  <CardTitle>Áreas de Actuación</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none text-muted-foreground">
                  <h4>Responsabilidad Social con la Comunidad</h4>
                  <ul>
                      <li>Jornadas de salud preventivas y especializadas en comunidades vulnerables.</li>
                      <li>Campañas y talleres de educación para promover hábitos de vida saludable.</li>
                  </ul>
                  <h4>Sostenibilidad Ambiental</h4>
                   <ul>
                      <li>Implementación de prácticas para reducir nuestro impacto ambiental, como el manejo adecuado de residuos y el ahorro de recursos.</li>
                  </ul>
                  <h4>Bienestar de Colaboradores</h4>
                   <ul>
                      <li>Fomentar un ambiente de trabajo que promueva el crecimiento profesional, el bienestar y el compromiso de nuestro equipo.</li>
                  </ul>
              </CardContent>
          </Card>
      </main>
    </div>
  );
}
