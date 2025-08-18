import { adminDb } from '@/lib/firebase-admin';
import { Blog } from '@/types/blog';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Noticias - Clínica de la Costa',
  description: 'Manténgase al día con las últimas noticias, artículos y consejos de salud de la Clínica de la Costa.',
};

async function getBlogs(): Promise<Blog[]> {
  try {
    const blogsSnapshot = await adminDb.collection('blogs').where('lugar', '==', 'clinica').orderBy('date', 'desc').get();
    if (blogsSnapshot.empty) {
      console.log('No blogs found.');
      return [];
    }
    const blogs: Blog[] = blogsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Blog, 'id'>),
    }));
    return blogs;
  } catch (error) {
    console.error("Error fetching blogs: ", error);
    return [];
  }
}

export default async function NoticiasPage() {
  const blogs = await getBlogs();

  const blogsWithImages = blogs.filter(blog => blog.image);
  const bannerImage = blogsWithImages.length > 0
    ? blogsWithImages[Math.floor(Math.random() * blogsWithImages.length)].image
    : "https://placehold.co/1920x400.png";
  const bannerAlt = blogsWithImages.length > 0 ? "Imagen de una noticia destacada" : "Sala de espera de la clínica";


  return (
    <div className="bg-background">
      <div className="relative bg-primary/80 text-white py-20 sm:py-28 md:py-32 flex items-center justify-center text-center">
        <Image
          src={bannerImage}
          alt={bannerAlt}
          layout="fill"
          objectFit="cover"
          className="z-0 opacity-20"
          data-ai-hint="medical team meeting"
          priority
        />
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-bold">Nuestro Blog de Noticias</h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
            Información actualizada sobre salud, bienestar y los avances en Clínica de la Costa.
          </p>
        </div>
      </div>

      <main className="container mx-auto py-12 px-4">
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <Card key={blog.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col group">
                 <Link href={`/noticias/${blog.id}`} className="block overflow-hidden">
                   <div className="relative h-56 w-full">
                     <Image 
                       src={blog.image} 
                       alt={blog.title} 
                       layout="fill" 
                       objectFit="cover" 
                       className="transition-transform duration-300 group-hover:scale-105"
                     />
                   </div>
                 </Link>
                <CardContent className="p-6 flex flex-col flex-grow">
                   <p className="text-sm text-accent font-semibold mb-2">{blog.category}</p>
                   <h2 className="text-xl font-bold text-primary mb-4 flex-grow">
                     <Link href={`/noticias/${blog.id}`} className="hover:underline">
                       {blog.title}
                     </Link>
                   </h2>
                   <div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
                     <span>{new Date(blog.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</span>
                     <span>Por {blog.author}</span>
                   </div>
                    <Button asChild className="mt-6 bg-accent hover:bg-accent/90 w-full">
                      <Link href={`/noticias/${blog.id}`}>Leer más</Link>
                    </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-primary">No hay artículos disponibles</h2>
            <p className="text-muted-foreground mt-4">Vuelve a visitarnos pronto para leer nuestras últimas noticias.</p>
          </div>
        )}
      </main>
    </div>
  );
}
