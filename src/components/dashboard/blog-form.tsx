'use client';

import { db, storage } from '@/lib/firebase';
import { RichTextEditor } from './rich-text-editor';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Blog } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Icons } from '@/components/icons';
import { toast } from '@/hooks/use-toast';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface BlogFormProps {
  initialData?: Blog;
  isEditing?: boolean;
}

export function BlogForm({ initialData, isEditing = false }: BlogFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Blog>>(
    initialData || {
      title: '',
      author: 'Clínica de la Costa',
      category: 'Salud',
      date: new Date().toISOString().split('T')[0],
      image: '',
      lugar: 'clinica',
      comments: 0,
      votes: 0,
      content: '',
    }
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditorImageUpload = async (file: File): Promise<string> => {
    if (!storage) throw new Error("Storage not initialized");
    const storageRef = ref(storage, `blog/${uuidv4()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  };

  const handleImageUpload = async (file: File, type: 'cover' | 'inline') => {
    try {
      if (!storage) throw new Error("Storage not initialized");
      const storageRef = ref(storage, `blog/${uuidv4()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      
      if (type === 'cover') {
        setFormData(prev => ({ ...prev, image: url }));
      }
    } catch (error) {
      console.error("Error uploading image: ", error);
      toast({
        title: "Error",
        description: "No se pudo subir la imagen.",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'cover' | 'inline') => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file, type);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.image) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa el título, la imagen de portada y el contenido.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      if (!db) return;

      const blogData = {
        ...formData,
        slug: formData.title
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9\s-]/g, '')
          .trim()
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-'),
      };

      if (isEditing && initialData?.id) {
        await updateDoc(doc(db, 'blogs', initialData.id), blogData);
        toast({ title: "Éxito", description: "Artículo actualizado correctamente." });
      } else {
        await addDoc(collection(db, 'blogs'), blogData);
        toast({ title: "Éxito", description: "Artículo creado correctamente." });
      }
      
      router.push('/dashboard/blog');
    } catch (error) {
      console.error("Error saving blog: ", error);
      toast({
        title: "Error",
        description: "No se pudo guardar el artículo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Contenido del Artículo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título del Artículo</Label>
                <Input 
                  id="title" 
                  placeholder="Ej: La Clínica de la Costa lidera la prevención..."
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="text-lg font-bold"
                />
              </div>

              <div className="space-y-2">
                <Label>Contenido</Label>
                <RichTextEditor 
                  content={formData.content || ''}
                  onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                  placeholder="Escribe el contenido de tu artículo aquí..."
                  onImageUpload={handleEditorImageUpload}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings Section */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Configuración</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Cover Image */}
              <div className="space-y-2">
                <Label>Imagen de Portada</Label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="relative group aspect-video rounded-lg border-2 border-dashed border-slate-200 hover:border-primary/50 flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden bg-slate-50"
                >
                  {formData.image ? (
                    <>
                      <Image 
                        src={formData.image} 
                        alt="Portada" 
                        fill 
                        className="object-cover transition-transform group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Icons.plus className="w-8 h-8 text-white" />
                      </div>
                    </>
                  ) : (
                    <>
                      <Icons.health className="w-8 h-8 text-slate-300 mb-2" />
                      <span className="text-xs text-slate-400">Click para subir portada</span>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={(e) => handleFileChange(e, 'cover')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(val) => setFormData(prev => ({ ...prev, category: val }))}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Salud">Salud</SelectItem>
                    <SelectItem value="Prevención">Prevención</SelectItem>
                    <SelectItem value="Eventos">Eventos</SelectItem>
                    <SelectItem value="Especialidades">Especialidades</SelectItem>
                    <SelectItem value="Innovación">Innovación</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Autor</Label>
                <Input 
                  id="author" 
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Fecha de Publicación</Label>
                <Input 
                  id="date" 
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="votes">Votos / Likes Iniciales</Label>
                <Input 
                  id="votes" 
                  type="number"
                  value={formData.votes}
                  onChange={(e) => setFormData(prev => ({ ...prev, votes: parseInt(e.target.value) || 0 }))}
                />
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
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
                      {isEditing ? 'Actualizar Artículo' : 'Publicar Artículo'}
                    </>
                  )}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.back()}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
