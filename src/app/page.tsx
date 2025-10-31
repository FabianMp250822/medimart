import dynamic from 'next/dynamic';
import { Hero } from '@/components/hero';
import { Services } from '@/components/services';
import { Commitment } from '@/components/commitment';
import { ComprehensiveCare } from '@/components/comprehensive-care';
import { Priority } from '@/components/priority';
import { HowWeServe } from '@/components/how-we-serve';
import { AppFooter } from '@/components/footer';
import { Header } from '@/components/header';
import { unstable_cache } from 'next/cache';
import { CardsSkeleton, SectionSkeleton, SliderSkeleton } from '@/components/ui/skeleton-loaders';

// Dynamic imports para code splitting - Solo componentes que requieren interactividad
// o que no son críticos para el initial paint
const Testimonials = dynamic(
  () => import('@/components/testimonials').then(mod => ({ default: mod.Testimonials })),
  {
    loading: () => <SectionSkeleton className="h-64" />,
    ssr: true, // Mantener SSR para SEO
  }
);

const Team = dynamic(
  () => import('@/components/team').then(mod => ({ default: mod.Team })),
  {
    loading: () => <CardsSkeleton count={4} />,
    ssr: true,
  }
);

const RecentArticles = dynamic(
  () => import('@/components/recent-articles').then(mod => ({ default: mod.RecentArticles })),
  {
    loading: () => <CardsSkeleton count={3} />,
    ssr: true,
  }
);

const EntidadesConvenioSlider = dynamic(
  () => import('@/components/servicios/entidades-convenio-slider').then(mod => ({ default: mod.EntidadesConvenioSlider })),
  {
    loading: () => <SliderSkeleton />
  }
);

const CertificationsSlider = dynamic(
  () => import('@/components/certifications-slider').then(mod => ({ default: mod.CertificationsSlider })),
  {
    loading: () => <SliderSkeleton />
  }
);
import { safeQuery } from '@/lib/firebase-helpers';
import type { Blog } from '@/types/blog';
import type { Medico } from '@/types/medico';
import type { Testimonial } from '@/types/testimonial';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clínica de la Costa - Cuidado Integral y Especializado en Barranquilla',
  description: 'Líderes en atención médica en la Región Caribe. Ofrecemos servicios de urgencias 24/7, hospitalización, cirugía avanzada y un completo equipo de especialistas para cuidar de tu salud.',
};

const getRecentArticles = unstable_cache(
  async (): Promise<Blog[]> => {
    return safeQuery(async (db) => {
      const blogsSnapshot = await db.collection('blogs').where('lugar', '==', 'clinica').orderBy('date', 'desc').limit(3).get();
      if (blogsSnapshot.empty) {
        return [];
      }
      const blogs: Blog[] = blogsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Blog, 'id'>),
      }));
      return blogs;
    }, []);
  },
  ['recent-articles'],
  { revalidate: 900, tags: ['blogs', 'home'] }
);

const getFeaturedMedicos = unstable_cache(
  async (): Promise<Medico[]> => {
    const featuredMedicoIds = ['p3DcIXWsU0fJ4m0uamrr', 'eM8fDVBxZ7KebIU5vJVT'];
    const totalFeatured = 4;

    return safeQuery(async (db) => {
      const medicosSnapshot = await db.collection('medicos').get();
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
    }, []);
  },
  ['featured-medicos'],
  { revalidate: 3600, tags: ['medicos', 'home'] }
);

const getRandomTestimonial = unstable_cache(
  async (): Promise<Testimonial | null> => {
    return safeQuery(async (db) => {
      const testimonialsSnapshot = await db.collection('pqyr').where('rating', '>=', 4).get();
      if (testimonialsSnapshot.empty) {
        return null;
      }
      const testimonials: Testimonial[] = testimonialsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Testimonial, 'id'>),
      }));

      const randomIndex = Math.floor(Math.random() * testimonials.length);
      return testimonials[randomIndex];
    }, null);
  },
  ['random-testimonial'],
  { revalidate: 1800, tags: ['testimonials', 'home'] }
);

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
          <EntidadesConvenioSlider />
          <Commitment />
          <ComprehensiveCare />
          <CertificationsSlider />
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
