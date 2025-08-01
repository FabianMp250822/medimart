
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, ListChecks, FileQuestion, Clock, AlertTriangle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solicitud De Historia Clínica - Clínica de la Costa',
  description: 'Conozca los requisitos, el proceso y los plazos para solicitar su historia clínica en la Clínica de la Costa, en cumplimiento con la legislación colombiana.',
};

const sections = [
  {
    value: "que-es",
    title: "¿Qué es la Historia Clínica?",
    icon: <FileQuestion className="h-5 w-5 text-accent" />,
    content: (
      <p>La historia clínica es un documento privado, obligatorio y sometido a reserva, que contiene información relevante sobre la salud del paciente, tratamientos recibidos, y demás datos relacionados con la atención médica. Su manejo está regulado por la legislación colombiana y sólo puede ser solicitado bajo ciertas condiciones.</p>
    )
  },
  {
    value: "quien-puede",
    title: "¿Quién Puede Solicitarla?",
    icon: <Users className="h-5 w-5 text-accent" />,
    content: (
      <ul className="list-disc space-y-2 pl-5">
        <li><strong>El titular:</strong> El paciente directamente, presentando su documento de identidad.</li>
        <li><strong>Terceros autorizados:</strong> Representantes legales o familiares del paciente con autorización escrita y copia de sus documentos de identidad.</li>
        <li><strong>Por orden judicial:</strong> Autoridades competentes, siempre y cuando se presente una solicitud oficial.</li>
        <li><strong>En caso de fallecimiento del paciente:</strong> Los familiares en primer grado de consanguinidad, presentando certificado de defunción y documento que acredite parentesco.</li>
      </ul>
    )
  },
  {
    value: "requisitos",
    title: "Requisitos para la Solicitud",
    icon: <ListChecks className="h-5 w-5 text-accent" />,
    content: (
      <div className="space-y-3">
        <div>
          <h4 className="font-semibold">Para el titular:</h4>
          <ul className="list-disc space-y-1 pl-5 mt-1">
            <li>Copia del documento de identidad del paciente.</li>
            <li>Formato de solicitud firmado (puede solicitarse en <a href="mailto:archivo@clinicadelacosta.co" className="text-accent hover:underline">archivo@clinicadelacosta.co</a>).</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Para terceros autorizados:</h4>
          <ul className="list-disc space-y-1 pl-5 mt-1">
            <li>Copia del documento de identidad del solicitante y del paciente.</li>
            <li>Carta de autorización firmada por el paciente.</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Por orden judicial:</h4>
          <ul className="list-disc space-y-1 pl-5 mt-1">
            <li>Copia de la solicitud oficial emitida por la autoridad competente.</li>
            <li>Documento que acredite la identidad del solicitante.</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">En caso de fallecimiento:</h4>
          <ul className="list-disc space-y-1 pl-5 mt-1">
            <li>Copia del certificado de defunción.</li>
            <li>Documento que acredite parentesco (registro civil de nacimiento, matrimonio, etc.).</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    value: "proceso",
    title: "Proceso de Solicitud",
    icon: <FileText className="h-5 w-5 text-accent" />,
    content: (
      <ol className="list-decimal space-y-2 pl-5">
        <li>Enviar un correo electrónico a <a href="mailto:archivo@clinicadelacosta.co" className="text-accent hover:underline">archivo@clinicadelacosta.co</a> con los documentos requeridos según su caso.</li>
        <li>
          Especificar en el correo la siguiente información:
          <ul className="list-disc space-y-1 pl-5 mt-1">
            <li>Nombre completo del paciente.</li>
            <li>Número de identificación.</li>
            <li>Fecha de atención médica o servicio sobre el que se solicita la historia (si aplica).</li>
            <li>Motivo de la solicitud.</li>
          </ul>
        </li>
        <li>Esperar la confirmación por parte de nuestro equipo administrativo, quienes le indicarán los pasos a seguir.</li>
      </ol>
    )
  },
  {
    value: "tiempos",
    title: "Tiempos de Respuesta",
    icon: <Clock className="h-5 w-5 text-accent" />,
    content: (
      <p>De acuerdo con la legislación colombiana, la Clínica de la Costa responderá a su solicitud dentro de un plazo máximo de 10 días hábiles. En caso de requerir tiempo adicional para la recopilación de la información, se le notificará oportunamente.</p>
    )
  },
  {
    value: "consideraciones",
    title: "Consideraciones Importantes",
    icon: <AlertTriangle className="h-5 w-5 text-accent" />,
    content: (
       <ul className="list-disc space-y-2 pl-5">
        <li>La solicitud de la primera copia de la historia clínica no tiene costo para el paciente o solicitante. Las copias adicionales pueden generar un costo.</li>
        <li>La información será entregada únicamente al titular o al tercero debidamente autorizado.</li>
        <li>En ningún caso se entregará información confidencial sin el cumplimiento estricto de los requisitos legales para proteger la privacidad de nuestros pacientes.</li>
      </ul>
    )
  }
];

export default function SolicitudHistoriaClinicaPage() {
  return (
    <div className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <FileText />
                    Solicitud de Historia Clínica
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    La Clínica de la Costa facilita la solicitud de historias clínicas, cumpliendo con la legislación colombiana en materia de protección de datos personales y confidencialidad. Aquí encontrará los pasos y requisitos para realizar la solicitud correctamente.
                </p>
            </CardContent>
        </Card>

        <Accordion type="single" collapsible className="w-full">
            {sections.map((section) => (
            <AccordionItem value={section.value} key={section.value}>
                <AccordionTrigger className="font-semibold hover:no-underline text-lg">
                <div className="flex items-center gap-3">
                    {section.icon}
                    <span>{section.title}</span>
                </div>
                </AccordionTrigger>
                <AccordionContent className="pl-11 prose max-w-none text-muted-foreground">
                    {section.content}
                </AccordionContent>
            </AccordionItem>
            ))}
      </Accordion>
    </div>
  );
}
