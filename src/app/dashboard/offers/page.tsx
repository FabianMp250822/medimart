'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { OfertaEmpleo } from '@/types/oferta-empleo';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { toast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function OffersListPage() {
  const [offers, setOffers] = useState<OfertaEmpleo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      if (!db) return;
      const q = query(collection(db, 'ofertasEmpleos'), orderBy('fechaPublicacion', 'desc'));
      const querySnapshot = await getDocs(q);
      const offersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as OfertaEmpleo[];
      setOffers(offersData);
    } catch (error) {
      console.error("Error fetching offers: ", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las ofertas.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      if (!db) return;
      await deleteDoc(doc(db, 'ofertasEmpleos', id));
      setOffers(offers.filter(offer => offer.id !== id));
      toast({ title: "Éxito", description: "Oferta eliminada correctamente." });
    } catch (error) {
      console.error("Error deleting offer: ", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar la oferta.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Ofertas Laborales</h1>
          <p className="text-slate-500 mt-1">Gestiona las vacantes de empleo de la Clínica de la Costa.</p>
        </div>
        <Link href="/dashboard/offers/create">
          <Button className="bg-primary hover:bg-primary/90 shadow-sm transition-all hover:scale-[1.02]">
            <Icons.plus className="w-4 h-4 mr-2" />
            Nueva Oferta
          </Button>
        </Link>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b">
          <CardTitle className="text-lg font-bold">Listado de Vacantes</CardTitle>
          <CardDescription>Total de ofertas publicadas: {offers.length}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
               <Icons.spinner className="w-10 h-10 text-primary animate-spin" />
               <p className="text-slate-400 font-medium italic">Buscando ofertas...</p>
            </div>
          ) : offers.length === 0 ? (
            <div className="text-center py-20 px-4">
               <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icons.briefcase className="w-8 h-8 text-slate-300" />
               </div>
               <h3 className="text-lg font-bold text-slate-700">No hay ofertas publicadas</h3>
               <p className="text-slate-500 mt-1 max-w-xs mx-auto">Comienza creando tu primera vacante para atraer talento a la clínica.</p>
               <Link href="/dashboard/offers/create" className="mt-6 inline-block">
                  <Button variant="outline">Crear primera oferta</Button>
               </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow>
                    <TableHead className="font-bold text-slate-800">Cargos / Título</TableHead>
                    <TableHead className="font-bold text-slate-800">Ubicación</TableHead>
                    <TableHead className="font-bold text-slate-800 text-center">Contrato</TableHead>
                    <TableHead className="font-bold text-slate-800 text-center">Publicado</TableHead>
                    <TableHead className="font-bold text-slate-800 text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {offers.map((offer) => (
                    <TableRow key={offer.id} className="hover:bg-slate-50/50 transition-colors">
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span className="text-slate-900 font-bold">{offer.titulo}</span>
                          <span className="text-slate-500 text-xs truncate max-w-[200px]">{offer.sueldo}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Icons.location className="w-3 h-3" />
                          <span className="text-sm">{offer.ubicacion}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 font-medium">
                          {offer.tipoContrato}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center text-slate-600 text-sm">
                        {offer.fechaPublicacion}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/dashboard/offers/edit/${offer.id}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary hover:bg-primary/5">
                              <Icons.edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50">
                                <Icons.trash className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta acción no se puede deshacer. Se eliminará la oferta laboral "<strong>{offer.titulo}</strong>" de forma permanente.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDelete(offer.id)}
                                  className="bg-red-500 hover:bg-red-600"
                                >
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
