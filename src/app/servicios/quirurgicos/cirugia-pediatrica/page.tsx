import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cirugía Pediátrica - Clínica de la Costa',
  description: 'Información sobre el servicio de Cirugía Pediátrica.',
};

export default function CirugiaPediatricaPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-primary">Cirugía Pediátrica</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Información detallada sobre nuestro servicio de Cirugía Pediátrica estará disponible próximamente. Estamos trabajando para ofrecerle el contenido más completo.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
