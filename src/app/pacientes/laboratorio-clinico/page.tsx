
"use client";

import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Microscope, Beaker, Dna, Syringe, HeartPulse, CheckCircle } from 'lucide-react';
import Image from 'next/image';

const areasEspecializadas = [
    { text: "Hematología: Diagnóstico de enfermedades de la sangre y sus componentes." },
    { text: "Coagulación: Evaluación de trastornos en la coagulación sanguínea." },
    { text: "Microbiología: Identificación de microorganismos causantes de infecciones." },
    { text: "Biología molecular: Diagnósticos genéticos y análisis de ADN." },
    { text: "Citogenética: Evaluación de anomalías cromosómicas." },
];

const serviciosDisponibles = [
    { text: "Química clínica: Evaluación de órganos y sistemas." },
    { text: "Inmunohistoquímica: Diagnósticos a nivel celular." },
    { text: "TSH: Pruebas de función tiroidea." },
    { text: "Pruebas avanzadas de Química Especializada." },
];

const atencionInmediata = [
    { text: "Atención del parto." },
    { text: "Urgencias." },
    { text: "Transporte asistencial medicalizado." },
    { text: "Atención prehospitalaria." },
];


export default function LaboratorioClinicoPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-primary">
            <Microscope />
            Laboratorio Clínico
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Nuestro Laboratorio Clínico está diseñado para proporcionar diagnósticos precisos y confiables, respaldados por tecnología de vanguardia y un equipo altamente capacitado. Garantizamos resultados rápidos y certeros.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
            <Image
                src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-19%20at%204.42.37%20PM.jpeg?alt=media&token=0073f503-653b-4326-907b-665688257340"
                alt="Equipos de laboratorio clínico"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
                data-ai-hint="laboratory equipment"
            />
        </div>
        <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
             <Image
                src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-11-20%20at%203.09.32%20PM.jpeg?alt=media&token=c6184254-a0ef-45a2-b305-16bcbe93be0d"
                alt="Personal de laboratorio trabajando"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
                data-ai-hint="laboratory staff"
            />
        </div>
      </div>

       <Card>
        <CardContent className="p-6">
             <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="font-semibold text-lg hover:no-underline">
                        <div className="flex items-center gap-3"><Beaker className="text-accent"/>Áreas Especializadas</div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-10">
                        <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                           {areasEspecializadas.map(item => <li key={item.text}>{item.text}</li>)}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="font-semibold text-lg hover:no-underline">
                        <div className="flex items-center gap-3"><Syringe className="text-accent"/>Servicios Disponibles</div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-10">
                         <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                           {serviciosDisponibles.map(item => <li key={item.text}>{item.text}</li>)}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="font-semibold text-lg hover:no-underline">
                       <div className="flex items-center gap-3"><Dna className="text-accent"/>Tecnología de Última Generación</div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-10">
                        <p className="text-muted-foreground">
                            En la Clínica de la Costa SAS, utilizamos Genexpert, una herramienta avanzada para el diagnóstico rápido y preciso de tuberculosis y otras pruebas moleculares críticas.
                        </p>
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="item-4">
                    <AccordionTrigger className="font-semibold text-lg hover:no-underline">
                        <div className="flex items-center gap-3"><HeartPulse className="text-accent"/>Servicios de Atención Inmediata</div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-10">
                         <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                           {atencionInmediata.map(item => <li key={item.text}>{item.text}</li>)}
                        </ul>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
       </Card>
    </div>
  );
}
