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
import { adminDb } from '@/lib/firebase-admin';
import type { Blog } from '@/types/blog';
import type { Medico } from '@/types/medico';
import type { Testimonial } from '@/types/testimonial';

async function getRecentArticles(): Promise<Blog[]> {
  try {
    const blogsSnapshot = await adminDb.collection('blogs').where('lugar', '==', 'clinica').orderBy('date', 'desc').limit(3).get();
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

async function getRandomMedicos(): Promise<Medico[]> {
  try {
    const medicosSnapshot = await adminDb.collection('medicos').get();
    if (medicosSnapshot.empty) {
      return [];
    }
    const medicos: Medico[] = medicosSnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Medico, 'id'>),
    }));

    // Algoritmo de Fisher-Yates para mezclar el array
    for (let i = medicos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [medicos[i], medicos[j]] = [medicos[j], medicos[i]];
    }

    return medicos.slice(0, 4);
  } catch (error) {
    console.error("Error fetching random medicos: ", error);
    return [];
  }
}

async function getRandomTestimonial(): Promise<Testimonial | null> {
  try {
    const testimonialsSnapshot = await adminDb.collection('pqyr').where('rating', '>=', 4).get();
    if (testimonialsSnapshot.empty) {
      return null;
    }
    const testimonials: Testimonial[] = testimonialsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Testimonial, 'id'>),
    }));

    const randomIndex = Math.floor(Math.random() * testimonials.length);
    return testimonials[randomIndex];
  } catch (error) {
    console.error("Error fetching random testimonial: ", error);
    return null;
  }
}

export default async function Home() {
  const articles = await getRecentArticles();
  const teamMembers = await getRandomMedicos();
  const testimonial = await getRandomTestimonial();

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
            <Testimonials testimonial={testimonial} />
            <Team teamMembers={teamMembers} />
            <RecentArticles articles={articles} />
          </main>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}
