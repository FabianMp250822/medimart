import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solicitud De Historia Clínica - Clínica de la Costa',
  description: 'Información sobre cómo solicitar la historia clínica en la Clínica de la Costa.',
};

export default function SolicitudHistoriaClinicaPage() {
  return (
    <div>
        <div className="text-center mb-12">
            <FileText className="mx-auto h-16 w-16 text-accent mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Solicitud De Historia Clínica</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Contenido sobre la solicitud de historia clínica proximamente.
            </p>
        </div>
    </div>
  );
}
