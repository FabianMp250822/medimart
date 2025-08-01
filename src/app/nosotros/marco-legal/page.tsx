"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Scale, Landmark, Globe, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function MarcoLegalPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <Scale className="mx-auto h-16 w-16 text-accent mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold text-primary">Marco Legal</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-4xl mx-auto">
          Este documento establece el marco legal aplicable a la operación de la Clínica de la Costa en Colombia, garantizando el cumplimiento de las normativas locales, nacionales e internacionales.
        </p>
      </div>

      <main className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl text-primary">
              <ShieldCheck /> Ámbito de Aplicación
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>El marco legal cubre todas las actividades de la Clínica de la Costa relacionadas con:</p>
            <ul>
              <li>Prestación de servicios de salud.</li>
              <li>Gestión de datos personales y confidenciales.</li>
              <li>Cumplimiento de normativas laborales y de seguridad.</li>
              <li>Protección del medio ambiente y gestión de residuos hospitalarios.</li>
              <li>Responsabilidad social empresarial.</li>
            </ul>
          </CardContent>
        </Card>

        <Accordion type="multiple" className="w-full space-y-8">
          <AccordionItem value="legislacion-nacional" className="border-none">
             <Card>
                <CardHeader>
                  <AccordionTrigger className="p-0 hover:no-underline">
                      <CardTitle className="flex items-center gap-3 text-2xl text-primary w-full">
                        <Landmark /> Legislación Nacional
                      </CardTitle>
                  </AccordionTrigger>
                </CardHeader>
                <AccordionContent>
                  <CardContent className="prose max-w-none text-muted-foreground">
                    <h4>Sector Salud:</h4>
                    <ul>
                      <li>Ley 100 de 1993: Sistema General de Seguridad Social en Salud.</li>
                      <li>Resolución 2003 de 2014: Condiciones mínimas para las IPS.</li>
                      <li>Ley 1438 de 2011: Reforma del Sistema de Salud priorizando la atención primaria.</li>
                      <li>Resolución 3100 de 2019: Normas de habilitación para las IPS.</li>
                    </ul>
                    <h4>Protección de Datos Personales:</h4>
                    <ul>
                      <li>Ley 1581 de 2012: Régimen General de Protección de Datos Personales.</li>
                      <li>Decreto 1377 de 2013: Reglamentación de la Ley 1581 de 2012.</li>
                    </ul>
                     <h4>Normativa Laboral y Seguridad en el Trabajo:</h4>
                    <ul>
                      <li>Código Sustantivo del Trabajo.</li>
                      <li>Ley 1562 de 2012: Sistema de Gestión de Seguridad y Salud en el Trabajo.</li>
                      <li>Resolución 0312 de 2019: Estándares mínimos del SG-SST.</li>
                    </ul>
                    <h4>Gestión Ambiental:</h4>
                     <ul>
                      <li>Ley 99 de 1993: Marco General de Protección Ambiental.</li>
                      <li>Decreto 351 de 2014: Gestión de residuos hospitalarios.</li>
                      <li>Resolución 1164 de 2002: Manual de Gestión Integral de Residuos Hospitalarios.</li>
                    </ul>
                  </CardContent>
                </AccordionContent>
             </Card>
          </AccordionItem>

          <AccordionItem value="estandares-internacionales" className="border-none">
             <Card>
                <CardHeader>
                  <AccordionTrigger className="p-0 hover:no-underline">
                    <CardTitle className="flex items-center gap-3 text-2xl text-primary w-full">
                      <Globe /> Estándares Internacionales
                    </CardTitle>
                  </AccordionTrigger>
                </CardHeader>
                <AccordionContent>
                    <CardContent className="prose max-w-none text-muted-foreground">
                        <h4>Protección de Datos y Privacidad:</h4>
                        <ul>
                            <li>Reglamento General de Protección de Datos (GDPR).</li>
                            <li>HIPAA (Health Insurance Portability and Accountability Act).</li>
                        </ul>
                        <h4>Calidad en la Prestación de Servicios de Salud:</h4>
                        <ul>
                            <li>Norma ISO 9001: Gestión de Calidad.</li>
                            <li>Norma ISO 45001: Seguridad y Salud en el Trabajo.</li>
                            <li>Norma ISO 14001: Gestión Ambiental.</li>
                            <li>Joint Commission International (JCI): Estándares de calidad para instituciones de salud.</li>
                        </ul>
                        <h4>Derechos Humanos y Ética:</h4>
                        <ul>
                            <li>Declaración Universal de Derechos Humanos (ONU).</li>
                            <li>Código Internacional de Ética Médica (Asociación Médica Mundial).</li>
                            <li>Objetivos de Desarrollo Sostenible (ODS).</li>
                        </ul>
                    </CardContent>
                </AccordionContent>
              </Card>
          </AccordionItem>
        </Accordion>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl text-primary">
              <ShieldCheck /> Mecanismos de Supervisión y Cumplimiento
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <ul>
              <li>Auditorías Internas: Verificaciones periódicas del cumplimiento normativo.</li>
              <li>Capacitación Continua: Formación del personal en leyes y estándares aplicables.</li>
              <li>Reportes de Sostenibilidad: Informes anuales sobre acciones tomadas.</li>
              <li>Comité de Cumplimiento Legal: Monitoreo y gestión del cumplimiento normativo.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl text-primary">
              <AlertTriangle /> Consecuencias del Incumplimiento
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none text-muted-foreground">
            <p>El incumplimiento de las normativas puede derivar en:</p>
            <ul>
              <li>Sanciones económicas y administrativas por parte de las autoridades.</li>
              <li>Daño reputacional afectando la confianza de pacientes y aliados estratégicos.</li>
              <li>Pérdida de acreditaciones y certificaciones.</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
