'use client';

import { useState, useEffect, use } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Blog } from '@/types/blog';
import { BlogForm } from '@/components/dashboard/blog-form';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (!db) return;
        const docRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBlog({ id: docSnap.id, ...docSnap.data() } as Blog);
        } else {
          toast({
            title: "Error",
            description: "No se encontró el artículo.",
            variant: "destructive",
          });
          router.push('/dashboard/blog');
        }
      } catch (error) {
        console.error("Error fetching blog: ", error);
        toast({
          title: "Error",
          description: "Ocurrió un error al cargar el artículo.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Icons.spinner className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!blog) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
          <Link href="/dashboard/blog">
            <Icons.chevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Editar Artículo</h1>
          <p className="text-slate-500">Actualiza el contenido de "{blog.title}"</p>
        </div>
      </div>

      <BlogForm initialData={blog} isEditing />
    </div>
  );
}
