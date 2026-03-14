'use client';

import { useState, useEffect, use } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Medico } from '@/types/medico';
import { SpecialistForm } from '@/components/dashboard/specialist-form';
import { Icons } from '@/components/icons';
import { toast } from '@/hooks/use-toast';

interface EditDoctorPageProps {
  params: Promise<{ id: string }>;
}

export default function EditDoctorPage({ params }: EditDoctorPageProps) {
  const { id } = use(params);
  const [doctor, setDoctor] = useState<Medico | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        if (!db) return;
        const docRef = doc(db, 'medicos', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDoctor({ id: docSnap.id, ...docSnap.data() } as Medico);
        } else {
          toast({
            title: "Error",
            description: "Especialista no encontrado.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching doctor:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-20">
        <Icons.spinner className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!doctor) {
    return <div className="text-center p-20 text-slate-500">Médico no encontrado.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Editar Perfil Médico</h1>
        <p className="text-slate-500">Actualiza la información pública de {doctor.nombreCompleto}.</p>
      </div>
      
      <SpecialistForm initialData={doctor} isEditing={true} />
    </div>
  );
}
