import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tus Resultados Médicos - Clínica de la Costa',
  description: 'Información sobre tus resultados médicos en la Clínica de la Costa.',
};

export default function ResultadosMedicosPage() {
  return (
    <div>
        <div className="text-center mb-12">
            <FileText className="mx-auto h-16 w-16 text-accent mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Tus Resultados Médicos</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Contenido sobre tus resultados médicos proximamente.
            </p>
        </div>
    </div>
  );
}
