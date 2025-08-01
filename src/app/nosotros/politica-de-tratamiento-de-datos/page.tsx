import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DatabaseLock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Tratamiento de Datos - Clínica de la Costa',
  description: 'Consulte nuestra política para el tratamiento y protección de datos personales, en cumplimiento con la Ley 1581 de 2012.',
};

export default function PoliticaDatosPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
            <DatabaseLock className="mx-auto h-16 w-16 text-accent mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Política de Tratamiento de Datos</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Su privacidad y la protección de su información son nuestra prioridad.
            </p>
        </div>
        
        <main className="mt-12">
            <Card>
                <CardHeader>
                    <CardTitle>Compromiso con la Protección de Datos Personales</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                    <p>
                        De conformidad con lo dispuesto en la Ley 1581 de 2012 y su Decreto Reglamentario 1377 de 2013, la <strong>Clínica de la Costa S.A.S.</strong>, como responsable del tratamiento de datos personales, informa a todos los titulares de datos que reposan en nuestras bases de datos, que hemos adoptado una Política de Tratamiento de Datos Personales que garantiza sus derechos.
                    </p>
                    <p>
                        El propósito de esta política es informar sobre los datos que recolectamos, las finalidades de su tratamiento, sus derechos como titular (conocer, actualizar, rectificar y suprimir sus datos), y los canales a través de los cuales puede ejercerlos.
                    </p>
                    <p>
                        Para consultar nuestra política de tratamiento de datos personales en detalle, por favor descargue el siguiente documento:
                    </p>
                    <a href="#" className="no-underline">
                        <div className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 font-semibold text-accent-foreground hover:bg-accent/90">
                            <FileText className="h-5 w-5" />
                            <span>Descargar Política de Tratamiento de Datos</span>
                        </div>
                    </a>
                </CardContent>
            </Card>
        </main>
      </div>
    </div>
  );
}

// Importar el ícono si aún no lo has hecho
import { FileText } from 'lucide-react';
