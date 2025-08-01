import { FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solicitar Cita Médica - Clínica de la Costa',
  description: 'Información sobre cómo solicitar una cita médica en la Clínica de la Costa.',
};

export default function SolicitarCitaPage() {
  return (
    <div className="space-y-8">
        <div className="text-center">
            <FileText className="mx-auto h-16 w-16 text-accent mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Solicitar Cita Médica</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Próximamente podrás solicitar tu cita médica desde nuestro sitio web.
            </p>
        </div>
    </div>
  );
}
