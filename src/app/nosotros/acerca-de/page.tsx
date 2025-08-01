
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Building, Target, Eye, Gem, ShieldCheck, Award, Users, HeartHandshake, Zap, ThumbsUp, GitCommit } from 'lucide-react';

const valores = [
  { icon: <HeartHandshake className="h-5 w-5 text-accent" />, title: 'Servicio Humanizado' },
  { icon: <Users className="h-5 w-5 text-accent" />, title: 'Trabajo en Equipo' },
  { icon: <GitCommit className="h-5 w-5 text-accent" />, title: 'Responsabilidad Social' },
  { icon: <ThumbsUp className="h-5 w-5 text-accent" />, title: 'Respeto' },
  { icon: <Gem className="h-5 w-5 text-accent" />, title: 'Honestidad' },
  { icon: <Award className="h-5 w-5 text-accent" />, title: 'Compromiso con la Excelencia' },
  { icon: <Zap className="h-5 w-5 text-accent" />, title: 'Innovación' },
];


export default function AcercaDePage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-primary">
            <Building />
            ¿Quiénes somos?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            La Clínica de la Costa Ltda. se encuentra ubicada en el tradicional barrio Alto Prado, el sector de salud más conocido de la Región Caribe Colombiana. Contamos con amplios parqueaderos y estamos rodeados de importantes vías de acceso equidistantes a los mejores hoteles y centros comerciales de la ciudad.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl text-primary">
              <Target />
              Misión
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              En la Clínica de la Costa trabajamos con el corazón para garantizar la excelencia y seguridad en todo lo que hacemos, promoviendo el desarrollo docente e investigativo.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl text-primary">
              <Eye />
              Visión
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Ser una institución líder en la prestación de salud en la región Caribe, reconocida por sus altos estándares de calidad, enfocada en la atención integral de sus usuarios, basados en la capacidad de innovación y la generación de conocimiento.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-primary">
            <Gem />
            Valores Corporativos
          </CardTitle>
        </CardHeader>
        <CardContent>
           <p className="text-muted-foreground mb-4">Nuestros principios y valores corporativos guían cada una de nuestras acciones.</p>
           <Accordion type="single" collapsible className="w-full">
            {valores.map((valor, index) => (
               <AccordionItem value={`item-${index}`} key={valor.title}>
                <AccordionTrigger className="font-semibold hover:no-underline">
                  <div className="flex items-center gap-3">
                    {valor.icon}
                    <span>{valor.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-11 text-muted-foreground">
                  {/* Aquí puedes agregar una descripción para cada valor si lo deseas */}
                  Este es un pilar fundamental de nuestra cultura organizacional.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-primary">
            <Award />
            Política de Calidad
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Brindamos servicios de salud oportunos y confiables en un ambiente confortable, con personal competente y tecnología de punta. Incentivamos el desarrollo docente e investigativo y mejoramos continuamente nuestros procesos.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-primary">
            <ShieldCheck />
            Política de Seguridad del Paciente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Brindar seguridad a pacientes, visitantes y colaboradores entendiendo la seguridad como un componente esencial en la calidad. Queremos ser reconocidos como una institución segura y confiable, garantizando un ambiente adecuado, personal idóneo y excelencia en los procesos.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
