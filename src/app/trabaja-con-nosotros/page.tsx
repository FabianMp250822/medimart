import { adminDb } from '@/lib/firebase-admin';
import type { Metadata } from 'next';
import Image from 'next/image';
import { OfertaEmpleo } from '@/types/oferta-empleo';
import { OfertasList } from '@/components/ofertas/ofertas-list';

export const metadata: Metadata = {
  title: 'Trabaja con Nosotros - Clínica de la Costa',
  description: 'Explora las oportunidades de carrera en Clínica de la Costa. Únete a nuestro equipo de profesionales y ayúdanos a brindar una atención excepcional.',
};

async function getOfertas(): Promise<OfertaEmpleo[]> {
  try {
    const ofertasSnapshot = await adminDb.collection('ofertasEmpleos').orderBy('fechaPublicacion', 'desc').get();
    if (ofertasSnapshot.empty) {
      return [];
    }
    const ofertas: OfertaEmpleo[] = ofertasSnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<OfertaEmpleo, 'id'>),
    }));
    return ofertas;
  } catch (error) {
    console.error("Error fetching job offers: ", error);
    return [];
  }
}

export default async function TrabajaConNosotrosPage() {
  const ofertas = await getOfertas();

  return (
    <div className="bg-background">
       <div className="relative bg-primary/80 text-white py-20 sm:py-28 md:py-32 flex items-center justify-center text-center">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/fondosweb%2Ftrabajo.webp?alt=media&token=c191a92a-b7e6-42d7-848e-f1406e22c0a6"
          alt="Equipo de trabajo colaborando"
          layout="fill"
          objectFit="cover"
          className="z-0 opacity-20"
          data-ai-hint="team collaboration"
        />
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-bold">Oportunidades de Carrera</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            Únete a un equipo comprometido con la excelencia y el cuidado de la salud.
          </p>
        </div>
      </div>

      <main className="container mx-auto py-12 px-4">
        <OfertasList ofertas={ofertas} />
      </main>
    </div>
  );
}
