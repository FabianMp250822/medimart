
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { OfertaEmpleo } from "@/types/oferta-empleo";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Trash2, PlusCircle } from "lucide-react";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  oferta?: OfertaEmpleo;
}

const applySchema = z.object({
  // Información Personal
  nombresApellidos: z.string().min(3, "El nombre es requerido"),
  tipoDocumento: z.string(),
  numeroDocumento: z.string().min(5, "Número de documento requerido"),
  fechaNacimiento: z.string().min(1, "Fecha de nacimiento requerida"),
  lugarNacimiento: z.string().min(1, "Lugar de nacimiento requerido"),
  genero: z.string(),
  estadoCivil: z.string(),
  direccionResidencia: z.string().min(1, "Dirección requerida"),
  telefonoFijo: z.string().optional(),
  telefonoCelular: z.string().min(1, "Teléfono celular requerido"),
  correoElectronico: z.string().email("El correo electrónico no es válido"),
  
  // Información Académica
  tituloObtenido: z.string().min(1, "Título requerido"),
  universidad: z.string().min(1, "Universidad requerida"),
  fechaGrado: z.string().min(1, "Fecha de grado requerida"),
  paisTitulo: z.string().min(1, "País requerido"),
  tituloConvalidado: z.string(),
  numeroResolucion: z.string().optional(),
  especializacion: z.string().optional(),
  universidadEspecializacion: z.string().optional(),
  fechaInicioEspecializacion: z.string().optional(),
  fechaFinEspecializacion: z.string().optional(),
  otraInfoAcademica: z.string().optional(),

  // Experiencia Laboral (Array)
  experiencias: z.array(z.object({
    entidad: z.string().min(1, "Entidad requerida"),
    cargo: z.string().min(1, "Cargo requerido"),
    fechaInicio: z.string().min(1, "Fecha de inicio requerida"),
    fechaFin: z.string().min(1, "Fecha de fin requerida"),
    funciones: z.string().min(1, "Funciones requeridas"),
  })).optional(),

  // Certificaciones (Array)
  certificaciones: z.array(z.object({
    nombre: z.string().min(1, "Nombre requerido"),
    entidad: z.string().min(1, "Entidad requerida"),
    fechaExpedicion: z.string().min(1, "Fecha requerida"),
  })).optional(),

  // Habilidades
  tieneTarjetaProfesional: z.string(),
  numeroTarjetaProfesional: z.string().optional(),
  tieneRethus: z.string(),
  cursosAdicionales: z.string().optional(),
  idiomas: z.string().optional(),
  habilidadesInformaticas: z.string().optional(),

  // Información Adicional
  tieneDiscapacidad: z.string(),
  perteneceMinoria: z.string(),
  aspiracionSalarial: z.string().optional(),
  disponibilidadViajar: z.string(),

  // Referencias (Array)
  referencias: z.array(z.object({
    nombre: z.string().min(1, "Nombre requerido"),
    telefono: z.string().min(1, "Teléfono requerido"),
    relacion: z.string().min(1, "Relación requerida"),
  })).optional(),

  // Archivos
  cv: z.any().refine((files) => files?.length >= 1, "Debes adjuntar tu hoja de vida."),
  certificadosAdjuntos: z.any().optional(),
});

type ApplyFormValues = z.infer<typeof applySchema>;

