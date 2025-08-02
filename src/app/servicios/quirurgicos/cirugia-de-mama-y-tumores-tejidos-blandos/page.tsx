import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cirugía De Mama Y Tumores Tejidos Blandos - Clínica de la Costa',
  description: 'Información sobre el servicio de Cirugía De Mama Y Tumores Tejidos Blandos.',
};

export default function CirugiaDeMamaYTumoresTejidosBlandosPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-primary">Cirugía De Mama Y Tumores Tejidos Blandos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Información detallada sobre nuestro servicio de Cirugía De Mama Y Tumores Tejidos Blandos estará disponible próximamente. Estamos trabajando para ofrecerle el contenido más completo.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
