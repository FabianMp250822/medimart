'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Medico } from '@/types/medico';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icons } from '@/components/icons';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
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

export default function DoctorsListPage() {
  const [doctors, setDoctors] = useState<Medico[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDoctors = async () => {
    setIsLoading(true);
    try {
      if (!db) return;
      const q = query(collection(db, 'medicos'), orderBy('nombreCompleto'));
      const querySnapshot = await getDocs(q);
      const doctorsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Medico[];
      setDoctors(doctorsData);
    } catch (error) {
      console.error("Error fetching doctors: ", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los especialistas.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      if (!db) return;
      await deleteDoc(doc(db, 'medicos', id));
      setDoctors(doctors.filter(d => d.id !== id));
      toast({
        title: "Eliminado",
        description: "El perfil del médico ha sido eliminado.",
      });
    } catch (error) {
      console.error("Error deleting doctor: ", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el perfil.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Médicos Especialistas</h1>
          <p className="text-slate-500">Gestiona el equipo médico de la Clínica de la Costa.</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/dashboard/profile">
            <Icons.plus className="w-4 h-4 mr-2" />
            Nuevo Especialista
          </Link>
        </Button>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50">
          <CardTitle className="text-lg font-bold">Listado de Profesionales</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center p-12">
              <Icons.spinner className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : doctors.length === 0 ? (
            <div className="text-center p-12 text-slate-500">
              No hay especialistas registrados.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[80px]">Perfil</TableHead>
                  <TableHead>Nombre Completo</TableHead>
                  <TableHead>Especialidad</TableHead>
                  <TableHead>Sede</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {doctors.map((doctor) => (
                  <TableRow key={doctor.id} className="group hover:bg-slate-50/50 transition-colors">
                    <TableCell>
                      <Avatar className="h-10 w-10 border border-slate-200">
                        <AvatarImage src={doctor.profileImage} />
                        <AvatarFallback className="bg-slate-100 text-slate-600">
                          {doctor.nombreCompleto?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <div className="font-bold text-slate-900">{doctor.nombreCompleto}</div>
                      <div className="text-xs text-slate-500">{doctor.email || 'Sin correo'}</div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {doctor.especialidad}
                      </span>
                    </TableCell>
                    <TableCell className="text-slate-600 font-medium">
                      {doctor.sede || 'No asignada'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button asChild size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-primary hover:bg-primary/5">
                          <Link href={`/dashboard/doctors/edit/${doctor.id}`}>
                            <Icons.fileText className="h-4 w-4" />
                          </Link>
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-destructive hover:bg-destructive/5">
                              <Icons.logout className="h-4 w-4 rotate-180" /> {/* Using logout as a delete placeholder if trash not found, but I have icons */}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción eliminará permanentemente el perfil del Dr. {doctor.nombreCompleto} y no se puede deshacer.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(doctor.id)}
                                className="bg-destructive text-white hover:bg-destructive/90"
                              >
                                Eliminar Médico
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
