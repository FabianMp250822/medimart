import { safeQuery } from '@/lib/firebase-helpers';
import type { Metadata } from 'next';
import Image from 'next/image';
import { OfertaEmpleo } from '@/types/oferta-empleo';
import { OfertasList } from '@/components/ofertas/ofertas-list';

export const metadata: Metadata = {
  title: 'Trabaja con Nosotros - Clínica de la Costa',
  description: 'Explora las oportunidades de carrera en Clínica de la Costa. Únete a nuestro equipo de profesionales y ayúdanos a brindar una atención excepcional.',
};

async function getOfertas(): Promise<OfertaEmpleo[]> {
  return safeQuery(async (db) => {
    const ofertasSnapshot = await db.collection('ofertasEmpleos').orderBy('fechaPublicacion', 'desc').get();
    if (ofertasSnapshot.empty) {
      return [];
    }
    const ofertas: OfertaEmpleo[] = ofertasSnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<OfertaEmpleo, 'id'>),
    }));
    return ofertas;
  }, []);
}

export default async function TrabajaConNosotrosPage() {
  const ofertas = await getOfertas();

  return (
    <div className="bg-background">
       <div className="relative bg-primary/80 text-white py-20 sm:py-28 md:py-32 flex items-center justify-center text-center">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/banner%2Fmisionvision_(1)-transformed.jpeg?alt=media&token=fc787cf2-c0e8-4f7a-a5a4-da0291536d42"
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
