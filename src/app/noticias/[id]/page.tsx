import { adminDb } from '@/lib/firebase';
import { Blog } from '@/types/blog';
import type { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, UserCircle, Tag } from 'lucide-react';

type Props = {
  params: { id: string };
};

// Function to fetch a single blog post
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

// Generate metadata for SEO and social sharing
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
  
  // Truncate content for description
  const description = blog.content
    .replace(/<[^>]*>?/gm, '') // Remove HTML tags
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

  return (
    <article>
      {/* Hero Section */}
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
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              <span>{blog.category}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto max-w-4xl py-12 px-4">
        <div
          className="prose prose-lg max-w-none prose-h3:text-primary prose-a:text-accent hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </article>
  );
}
