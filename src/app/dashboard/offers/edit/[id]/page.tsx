'use client';

import { useState, useEffect, use } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { OfertaEmpleo } from '@/types/oferta-empleo';
import { OfferForm } from '@/components/dashboard/offer-form';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';

interface EditOfferPageProps {
  params: Promise<{ id: string }>;
}

export default function EditOfferPage({ params }: EditOfferPageProps) {
  const { id } = use(params);
  const [offer, setOffer] = useState<OfertaEmpleo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        if (!db) return;
        const docRef = doc(db, 'ofertasEmpleos', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setOffer({ id: docSnap.id, ...docSnap.data() } as OfertaEmpleo);
        } else {
          toast({
            title: "No encontrado",
            description: "La oferta no existe.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error fetching offer: ", error);
        toast({
          title: "Error",
          description: "No se pudo cargar la oferta.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOffer();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Icons.spinner className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold">Oferta no encontrada</h2>
        <Link href="/dashboard/offers">
          <Button variant="link">Volver al listado</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/offers">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Icons.arrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Editar Oferta</h1>
          <p className="text-sm text-slate-500">Editando: <span className="font-medium text-slate-900">{offer.titulo}</span></p>
        </div>
      </div>

      <OfferForm initialData={offer} isEditing />
    </div>
  );
}
