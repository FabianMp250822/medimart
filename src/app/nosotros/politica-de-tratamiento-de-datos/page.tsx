
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DatabaseZap, ShieldCheck, Target, Users, KeyRound, Lock, Server, Repeat } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Tratamiento de Datos Personales - Clínica de la Costa',
  description: 'Conozca nuestra política para el tratamiento y protección de datos personales de pacientes, colaboradores y terceros, en cumplimiento con la legislación vigente en Colombia.',
};

export default function PoliticaDatosPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
          <DatabaseZap className="mx-auto h-16 w-16 text-accent mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary">Política de Tratamiento de Datos Personales</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-4xl mx-auto">
              Este documento detalla las políticas adoptadas por la Clínica de la Costa para garantizar el correcto manejo de los datos personales, conforme a la legislación vigente.
          </p>
      </div>
      
      <main className="space-y-8">
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <ShieldCheck /> Introducción y Alcance
                </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-muted-foreground">
                <p>En cumplimiento de las disposiciones legales de protección de datos personales vigentes en Colombia (Ley 1581 de 2012, Decreto 1377 de 2013) y los estándares internacionales, la Clínica de la Costa establece esta política para garantizar la seguridad, confidencialidad y correcto tratamiento de los datos personales. Esta política aplica a todas las actividades relacionadas con la recolección, almacenamiento, uso, transferencia y eliminación de datos personales, ya sea en formato físico o digital.</p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-3 text-xl text-primary"><KeyRound /> Definiciones</CardTitle></CardHeader>
                <CardContent className="prose max-w-none text-muted-foreground">
                    <ul>
                        <li><strong>Dato Personal:</strong> Información que permite identificar o hacer identificable a una persona.</li>
                        <li><strong>Dato Sensible:</strong> Información que afecta la intimidad del titular o cuyo uso indebido podría generar discriminación.</li>
                        <li><strong>Titular:</strong> Persona natural cuyos datos son objeto de tratamiento.</li>
                        <li><strong>Responsable del Tratamiento:</strong> La Clínica de la Costa.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-3 text-xl text-primary"><ShieldCheck /> Principios Rectores</CardTitle></CardHeader>
                <CardContent className="prose max-w-none text-muted-foreground">
                    <ul>
                        <li><strong>Legalidad:</strong> Cumplimiento de las leyes aplicables.</li>
                        <li><strong>Finalidad:</strong> Recolección de datos con propósitos legítimos.</li>
                        <li><strong>Transparencia:</strong> Garantizar el derecho del titular a conocer el tratamiento de sus datos.</li>
                        <li><strong>Seguridad:</strong> Protección adecuada frente a riesgos de pérdida o acceso no autorizado.</li>
                    </ul>
                </CardContent>
            </Card>
          </div>
          
           <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <Target /> Finalidades del Tratamiento de Datos
                  </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none text-muted-foreground">
                  <h4>Pacientes:</h4>
                  <ul>
                      <li>Gestión administrativa y asistencial.</li>
                      <li>Coordinación de citas y procedimientos.</li>
                      <li>Comunicación sobre salud preventiva y programas de bienestar.</li>
                  </ul>
                  <h4>Médicos y Personal:</h4>
                  <ul>
                      <li>Gestión de contratos laborales y certificaciones profesionales.</li>
                  </ul>
                   <h4>Proveedores y Terceros:</h4>
                  <ul>
                      <li>Gestión de contratos y facturación.</li>
                  </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <Users /> Derechos de los Titulares
                  </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none text-muted-foreground">
                 <ul>
                    <li>Conocer, actualizar y rectificar sus datos personales.</li>
                    <li>Solicitar la supresión de sus datos cuando no sean necesarios para las finalidades establecidas.</li>
                    <li>Presentar quejas ante la autoridad de protección de datos correspondiente.</li>
                </ul>
              </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-3 text-xl text-primary"><Lock /> Medidas de Seguridad</CardTitle></CardHeader>
                <CardContent className="prose max-w-none text-muted-foreground">
                    <ul>
                        <li><strong>Seguridad Física:</strong> Control de acceso restringido a áreas de almacenamiento.</li>
                        <li><strong>Seguridad Digital:</strong> Cifrado de datos sensibles y monitoreo continuo de redes.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-3 text-xl text-primary"><Server /> Transferencia y Conservación</CardTitle></CardHeader>
                <CardContent className="prose max-w-none text-muted-foreground">
                    <ul>
                        <li>Transferencia a terceros solo con autorización explícita.</li>
                        <li>Conservación de datos durante el tiempo necesario para las finalidades establecidas.</li>
                    </ul>
                </CardContent>
            </Card>
          </div>

          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <Repeat /> Actualización de la Política
                  </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none text-muted-foreground">
                 <p>La Clínica de la Costa se reserva el derecho de modificar esta política según nuevas disposiciones legales o avances tecnológicos. Las actualizaciones serán notificadas a través de nuestros canales oficiales.</p>
              </CardContent>
          </Card>
      </main>
    </div>
  );
}
