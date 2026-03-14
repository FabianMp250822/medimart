'use client';

import { useState } from 'react';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Medico, AcademicInfo, ProfessionalExperience } from '@/types/medico';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SpecialistFormProps {
  initialData?: Medico;
  isEditing?: boolean;
}

export function SpecialistForm({ initialData, isEditing = false }: SpecialistFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialData?.profileImage || '');

  const [formData, setFormData] = useState<Omit<Medico, 'id'>>({
    nombreCompleto: initialData?.nombreCompleto || '',
    especialidad: initialData?.especialidad || '',
    profileImage: initialData?.profileImage || '',
    email: initialData?.email || '',
    telefono: initialData?.telefono || '',
    sede: initialData?.sede || 'Clínica de la Costa',
    academicInfo: initialData?.academicInfo || [],
    professionalExperience: initialData?.professionalExperience || [],
    awards: initialData?.awards || [],
    certifications: initialData?.certifications || [],
    publications: initialData?.publications || [],
    aplicaEnTodasLasSedes: initialData?.aplicaEnTodasLasSedes ?? true,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Generic Dynamic Handlers
  const addItem = (field: keyof Omit<Medico, 'id'>, emptyItem: any) => {
    setFormData({
      ...formData,
      [field]: [...(formData[field] as any[]), emptyItem]
    });
  };

  const removeItem = (field: keyof Omit<Medico, 'id'>, index: number) => {
    const newList = [...(formData[field] as any[])];
    newList.splice(index, 1);
    setFormData({ ...formData, [field]: newList });
  };

  const updateItem = (field: keyof Omit<Medico, 'id'>, index: number, subField: string, value: string) => {
    const newList = [...(formData[field] as any[])];
    newList[index] = { ...newList[index], [subField]: value };
    setFormData({ ...formData, [field]: newList });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = formData.profileImage;

      if (imageFile) {
        if (!storage) throw new Error('Storage no inicializado');
        const storageRef = ref(storage, `medicos/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const finalData = { ...formData, profileImage: imageUrl };

      if (!db) throw new Error('DB no inicializada');

      if (isEditing && initialData?.id) {
        await updateDoc(doc(db, 'medicos', initialData.id), finalData);
        toast({ title: "Éxito", description: "Perfil actualizado correctamente." });
      } else {
        await addDoc(collection(db, 'medicos'), finalData);
        toast({ title: "Éxito", description: "Nuevo especialista creado." });
      }

      router.push('/dashboard/doctors');
    } catch (error: any) {
      console.error("Error saving specialist:", error);
      toast({
        title: "Error",
        description: error.message || "No se pudo guardar la información.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Foto de Perfil</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-slate-100 shadow-md">
                <AvatarImage src={imagePreview} />
                <AvatarFallback className="bg-slate-50 text-slate-400">
                  <Icons.user className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <div className="w-full">
                 <Label htmlFor="image-upload" className="cursor-pointer">
                    <div className="flex items-center justify-center p-2 border-2 border-dashed border-slate-200 rounded-lg hover:border-primary/50 transition-colors">
                       <Icons.plus className="w-4 h-4 mr-2 text-slate-400" />
                       <span className="text-sm text-slate-500">Subir imagen</span>
                    </div>
                 </Label>
                 <Input 
                   id="image-upload" 
                   type="file" 
                   accept="image/*" 
                   className="hidden" 
                   onChange={handleImageChange}
                 />
              </div>
              <p className="text-[10px] text-slate-400 text-center">
                JPG, PNG o WebP. Máximo 2MB.
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium">Información de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Corporativo</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="nombre@clinicadelacosta.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono / Extensión</Label>
                <Input 
                  id="phone" 
                  value={formData.telefono} 
                  onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                  placeholder="+57 (605) ..."
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Datos del Profesional</CardTitle>
              <CardDescription>Información principal que aparecerá en el sitio web.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input 
                      id="name" 
                      required 
                      value={formData.nombreCompleto} 
                      onChange={(e) => setFormData({...formData, nombreCompleto: e.target.value})}
                    />
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="specialty">Especialidad</Label>
                    <Input 
                      id="specialty" 
                      required 
                      value={formData.especialidad} 
                      onChange={(e) => setFormData({...formData, especialidad: e.target.value})}
                    />
                 </div>
              </div>
              
              <div className="space-y-2">
                 <Label htmlFor="sede">Sede Principal</Label>
                 <Input 
                   id="sede" 
                   value={formData.sede} 
                   onChange={(e) => setFormData({...formData, sede: e.target.value})}
                 />
              </div>

              {/* Información Académica */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                 <div className="flex items-center justify-between">
                    <Label className="text-base font-bold text-slate-800">Información Académica</Label>
                    <Button type="button" variant="outline" size="sm" onClick={() => addItem('academicInfo', { gradoAcademico: '', institucion: '', anoGraduacion: '' })}>
                       <Icons.plus className="w-3 h-3 mr-2" />
                       AGREGAR MÁS
                    </Button>
                 </div>
                 
                 <div className="space-y-4">
                    {formData.academicInfo?.map((info, index) => (
                      <div key={index} className="p-4 bg-slate-50 rounded-xl relative group">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-1">
                               <Label className="text-[10px] uppercase text-slate-400">Grado Académico</Label>
                               <Input 
                                 placeholder="Grado Académico" 
                                 value={info.gradoAcademico} 
                                 onChange={(e) => updateItem('academicInfo', index, 'gradoAcademico', e.target.value)}
                               />
                            </div>
                            <div className="space-y-1">
                               <Label className="text-[10px] uppercase text-slate-400">Institución</Label>
                               <Input 
                                 placeholder="Institución" 
                                 value={info.institucion} 
                                 onChange={(e) => updateItem('academicInfo', index, 'institucion', e.target.value)}
                               />
                            </div>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                               <Label className="text-[10px] uppercase text-slate-400">Año de Graduación</Label>
                               <Input 
                                 placeholder="Año de Graduación" 
                                 value={info.anoGraduacion} 
                                 onChange={(e) => updateItem('academicInfo', index, 'anoGraduacion', e.target.value)}
                               />
                            </div>
                         </div>
                         <Button 
                           type="button" 
                           variant="ghost" 
                           size="icon" 
                           className="absolute top-2 right-2 h-6 w-6 rounded-full bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                           onClick={() => removeItem('academicInfo', index)}
                         >
                           <Icons.trash className="h-3 w-3" />
                         </Button>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Experiencia Profesional */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                 <div className="flex items-center justify-between">
                    <Label className="text-base font-bold text-slate-800">Experiencia Profesional</Label>
                    <Button type="button" variant="outline" size="sm" onClick={() => addItem('professionalExperience', { posicion: '', institucionTrabajo: '', fechaInicio: '', fechaFin: '', descripcionExperiencia: '' })}>
                       <Icons.plus className="w-3 h-3 mr-2" />
                       AGREGAR MÁS
                    </Button>
                 </div>
                 
                 <div className="space-y-4">
                    {formData.professionalExperience?.map((exp, index) => (
                      <div key={index} className="p-4 bg-slate-50 rounded-xl relative group">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-1">
                               <Label className="text-[10px] uppercase text-slate-400">Posición</Label>
                               <Input 
                                 placeholder="Posición" 
                                 value={exp.posicion} 
                                 onChange={(e) => updateItem('professionalExperience', index, 'posicion', e.target.value)}
                               />
                            </div>
                            <div className="space-y-1">
                               <Label className="text-[10px] uppercase text-slate-400">Institución</Label>
                               <Input 
                                 placeholder="Institución" 
                                 value={exp.institucionTrabajo} 
                                 onChange={(e) => updateItem('professionalExperience', index, 'institucionTrabajo', e.target.value)}
                               />
                            </div>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-1">
                               <Label className="text-[10px] uppercase text-slate-400">Fecha de Inicio</Label>
                               <Input 
                                 type="text"
                                 placeholder="dd/mm/aaaa" 
                                 value={exp.fechaInicio} 
                                 onChange={(e) => updateItem('professionalExperience', index, 'fechaInicio', e.target.value)}
                               />
                            </div>
                            <div className="space-y-1">
                               <Label className="text-[10px] uppercase text-slate-400">Fecha de Fin</Label>
                               <Input 
                                 type="text"
                                 placeholder="dd/mm/aaaa" 
                                 value={exp.fechaFin} 
                                 onChange={(e) => updateItem('professionalExperience', index, 'fechaFin', e.target.value)}
                               />
                               <p className="text-[10px] text-slate-400">Dejar en blanco si es tu trabajo actual</p>
                            </div>
                         </div>
                         <div className="space-y-1">
                            <Label className="text-[10px] uppercase text-slate-400">Descripción</Label>
                            <Textarea 
                              placeholder="Descripción" 
                              value={exp.descripcionExperiencia} 
                              onChange={(e) => updateItem('professionalExperience', index, 'descripcionExperiencia', e.target.value)}
                            />
                         </div>
                         <Button 
                           type="button" 
                           variant="ghost" 
                           size="icon" 
                           className="absolute top-2 right-2 h-6 w-6 rounded-full bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                           onClick={() => removeItem('professionalExperience', index)}
                         >
                           <Icons.trash className="h-3 w-3" />
                         </Button>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Certificaciones y Licencias */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                 <div className="flex items-center justify-between">
                    <Label className="text-base font-bold text-slate-800">Certificaciones y Licencias</Label>
                    <Button type="button" variant="outline" size="sm" onClick={() => addItem('certifications', { nombre: '', institucion: '', anio: '' })}>
                       <Icons.plus className="w-3 h-3 mr-2" />
                       AGREGAR MÁS
                    </Button>
                 </div>
                 
                 <div className="space-y-4">
                    {formData.certifications?.map((cert, index) => (
                      <div key={index} className="p-4 bg-slate-50 rounded-xl relative group">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-1">
                               <Label className="text-[10px] uppercase text-slate-400">Nombre de la Certificación</Label>
                               <Input 
                                 placeholder="Nombre de la Certificación" 
                                 value={cert.nombre} 
                                 onChange={(e) => updateItem('certifications', index, 'nombre', e.target.value)}
                               />
                            </div>
                            <div className="space-y-1">
                               <Label className="text-[10px] uppercase text-slate-400">Institución</Label>
                               <Input 
                                 placeholder="Institución" 
                                 value={cert.institucion} 
                                 onChange={(e) => updateItem('certifications', index, 'institucion', e.target.value)}
                               />
                            </div>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                               <Label className="text-[10px] uppercase text-slate-400">Año</Label>
                               <Input 
                                 placeholder="Año" 
                                 value={cert.anio} 
                                 onChange={(e) => updateItem('certifications', index, 'anio', e.target.value)}
                               />
                            </div>
                         </div>
                         <Button 
                           type="button" 
                           variant="ghost" 
                           size="icon" 
                           className="absolute top-2 right-2 h-6 w-6 rounded-full bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                           onClick={() => removeItem('certifications', index)}
                         >
                           <Icons.trash className="h-3 w-3" />
                         </Button>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Publicaciones e Investigación */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                 <div className="flex items-center justify-between">
                    <Label className="text-base font-bold text-slate-800">Publicaciones e Investigación</Label>
                    <Button type="button" variant="outline" size="sm" onClick={() => addItem('publications', { titulo: '', fecha: '', descripcion: '' })}>
                       <Icons.plus className="w-3 h-3 mr-2" />
                       AGREGAR MÁS
                    </Button>
                 </div>
                 
                 <div className="space-y-4">
                    {formData.publications?.map((pub, index) => (
                      <div key={index} className="p-4 bg-slate-50 rounded-xl relative group">
                         <div className="space-y-4 mb-4">
                            <div className="space-y-1">
                               <Label className="text-[10px] uppercase text-slate-400">Título de la Publicación</Label>
                               <Input 
                                 placeholder="Título de la Publicación" 
                                 value={pub.titulo} 
                                 onChange={(e) => updateItem('publications', index, 'titulo', e.target.value)}
                               />
                            </div>
                            <div className="space-y-1">
                               <Label className="text-[10px] uppercase text-slate-400">Fecha</Label>
                               <Input 
                                 type="text"
                                 placeholder="dd/mm/aaaa" 
                                 value={pub.fecha} 
                                 onChange={(e) => updateItem('publications', index, 'fecha', e.target.value)}
                               />
                            </div>
                            <div className="space-y-1">
                               <Label className="text-[10px] uppercase text-slate-400">Descripción</Label>
                               <Textarea 
                                 placeholder="Descripción" 
                                 value={pub.descripcion} 
                                 onChange={(e) => updateItem('publications', index, 'descripcion', e.target.value)}
                               />
                            </div>
                         </div>
                         <Button 
                           type="button" 
                           variant="ghost" 
                           size="icon" 
                           className="absolute top-2 right-2 h-6 w-6 rounded-full bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                           onClick={() => removeItem('publications', index)}
                         >
                           <Icons.trash className="h-3 w-3" />
                         </Button>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Premios y Reconocimientos */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                 <div className="flex items-center justify-between">
                    <Label className="text-base font-bold text-slate-800">Premios y Reconocimientos</Label>
                    <Button type="button" variant="outline" size="sm" onClick={() => addItem('awards', { nombre: '', anio: '', descripcion: '' })}>
                       <Icons.plus className="w-3 h-3 mr-2" />
                       AGREGAR MÁS
                    </Button>
                 </div>
                 
                 <div className="space-y-4">
                    {formData.awards?.map((award, index) => (
                      <div key={index} className="p-4 bg-slate-50 rounded-xl relative group">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-1">
                               <Label className="text-[10px] uppercase text-slate-400">Nombre del Premio</Label>
                               <Input 
                                 placeholder="Nombre del Premio" 
                                 value={award.nombre} 
                                 onChange={(e) => updateItem('awards', index, 'nombre', e.target.value)}
                               />
                            </div>
                            <div className="space-y-1">
                               <Label className="text-[10px] uppercase text-slate-400">Año</Label>
                               <Input 
                                 placeholder="Año" 
                                 value={award.anio} 
                                 onChange={(e) => updateItem('awards', index, 'anio', e.target.value)}
                               />
                            </div>
                         </div>
                         <div className="space-y-1">
                            <Label className="text-[10px] uppercase text-slate-400">Descripción</Label>
                            <Textarea 
                              placeholder="Descripción" 
                              value={award.descripcion} 
                              onChange={(e) => updateItem('awards', index, 'descripcion', e.target.value)}
                            />
                         </div>
                         <Button 
                           type="button" 
                           variant="ghost" 
                           size="icon" 
                           className="absolute top-2 right-2 h-6 w-6 rounded-full bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                           onClick={() => removeItem('awards', index)}
                         >
                           <Icons.trash className="h-3 w-3" />
                         </Button>
                      </div>
                    ))}
                 </div>
              </div>

            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
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
               className="bg-primary hover:bg-primary/90 px-8"
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
                   {isEditing ? 'Actualizar Perfil' : 'Crear Perfil'}
                 </>
               )}
             </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
