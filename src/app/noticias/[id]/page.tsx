import { adminDb } from '@/lib/firebase';
import { Blog } from '@/types/blog';
import type { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { BlogSidebar } from '@/components/blog/blog-sidebar';
import { SimilarArticles } from '@/components/blog/similar-articles';
import { CommentsSection } from '@/components/blog/comments-section';

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
            .limit(4) // Fetch 4, in case one is the current article
            .get();
            
        const blogs: Blog[] = blogsSnapshot.docs
            .map(doc => ({ id: doc.id, ...(doc.data() as Omit<Blog, 'id'>) }))
            .filter(blog => blog.id !== currentId) // Exclude the current article
            .slice(0, 3); // Take the top 3
        return blogs;
    } catch (error) {
        console.error("Error fetching recent blogs: ", error);
        return [];
    }
}

async function getSimilarBlogs(category: string, currentId: string): Promise<Blog[]> {
    try {
        const blogsSnapshot = await adminDb.collection('blogs')
            .where('lugar', '==', 'clinica')
            .where('category', '==', category)
            .orderBy('date', 'desc')
            .limit(4) // Fetch 4, in case one is the current article
            .get();
        
        const blogs: Blog[] = blogsSnapshot.docs
            .map(doc => ({ id: doc.id, ...(doc.data() as Omit<Blog, 'id'>) }))
            .filter(blog => blog.id !== currentId) // Exclude the current article
            .slice(0, 3); // Take top 3
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
      <article>
        <div className="relative w-full h-80">
          <Image
            src={blog.image}
            alt={blog.title}
            layout="fill"
            objectFit="cover"
            className="z-0"
            priority
          />
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="relative z-20 flex flex-col items-center justify-center h-full p-4 text-white text-center">
            <Link href={`/noticias?category=${encodeURIComponent(blog.category)}`} className="text-sm uppercase tracking-widest bg-accent/80 px-3 py-1 rounded-full hover:bg-accent transition-colors duration-300 mb-4">
              {blog.category}
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold max-w-4xl">{blog.title}</h1>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{new Date(blog.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <UserCircle className="h-5 w-5" />
                <span>{blog.author}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto py-12 px-4">
            <div className="grid lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <div
                        className="prose prose-lg max-w-none prose-h3:text-primary prose-a:text-accent hover:prose-a:underline"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />
                     <div className="mt-12">
                        <CommentsSection blogId={blog.id} />
                    </div>
                </div>
                {/* Sidebar */}
                <aside className="lg:col-span-1">
                    <BlogSidebar recentBlogs={recentBlogs} />
                </aside>
            </div>

            {similarBlogs.length > 0 && <SimilarArticles articles={similarBlogs} />}

            <div className="mt-12 text-center">
                <Link href="/noticias" className="text-accent hover:underline font-semibold">
                    &larr; Volver a todas las noticias
                </Link>
            </div>
        </div>
      </article>
    </>
  );
}