export function ApplyModal({ isOpen, onClose, oferta }: ApplyModalProps) {
  const { toast } = useToast();
  const form = useForm<ApplyFormValues>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      nombresApellidos: "",
      tipoDocumento: "Cédula de Ciudadanía",
      numeroDocumento: "",
      fechaNacimiento: "",
      lugarNacimiento: "",
      genero: "Masculino",
      estadoCivil: "Soltero",
      direccionResidencia: "",
      telefonoFijo: "",
      telefonoCelular: "",
      correoElectronico: "",
      tituloObtenido: "",
      universidad: "",
      fechaGrado: "",
      paisTitulo: "",
      tituloConvalidado: "No",
      numeroResolucion: "",
      especializacion: "",
      universidadEspecializacion: "",
      fechaInicioEspecializacion: "",
      fechaFinEspecializacion: "",
      otraInfoAcademica: "",
      experiencias: [],
      certificaciones: [],
      tieneTarjetaProfesional: "No",
      numeroTarjetaProfesional: "",
      tieneRethus: "No",
      cursosAdicionales: "",
      idiomas: "",
      habilidadesInformaticas: "",
      tieneDiscapacidad: "No",
      perteneceMinoria: "No",
      aspiracionSalarial: "",
      disponibilidadViajar: "No",
      referencias: [],
    }
  });

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control: form.control, name: "experiencias" });
  const { fields: certFields, append: appendCert, remove: removeCert } = useFieldArray({ control: form.control, name: "certificaciones" });
  const { fields: refFields, append: appendRef, remove: removeRef } = useFieldArray({ control: form.control, name: "referencias" });

  const cvFileRef = form.register("cv");
  const certificadosFileRef = form.register("certificadosAdjuntos");

  const onSubmit: SubmitHandler<ApplyFormValues> = async (data) => {
    try {
      // Importar Firebase client (necesitas agregarlo arriba)
      const { db, storage } = await import('@/lib/firebase');
      const { collection, addDoc, serverTimestamp } = await import('firebase/firestore');
      const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');

      if (!db || !storage) {
        throw new Error('Firebase no está inicializado');
      }

      // Subir CV
      const cvFile = data.cv[0];
  // Cast storage to any to satisfy TypeScript (storage is non-null at runtime)
  const cvRef = ref(storage as any, `postulaciones/${data.numeroDocumento}/cv_${Date.now()}_${cvFile.name}`);
      await uploadBytes(cvRef, cvFile);
      const cvURL = await getDownloadURL(cvRef);

      // Subir certificados (si existen)
      let certificadosURLs: string[] = [];
      if (data.certificadosAdjuntos && data.certificadosAdjuntos.length > 0) {
        const certificadosPromises = Array.from(data.certificadosAdjuntos).map(async (file: any) => {
          const certRef = ref(storage as any, `postulaciones/${data.numeroDocumento}/certificados/${Date.now()}_${file.name}`);
          await uploadBytes(certRef, file);
          return getDownloadURL(certRef);
        });
        certificadosURLs = await Promise.all(certificadosPromises);
      }

      // Preparar datos para Firestore
      const postulacionData = {
        // Información Personal
        nombresApellidos: data.nombresApellidos,
        tipoDocumento: data.tipoDocumento,
        numeroDocumento: data.numeroDocumento,
        fechaNacimiento: data.fechaNacimiento,
        lugarNacimiento: data.lugarNacimiento,
        genero: data.genero,
        estadoCivil: data.estadoCivil,
        direccionResidencia: data.direccionResidencia,
        telefonoFijo: data.telefonoFijo || '',
        telefonoCelular: data.telefonoCelular,
        correoElectronico: data.correoElectronico,
        
        // Información Académica
        tituloObtenido: data.tituloObtenido,
        universidad: data.universidad,
        fechaGrado: data.fechaGrado,
        paisTitulo: data.paisTitulo,
        tituloConvalidado: data.tituloConvalidado,
        numeroResolucion: data.numeroResolucion || '',
        especializacion: data.especializacion || '',
        universidadEspecializacion: data.universidadEspecializacion || '',
        fechaInicioEspecializacion: data.fechaInicioEspecializacion || '',
        fechaFinEspecializacion: data.fechaFinEspecializacion || '',
        otraInfoAcademica: data.otraInfoAcademica || '',
        
        // Experiencia Laboral
        experiencias: data.experiencias || [],
        
        // Certificaciones
        certificaciones: data.certificaciones || [],
        
        // Habilidades
        tieneTarjetaProfesional: data.tieneTarjetaProfesional,
        numeroTarjetaProfesional: data.numeroTarjetaProfesional || '',
        tieneRethus: data.tieneRethus,
        cursosAdicionales: data.cursosAdicionales || '',
        idiomas: data.idiomas || '',
        habilidadesInformaticas: data.habilidadesInformaticas || '',
        
        // Información Adicional
        tieneDiscapacidad: data.tieneDiscapacidad,
        perteneceMinoria: data.perteneceMinoria,
        aspiracionSalarial: data.aspiracionSalarial || '',
        disponibilidadViajar: data.disponibilidadViajar,
        
        // Referencias
        referencias: data.referencias || [],
        
        // Archivos
        cvURL: cvURL,
        certificadosURLs: certificadosURLs,
        
        // Metadata
        ofertaId: oferta?.id || null,
        ofertaTitulo: oferta?.titulo || 'Postulación Espontánea',
        fechaPostulacion: serverTimestamp(),
        estado: 'Pendiente',
      };

      // Guardar en Firestore
  // Cast db to any to avoid Firestore nullable types; it's initialized at runtime
  await addDoc(collection(db as any, 'postulaciones'), postulacionData);

      toast({
        title: "¡Postulación enviada!",
        description: "Hemos recibido tu información. ¡Mucho éxito!",
      });
      
      form.reset();
      onClose();
    } catch (error) {
      console.error('Error al enviar postulación:', error);
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu postulación. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {oferta ? `Aplicar a: ${oferta.titulo}` : "Envía tu currículum para futuras postulaciones"}
          </DialogTitle>
          <DialogDescription>
            Completa el formulario para postularte. Nos pondremos en contacto si tu perfil se ajusta a nuestras necesidades.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">

              {/* Información Personal */}
              <Card>
                <CardHeader><CardTitle>Información Personal</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="nombresApellidos" render={({ field }) => (<FormItem><FormLabel>Nombres y Apellidos</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="tipoDocumento" render={({ field }) => (<FormItem><FormLabel>Tipo de Documento</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="Cédula de Ciudadanía">Cédula de Ciudadanía</SelectItem><SelectItem value="Cédula de Extranjería">Cédula de Extranjería</SelectItem><SelectItem value="Pasaporte">Pasaporte</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="numeroDocumento" render={({ field }) => (<FormItem><FormLabel>Número de Documento</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="fechaNacimiento" render={({ field }) => (<FormItem><FormLabel>Fecha de Nacimiento</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="lugarNacimiento" render={({ field }) => (<FormItem><FormLabel>Lugar de Nacimiento</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="genero" render={({ field }) => (<FormItem><FormLabel>Género</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="Masculino">Masculino</SelectItem><SelectItem value="Femenino">Femenino</SelectItem><SelectItem value="Otro">Otro</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="estadoCivil" render={({ field }) => (<FormItem><FormLabel>Estado Civil</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="Soltero">Soltero</SelectItem><SelectItem value="Casado">Casado</SelectItem><SelectItem value="Unión Libre">Unión Libre</SelectItem><SelectItem value="Viudo">Viudo</SelectItem><SelectItem value="Divorciado">Divorciado</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="direccionResidencia" render={({ field }) => (<FormItem><FormLabel>Dirección de Residencia</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="telefonoFijo" render={({ field }) => (<FormItem><FormLabel>Teléfono Fijo (Opcional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="telefonoCelular" render={({ field }) => (<FormItem><FormLabel>Teléfono Celular</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="correoElectronico" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Correo Electrónico</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </CardContent>
              </Card>

              {/* Información Académica */}
              <Card>
                <CardHeader><CardTitle>Información Académica</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="tituloObtenido" render={({ field }) => (<FormItem><FormLabel>Título Obtenido</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="universidad" render={({ field }) => (<FormItem><FormLabel>Universidad</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="fechaGrado" render={({ field }) => (<FormItem><FormLabel>Fecha de Grado</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="paisTitulo" render={({ field }) => (<FormItem><FormLabel>País donde obtuvo el título</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="tituloConvalidado" render={({ field }) => (<FormItem><FormLabel>Título Convalidado en Colombia?</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="Sí">Sí</SelectItem><SelectItem value="No">No</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="numeroResolucion" render={({ field }) => (<FormItem><FormLabel>N° Resolución Convalidación</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="especializacion" render={({ field }) => (<FormItem><FormLabel>Especialización (Opcional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="universidadEspecializacion" render={({ field }) => (<FormItem><FormLabel>Universidad Especialización</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="fechaInicioEspecializacion" render={({ field }) => (<FormItem><FormLabel>Fecha Inicio Especialización</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="fechaFinEspecializacion" render={({ field }) => (<FormItem><FormLabel>Fecha Fin Especialización</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="otraInfoAcademica" render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Otra Información Académica</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                </CardContent>
              </Card>

               {/* Experiencia Laboral */}
              <Card>
                <CardHeader><CardTitle>Experiencia Laboral</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  {expFields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-lg relative">
                      <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeExp(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name={`experiencias.${index}.entidad`} render={({ field }) => (<FormItem><FormLabel>Entidad</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name={`experiencias.${index}.cargo`} render={({ field }) => (<FormItem><FormLabel>Cargo</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name={`experiencias.${index}.fechaInicio`} render={({ field }) => (<FormItem><FormLabel>Fecha Inicio</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name={`experiencias.${index}.fechaFin`} render={({ field }) => (<FormItem><FormLabel>Fecha Fin</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name={`experiencias.${index}.funciones`} render={({ field }) => (<FormItem className="md:col-span-2"><FormLabel>Funciones</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={() => appendExp({ entidad: '', cargo: '', fechaInicio: '', fechaFin: '', funciones: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Agregar Experiencia</Button>
                </CardContent>
              </Card>

              {/* Certificaciones y Habilidades */}
              <Card>
                <CardHeader><CardTitle>Certificaciones y Habilidades</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {certFields.map((field, index) => (
                      <div key={field.id} className="p-4 border rounded-lg relative">
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeCert(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField control={form.control} name={`certificaciones.${index}.nombre`} render={({ field }) => (<FormItem><FormLabel>Nombre Certificación</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                          <FormField control={form.control} name={`certificaciones.${index}.entidad`} render={({ field }) => (<FormItem><FormLabel>Entidad Certificadora</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                          <FormField control={form.control} name={`certificaciones.${index}.fechaExpedicion`} render={({ field }) => (<FormItem><FormLabel>Fecha Expedición</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </div>
                      </div>
                    ))}
                    <Button type="button" variant="outline" onClick={() => appendCert({ nombre: '', entidad: '', fechaExpedicion: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Agregar Certificación</Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    <FormField control={form.control} name="tieneTarjetaProfesional" render={({ field }) => (<FormItem><FormLabel>Tiene Tarjeta Profesional?</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="Sí">Sí</SelectItem><SelectItem value="No">No</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="numeroTarjetaProfesional" render={({ field }) => (<FormItem><FormLabel>N° Tarjeta Profesional</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name="tieneRethus" render={({ field }) => (<FormItem><FormLabel>Tiene RETHUS?</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="Sí">Sí</SelectItem><SelectItem value="No">No</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                  </div>
                  <FormField control={form.control} name="cursosAdicionales" render={({ field }) => (<FormItem><FormLabel>Cursos Adicionales</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="idiomas" render={({ field }) => (<FormItem><FormLabel>Idiomas</FormLabel><FormControl><Input {...field} placeholder="Ej: Inglés B2, Francés A1" /></FormControl><FormMessage /></FormItem>)} />
                  <FormField control={form.control} name="habilidadesInformaticas" render={({ field }) => (<FormItem><FormLabel>Habilidades Informáticas</FormLabel><FormControl><Input {...field} placeholder="Ej: Microsoft Office, SAP" /></FormControl><FormMessage /></FormItem>)} />
                </CardContent>
              </Card>

              {/* Información Adicional */}
              <Card>
                <CardHeader><CardTitle>Información Adicional</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <FormField control={form.control} name="tieneDiscapacidad" render={({ field }) => (<FormItem><FormLabel>¿Tiene alguna discapacidad?</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="Sí">Sí</SelectItem><SelectItem value="No">No</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                     <FormField control={form.control} name="perteneceMinoria" render={({ field }) => (<FormItem><FormLabel>¿Pertenece a alguna minoría?</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="Sí">Sí</SelectItem><SelectItem value="No">No</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                     <FormField control={form.control} name="aspiracionSalarial" render={({ field }) => (<FormItem><FormLabel>Aspiración Salarial (Opcional)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                     <FormField control={form.control} name="disponibilidadViajar" render={({ field }) => (<FormItem><FormLabel>Disponibilidad para Viajar</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="Sí">Sí</SelectItem><SelectItem value="No">No</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                  </div>
                   <div className="space-y-4 pt-4">
                    <h4 className="font-medium">Referencias Personales</h4>
                    {refFields.map((field, index) => (
                      <div key={field.id} className="p-4 border rounded-lg relative">
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeRef(index)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField control={form.control} name={`referencias.${index}.nombre`} render={({ field }) => (<FormItem><FormLabel>Nombre</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                          <FormField control={form.control} name={`referencias.${index}.telefono`} render={({ field }) => (<FormItem><FormLabel>Teléfono</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                          <FormField control={form.control} name={`referencias.${index}.relacion`} render={({ field }) => (<FormItem><FormLabel>Relación</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                        </div>
                      </div>
                    ))}
                    <Button type="button" variant="outline" onClick={() => appendRef({ nombre: '', telefono: '', relacion: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Agregar Referencia</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Documentos */}
              <Card>
                <CardHeader><CardTitle>Documentos</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                      control={form.control}
                      name="cv"
                      render={() => (
                          <FormItem>
                              <FormLabel>Hoja de vida (PDF, DOC, DOCX)</FormLabel>
                              <FormControl>
                                  <Input {...cvFileRef} type="file" accept=".pdf,.doc,.docx" />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="certificadosAdjuntos"
                      render={() => (
                          <FormItem>
                              <FormLabel>Otros Certificados (Opcional)</FormLabel>
                              <FormControl>
                                  <Input {...certificadosFileRef} type="file" multiple />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                      )}
                  />
                </CardContent>
              </Card>
              
              <DialogFooter>
                  <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
                  <Button type="submit" className="bg-accent hover:bg-accent/90" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? "Enviando..." : "Enviar Postulación"}
                  </Button>
              </DialogFooter>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
