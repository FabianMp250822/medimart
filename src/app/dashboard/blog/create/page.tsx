'use client';

import { BlogForm } from '@/components/dashboard/blog-form';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import Link from 'next/link';

export default function CreateBlogPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
          <Link href="/dashboard/blog">
            <Icons.chevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Crear Nuevo Artículo</h1>
          <p className="text-slate-500">Publica una nueva noticia o artículo en el blog.</p>
        </div>
      </div>

      <BlogForm />
    </div>
  );
}
