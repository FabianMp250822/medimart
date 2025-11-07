import { safeQuery } from '@/lib/firebase-helpers';
import { Blog } from '@/types/blog';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { SimilarArticles } from '@/components/blog/similar-articles';
import Link from 'next/link';
import { BlogLayout } from '@/components/blog/blog-layout';
import admin from 'firebase-admin';

type Props = {
  params: Promise<{ id: string }>;
};

async function getBlog(idOrSlug: string): Promise<Blog | null> {
  return safeQuery(async (db) => {
    // 1. Primero intentar buscar por ID directo
    const docRef = db.collection('blogs').doc(idOrSlug);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      return { id: docSnap.id, ...docSnap.data() } as Blog;
    }

    // 2. Buscar por slug exacto
    const slugQuery = await db.collection('blogs')
      .where('slug', '==', idOrSlug)
      .limit(1)
      .get();

    if (!slugQuery.empty) {
      const doc = slugQuery.docs[0];
      return { id: doc.id, ...doc.data() } as Blog;
    }

    // 3. Fallback: buscar por título generando slug y comparando
    // Obtener todas las noticias y buscar manualmente
    const allBlogs = await db.collection('blogs')
      .where('lugar', '==', 'clinica')
      .get();

    for (const doc of allBlogs.docs) {
      const data = doc.data();
      // Generar slug del título y comparar
      const generatedSlug = data.title
        ?.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

      if (generatedSlug === idOrSlug) {
        return { id: doc.id, ...data } as Blog;
      }
    }

    return null;
  }, null);
}

async function getRecentBlogs(currentId: string): Promise<Blog[]> {
    return safeQuery(async (db) => {
        const blogsSnapshot = await db.collection('blogs')
            .where('lugar', '==', 'clinica')
            .orderBy('date', 'desc')
            .limit(4)
            .get();
            
        const blogs: Blog[] = blogsSnapshot.docs
            .map(doc => ({ id: doc.id, ...(doc.data() as Omit<Blog, 'id'>) }))
            .filter(blog => blog.id !== currentId)
            .slice(0, 3);
            
        return blogs;
    }, []);
}

async function getSimilarBlogs(category: string, currentId: string): Promise<Blog[]> {
    return safeQuery(async (db) => {
        const blogsSnapshot = await db.collection('blogs')
            .where('category', '==', category)
            .orderBy('date', 'desc')
            .limit(4)
            .get();
        
        const blogs: Blog[] = blogsSnapshot.docs
            .map(doc => ({ id: doc.id, ...(doc.data() as Omit<Blog, 'id'>) }))
            .filter(blog => blog.id !== currentId && blog.lugar === 'clinica')
            .slice(0, 3);
            
        return blogs;
    }, []);
}

async function getAndUpdateVisitCount(id: string): Promise<number> {
  return safeQuery(async (db) => {
    const visitRef = db.collection('visitas').doc(id);
    await visitRef.set({ 
      visitas: admin.firestore.FieldValue.increment(1) 
    }, { merge: true });

    const docSnap = await visitRef.get();
    
    if (docSnap.exists) {
      return docSnap.data()?.visitas || 1;
    }
    return 1;
  }, 0);
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) {
    return {
      title: 'Artículo no encontrado',
    };
  }
  
  const description = blog.content
    .replace(/<[^>]*>?/gm, '')
    .substring(0, 160) + '...';

  return {
    title: `${blog.title} - Clínica de la Costa`,
    description: description,
    openGraph: {
      title: blog.title,
      description: description,
      type: 'article',
      url: `https://clinica-de-la-costa.app/noticias/${blog.id}`,
      images: [
        {
          url: blog.image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      publishedTime: new Date(blog.date).toISOString(),
      authors: [blog.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: description,
      images: [blog.image],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) {
    notFound();
  }

  const [recentBlogs, similarBlogs, visitCount] = await Promise.all([
    getRecentBlogs(id),
    getSimilarBlogs(blog.category, id),
    getAndUpdateVisitCount(id)
  ]);

  return (
    <>
      <BlogLayout
        blog={blog}
        recentBlogs={recentBlogs}
        visitCount={visitCount}
      />
      <div className="container mx-auto py-12 px-4">
        {similarBlogs.length > 0 && <SimilarArticles articles={similarBlogs} />}
        <div className="mt-12 text-center">
            <Link href="/noticias" className="text-accent hover:underline font-semibold">
                &larr; Volver a todas las noticias
            </Link>
        </div>
      </div>
    </>
  );
}
