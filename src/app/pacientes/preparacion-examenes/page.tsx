
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Beaker, Droplet, Monitor, TestTube } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preparación Para Exámenes Médicos - Clínica de la Costa',
  description: 'Encuentre aquí las instrucciones detalladas para la preparación de exámenes médicos como análisis de sangre, pruebas de orina, tomografías y más en la Clínica de la Costa.',
};

const examenes = [
  {
    title: "Exámenes de Sangre",
    icon: <Droplet className="h-6 w-6 text-accent" />,
    content: (
      <ul className="space-y-2 list-disc list-inside text-muted-foreground">
        <li><strong>Ayuno:</strong> Para la mayoría de los análisis, es necesario un ayuno de 8 a 12 horas. Evita alimentos y bebidas (excepto agua).</li>
        <li><strong>Hidratación:</strong> Beber agua facilita la extracción de sangre.</li>
        <li><strong>Medicamentos:</strong> Consulta con tu médico si debes suspender algún medicamento.</li>
      </ul>
    )
  },
  {
    title: "Pruebas de Orina",
    icon: <Beaker className="h-6 w-6 text-accent" />,
    content: (
      <ul className="space-y-2 list-disc list-inside text-muted-foreground">
        <li><strong>Recolecta la Primera Orina de la Mañana:</strong> Es la más recomendada para la mayoría de las pruebas.</li>
        <li><strong>Higiene:</strong> Lava y seca tus manos y genitales antes de recolectar la muestra.</li>
        <li><strong>Envase Estéril:</strong> Usa el recipiente proporcionado por el laboratorio para evitar contaminaciones.</li>
      </ul>
    )
  },
  {
    title: "Pruebas de Imagen (Rayos X, Resonancia, TAC)",
    icon: <Monitor className="h-6 w-6 text-accent" />,
    content: (
      <ul className="space-y-2 list-disc list-inside text-muted-foreground">
        <li><strong>Ropa:</strong> Viste ropa cómoda y sin elementos metálicos.</li>
        <li><strong>Objetos Metálicos:</strong> Retira todas las joyas y objetos metálicos antes del examen.</li>
        <li><strong>Embarazo:</strong> Si estás embarazada o sospechas estarlo, informa al personal.</li>
        <li><strong>Contraste:</strong> Si tu prueba requiere contraste, sigue las indicaciones específicas del personal médico.</li>
      </ul>
    )
  },
  {
    title: "Colonoscopia",
    icon: <TestTube className="h-6 w-6 text-accent" />,
    content: (
      <ul className="space-y-2 list-disc list-inside text-muted-foreground">
        <li><strong>Dieta Líquida:</strong> Sigue una dieta líquida clara el día anterior al examen.</li>
        <li><strong>Laxantes:</strong> Utiliza los laxantes recetados para una limpieza completa del colon.</li>
        <li><strong>Hidratación:</strong> Es fundamental mantenerse bien hidratado durante la preparación.</li>
      </ul>
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
            Una preparación adecuada es crucial para obtener resultados precisos. A continuación, encontrarás las guías para los exámenes más comunes. Por favor, síguelas cuidadosamente y consulta a tu médico si tienes alguna duda.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        {examenes.map((examen) => (
          <Card key={examen.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl text-primary">
                {examen.icon}
                <span>{examen.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              {examen.content}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
