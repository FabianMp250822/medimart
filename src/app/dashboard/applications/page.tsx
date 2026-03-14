'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc, query, orderBy, deleteDoc, limit, startAfter, getCountFromServer, QueryDocumentSnapshot, where, startAt, endAt } from 'firebase/firestore';
import { Postulacion, ApplicationStatus } from '@/types/postulacion';
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
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { FollowUpModal } from '@/components/dashboard/follow-up-modal';
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

export default function ApplicationsListPage() {
  const [applications, setApplications] = useState<Postulacion[]>([]);
  const [filteredApps, setFilteredApps] = useState<Postulacion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  // Pagination state
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastDocs, setLastDocs] = useState<(QueryDocumentSnapshot | null)[]>([null]);
  const [cache, setCache] = useState<Record<string, Postulacion[]>>({});
  const [selectedAppForFollowUp, setSelectedAppForFollowUp] = useState<Postulacion | null>(null);
  const pageSize = 15;

  useEffect(() => {
    setCurrentPage(1);
    setLastDocs([null]);
    fetchApplications();
  }, [filterStatus, search]);

  useEffect(() => {
    if (currentPage > 1) {
      fetchApplications();
    }
  }, [currentPage]);

  useEffect(() => {
    let result = applications;
    
    // We filter local results, but in a real paginated app with search,
    // this would be server-side. For 600 records, we can keep it simple.
    if (search) {
      result = result.filter(app => 
        (app.nombresApellidos || (app as any).nombre || '').toLowerCase().includes(search.toLowerCase()) ||
        (app.correoElectronico || (app as any).email || '').toLowerCase().includes(search.toLowerCase())
      );
    }
    
    setFilteredApps(result);
  }, [search, applications]);

  const fetchApplications = async () => {
    try {
      if (!db) return;

      // Check cache first
      const cacheKey = `${currentPage}-${filterStatus}-${search}`;
      if (cache[cacheKey]) {
        setApplications(cache[cacheKey]);
        return;
      }

      setIsLoading(true);
      const coll = collection(db, 'postulaciones');
      
      // 1. Get count (cached/once)
      if (totalCount === 0) {
        const totalSnapshot = await getCountFromServer(coll);
        setTotalCount(totalSnapshot.data().count);
      }

      // 2. Build query
      let baseQuery = coll as any;
      if (filterStatus !== 'all') {
        baseQuery = query(coll, where('estado', '==', filterStatus));
      }

      if (search) {
        baseQuery = query(
          baseQuery, 
          orderBy('nombresApellidos'), 
          startAt(search), 
          endAt(search + '\uf8ff')
        );
      } else {
        baseQuery = query(baseQuery, orderBy('fechaPostulacion', 'desc'));
      }

      let q = query(baseQuery, limit(pageSize));
      if (currentPage > 1 && lastDocs[currentPage - 1]) {
        q = query(q, startAfter(lastDocs[currentPage - 1]));
      }

      const querySnapshot = await getDocs(q);
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      
      const newLastDocs = [...lastDocs];
      newLastDocs[currentPage] = lastVisible;
      setLastDocs(newLastDocs);

      const appsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Postulacion[];
      
      // Update cache
      setCache(prev => ({ ...prev, [cacheKey]: appsData }));
      setApplications(appsData);
    } catch (error) {
      console.error("Error fetching applications: ", error);
      toast({
        title: "Optimización Activa",
        description: "Firestore requiere un índice compuesto para estos filtros. Haz clic en el enlace de la consola de Firebase si aparece un error.",
        variant: "default"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nextPage = () => {
    if (currentPage * pageSize < totalCount) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleStatusChange = async (id: string, newStatus: ApplicationStatus) => {
    try {
      if (!db) return;
      await updateDoc(doc(db, 'postulaciones', id), { estado: newStatus });
      setApplications(applications.map(app => 
        app.id === id ? { ...app, estado: newStatus } : app
      ));
      toast({ title: "Estado actualizado", description: `La postulación ahora está en: ${newStatus}` });
    } catch (error) {
      console.error("Error updating status: ", error);
      toast({ title: "Error", description: "No se pudo actualizar el estado.", variant: "destructive" });
    }
  };

  const handleUpdateAfterFollowUp = (updatedApp: Postulacion) => {
    setApplications(prev => prev.map(app => app.id === updatedApp.id ? updatedApp : app));
    // Clear cache to ensure refresh if user navigates back (optional)
    setCache({});
  };

  const handleDelete = async (id: string) => {
    try {
      if (!db) return;
      await deleteDoc(doc(db, 'postulaciones', id));
      setApplications(applications.filter(app => app.id !== id));
      toast({ title: "Éxito", description: "Postulación eliminada." });
    } catch (error) {
      console.error("Error deleting application: ", error);
      toast({ title: "Error", description: "No se pudo eliminar.", variant: "destructive" });
    }
  };

  const getFallback = (obj: any, keys: string[]): string | null => {
    if (!obj || typeof obj !== 'object') return null;
    
    const allKeys = Object.keys(obj);
    
    // 1. Try direct match or case-insensitive match at this level
    for (const searchKey of keys) {
       const foundKey = allKeys.find(k => k.toLowerCase() === searchKey.toLowerCase());
       if (foundKey && obj[foundKey] && obj[foundKey] !== '' && obj[foundKey] !== 'N/A') {
         return String(obj[foundKey]);
       }
    }
    
    // 2. Try searching in nested objects (like 'datosPersonal', 'info', etc)
    for (const k of allKeys) {
      if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k]) && !(obj[k] instanceof Date)) {
        const nestedVal = getFallback(obj[k], keys);
        if (nestedVal) return nestedVal;
      }
    }
    return null;
  };

  const getStatusBadge = (status: string) => {
    const s = (status || '').toString().trim().toLowerCase();
    if (s === 'pendiente') return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200 uppercase text-[10px]">Pendiente</Badge>;
    if (s === 'en proceso' || s === 'proceso') return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200 uppercase text-[10px]">En Proceso</Badge>;
    if (s === 'contratado') return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200 uppercase text-[10px]">Contratado</Badge>;
    if (s === 'rechazado') return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200 uppercase text-[10px]">Rechazado</Badge>;
    if (s === 'espera') return <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-slate-200 uppercase text-[10px]">Espera</Badge>;
    return <Badge variant="outline" className="uppercase text-[10px]">{status}</Badge>;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Postulaciones</h1>
        <p className="text-slate-500 mt-1">Verifica y gestiona los candidatos que se han postulado a las vacantes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Icons.search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Buscar por nombre o correo..." 
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="Pendiente">Pendiente</SelectItem>
            <SelectItem value="En Proceso">En Proceso</SelectItem>
            <SelectItem value="Espera">Espera</SelectItem>
            <SelectItem value="Contratado">Contratado</SelectItem>
            <SelectItem value="Rechazado">Rechazado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b">
          <CardTitle className="text-lg font-bold">Candidatos Recientes</CardTitle>
          <CardDescription>
            Página {currentPage} de {Math.ceil(totalCount / pageSize)} ({totalCount} postulaciones totales)
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
               <Icons.spinner className="w-10 h-10 text-primary animate-spin" />
               <p className="text-slate-400 font-medium italic">Cargando candidatos...</p>
            </div>
          ) : filteredApps.length === 0 ? (
            <div className="text-center py-20">
               <Icons.users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
               <h3 className="text-lg font-medium text-slate-400">No se encontraron postulaciones</h3>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow>
                    <TableHead className="w-12 text-center text-slate-400 font-bold">N°</TableHead>
                    <TableHead className="font-bold text-slate-800">Nombre y Apellidos</TableHead>
                    <TableHead className="font-bold text-slate-800">Correo Electrónico</TableHead>
                    <TableHead className="font-bold text-slate-800 text-center">Fecha</TableHead>
                    <TableHead className="font-bold text-slate-800">Oferta</TableHead>
                    <TableHead className="font-bold text-slate-800 text-center">Estado</TableHead>
                    <TableHead className="font-bold text-slate-800 text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApps.map((app, index) => (
                    <TableRow key={app.id} className="hover:bg-primary/[0.02] transition-colors group">
                      <TableCell className="text-center text-slate-400 text-xs">{index + 1}</TableCell>
                      <TableCell className="font-bold text-slate-700">{getFallback(app, ['nombresApellidos', 'nombre', 'nombres', 'fullname', 'nombre_completo', 'nombres_apellidos', 'nombre_candidato', 'candidato', 'user_name', 'name']) || 'N/A'}</TableCell>
                      <TableCell className="text-slate-500 text-sm italic">{getFallback(app, ['correoElectronico', 'email', 'correo', 'mail', 'correo_electronico', 'email_usuario', 'email_candidato', 'email_user']) || 'N/A'}</TableCell>
                      <TableCell className="text-center text-slate-500 text-xs">
                        {app.fechaPostulacion?.seconds 
                          ? format(new Date(app.fechaPostulacion.seconds * 1000), 'dd/MM/yyyy', { locale: es })
                          : 'Reciente'}
                      </TableCell>
                      <TableCell className="max-w-[150px]">
                        <span className="text-xs font-medium text-slate-600 truncate block">
                          {app.ofertaTitulo || 'Espontánea'}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(app.estado)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                           <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => setSelectedAppForFollowUp(app)}
                              className="text-[10px] h-8 px-3 border-blue-200 text-blue-600 hover:bg-blue-50 font-bold"
                           >
                              SEGUIMIENTO
                           </Button>
                           <Link href={`/dashboard/applications/${app.id}`}>
                              <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-sm text-[10px] h-8 px-3">
                                DETALLES
                              </Button>
                           </Link>
                           
                           <Select 
                              value={app.estado} 
                              onValueChange={(val) => {
                                handleStatusChange(app.id, val as ApplicationStatus);
                                if (val === 'En Proceso') setSelectedAppForFollowUp(app);
                              }}
                           >
                              <SelectTrigger className="w-[110px] h-8 text-[10px] bg-purple-600 text-white border-none hover:bg-purple-700">
                                 <SelectValue placeholder="PROCESO" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="Pendiente">Pendiente</SelectItem>
                                 <SelectItem value="En Proceso">En Proceso</SelectItem>
                                 <SelectItem value="Espera">Espera</SelectItem>
                                 <SelectItem value="Contratado">Contratado</SelectItem>
                                 <SelectItem value="Rechazado">Rechazado</SelectItem>
                              </SelectContent>
                           </Select>

                           <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-red-500 hover:bg-red-50">
                                <Icons.trash className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>¿Eliminar postulación?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Se borrará permanentemente la postulación de <strong>{getFallback(app, ['nombresApellidos', 'nombre']) || 'este candidato'}</strong>.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(app.id)} className="bg-red-500 hover:bg-red-600">Eliminar</AlertDialogAction>
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

          {/* Pagination Controls */}
          {!isLoading && totalCount > pageSize && (
            <div className="p-4 border-t bg-slate-50/30 flex items-center justify-between">
              <p className="text-xs text-slate-500 font-medium">
                Siguiente página cargará {pageSize} candidatos más
              </p>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={prevPage} 
                  disabled={currentPage === 1}
                  className="h-8 gap-1 rounded-lg"
                >
                  <Icons.chevronLeft className="w-4 h-4" /> Anterior
                </Button>
                <div className="bg-white border text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
                  {currentPage}
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={nextPage} 
                  disabled={currentPage * pageSize >= totalCount}
                  className="h-8 gap-1 rounded-lg"
                >
                  Siguiente <Icons.chevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedAppForFollowUp && (
        <FollowUpModal 
          isOpen={!!selectedAppForFollowUp}
          application={selectedAppForFollowUp}
          onClose={() => setSelectedAppForFollowUp(null)}
          onUpdate={handleUpdateAfterFollowUp}
        />
      )}
    </div>
  );
}
