import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cirugía Plástica Y Estética - Clínica de la Costa',
  description: 'Información sobre el servicio de Cirugía Plástica Y Estética.',
};

export default function CirugiaPlasticaYEsteticaPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-primary">Cirugía Plástica Y Estética</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Información detallada sobre nuestro servicio de Cirugía Plástica Y Estética estará disponible próximamente. Estamos trabajando para ofrecerle el contenido más completo.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
