
import { FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preparación Para Exámenes Médicos - Clínica de la Costa',
  description: 'Encuentre aquí las instrucciones detalladas para la preparación de exámenes en la Clínica de la Costa.',
};

export default function PreparacionExamenesPage() {
  return (
    <div className="space-y-8">
        <div className="text-center">
            <FileText className="mx-auto h-16 w-16 text-accent mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Preparación Para Exámenes Médicos</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Contenido sobre preparación para exámenes próximamente.
            </p>
        </div>
    </div>
  );
}

    