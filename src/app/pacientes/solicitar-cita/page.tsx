import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solicitar Cita Médica - Clínica de la Costa',
  description: 'Información sobre cómo solicitar una cita médica en la Clínica de la Costa.',
};

export default function SolicitarCitaPage() {
  return (
    <div>
        <div className="text-center mb-12">
            <FileText className="mx-auto h-16 w-16 text-accent mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Solicitar Cita Médica</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Proximamente podrás solicitar tu cita médica desde nuestro sitio web.
            </p>
        </div>
    </div>
  );
}
