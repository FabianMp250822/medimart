import { safeQuery } from '@/lib/firebase-helpers';
import { OfertaEmpleo } from '@/types/oferta-empleo';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { Briefcase, MapPin, Clock, GraduationCap, DollarSign, Calendar, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShareButtonsJob } from '@/components/ofertas/share-buttons-job';
import { ApplyButton } from '@/components/ofertas/apply-button';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

type Props = {
  params: Promise<{ id: string }>;
};

async function getOferta(id: string): Promise<OfertaEmpleo | null> {
  return safeQuery(async (db) => {
    const docRef = db.collection('ofertasEmpleos').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return null;
    }

    return { id: docSnap.id, ...docSnap.data() } as OfertaEmpleo;
  }, null);
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const oferta = await getOferta(id);

  if (!oferta) {
    return {
      title: 'Oferta no encontrada',
    };
  }
  
  const description = `Aplica a la vacante de ${oferta.titulo} en ${oferta.ubicacion}. ${oferta.descripcion.substring(0, 100)}...`;

  return {
    title: `${oferta.titulo} - Clínica de la Costa`,
    description: description,
    openGraph: {
      title: `Vacante: ${oferta.titulo} | Clínica de la Costa`,
      description: description,
      type: 'website',
      url: `https://clinica-de-la-costa.app/trabaja-con-nosotros/${oferta.id}`,
      images: [
        {
          url: 'https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Flogo%20(1).png?alt=media&token=961c0f8e-b866-47fd-b4a1-d942f2011f82',
          width: 800,
          height: 600,
          alt: 'Logo Clínica de la Costa',
        },
      ],
    },
    twitter: {
        card: 'summary_large_image',
        title: `Vacante: ${oferta.titulo}`,
        description: description,
        images: ['https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2Flogo%20(1).png?alt=media&token=961c0f8e-b866-47fd-b4a1-d942f2011f82'],
    }
  };
}

const DetailItem = ({ icon, label, children }: { icon: React.ReactNode, label: string, children: React.ReactNode }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0 mr-4 text-accent">{icon}</div>
        <div>
            <p className="font-semibold text-primary">{label}</p>
            <div className="text-muted-foreground">{children}</div>
        </div>
    </div>
);


export default async function OfertaDetailPage({ params }: Props) {
  const { id } = await params;
  const oferta = await getOferta(id);

  if (!oferta) {
    notFound();
  }

  return (
    <div className="bg-gray-50/50">
      <div className="container mx-auto py-12 px-4">
        <div className="lg:max-w-4xl mx-auto">
            <div className="mb-8">
                <Button asChild variant="outline">
                    <Link href="/trabaja-con-nosotros">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver a las ofertas
                    </Link>
                </Button>
            </div>

            <Card className="overflow-hidden shadow-lg">
                <CardHeader className="bg-primary/5 p-6 md:p-8 space-y-4">
                    <div className="flex flex-wrap justify-between items-start gap-4">
                        <div>
                            <Badge variant="secondary" className="mb-2">{oferta.tipoContrato}</Badge>
                            <CardTitle className="text-3xl md:text-4xl font-bold text-primary">{oferta.titulo}</CardTitle>
                        </div>
                         <ApplyButton oferta={oferta} />
                    </div>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground pt-2">
                        <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/> {oferta.ubicacion}</div>
                        <div className="flex items-center gap-2"><Calendar className="h-4 w-4"/> Publicado el {new Date(oferta.fechaPublicacion).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</div>
                    </div>
                </CardHeader>

                <CardContent className="p-6 md:p-8 grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">
                        <div>
                            <h3 className="text-xl font-bold text-primary mb-4 border-b pb-2">Descripción del Puesto</h3>
                            <p className="text-foreground whitespace-pre-line">{oferta.descripcion}</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-primary mb-4 border-b pb-2">Requisitos</h3>
                            <p className="text-foreground whitespace-pre-line">{oferta.requisitos}</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                       <Card className="bg-primary/5">
                           <CardContent className="p-4 space-y-4">
                                <DetailItem icon={<DollarSign className="h-6 w-6"/>} label="Sueldo">
                                    {oferta.sueldo ? `$${Number(oferta.sueldo).toLocaleString('es-CO')}` : 'A convenir'}
                                </DetailItem>
                                <DetailItem icon={<Clock className="h-6 w-6"/>} label="Jornada">
                                    {oferta.jornada}
                                </DetailItem>
                                <DetailItem icon={<Briefcase className="h-6 w-6"/>} label="Experiencia">
                                    {oferta.experiencia}
                                </DetailItem>
                                <DetailItem icon={<GraduationCap className="h-6 w-6"/>} label="Estudios Mínimos">
                                    {oferta.estudios}
                                </DetailItem>
                           </CardContent>
                       </Card>

                       <div className="text-center">
                         <ShareButtonsJob oferta={oferta} />
                       </div>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
