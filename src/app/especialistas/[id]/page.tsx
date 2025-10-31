import { safeQuery } from '@/lib/firebase-helpers';
import { Medico, ResearcherData } from '@/types/medico';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Briefcase, GraduationCap, Building, Mail, Phone, BookOpen, Star, Trophy, Beaker, Mic, Users, UserSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ResearcherProfile } from '@/components/especialistas/researcher-profile';
import { generatePhysicianSchema } from '@/lib/structured-data';

type Props = {
  params: { id: string };
};

// Map specialist IDs to researcher IDs
const researcherIdMap: { [key: string]: string } = {
  'p3DcIXWsU0fJ4m0uamrr': 'XUeljyQhYyhm80hYKYzc',
  'eM8fDVBxZ7KebIU5vJVT': '7FJqQQqM8YgYh6kURVbe',
  // Add other mappings here if needed
};

async function getEspecialista(id: string): Promise<(Medico & { researcherData?: ResearcherData }) | null> {
  return safeQuery(async (db) => {
    const docRef = db.collection('medicos').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return null;
    }

    const medicoData = { id: docSnap.id, ...docSnap.data() } as Medico;

    // Check if there is a researcher associated
    const researcherId = researcherIdMap[id];
    if (researcherId) {
      const researcherRef = db.collection('researchers').doc(researcherId);
      const researcherSnap = await researcherRef.get();
      if (researcherSnap.exists) {
        const researcherData = researcherSnap.data() as ResearcherData;
        // Ensure nested arrays are not undefined
        return { 
          ...medicoData, 
          researcherData: {
            ...researcherData,
            biografia: researcherData.biografia || undefined,
            produccion_bibliografica: researcherData.produccion_bibliografica || [],
            eventos_cientificos: researcherData.eventos_cientificos || [],
            clinical_studies: researcherData.clinical_studies || [],
            reconocimientos: researcherData.reconocimientos || [],
          } 
        };
      }
    }

    return medicoData;
  }, null);
}

async function getOtherEspecialistas(currentId: string): Promise<Medico[]> {
    return safeQuery(async (db) => {
        const snapshot = await db.collection('medicos').limit(10).get();
        const medicos = snapshot.docs
            .map(doc => ({ id: doc.id, ...(doc.data() as Omit<Medico, 'id'>) }))
            .filter(medico => medico.id !== currentId)
            .slice(0, 5);
        return medicos;
    }, []);
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
  
  // Generar descripción rica y única para cada especialista
  const experienceText = especialista.professionalExperience && especialista.professionalExperience.length > 0
    ? ` Con experiencia en ${especialista.professionalExperience[0].institucionTrabajo}.`
    : '';
  
  const academicText = especialista.academicInfo && especialista.academicInfo.length > 0
    ? ` Formación: ${especialista.academicInfo[0].gradoAcademico} en ${especialista.academicInfo[0].institucion}.`
    : '';

  const description = `Dr(a). ${especialista.nombreCompleto}, especialista en ${especialista.especialidad} en Clínica de la Costa, Barranquilla.${academicText}${experienceText} Agenda tu cita con este profesional certificado.`;

  const keywords = [
    especialista.especialidad,
    especialista.nombreCompleto,
    `doctor ${especialista.especialidad}`,
    `médico ${especialista.especialidad} Barranquilla`,
    'Clínica de la Costa',
    'especialista certificado',
    'atención médica',
  ];

  return {
    title: `Dr(a). ${especialista.nombreCompleto} - ${especialista.especialidad}`,
    description: description,
    keywords: keywords,
    authors: [{ name: especialista.nombreCompleto }],
    alternates: {
      canonical: `/especialistas/${especialista.id}`
    },
    openGraph: {
      title: `Dr(a). ${especialista.nombreCompleto} - ${especialista.especialidad}`,
      description: description,
      type: 'profile',
      url: `https://clinica-de-la-costa.app/especialistas/${especialista.id}`,
      siteName: 'Clínica de la Costa',
      locale: 'es_CO',
      images: [
        {
          url: especialista.profileImage || 'https://clinica-de-la-costa.app/default-doctor.jpg',
          width: 800,
          height: 800,
          alt: `Dr(a). ${especialista.nombreCompleto} - ${especialista.especialidad}`,
        },
      ],
      firstName: especialista.nombreCompleto.split(' ')[0],
      lastName: especialista.nombreCompleto.split(' ').slice(1).join(' '),
    },
    twitter: {
      card: 'summary_large_image',
      title: `Dr(a). ${especialista.nombreCompleto}`,
      description: `Especialista en ${especialista.especialidad} - Clínica de la Costa`,
      images: [especialista.profileImage || 'https://clinica-de-la-costa.app/default-doctor.jpg'],
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}

export default async function EspecialistaDetailPage({ params }: Props) {
  const especialista = await getEspecialista(params.id);
  const otherEspecialistas = await getOtherEspecialistas(params.id);

  if (!especialista) {
    notFound();
  }

  // Generar datos estructurados completos para el médico
  const physicianSchema = generatePhysicianSchema({
    id: especialista.id,
    nombreCompleto: especialista.nombreCompleto,
    especialidad: especialista.especialidad,
    profileImage: especialista.profileImage,
    email: especialista.email,
    telefono: especialista.telefono,
    academicInfo: especialista.academicInfo,
    professionalExperience: especialista.professionalExperience
  });

  const hasAcademicInfo = especialista.academicInfo && especialista.academicInfo.some(info => info.gradoAcademico || info.institucion);
  const hasProfessionalExperience = especialista.professionalExperience && especialista.professionalExperience.some(exp => exp.posicion || exp.institucionTrabajo);
  const hasBiography = especialista.researcherData?.biografia?.texto;

  return (
    <>
      {/* Datos estructurados JSON-LD para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }}
      />
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
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Biografía */}
            {hasBiography && (
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2 text-2xl text-primary"><UserSquare /> Biografía</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground whitespace-pre-line">{especialista.researcherData?.biografia?.texto}</p>
                    </CardContent>
                </Card>
            )}

            {/* Formación Académica */}
            {hasAcademicInfo && (
                 <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2 text-2xl text-primary"><GraduationCap/> Formación Académica</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                        {especialista.academicInfo?.map((info, index) => (
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
            {hasProfessionalExperience && (
                <Card>
                    <CardHeader><CardTitle className="flex items-center gap-2 text-2xl text-primary"><Briefcase/> Experiencia Profesional</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                        {especialista.professionalExperience?.map((exp, index) => (
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

            {/* Researcher Profile Section */}
            {especialista.researcherData && (
              <ResearcherProfile data={especialista.researcherData} specialistId={especialista.id} />
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
    </>
  );
}
