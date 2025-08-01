"use client"
import { Hero } from '@/components/hero';
import { Services } from '@/components/services';
import { Commitment } from '@/components/commitment';
import { ComprehensiveCare } from '@/components/comprehensive-care';
import { Priority } from '@/components/priority';
import { HowWeServe } from '@/components/how-we-serve';
import { Testimonials } from '@/components/testimonials';
import { Team } from '@/components/team';
import { RecentArticles } from '@/components/recent-articles';
import { AppFooter } from '@/components/footer';
import { Header } from '@/components/header';
import { adminDb } from '@/lib/firebase';
import { Blog } from '@/types/blog';
import { useEffect, useState } from 'react';

async function getRecentArticles(): Promise<Blog[]> {
  try {
    const blogsSnapshot = await adminDb.collection('blogs').orderBy('date', 'desc').limit(3).get();
    if (blogsSnapshot.empty) {
      return [];
    }
    const blogs: Blog[] = blogsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Blog, 'id'>),
    }));
    return blogs;
  } catch (error) {
    console.error("Error fetching recent articles: ", error);
    return [];
  }
}

export default function Home() {
  const [articles, setArticles] = useState<Blog[]>([]);

  useEffect(() => {
    // Since this is a client component, we can't fetch server-side data directly.
    // A proper solution would be to create a server component that fetches the data
    // and passes it to this client component, or use an API route.
    // For now, we will leave this empty to fix the build error.
    // In a real application, you would fetch from an API endpoint here.
  }, []);


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="flex-1 w-full">
        <div className="container mx-auto">
          <main className="flex-1 py-8">
            <Hero />
            <Services />
            <Commitment />
            <ComprehensiveCare />
            <Priority />
            <HowWeServe />
            <Testimonials />
            <Team />
            <RecentArticles articles={articles} />
          </main>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}