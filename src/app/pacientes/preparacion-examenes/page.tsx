
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Beaker, Droplet, Monitor, TestTube } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preparación Para Exámenes Médicos - Clínica de la Costa',
  description: 'Encuentre aquí las instrucciones detalladas para la preparación de exámenes médicos como análisis de sangre, pruebas de orina, tomografías y más en la Clínica de la Costa.',
};

const examenes = [
  {
    value: "sangre",
    title: "Exámenes de Sangre",
    icon: <Droplet className="h-5 w-5 text-accent" />,
    content: (
      <div className="prose max-w-none text-muted-foreground">
        <ul>
          <li><strong>Ayuno:</strong> Para la mayoría de los análisis de sangre, es necesario un ayuno de 8 a 12 horas. Evita alimentos, bebidas (excepto agua) y masticar chicle.</li>
          <li><strong>Hidratación:</strong> Puedes beber agua para mantenerte hidratado, lo cual facilita la extracción de sangre.</li>
          <li><strong>Medicamentos:</strong> Consulta con tu médico si debes suspender algún medicamento antes del examen.</li>
        </ul>
      </div>
    )
  },
  {
    value: "orina",
    title: "Pruebas de Orina",
    icon: <Beaker className="h-5 w-5 text-accent" />,
    content: (
        <div className="prose max-w-none text-muted-foreground">
           <ul>
                <li><strong>Recolecta la Primera Orina de la Mañana:</strong> Para la mayoría de las pruebas, se recomienda recolectar la primera orina del día.</li>
                <li><strong>Higiene:</strong> Lava y seca tus manos y genitales antes de recolectar la muestra.</li>
                <li><strong>Envase Estéril:</strong> Usa el recipiente proporcionado por el laboratorio para evitar contaminaciones.</li>
            </ul>
        </div>
    )
  },
  {
    value: "imagenes",
    title: "Pruebas de Imagen (Rayos X, Resonancia, TAC)",
    icon: <Monitor className="h-5 w-5 text-accent" />,
    content: (
        <div className="prose max-w-none text-muted-foreground">
           <ul>
                <li><strong>Ropa:</strong> Lleva ropa cómoda y sin elementos metálicos.</li>
                <li><strong>Objetos Metálicos:</strong> Retira joyas, relojes, cinturones y otros objetos metálicos antes del examen.</li>
                <li><strong>Consentimiento:</strong> Si estás embarazada o sospechas estarlo, informa al personal antes del procedimiento.</li>
                <li><strong>Contraste:</strong> Algunas pruebas requieren el uso de medios de contraste. Sigue las indicaciones específicas proporcionadas por el laboratorio.</li>
            </ul>
        </div>
    )
  },
   {
    value: "colonoscopia",
    title: "Colonoscopia",
    icon: <TestTube className="h-5 w-5 text-accent" />,
    content: (
        <div className="prose max-w-none text-muted-foreground">
            <ul>
                <li><strong>Dieta Líquida:</strong> Sigue una dieta líquida clara el día anterior al examen.</li>
                <li><strong>Laxantes:</strong> Usa los laxantes recetados para limpiar completamente el colon.</li>
                <li><strong>Hidratación:</strong> Mantente bien hidratado durante la preparación.</li>
            </ul>
        </div>
    )
  }
];

export default function PreparacionExamenesPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl text-primary">
            <Beaker />
            Instrucciones para Exámenes Médicos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            La preparación adecuada para los exámenes médicos es crucial para obtener resultados precisos y confiables. Aquí encontrarás instrucciones detalladas para los exámenes más comunes. Por favor, sigue estas indicaciones cuidadosamente.
          </p>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full">
        {examenes.map((examen) => (
          <AccordionItem value={examen.value} key={examen.value}>
            <AccordionTrigger className="font-semibold hover:no-underline text-lg">
              <div className="flex items-center gap-3">
                {examen.icon}
                <span>{examen.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pl-11">
              {examen.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
