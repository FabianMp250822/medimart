import { FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preparación Para Procedimientos - Clínica de la Costa',
  description: 'Información sobre la preparación para procedimientos en la Clínica de la Costa.',
};

export default function PreparacionProcedimientosPage() {
  return (
    <div className="space-y-8">
        <div className="text-center">
            <FileText className="mx-auto h-16 w-16 text-accent mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Preparación Para Procedimientos</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Contenido sobre preparación para procedimientos próximamente.
            </p>
        </div>
    </div>
  );
}
