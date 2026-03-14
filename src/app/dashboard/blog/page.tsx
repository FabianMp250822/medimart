'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, deleteDoc, doc, query, orderBy, where } from 'firebase/firestore';
import { Blog } from '@/types/blog';
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
import { Icons } from '@/components/icons';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import Image from 'next/image';
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

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      if (!db) return;
      const q = query(
        collection(db, 'blogs'), 
        where('lugar', '==', 'clinica'),
        orderBy('date', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const blogsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Blog[];
      setBlogs(blogsData);
    } catch (error) {
      console.error("Error fetching blogs: ", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar las noticias.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      if (!db) return;
      await deleteDoc(doc(db, 'blogs', id));
      setBlogs(blogs.filter(b => b.id !== id));
      toast({
        title: "Eliminado",
        description: "El artículo ha sido eliminado.",
      });
    } catch (error) {
      console.error("Error deleting blog: ", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el artículo.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestión de Blog y Noticias</h1>
          <p className="text-slate-500">Administra los artículos y noticias de la Clínica de la Costa.</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/dashboard/blog/create">
            <Icons.plus className="w-4 h-4 mr-2" />
            Nuevo Artículo
          </Link>
        </Button>
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50">
          <CardTitle className="text-lg font-bold">Listado de Artículos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center p-12">
              <Icons.spinner className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center p-12 text-slate-500">
              No hay artículos registrados.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[100px]">Portada</TableHead>
                  <TableHead>Título</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-center">Votos</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogs.map((blog) => (
                  <TableRow key={blog.id} className="group hover:bg-slate-50/50 transition-colors">
                    <TableCell>
                      <div className="relative h-12 w-20 rounded-md overflow-hidden border border-slate-200">
                        <Image 
                          src={blog.image || 'https://placehold.co/400x300.png?text=Sin+Imagen'} 
                          alt={blog.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-bold text-slate-900 line-clamp-1">{blog.title}</div>
                      <div className="text-xs text-slate-500">Por {blog.author}</div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 uppercase">
                        {blog.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-slate-600 text-sm">
                      {new Date(blog.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </TableCell>
                    <TableCell className="text-center font-medium text-slate-700">
                      <div className="flex items-center justify-center gap-1">
                        <Icons.heart className="h-3 w-3 text-red-500" />
                        {blog.votes || 0}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button asChild size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-primary hover:bg-primary/5">
                          <Link href={`/dashboard/blog/edit/${blog.id}`}>
                            <Icons.fileText className="h-4 w-4" />
                          </Link>
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-destructive hover:bg-destructive/5">
                              <Icons.trash className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>¿Eliminar artículo?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Esta acción eliminará permanentemente "{blog.title}" y no se puede deshacer.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDelete(blog.id)}
                                className="bg-destructive text-white hover:bg-destructive/90"
                              >
                                Eliminar Artículo
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
