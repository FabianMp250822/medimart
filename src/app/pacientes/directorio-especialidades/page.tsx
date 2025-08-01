import { FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Directorio De Especialidades Y Servicios - Clínica de la Costa',
  description: 'Información sobre el directorio de especialidades y servicios en la Clínica de la Costa.',
};

export default function DirectorioEspecialidadesPage() {
  return (
    <div className="space-y-8">
        <div className="text-center">
            <FileText className="mx-auto h-16 w-16 text-accent mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Directorio De Especialidades Y Servicios</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Contenido sobre el directorio de especialidades y servicios próximamente.
            </p>
        </div>
    </div>
  );
}
