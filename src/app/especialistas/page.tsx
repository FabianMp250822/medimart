import { adminDb } from '@/lib/firebase-admin';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Medico } from '@/types/medico';
import { EspecialistasList } from '@/components/especialistas/especialistas-list';

export const metadata: Metadata = {
  title: 'Especialistas - Clínica de la Costa',
  description: 'Conozca a nuestro equipo de especialistas médicos. Profesionales altamente calificados y comprometidos con su salud.',
};

async function getEspecialistas(): Promise<Medico[]> {
  const featuredMedicoIds = ['p3DcIXWsU0fJ4m0uamrr', 'eM8fDVBxZ7KebIU5vJVT'];
  try {
    const especialistasSnapshot = await adminDb.collection('medicos').orderBy('nombreCompleto').get();
    if (especialistasSnapshot.empty) {
      console.log('No specialists found.');
      return [];
    }
    let especialistas: Medico[] = especialistasSnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Medico, 'id'>),
    }));

    const featuredMedicos = featuredMedicoIds.map(id => especialistas.find(m => m.id === id)).filter((m): m is Medico => !!m);
    const otherMedicos = especialistas.filter(m => !featuredMedicoIds.includes(m.id));
    
    // Create the final sorted list
    const finalMedicos = [...featuredMedicos, ...otherMedicos];

    return finalMedicos;
  } catch (error) {
    console.error("Error fetching specialists: ", error);
    return [];
  }
}

export default async function EspecialistasPage() {
  const especialistas = await getEspecialistas();

  return (
    <div className="bg-background">
      <div className="relative bg-primary/80 text-white py-20 sm:py-28 md:py-32 flex items-center justify-center text-center">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/banner%2Fmisionvision_(1)-transformed.jpeg?alt=media&token=fc787cf2-c0e8-4f7a-a5a4-da0291536d42"
          alt="Equipo médico en una reunión"
          layout="fill"
          objectFit="cover"
          className="z-0 opacity-20"
          data-ai-hint="medical team meeting"
        />
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-bold">Nuestro Equipo de Especialistas</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            Profesionales con vocación y experiencia, dedicados a su bienestar.
          </p>
        </div>
      </div>

      <main className="container mx-auto py-12 px-4">
        <EspecialistasList especialistas={especialistas} />
      </main>
    </div>
  );
}
