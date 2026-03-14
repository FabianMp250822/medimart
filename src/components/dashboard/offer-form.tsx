'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { OfertaEmpleo } from '@/types/oferta-empleo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Icons } from '@/components/icons';
import { toast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const offerSchema = z.object({
  titulo: z.string().min(3, "El título es requerido"),
  descripcion: z.string().min(10, "La descripción es requerida"),
  requisitos: z.string().min(10, "Los requisitos son requeridos"),
  ubicacion: z.string().min(1, "La ubicación es requerida"),
  fechaPublicacion: z.string().min(1, "La fecha es requerida"),
  tipoContrato: z.string().min(1, "El tipo de contrato es requerido"),
  jornada: z.string().min(1, "La jornada es requerida"),
  sueldo: z.string().min(1, "El sueldo es requerido"),
  experiencia: z.string().min(1, "La experiencia es requerida"),
  estudios: z.string().min(1, "Los estudios son requeridos"),
  habilidades: z.string().optional(),
  idiomas: z.string().optional(),
  otros: z.string().optional(),
});

type OfferFormValues = z.infer<typeof offerSchema>;

interface OfferFormProps {
  initialData?: OfertaEmpleo;
  isEditing?: boolean;
}

export function OfferForm({ initialData, isEditing = false }: OfferFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<OfferFormValues>({
    resolver: zodResolver(offerSchema),
    defaultValues: initialData || {
      titulo: '',
      descripcion: '',
      requisitos: '',
      ubicacion: 'Barranquilla',
      fechaPublicacion: new Date().toISOString().split('T')[0],
      tipoContrato: 'Termino Indefinido',
      jornada: 'Tiempo Completo',
      sueldo: '',
      experiencia: '1 año',
      estudios: 'Técnico',
      habilidades: '',
      idiomas: '',
      otros: '',
    },
  });

  const onSubmit = async (values: OfferFormValues) => {
    setIsLoading(true);
    try {
      if (!db) return;

      const slug = values.titulo
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

      const offerData = {
        ...values,
        slug,
      };

      if (isEditing && initialData?.id) {
        await updateDoc(doc(db, 'ofertasEmpleos', initialData.id), offerData);
        toast({ title: "Éxito", description: "Oferta actualizada correctamente." });
      } else {
        await addDoc(collection(db, 'ofertasEmpleos'), offerData);
        toast({ title: "Éxito", description: "Oferta creada correctamente." });
      }
      
      router.push('/dashboard/offers');
    } catch (error) {
      console.error("Error saving offer: ", error);
      toast({
        title: "Error",
        description: "No se pudo guardar la oferta.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20">
        <Card className="border-none shadow-sm">
          <CardHeader className="border-b bg-slate-50/50">
            <CardTitle className="text-xl font-bold text-slate-800">
               {isEditing ? 'Editar Oferta Laboral' : 'Crear Nueva Oferta Laboral'}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="titulo"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Título de la Oferta *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Auxiliar de Enfermería" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="descripcion"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Descripción *</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe las responsabilidades del cargo..." className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requisitos"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Requisitos *</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Formación, conocimientos específicos, etc..." className="min-h-[100px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fechaPublicacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de Publicación *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sueldo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sueldo *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: A convenir o $2.500.000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ubicacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ubicación *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Barranquilla, Atlántico" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tipoContrato"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Contrato *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Termino Indefinido">Término Indefinido</SelectItem>
                        <SelectItem value="Termino Fijo">Término Fijo</SelectItem>
                        <SelectItem value="Prestación de Servicios">Prestación de Servicios</SelectItem>
                        <SelectItem value="Obra o Labor">Obra o Labor</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jornada"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jornada *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar jornada" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Tiempo Completo">Tiempo Completo</SelectItem>
                        <SelectItem value="Medio Tiempo">Medio Tiempo</SelectItem>
                        <SelectItem value="Por Turnos">Por Turnos</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experiencia"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experiencia *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar experiencia" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Sin experiencia">Sin experiencia</SelectItem>
                        <SelectItem value="1 año">1 año</SelectItem>
                        <SelectItem value="2-3 años">2-3 años</SelectItem>
                        <SelectItem value="Mas de 5 años">Más de 5 años</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="estudios"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nivel de Estudios *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar nivel" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Bachillerato">Bachillerato</SelectItem>
                        <SelectItem value="Técnico">Técnico</SelectItem>
                        <SelectItem value="Tecnólogo">Tecnólogo</SelectItem>
                        <SelectItem value="Profesional">Profesional</SelectItem>
                        <SelectItem value="Especialista">Especialista</SelectItem>
                        <SelectItem value="Maestría / Doctorado">Maestría / Doctorado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="habilidades"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Habilidades</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Ej: Trabajo en equipo, proactividad..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="idiomas"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Idiomas</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Inglés Técnico" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="otros"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Otros Detalles</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Otras observaciones relevantes..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-8 flex items-center justify-end gap-4 border-t pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.back()}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 min-w-[150px]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Icons.save className="w-4 h-4 mr-2" />
                    {isEditing ? 'Actualizar Oferta' : 'Crear Oferta'}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
