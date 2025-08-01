
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Microscope, Beaker, Dna, Syringe, HeartPulse, CheckCircle } from 'lucide-react';
import Image from 'next/image';

const areasEspecializadas = [
    "Hematología: Diagnóstico de enfermedades de la sangre y sus componentes.",
    "Coagulación: Evaluación de trastornos en la coagulación sanguínea.",
    "Microbiología: Identificación de microorganismos causantes de infecciones.",
    "Biología molecular: Diagnósticos genéticos y análisis de ADN.",
    "Citogenética: Evaluación de anomalías cromosómicas.",
];

const serviciosDisponibles = [
    "Química clínica: Evaluación de órganos y sistemas.",
    "Inmunohistoquímica: Diagnósticos a nivel celular.",
    "TSH: Pruebas de función tiroidea.",
    "Pruebas avanzadas de Química Especializada.",
];

const atencionInmediata = [
    "Atención del parto.",
    "Urgencias.",
    "Transporte asistencial medicalizado.",
    "Atención prehospitalaria.",
];

const InfoCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl text-primary">
                {icon} {title}
            </CardTitle>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
);

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

      <div className="grid md:grid-cols-2 gap-8">
          <InfoCard icon={<Beaker className="text-accent"/>} title="Áreas Especializadas">
            <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                {areasEspecializadas.map(item => <li key={item}>{item}</li>)}
            </ul>
          </InfoCard>

          <InfoCard icon={<Syringe className="text-accent"/>} title="Servicios Disponibles">
            <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                {serviciosDisponibles.map(item => <li key={item}>{item}</li>)}
            </ul>
          </InfoCard>

          <InfoCard icon={<Dna className="text-accent"/>} title="Tecnología de Última Generación">
            <p className="text-muted-foreground">
                En la Clínica de la Costa SAS, utilizamos Genexpert, una herramienta avanzada para el diagnóstico rápido y preciso de tuberculosis y otras pruebas moleculares críticas.
            </p>
          </InfoCard>

          <InfoCard icon={<HeartPulse className="text-accent"/>} title="Servicios de Atención Inmediata">
            <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                {atencionInmediata.map(item => <li key={item}>{item}</li>)}
            </ul>
          </InfoCard>
      </div>
    </div>
  );
}
