import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Target, Award, Leaf, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sistema Integrado de Gestión - Clínica de la Costa',
  description: 'Conozca nuestro Sistema Integrado de Gestión (SIG), que articula calidad, seguridad, gestión ambiental y responsabilidad social para garantizar la excelencia en todos nuestros procesos.',
};

export default function SistemaIntegradoPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
          <ShieldCheck className="mx-auto h-16 w-16 text-accent mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary">Sistema Integrado de Gestión (SIG)</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-4xl mx-auto">
              Nuestro SIG está diseñado para garantizar la excelencia en todas las áreas operativas y administrativas, articulando calidad, seguridad, gestión ambiental y responsabilidad social.
          </p>
      </div>
      
      <main className="space-y-8">
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <Target /> Propósito del SIG
                </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-muted-foreground">
                <p>Asegurar que todas las actividades de la Clínica de la Costa se realicen con los más altos estándares de calidad, seguridad y sostenibilidad, garantizando el bienestar de los trabajadores, usuarios, proveedores, contratistas y visitantes.</p>
            </CardContent>
          </Card>

          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <Award /> Políticas Integradas
                  </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none text-muted-foreground space-y-4">
                  <div>
                    <h4>Política de Seguridad y Salud en el Trabajo</h4>
                    <p className="text-sm"><strong>Fecha:</strong> 30 de mayo de 2019 | <strong>Versión:</strong> 04</p>
                    <ul>
                        <li>Prevenir riesgos laborales y garantizar la calidad de vida laboral de sus colaboradores.</li>
                        <li>Cumplir con la legislación vigente en Colombia y otros requisitos aplicables.</li>
                        <li>Implementar un sistema de mejora continua en seguridad y salud en el trabajo.</li>
                        <li>Diseñar e implementar planes de prevención y respuesta ante emergencias.</li>
                        <li>Fomentar una cultura de autocuidado y el uso de elementos de protección personal.</li>
                        <li>Proveer formación y sensibilización en temas de seguridad laboral y prevención de riesgos.</li>
                    </ul>
                  </div>
                   <div>
                    <h4>Política de Calidad</h4>
                    <ul>
                        <li>La mejora continua de procesos asistenciales y administrativos.</li>
                        <li>La implementación de tecnologías de última generación.</li>
                        <li>La capacitación constante del talento humano.</li>
                    </ul>
                  </div>
                  <div>
                    <h4>Política Ambiental</h4>
                    <ul>
                      <li>Gestión adecuada de residuos hospitalarios.</li>
                      <li>Reducción del consumo de recursos no renovables.</li>
                      <li>Programas de sensibilización ambiental para colaboradores y usuarios.</li>
                    </ul>
                  </div>
                  <div>
                    <h4>Política de Responsabilidad Social</h4>
                     <ul>
                      <li>La inclusión de programas sociales para población vulnerable.</li>
                      <li>La generación de empleo local y el fortalecimiento de proveedores regionales.</li>
                      <li>La implementación de proyectos que fomenten la equidad, la diversidad y la inclusión.</li>
                    </ul>
                  </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <ShieldCheck /> Componentes del SIG
                  </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none text-muted-foreground grid md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <h4>Sistema de Gestión de Seguridad y Salud en el Trabajo (SG-SST)</h4>
                    <ul>
                        <li>Identificación y control de peligros en todas las áreas locativas.</li>
                        <li>Programas de capacitación y sensibilización.</li>
                        <li>Planes de emergencia y contingencia.</li>
                    </ul>
                  </div>
                  <div>
                    <h4>Sistema de Gestión de Calidad (SGC)</h4>
                    <ul>
                        <li>Protocolos de atención médica basados en estándares internacionales.</li>
                        <li>Monitoreo y medición de indicadores de calidad.</li>
                        <li>Gestión eficiente de los recursos.</li>
                    </ul>
                  </div>
                   <div>
                    <h4>Sistema de Gestión Ambiental (SGA)</h4>
                    <ul>
                        <li>Gestión integral de residuos hospitalarios.</li>
                        <li>Reducción de emisiones y consumo de energía.</li>
                        <li>Cumplimiento de normativas ambientales locales e internacionales.</li>
                    </ul>
                  </div>
                   <div>
                    <h4>Sistema de Responsabilidad Social Empresarial (RSE)</h4>
                    <ul>
                        <li>Alianzas estratégicas con organizaciones comunitarias.</li>
                        <li>Proyectos sociales y educativos para poblaciones vulnerables.</li>
                        <li>Promoción de la igualdad y diversidad en el ámbito laboral.</li>
                    </ul>
                  </div>
              </CardContent>
            </Card>
      </main>
    </div>
  );
}
