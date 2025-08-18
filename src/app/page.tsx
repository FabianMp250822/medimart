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
  const featuredMedicoId = 'p3DcIXWsU0fJ4m0uamrr';
  try {
    const medicosSnapshot = await adminDb.collection('medicos').get();
    if (medicosSnapshot.empty) {
      return [];
    }
    
    let medicos: Medico[] = medicosSnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Medico, 'id'>),
    }));

    // Find the featured specialist
    const featuredMedico = medicos.find(m => m.id === featuredMedicoId);
    
    // Filter out the featured specialist to avoid duplicates
    let otherMedicos = medicos.filter(m => m.id !== featuredMedicoId);

    // Shuffle the rest of the specialists
    for (let i = otherMedicos.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [otherMedicos[i], otherMedicos[j]] = [otherMedicos[j], otherMedicos[i]];
    }

    // Create the final list
    const finalMedicos: Medico[] = [];
    if (featuredMedico) {
      finalMedicos.push(featuredMedico);
    }

    // Add 3 other random specialists
    finalMedicos.push(...otherMedicos.slice(0, 4 - finalMedicos.length));

    return finalMedicos;
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
