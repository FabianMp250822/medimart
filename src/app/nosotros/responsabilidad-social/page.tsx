
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartHandshake, Zap, ShieldCheck, Star, Target, Eye, GitCommit, Handshake, Speaker, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Responsabilidad Social y Empresarial - Clínica de la Costa',
  description: 'Conozca nuestra política de Responsabilidad Social Empresarial (RSE) y nuestro compromiso con el desarrollo social, ambiental y el bienestar de la comunidad en la Región Caribe.',
};

export default function ResponsabilidadSocialPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
          <HeartHandshake className="mx-auto h-16 w-16 text-accent mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary">Política de Responsabilidad Social Empresarial (RSE)</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-4xl mx-auto">
              La Clínica de la Costa se compromete a fomentar el bienestar social, ambiental y económico de la comunidad en la que opera, en línea con los principios éticos y los valores que definen nuestra institución.
          </p>
      </div>
      
      <main className="space-y-8">
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <Target /> Misión y Visión en RSE
                </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-muted-foreground">
                <ul>
                    <li><strong>Misión:</strong> Promover el desarrollo sostenible mediante iniciativas sociales, ambientales y económicas que contribuyan al bienestar de la comunidad y fortalezcan la relación entre la clínica y sus grupos de interés.</li>
                    <li><strong>Visión:</strong> Ser reconocidos como líderes en responsabilidad social en el sector salud, consolidando una operación ética y sostenible que inspire confianza y beneficie a las generaciones futuras.</li>
                </ul>
            </CardContent>
          </Card>

          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <GitCommit /> Principios Fundamentales
                  </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none text-muted-foreground">
                   <ul>
                        <li><strong>Ética y Transparencia:</strong> Actuar de manera ética en todos los niveles de la organización.</li>
                        <li><strong>Inclusión y Diversidad:</strong> Promover un entorno inclusivo, respetuoso y libre de discriminación.</li>
                        <li><strong>Sostenibilidad:</strong> Minimizar nuestro impacto ambiental y maximizar las prácticas sostenibles.</li>
                        <li><strong>Compromiso Comunitario:</strong> Priorizar el bienestar de las comunidades a las que servimos.</li>
                        <li><strong>Innovación y Mejora Continua:</strong> Implementar tecnologías y procesos que fomenten prácticas responsables.</li>
                    </ul>
              </CardContent>
            </Card>

          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <Zap/> Áreas de Actuación
                  </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none text-muted-foreground">
                  <h4>Responsabilidad Social con la Comunidad</h4>
                  <ul>
                      <li>Jornadas médicas gratuitas en zonas vulnerables.</li>
                      <li>Programas de educación sobre prevención de enfermedades crónicas.</li>
                  </ul>
                  <h4>Compromiso con el Medio Ambiente</h4>
                   <ul>
                      <li>Implementar un sistema de gestión de residuos.</li>
                      <li>Uso de energías renovables y reciclaje.</li>
                  </ul>
                  <h4>Responsabilidad con los Colaboradores</h4>
                   <ul>
                      <li>Programas de cuidado físico y mental.</li>
                      <li>Capacitación y condiciones laborales dignas.</li>
                  </ul>
              </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-3 text-xl text-primary"><Handshake /> Estrategias de Implementación</CardTitle></CardHeader>
                <CardContent className="prose max-w-none text-muted-foreground">
                    <ul>
                        <li>Diagnóstico inicial para evaluar impactos sociales, ambientales y económicos.</li>
                        <li>Establecer metas medibles a corto, mediano y largo plazo.</li>
                        <li>Crear alianzas estratégicas para maximizar el alcance de las iniciativas.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-3 text-xl text-primary"><Speaker/> Comunicación y Transparencia</CardTitle></CardHeader>
                <CardContent className="prose max-w-none text-muted-foreground">
                    <ul>
                        <li>Publicar informes anuales de sostenibilidad.</li>
                        <li>Mantener canales abiertos con la comunidad para recibir retroalimentación.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-3 text-xl text-primary"><ShieldCheck /> Cumplimiento Normativo</CardTitle></CardHeader>
                <CardContent className="prose max-w-none text-muted-foreground">
                    <ul>
                        <li>Cumplir con leyes ambientales, laborales y de salud de Colombia.</li>
                        <li>Alinear las operaciones con ISO 26000 y los ODS de Naciones Unidas.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-3 text-xl text-primary"><Award /> Reconocimientos</CardTitle></CardHeader>
                <CardContent className="prose max-w-none text-muted-foreground">
                    <ul>
                        <li>Certificación ISO 14001 en gestión ambiental.</li>
                        <li>Reconocimientos por programas de impacto social.</li>
                    </ul>
                </CardContent>
            </Card>
          </div>
          
           <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <Star /> Compromiso Futuro
                  </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none text-muted-foreground">
                 <p>La Clínica de la Costa reafirma su compromiso de ser un agente de cambio positivo, liderando iniciativas innovadoras y sostenibles que beneficien a nuestros pacientes, colaboradores y la comunidad en general.</p>
              </CardContent>
          </Card>
      </main>
    </div>
  );
}
