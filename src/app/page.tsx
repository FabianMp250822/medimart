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
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clínica de la Costa - Cuidado Integral y Especializado en Barranquilla',
  description: 'Líderes en atención médica en la Región Caribe. Ofrecemos servicios de urgencias 24/7, hospitalización, cirugía avanzada y un completo equipo de especialistas para cuidar de tu salud.',
};

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

async function getFeaturedMedicos(): Promise<Medico[]> {
  const featuredMedicoIds = ['p3DcIXWsU0fJ4m0uamrr', 'eM8fDVBxZ7KebIU5vJVT'];
  const totalFeatured = 4;

  try {
    const medicosSnapshot = await adminDb.collection('medicos').get();
    if (medicosSnapshot.empty) {
      return [];
    }
    
    let medicos: Medico[] = medicosSnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Medico, 'id'>),
    }));

    // Get the main featured specialists in order
    const mainFeatured = featuredMedicoIds.map(id => medicos.find(m => m.id === id)).filter((m): m is Medico => !!m);

    // Get other specialists, excluding the main ones
    let otherMedicos = medicos.filter(m => !featuredMedicoIds.includes(m.id));

    // Shuffle the other specialists
    for (let i = otherMedicos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [otherMedicos[i], otherMedicos[j]] = [otherMedicos[j], otherMedicos[i]];
    }

    // Combine the lists, ensuring we have exactly `totalFeatured` specialists
    const finalMedicos = [...mainFeatured];
    const remainingNeeded = totalFeatured - finalMedicos.length;
    if (remainingNeeded > 0) {
      finalMedicos.push(...otherMedicos.slice(0, remainingNeeded));
    }

    return finalMedicos.slice(0, totalFeatured);
  } catch (error) {
    console.error("Error fetching featured medicos: ", error);
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
  const teamMembers = await getFeaturedMedicos();
  const testimonial = await getRandomTestimonial();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 w-full">
        <Hero />
        <div className="container mx-auto">
          <Services />
          <Commitment />
          <ComprehensiveCare />
          <Priority />
          <HowWeServe />
          <Testimonials testimonial={testimonial} />
          <Team teamMembers={teamMembers} />
          <RecentArticles articles={articles} />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
