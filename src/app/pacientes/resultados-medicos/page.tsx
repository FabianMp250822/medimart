import { Construction } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tus Resultados Médicos - Clínica de la Costa',
  description: 'Accede a los resultados de tus exámenes y procedimientos médicos de forma segura y rápida. Próximamente disponible.',
};

export default function ResultadosMedicosPage() {
  return (
    <div className="space-y-8">
        <div className="text-center">
            <Construction className="mx-auto h-16 w-16 text-accent mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Tus Resultados Médicos</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Estamos trabajando en esta sección para que pronto puedas consultar tus resultados en línea.
            </p>
        </div>
    </div>
  );
}
