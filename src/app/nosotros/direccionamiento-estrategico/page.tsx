
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Compass, Target, Gem, Eye, BarChart, Goal, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Direccionamiento Estratégico - Clínica de la Costa',
  description: 'Descubra nuestro propósito, valores, misión, visión, análisis DOFA y objetivos estratégicos que guían nuestro compromiso con la excelencia en la salud en Barranquilla y la Región Caribe.',
};

export default function DireccionamientoEstrategicoPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
          <Compass className="mx-auto h-16 w-16 text-accent mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary">Direccionamiento Estratégico</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-4xl mx-auto">
              Este documento detalla el direccionamiento estratégico de la Clínica de la Costa, alineado con los estándares más exigentes en planificación y gestión de instituciones de salud.
          </p>
      </div>
      
      <main className="space-y-8">
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <Target /> Propósito Estratégico
                </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none text-muted-foreground">
                <ul>
                    <li><strong>Propósito General:</strong> Brindar servicios de salud de alta calidad, accesibles y sostenibles, con un enfoque humano, ético y comprometido con el bienestar integral de nuestros pacientes y la comunidad.</li>
                    <li><strong>Objetivo Central:</strong> Ser líderes en el sector salud en Barranquilla y el Caribe colombiano, destacándonos por nuestra excelencia médica, innovación tecnológica y responsabilidad social.</li>
                </ul>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-3 text-xl text-primary"><Gem/> Valores Corporativos</CardTitle></CardHeader>
                <CardContent className="prose max-w-none text-muted-foreground">
                    <ul>
                        <li><strong>Compromiso:</strong> Actuar con responsabilidad hacia nuestros pacientes y colaboradores.</li>
                        <li><strong>Calidad:</strong> Buscar la excelencia en todos los procesos asistenciales y administrativos.</li>
                        <li><strong>Innovación:</strong> Adoptar prácticas y tecnologías que transformen positivamente el sector salud.</li>
                        <li><strong>Empatía:</strong> Ofrecer atención basada en el respeto, la dignidad y la humanidad.</li>
                        <li><strong>Sostenibilidad:</strong> Operar de manera social, ambiental y económicamente responsable.</li>
                    </ul>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-3 text-xl text-primary"><Eye /> Misión y Visión</CardTitle></CardHeader>
                <CardContent className="prose max-w-none text-muted-foreground">
                    <ul>
                        <li><strong>Misión:</strong> Proveer atención médica integral que combine tecnología avanzada, talento humano capacitado y un enfoque centrado en el paciente, promoviendo el bienestar y la calidad de vida de nuestra comunidad.</li>
                        <li><strong>Visión:</strong> Para el año 2030, ser reconocidos como el principal referente de servicios de salud en el Caribe colombiano, destacándonos por nuestro liderazgo en innovación, calidad asistencial y responsabilidad social.</li>
                    </ul>
                </CardContent>
            </Card>
          </div>

          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <BarChart /> Análisis del Entorno (DOFA)
                  </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none text-muted-foreground grid md:grid-cols-2 gap-8">
                  <div>
                    <h4>Fortalezas</h4>
                    <ul>
                        <li>Prestigio en el sector salud regional.</li>
                        <li>Infraestructura moderna y equipada con tecnología de punta.</li>
                        <li>Talento humano calificado con amplia experiencia.</li>
                        <li>Alto nivel de satisfacción del paciente.</li>
                    </ul>
                  </div>
                  <div>
                    <h4>Oportunidades</h4>
                    <ul>
                        <li>Crecimiento del turismo de salud en Barranquilla.</li>
                        <li>Demanda de servicios médicos especializados en la región.</li>
                        <li>Alianzas estratégicas con entidades públicas y privadas.</li>
                        <li>Uso de telemedicina para ampliar el alcance de nuestros servicios.</li>
                    </ul>
                  </div>
                   <div>
                    <h4>Debilidades</h4>
                    <ul>
                        <li>Dependencia de recursos externos para proyectos de innovación.</li>
                        <li>Alta competencia en el sector privado de salud.</li>
                        <li>Necesidad de fortalecer los programas de fidelización de pacientes.</li>
                    </ul>
                  </div>
                   <div>
                    <h4>Amenazas</h4>
                    <ul>
                        <li>Cambios frecuentes en las normativas del sector salud.</li>
                        <li>Incremento de costos operativos y tecnológicos.</li>
                        <li>Factores económicos que afectan la capacidad de pago de los pacientes.</li>
                        <li>Incremento en los riesgos asociados a pandemias y emergencias sanitarias.</li>
                    </ul>
                  </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <Goal /> Objetivos Estratégicos
                  </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none text-muted-foreground space-y-4">
                  <div>
                    <h4>Objetivos a Corto Plazo</h4>
                    <ul>
                        <li>Incrementar en un 20% la satisfacción de los pacientes mediante mejoras en los procesos asistenciales.</li>
                        <li>Ampliar los programas de salud preventiva a comunidades vulnerables en Barranquilla.</li>
                        <li>Implementar un sistema de gestión de residuos hospitalarios alineado con estándares internacionales.</li>
                    </ul>
                  </div>
                   <div>
                    <h4>Objetivos a Mediano Plazo</h4>
                    <ul>
                        <li>Ser reconocidos como una institución que cumple con los más altos estándares de calidad en el sector salud.</li>
                        <li>Reducir en un 30% la huella de carbono de nuestras operaciones.</li>
                        <li>Establecer un programa integral de telemedicina para zonas rurales.</li>
                    </ul>
                  </div>
                  <div>
                    <h4>Objetivos a Largo Plazo</h4>
                    <ul>
                        <li>Convertirnos en un hospital universitario, formando profesionales de la salud.</li>
                        <li>Consolidarnos como el centro de referencia en especialidades médicas en la región Caribe.</li>
                        <li>Lograr una cobertura total de nuestras operaciones bajo prácticas de sostenibilidad.</li>
                    </ul>
                  </div>
              </CardContent>
            </Card>
          
           <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <ShieldCheck /> Conclusión
                  </CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none text-muted-foreground">
                 <p>El direccionamiento estratégico de la Clínica de la Costa está diseñado para consolidar nuestra posición como líderes en el sector salud, actuando con responsabilidad social, ambiental y económica. Este marco estratégico nos permitirá afrontar los desafíos del futuro mientras brindamos un servicio médico excepcional y humano.</p>
              </CardContent>
          </Card>
      </main>
    </div>
  );
}
