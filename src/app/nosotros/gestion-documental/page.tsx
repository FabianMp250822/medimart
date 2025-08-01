import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Gestión Documental - Clínica de la Costa',
  description: 'Información sobre la gestión documental y acceso a documentos de interés público de la Clínica de la Costa.',
};

export default function GestionDocumentalPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
            <FileText className="mx-auto h-16 w-16 text-accent mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Gestión Documental</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Acceso a la información y documentos relevantes de nuestra gestión.
            </p>
        </div>
        
        <main className="mt-12">
            <Card>
                <CardHeader>
                    <CardTitle>Documentos de Interés</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                    <p>
                        En esta sección, encontrará documentos importantes relacionados con la gestión, políticas y funcionamiento de la Clínica de la Costa. Nuestro compromiso es con la transparencia y el fácil acceso a la información para todos nuestros grupos de interés.
                    </p>
                    <p>
                        Actualmente estamos trabajando en la digitalización y organización de nuestros documentos para ofrecerlos en esta plataforma. Vuelva pronto para encontrar informes de gestión, manuales, políticas y otros documentos de interés público.
                    </p>
                    <p>
                        Si requiere algún documento específico con urgencia, por favor comuníquese con nuestra oficina de atención al usuario.
                    </p>
                </CardContent>
            </Card>
        </main>
      </div>
    </div>
  );
}
