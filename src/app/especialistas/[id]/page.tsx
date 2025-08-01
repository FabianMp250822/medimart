import { adminDb } from '@/lib/firebase-admin';
import { Medico } from '@/types/medico';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Briefcase, GraduationCap, Building, Star, Award, BookOpen, Stethoscope, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

type Props = {
  params: { id: string };
};

async function getEspecialista(id: string): Promise<Medico | null> {
  try {
    const docRef = adminDb.collection('medicos').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return null;
    }

    return { id: docSnap.id, ...docSnap.data() } as Medico;
  } catch (error) {
    console.error("Error fetching specialist: ", error);
    return null;
  }
}

async function getOtherEspecialistas(currentId: string): Promise<Medico[]> {
    try {
        const snapshot = await adminDb.collection('medicos').limit(10).get();
        const medicos = snapshot.docs
            .map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }))
            .filter(medico => medico.id !== currentId)
            .slice(0, 5);
        return medicos;
    } catch (error) {
        console.error("Error fetching other specialists: ", error);
        return [];
    }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const especialista = await getEspecialista(params.id);

  if (!especialista) {
    return {
      title: 'Especialista no encontrado',
    };
  }
  
  const description = `Conozca más sobre ${especialista.nombreCompleto}, especialista en ${especialista.especialidad} en Clínica de la Costa.`;

  return {
    title: `${especialista.nombreCompleto} - ${especialista.especialidad}`,
    description: description,
    openGraph: {
      title: especialista.nombreCompleto,
      description: description,
      type: 'profile',
      url: `https://clinica-de-la-costa.app/especialistas/${especialista.id}`,
      images: [
        {
          url: especialista.profileImage,
          width: 400,
          height: 400,
          alt: especialista.nombreCompleto,
        },
      ],
      profile: {
        firstName: especialista.nombreCompleto.split(' ')[0],
        lastName: especialista.nombreCompleto.split(' ').slice(1).join(' '),
      },
    },
  };
}

export default async function EspecialistaDetailPage({ params }: Props) {
  const especialista = await getEspecialista(params.id);
  const otherEspecialistas = await getOtherEspecialistas(params.id);

  if (!especialista) {
    notFound();
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto py-12 px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Perfil */}
            <Card className="overflow-hidden">
                <CardContent className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
                    <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-accent shadow-lg">
                        <AvatarImage src={especialista.profileImage} alt={especialista.nombreCompleto} />
                        <AvatarFallback>{especialista.nombreCompleto.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-bold text-primary">{especialista.nombreCompleto}</h1>
                        <p className="text-xl text-accent font-semibold mt-1">{especialista.especialidad}</p>
                        <div className="text-muted-foreground mt-4 space-y-2">
                            {especialista.sede && <div className="flex items-center gap-2 justify-center md:justify-start"><Building className="h-5 w-5" /><span>{especialista.sede}</span></div>}
                            {especialista.email && <div className="flex items-center gap-2 justify-center md:justify-start"><Mail className="h-5 w-5" /><span>{especialista.email}</span></div>}
                            {especialista.telefono && <div className="flex items-center gap-2 justify-center md:justify-start"><Phone className="h-5 w-5" /><span>{especialista.telefono}</span></div>}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Formación Académica */}
            {especialista.academicInfo && especialista.academicInfo.length > 0 && (
                 <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2 text-2xl text-primary"><GraduationCap/> Formación Académica</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                        {especialista.academicInfo.map((info, index) => (
                            <li key={index} className="flex items-start gap-4">
                                <div className="mt-1.5 bg-accent/20 p-2 rounded-full"><GraduationCap className="h-5 w-5 text-accent"/></div>
                                <div>
                                    <p className="font-bold">{info.gradoAcademico}</p>
                                    <p className="text-muted-foreground">{info.institucion} - {info.anoGraduacion}</p>
                                </div>
                            </li>
                        ))}
                        </ul>
                    </CardContent>
                </Card>
            )}

            {/* Experiencia Profesional */}
            {especialista.professionalExperience && especialista.professionalExperience.length > 0 && (
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2 text-2xl text-primary"><Briefcase/> Experiencia Profesional</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                        {especialista.professionalExperience.map((exp, index) => (
                           <li key={index} className="flex items-start gap-4">
                                <div className="mt-1.5 bg-accent/20 p-2 rounded-full"><Briefcase className="h-5 w-5 text-accent"/></div>
                                <div>
                                    <p className="font-bold">{exp.posicion} en {exp.institucionTrabajo}</p>
                                    <p className="text-sm text-muted-foreground">{exp.fechaInicio} - {exp.fechaFin}</p>
                                    {exp.descripcionExperiencia && <p className="text-sm mt-1">{exp.descripcionExperiencia}</p>}
                                </div>
                            </li>
                        ))}
                        </ul>
                    </CardContent>
                </Card>
            )}

          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8 sticky top-24 self-start">
             <Card>
                <CardHeader><CardTitle className="text-xl text-primary">Otros Especialistas</CardTitle></CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {otherEspecialistas.map(medico => (
                            <li key={medico.id} className="flex items-center gap-3">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={medico.profileImage} alt={medico.nombreCompleto} />
                                    <AvatarFallback>{medico.nombreCompleto.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h4 className="font-semibold text-base leading-tight">
                                        <Link href={`/especialistas/${medico.id}`} className="hover:text-accent transition-colors">
                                            {medico.nombreCompleto}
                                        </Link>
                                    </h4>
                                    <p className="text-xs text-muted-foreground">{medico.especialidad}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                     <Button asChild className="mt-6 w-full bg-accent hover:bg-accent/90">
                      <Link href="/especialistas">Ver todos</Link>
                    </Button>
                </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
