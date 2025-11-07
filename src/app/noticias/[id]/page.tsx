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
      title: 'Artículo no encontrado - Clínica de la Costa',
      description: 'El artículo que buscas no está disponible.',
    };
  }
  
  // Generar slug para la URL canónica
  const slug = blog.slug || blog.title
    ?.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-') || blog.id;
  
  // Descripción limpia sin HTML
  const description = blog.content
    .replace(/<[^>]*>?/gm, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 160) + '...';

  const canonicalUrl = `https://www.clinicadelacosta.com/noticias/${slug}`;
  const logoUrl = 'https://firebasestorage.googleapis.com/v0/b/contenedor-de-video.firebasestorage.app/o/public%2Flogo-clinica.png?alt=media';

  return {
    title: `${blog.title} | Clínica de la Costa`,
    description: description,
    keywords: [
      blog.category,
      'Clínica de la Costa',
      'Barranquilla',
      'Salud',
      'Noticias médicas',
      'Colombia',
      blog.title,
    ],
    authors: [{ name: blog.author }],
    creator: blog.author,
    publisher: 'Clínica de la Costa',
    category: blog.category,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: blog.title,
      description: description,
      type: 'article',
      url: canonicalUrl,
      siteName: 'Clínica de la Costa',
      locale: 'es_CO',
      images: [
        {
          url: blog.image,
          width: 1200,
          height: 630,
          alt: blog.title,
          type: 'image/jpeg',
        },
        {
          url: logoUrl,
          width: 400,
          height: 400,
          alt: 'Logo Clínica de la Costa',
        },
      ],
      publishedTime: new Date(blog.date).toISOString(),
      modifiedTime: new Date(blog.date).toISOString(),
      authors: [blog.author],
      section: blog.category,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@ClinicadelaCosta',
      creator: '@ClinicadelaCosta',
      title: blog.title,
      description: description,
      images: {
        url: blog.image,
        alt: blog.title,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'article:published_time': new Date(blog.date).toISOString(),
      'article:author': blog.author,
      'article:section': blog.category,
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

  // Generar slug para la URL canónica
  const slug = blog.slug || blog.title
    ?.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-') || blog.id;

  const canonicalUrl = `https://www.clinicadelacosta.com/noticias/${slug}`;

  // Schema.org JSON-LD para SEO
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: blog.title,
    image: [blog.image],
    datePublished: new Date(blog.date).toISOString(),
    dateModified: new Date(blog.date).toISOString(),
    author: {
      '@type': 'Person',
      name: blog.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Clínica de la Costa',
      logo: {
        '@type': 'ImageObject',
        url: 'https://firebasestorage.googleapis.com/v0/b/contenedor-de-video.firebasestorage.app/o/public%2Flogo-clinica.png?alt=media',
      },
    },
    description: blog.content.replace(/<[^>]*>?/gm, '').substring(0, 160),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    articleSection: blog.category,
    inLanguage: 'es-CO',
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: 'https://www.clinicadelacosta.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Noticias',
        item: 'https://www.clinicadelacosta.com/noticias',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: blog.title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

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
