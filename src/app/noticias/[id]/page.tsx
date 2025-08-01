import { adminDb } from '@/lib/firebase-admin';
import { Blog } from '@/types/blog';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { SimilarArticles } from '@/components/blog/similar-articles';
import Link from 'next/link';
import { BlogLayout } from '@/components/blog/blog-layout';

type Props = {
  params: { id: string };
};

async function getBlog(id: string): Promise<Blog | null> {
  try {
    const docRef = adminDb.collection('blogs').doc(id);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return null;
    }

    return { id: docSnap.id, ...docSnap.data() } as Blog;
  } catch (error) {
    console.error("Error fetching blog post: ", error);
    return null;
  }
}

async function getRecentBlogs(currentId: string): Promise<Blog[]> {
    try {
        const blogsSnapshot = await adminDb.collection('blogs')
            .where('lugar', '==', 'clinica')
            .orderBy('date', 'desc')
            .limit(4)
            .get();
            
        const blogs: Blog[] = blogsSnapshot.docs
            .map(doc => ({ id: doc.id, ...(doc.data() as Omit<Blog, 'id'>) }))
            .filter(blog => blog.id !== currentId)
            .slice(0, 3);
        return blogs;
    } catch (error) {
        console.error("Error fetching recent blogs: ", error);
        return [];
    }
}

async function getSimilarBlogs(category: string, currentId: string): Promise<Blog[]> {
    try {
        const blogsSnapshot = await adminDb.collection('blogs')
            .where('category', '==', category)
            .orderBy('date', 'desc')
            .limit(10) // Fetch more to filter in code
            .get();
        
        const blogs: Blog[] = blogsSnapshot.docs
            .map(doc => ({ id: doc.id, ...(doc.data() as Omit<Blog, 'id'>) }))
            .filter(blog => blog.lugar === 'clinica' && blog.id !== currentId)
            .slice(0, 3);
            
        return blogs;
    } catch (error) {
        console.error("Error fetching similar blogs: ", error);
        return [];
    }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const blog = await getBlog(params.id);

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
      article: {
        publishedTime: new Date(blog.date).toISOString(),
        authors: [blog.author],
        tags: [blog.category],
      },
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
  const blog = await getBlog(params.id);

  if (!blog) {
    notFound();
  }

  const recentBlogs = await getRecentBlogs(params.id);
  const similarBlogs = await getSimilarBlogs(blog.category, params.id);

  return (
    <>
      <BlogLayout
        blog={blog}
        recentBlogs={recentBlogs}
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
