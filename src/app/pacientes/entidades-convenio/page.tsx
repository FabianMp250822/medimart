import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Entidades En Convenio - Clínica de la Costa',
  description: 'Información sobre las entidades en convenio con la Clínica de la Costa.',
};

export default function EntidadesConvenioPage() {
  return (
    <div>
        <div className="text-center mb-12">
            <FileText className="mx-auto h-16 w-16 text-accent mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Entidades En Convenio</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Contenido sobre las entidades en convenio proximamente.
            </p>
        </div>
    </div>
  );
}
