import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cirugía Vascular Y Angiológica - Clínica de la Costa',
  description: 'Información sobre el servicio de Cirugía Vascular Y Angiológica.',
};

export default function CirugiaVascularYAngiologicaPage() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-primary">Cirugía Vascular Y Angiológica</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Información detallada sobre nuestro servicio de Cirugía Vascular Y Angiológica estará disponible próximamente. Estamos trabajando para ofrecerle el contenido más completo.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
