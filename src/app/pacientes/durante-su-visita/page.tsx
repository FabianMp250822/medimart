
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Fingerprint, Hand, Shield, Ban, Siren, Trash2, UserX, CameraOff, Bell, UserCheck, type LucideIcon } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Durante Su Visita - Clínica de la Costa',
  description: 'Conozca las recomendaciones de seguridad para garantizar una estancia segura y agradable durante su visita en la Clínica de la Costa.',
};

const recommendations: { title: string; icon: LucideIcon; content: React.ReactNode }[] = [
    {
        title: "Identificación Correcta",
        icon: UserCheck,
        content: (
            <ul className="list-disc space-y-2 pl-5">
                <li><strong>Registro de visitantes:</strong> Al ingresar, todos los visitantes deben registrarse en recepción presentando un documento de identidad válido.</li>
                <li><strong>Uso de credenciales:</strong> Es obligatorio portar la credencial de visitante en un lugar visible durante toda la estancia en la clínica.</li>
            </ul>
        )
    },
    {
        title: "Higiene de Manos",
        icon: Hand,
        content: (
            <ul className="list-disc space-y-2 pl-5">
                <li><strong>Lavado de manos:</strong> Lávese las manos con agua y jabón al entrar y salir de la habitación del paciente.</li>
                <li><strong>Uso de desinfectante:</strong> Utilice gel antibacterial disponible en dispensadores ubicados estratégicamente en la clínica.</li>
            </ul>
        )
    },
    {
        title: "Uso de Elementos de Protección Personal (EPP)",
        icon: Shield,
        content: (
            <ul className="list-disc space-y-2 pl-5">
                <li><strong>Mascarillas:</strong> El uso de mascarilla es obligatorio en todas las áreas de la clínica.</li>
                <li><strong>Guantes y batas:</strong> En casos específicos, se requerirá el uso de guantes y batas desechables según las indicaciones del personal de salud.</li>
            </ul>
        )
    },
    {
        title: "Restricciones de Visita",
        icon: UserX,
        content: (
            <ul className="list-disc space-y-2 pl-5">
                <li><strong>Horarios de visita:</strong> Respete los horarios establecidos para visitas.</li>
                <li><strong>Número de visitantes:</strong> Limite el número de visitantes por paciente para evitar aglomeraciones.</li>
                <li><strong>Pacientes en aislamiento:</strong> Consulte al personal antes de visitar pacientes en aislamiento.</li>
            </ul>
        )
    },
    {
        title: "Comportamiento dentro de la Clínica",
        icon: Bell,
        content: (
            <ul className="list-disc space-y-2 pl-5">
                <li><strong>Silencio:</strong> Mantenga un ambiente tranquilo.</li>
                <li><strong>Higiene personal:</strong> Evite visitar la clínica si presenta síntomas de enfermedad contagiosa.</li>
                <li><strong>Prohibición de fumar:</strong> Está prohibido fumar en todas las instalaciones.</li>
            </ul>
        )
    },
    {
        title: "Participación en la Seguridad del Paciente",
        icon: Fingerprint,
        content: (
            <ul className="list-disc space-y-2 pl-5">
                <li><strong>Comunicación:</strong> Informe al personal de salud sobre cualquier observación relacionada con la seguridad del paciente.</li>
                <li><strong>Cumplimiento de indicaciones:</strong> Siga las instrucciones proporcionadas por el personal de salud.</li>
            </ul>
        )
    },
    {
        title: "Manejo de Residuos",
        icon: Trash2,
        content: (
            <ul className="list-disc space-y-2 pl-5">
                <li><strong>Desechos comunes:</strong> Deposite los residuos en los recipientes adecuados.</li>
                <li><strong>Objetos punzocortantes:</strong> No manipule objetos punzocortantes; informe al personal.</li>
            </ul>
        )
    },
    {
        title: "Evacuación y Emergencias",
        icon: Siren,
        content: (
            <ul className="list-disc space-y-2 pl-5">
                <li><strong>Salidas de emergencia:</strong> Familiarícese con las rutas de evacuación y las salidas de emergencia señalizadas.</li>
                <li><strong>Procedimientos de emergencia:</strong> En caso de una emergencia, siga las instrucciones del personal.</li>
            </ul>
        )
    },
    {
        title: "Prohibición de Fotografía y Grabación",
        icon: CameraOff,
        content: (
            <ul className="list-disc space-y-2 pl-5">
                <li><strong>Privacidad:</strong> No está permitido tomar fotografías ni realizar grabaciones dentro de las instalaciones para proteger la privacidad de pacientes y personal.</li>
            </ul>
        )
    },
    {
        title: "Acompañamiento de Menores",
        icon: Ban,
        content: (
            <ul className="list-disc space-y-2 pl-5">
                <li><strong>Restricciones:</strong> Se desaconseja la visita de menores de edad salvo en casos excepcionales y con autorización previa del personal.</li>
            </ul>
        )
    }
];

export default function DuranteVisitaPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-primary">
            <UserCheck />
            Recomendaciones Durante su Visita
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Para garantizar una estancia segura y agradable en la Clínica de la Costa, le pedimos seguir estas recomendaciones. Su colaboración es fundamental para el bienestar de todos.
          </p>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full">
        {recommendations.map((item, index) => (
          <AccordionItem value={`item-${index}`} key={item.title}>
            <AccordionTrigger className="font-semibold hover:no-underline text-lg">
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5 text-accent" />
                <span>{item.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-11 prose max-w-none text-muted-foreground">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
