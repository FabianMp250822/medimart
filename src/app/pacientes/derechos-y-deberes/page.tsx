import { FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Derechos Y Deberes Del Paciente - Clínica de la Costa',
  description: 'Información sobre los derechos y deberes del paciente en la Clínica de la Costa.',
};

export default function DerechosDeberesPage() {
  return (
    <div className="space-y-8">
        <div className="text-center">
            <FileText className="mx-auto h-16 w-16 text-accent mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Derechos Y Deberes Del Paciente</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Contenido sobre los derechos y deberes del paciente próximamente.
            </p>
        </div>
    </div>
  );
}
