'use client';

import { useState, useEffect, use } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Postulacion, ApplicationStatus } from '@/types/postulacion';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { StatusStepper } from '@/components/dashboard/status-stepper';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Separator } from '@/components/ui/separator';
import { FollowUpModal } from '@/components/dashboard/follow-up-modal';

interface ApplicationDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default function ApplicationDetailsPage({ params }: ApplicationDetailsPageProps) {
  const { id } = use(params);
  const [application, setApplication] = useState<Postulacion | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowUpOpen, setIsFollowUpOpen] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        if (!db) return;
        const docRef = doc(db, 'postulaciones', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setApplication({ id: docSnap.id, ...docSnap.data() } as Postulacion);
        } else {
          toast({ title: "No encontrado", description: "La postulación no existe.", variant: "destructive" });
        }
      } catch (error) {
        console.error("Error fetching application: ", error);
        toast({ title: "Error", description: "No se pudo cargar la información.", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const handleStatusChange = async (newStatus: ApplicationStatus) => {
    try {
      if (!db || !application) return;
      await updateDoc(doc(db, 'postulaciones', application.id), { estado: newStatus });
      setApplication({ ...application, estado: newStatus });
      toast({ title: "Estado actualizado", description: `El candidato ahora está en: ${newStatus}` });
      if (newStatus === 'En Proceso') setIsFollowUpOpen(true);
    } catch (error) {
      console.error("Error updating status: ", error);
      toast({ title: "Error", description: "No se pudo actualizar el estado.", variant: "destructive" });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Icons.spinner className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold">Postulación no encontrada</h2>
        <Link href="/dashboard/applications">
          <Button variant="link">Volver al listado</Button>
        </Link>
      </div>
    );
  }
  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-slate-800 border-l-4 border-primary pl-3">{title}</h3>
      {children}
    </div>
  );
    // Recursive helper to find values in deep structures and handle case-insensitivity
  const getVal = (primaryKey: string, ...fallbacks: string[]): string => {
    const keys = [primaryKey, ...fallbacks];
    
    const searchRecursive = (obj: any): string | null => {
        if (!obj || typeof obj !== 'object') return null;
        
        const allKeysInObj = Object.keys(obj);
        
        // 1. Try direct or case-insensitive match
        for (const k of keys) {
            const foundKey = allKeysInObj.find(item => item.toLowerCase() === k.toLowerCase());
            if (foundKey && obj[foundKey] && obj[foundKey] !== '' && obj[foundKey] !== 'N/A') {
                return String(obj[foundKey]);
            }
        }

        // 2. Search deeper
        for (const keyInObj of allKeysInObj) {
            const val = obj[keyInObj];
            if (val && typeof val === 'object' && !Array.isArray(val) && !(val instanceof Date)) {
                const foundDeper = searchRecursive(val);
                if (foundDeper) return foundDeper;
            }
        }
        return null;
    };

    return searchRecursive(application) || 'N/A';
  };

  const InfoItem = ({ label, value }: { label: string; value: string }) => (
    <div className="space-y-1">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-medium text-slate-700">{value}</p>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Icons.spinner className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold text-slate-800">No se encontró la postulación</h2>
        <Link href="/dashboard/applications">
          <Button variant="link">Volver a la lista</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/applications">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-slate-100">
              <Icons.arrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{getVal('nombresApellidos', 'nombre', 'nombres', 'fullname', 'nombre_completo', 'nombres_apellidos', 'nombre_candidato', 'candidato')}</h1>
            <p className="text-sm text-slate-500 flex items-center gap-2">
              <Icons.mail className="w-3.5 h-3.5" /> {getVal('correoElectronico', 'email', 'correo', 'mail', 'user_email', 'email_candidato')}
              <span className="text-slate-300">•</span>
              <Icons.phone className="w-3.5 h-3.5" /> {getVal('telefonoCelular', 'celular', 'telefono', 'tel_celular', 'movil', 'tel')}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-3">
           <Button 
             onClick={() => setIsFollowUpOpen(true)}
             className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-9 px-6 rounded-xl shadow-lg shadow-blue-200 gap-2"
           >
             <Icons.calendar className="w-4 h-4" /> SEGUIMIENTO
           </Button>
           <div className="flex flex-col items-end gap-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Estado del Candidato</p>
              <StatusStepper currentStatus={application.estado} onChange={handleStatusChange} />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-none shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b">
              <CardTitle className="text-base font-bold text-primary">Perfil del Candidato</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-10">
              {/* Info Personal */}
              <Section title="Información Personal">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <InfoItem label="Tipo Documento" value={getVal('tipoDocumento', 'tipo_documento', 'documento_tipo', 'id_type')} />
                  <InfoItem label="N° Documento" value={getVal('numeroDocumento', 'documento', 'numero_documento', 'cedula', 'identificacion', 'id_number')} />
                  <InfoItem label="Fecha Nacimiento" value={getVal('fechaNacimiento', 'fecha_nacimiento', 'nacimiento', 'birth_date')} />
                  <InfoItem label="Lugar Nacimiento" value={getVal('lugarNacimiento', 'lugar_nacimiento', 'ciudad')} />
                  <InfoItem label="Género" value={getVal('genero', 'sexo', 'gender')} />
                  <InfoItem label="Estado Civil" value={getVal('estadoCivil', 'estado_civil', 'civil_status')} />
                  <InfoItem label="Dirección" value={getVal('direccionResidencia', 'direccion', 'residencia', 'address')} />
                  <InfoItem label="Celular" value={getVal('telefonoCelular', 'celular', 'tel_celular', 'telefono', 'movil', 'phone', 'cell')} />
                  <InfoItem label="Fijo" value={getVal('telefonoFijo', 'fijo', 'tel_fijo', 'landline')} />
                </div>
              </Section>

              <Separator />

              {/* Info Académica */}
              <Section title="Información Académica">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoItem label="Título Obtenido" value={getVal('tituloObtenido', 'titulo', 'profesion', 'degree')} />
                  <InfoItem label="Universidad" value={getVal('universidad', 'institucion', 'centro_estudios', 'university')} />
                  <InfoItem label="Fecha de Grado" value={getVal('fechaGrado', 'fecha_grado', 'grado', 'graduation_date')} />
                  <InfoItem label="País del Título" value={getVal('paisTitulo', 'pais', 'country')} />
                  <InfoItem label="Convalidado en Colombia" value={getVal('tituloConvalidado', 'convalidado', 'is_convalidated')} />
                  <InfoItem label="N° Resolución" value={getVal('numeroResolucion', 'resolucion', 'resolution_number')} />
                  <InfoItem label="Especialización" value={getVal('especializacion', 'posgrado', 'specialty')} />
                  <InfoItem label="Universidad Esp." value={getVal('universidadEspecializacion', 'universidad_posgrado', 'spec_university')} />
                  <InfoItem label="Fecha Inicio Esp." value={getVal('fechaInicioEspecializacion', 'spec_start_date')} />
                  <InfoItem label="Fecha Fin Esp." value={getVal('fechaFinEspecializacion', 'spec_end_date')} />
                </div>
                {application.otraInfoAcademica && (
                  <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs font-semibold text-slate-400 uppercase mb-2">Otra Información</p>
                    <p className="text-sm text-slate-600 italic">{application.otraInfoAcademica}</p>
                  </div>
                )}
              </Section>

              <Separator />

              {/* Experiencia Laboral */}
              <Section title="Experiencia Laboral">
                {application.experiencias && application.experiencias.length > 0 ? (
                  <div className="space-y-6">
                    {application.experiencias.map((exp, idx) => (
                      <div key={idx} className="bg-slate-50/50 p-6 rounded-xl border border-slate-100 hover:border-primary/20 transition-all">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-bold text-slate-800">{exp.cargo}</h4>
                            <p className="text-primary text-sm font-medium">{exp.entidad}</p>
                          </div>
                          <Badge variant="outline" className="bg-white text-slate-500 font-normal">
                            {exp.fechaInicio} — {exp.fechaFin}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                           <p className="text-[10px] font-bold text-slate-400 uppercase">Funciones</p>
                           <p className="text-sm text-slate-600 leading-relaxed">{exp.funciones}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-400 italic">No registró experiencia laboral.</p>
                )}
              </Section>

              <Separator />

              {/* Habilidades y Otros */}
              <Section title="Certificaciones y Habilidades">
                <div className="grid grid-cols-2 gap-6">
                  <InfoItem label="Tarjeta Profesional" value={getVal('tieneTarjetaProfesional', 'tarjeta_profesional', 'has_card')} />
                  <InfoItem label="N° Tarjeta" value={getVal('numeroTarjetaProfesional', 'tarjeta', 'card_number')} />
                  <InfoItem label="RETHUS" value={getVal('tieneRethus', 'rethus')} />
                  <InfoItem label="Idiomas" value={getVal('idiomas', 'languages')} />
                </div>
                <div className="grid grid-cols-1 gap-6 mt-4">
                  <InfoItem label="Habilidades Informáticas" value={getVal('habilidadesInformaticas', 'habilidades', 'computer_skills')} />
                  <InfoItem label="Cursos Adicionales" value={getVal('cursosAdicionales', 'cursos', 'courses')} />
                </div>
                
                {application.certificaciones && application.certificaciones.length > 0 && (
                   <div className="mt-6 space-y-3">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Certificaciones Adicionales</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {application.certificaciones.map((cert, idx) => (
                          <div key={idx} className="p-3 border rounded-lg bg-white shadow-sm flex items-center justify-between">
                             <div>
                                <p className="text-sm font-bold text-slate-700">{cert.nombre}</p>
                                <p className="text-xs text-slate-500">{cert.entidad}</p>
                             </div>
                             <p className="text-[10px] text-slate-400 font-medium">{cert.fechaExpedicion}</p>
                          </div>
                        ))}
                      </div>
                   </div>
                )}
              </Section>

              <Separator />

              {/* Info Adicional */}
              <Section title="Información Adicional">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <InfoItem label="Discapacidad" value={getVal('tieneDiscapacidad', 'discapacidad')} />
                  <InfoItem label="Minoría Étnica" value={getVal('perteneceMinoria', 'minoria', 'etnia')} />
                  <InfoItem label="Aspiración" value={getVal('aspiracionSalarial', 'aspiracion', 'sueldo_deseado')} />
                  <InfoItem label="Disponibilidad Viajar" value={getVal('disponibilidadViajar', 'disponibilidad_viaje')} />
                </div>
              </Section>

              <Separator />

              {/* Referencias */}
              <Section title="Referencias Personales">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {application.referencias && application.referencias.map((ref, idx) => (
                    <div key={idx} className="p-4 border border-dashed rounded-lg flex flex-col gap-1">
                      <p className="text-sm font-bold text-slate-700">{ref.nombre}</p>
                      <p className="text-xs text-slate-500 flex items-center gap-1"><Icons.phone className="w-3 h-3" /> {ref.telefono}</p>
                      <p className="text-[10px] font-medium text-primary uppercase">{ref.relacion}</p>
                    </div>
                  ))}
                </div>
              </Section>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Metadata Card */}
          <Card className="border-none shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b">
              <CardTitle className="text-sm font-bold text-slate-800">Detalles de Aplicación</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Oferta Aplicada</p>
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                   <p className="text-sm font-bold text-primary">{application.ofertaTitulo}</p>
                   <p className="text-[10px] text-slate-500 mt-1">ID: {application.ofertaId || 'Spontánea'}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Fecha de Envío</p>
                <p className="text-sm font-medium text-slate-700">
                   {application.fechaPostulacion?.seconds 
                    ? format(new Date(application.fechaPostulacion.seconds * 1000), "PPPP", { locale: es })
                    : 'Reciente'}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Documents Card */}
          <Card className="border-none shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b">
              <CardTitle className="text-sm font-bold text-slate-800">Documentos Adjuntos</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <a 
                href={getVal('cvURL', 'cv', 'hojaDeVida', 'archivo', 'cv_url', 'download_url')} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                   <Icons.fileText className="w-6 h-6" />
                </div>
                <div>
                   <p className="text-sm font-bold text-slate-800">Ver Hoja de Vida</p>
                   <p className="text-[10px] text-slate-400 uppercase font-bold">Documento PDF/DOC</p>
                </div>
                <Icons.download className="w-4 h-4 ml-auto text-slate-300 group-hover:text-primary transition-colors" />
              </a>

              {application.certificadosURLs && application.certificadosURLs.map((url, idx) => (
                <a 
                  key={idx}
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                    <Icons.fileText className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800">Certificado {idx + 1}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Anexo Adicional</p>
                  </div>
                  <Icons.download className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                </a>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <FollowUpModal 
        isOpen={isFollowUpOpen}
        application={application}
        onClose={() => setIsFollowUpOpen(false)}
        onUpdate={(updated) => setApplication(updated)}
      />
    </div>
  );
}
