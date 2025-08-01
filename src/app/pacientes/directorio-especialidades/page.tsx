import { FileText, Search } from 'lucide-react';
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DirectorioList } from '@/components/pacientes/directorio-list';

export const metadata: Metadata = {
  title: 'Directorio De Especialidades Y Servicios - Clínica de la Costa',
  description: 'Encuentre información de contacto de nuestras especialidades y servicios, incluyendo ubicación, teléfonos y correos electrónicos. Utilice nuestro buscador para un acceso rápido.',
};

export default function DirectorioEspecialidadesPage() {
  return (
    <div className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                    <Search />
                    Directorio de Especialidades y Servicios
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Encuentre la información de contacto de nuestras áreas y servicios. Utilice el buscador para filtrar los resultados rápidamente.
                </p>
            </CardContent>
        </Card>
        <DirectorioList />
    </div>
  );
}
