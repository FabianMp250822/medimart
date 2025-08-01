
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookUser, Download, ExternalLink, FileText, Info, Calendar, Shield, Users, FileSearch } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Reglamento Interno de Trabajo - Clínica de la Costa',
  description: 'Consulte el reglamento interno de trabajo de la Clínica de la Costa. Normas y políticas para un ambiente laboral seguro y profesional.',
};

const pdfUrl = "https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/fondosweb%2FREGLAMENTO%20INTERNO%20DE%20TRABAJO%20CL%C3%8DNICA%20DE%20LA%20COSTA%20ACT%20JULIO%20-2025%20.pdf?alt=media&token=d1271ffd-7b2d-4541-8223-8e39a3a80583";

const DocumentDetail = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="flex items-center gap-3">
        <div className="text-accent">{icon}</div>
        <div>
            <p className="text-sm font-semibold text-muted-foreground">{label}</p>
            <p className="font-medium text-foreground">{value}</p>
        </div>
    </div>
);

export default function ReglamentoInternoPage() {
  return (
    <div className="space-y-8">
        <div className="text-center">
            <BookUser className="mx-auto h-16 w-16 text-accent mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-primary">Reglamento Interno de Trabajo</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                El Reglamento Interno de Trabajo establece las normas y políticas que rigen las relaciones laborales en la Clínica de la Costa, garantizando un ambiente seguro, equitativo y profesional.
            </p>
        </div>
        
        <main className="space-y-8">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                       <FileText /> Documento Oficial
                    </CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 p-4 bg-primary/5 rounded-lg">
                       <DocumentDetail icon={<Calendar size={20} />} label="Versión" value="Julio 2025" />
                       <DocumentDetail icon={<Shield size={20} />} label="Estado" value="Vigente" />
                       <DocumentDetail icon={<BookUser size={20} />} label="Tipo" value="Reglamento Interno" />
                       <DocumentDetail icon={<Users size={20} />} label="Aplicabilidad" value="Colaboradores" />
                   </div>
                   
                   <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Button asChild size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90">
                           <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                               <ExternalLink className="mr-2 h-5 w-5" />
                               Ver en Nueva Pestaña
                           </a>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                           <a href={pdfUrl} download="Reglamento_Interno_Trabajo_Clinica_Costa_2025.pdf">
                               <Download className="mr-2 h-5 w-5" />
                               Descargar PDF
                           </a>
                        </Button>
                   </div>
                </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-primary">
                  <FileSearch /> Visualización del Documento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative w-full h-[800px] border rounded-lg overflow-hidden bg-muted">
                   <iframe
                      src={pdfUrl}
                      width="100%"
                      height="100%"
                      className="border-none"
                      title="Reglamento Interno de Trabajo - Clínica de la Costa"
                    />
                </div>
                 <p className="text-muted-foreground text-center mt-2 text-sm">
                    Si no puede visualizar el documento, 
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline ml-1">
                      haga clic aquí para abrirlo en una nueva pestaña
                    </a>
                  </p>
              </CardContent>
            </Card>

             <Alert>
                <Info className="h-5 w-5 text-accent" />
                <AlertTitle className="font-bold text-primary">Información Importante</AlertTitle>
                <AlertDescription>
                   <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                        <li>Este reglamento es de obligatorio cumplimiento para todos los colaboradores de la Clínica de la Costa.</li>
                        <li>Las actualizaciones y modificaciones serán comunicadas oportunamente a través de los canales oficiales.</li>
                        <li>Para consultas específicas, contacte al Departamento de Recursos Humanos.</li>
                   </ul>
                </AlertDescription>
            </Alert>
        </main>
    </div>
  );
}
