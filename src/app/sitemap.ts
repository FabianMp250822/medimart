import { MetadataRoute } from 'next';
import { safeQuery } from '@/lib/firebase-helpers';

/**
 * Sitemap dinámico para SEO
 * Se genera automáticamente con todas las URLs del sitio
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://clinica-de-la-costa.app';
  const currentDate = new Date();

  // URLs estáticas principales
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/especialistas`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/noticias`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/trabaja-con-nosotros`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/nosotros/acerca-de`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // URLs de servicios
  const serviciosRoutes: MetadataRoute.Sitemap = [
    // Servicios de Internación
    {
      url: `${baseUrl}/servicios/internacion/hospitalizacion`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/servicios/internacion/cuidado-critico`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/servicios/internacion/atencion-vih`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Servicios Quirúrgicos (agregar todos)
    {
      url: `${baseUrl}/servicios/quirurgicos/cirugia`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/servicios/quirurgicos/cirugia-general`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Añadir más servicios quirúrgicos...
  ];

  // URLs dinámicas de especialistas desde Firebase
  const especialistasRoutes = await safeQuery(async (db) => {
    const snapshot = await db.collection('medicos').get();
    return snapshot.docs.map((doc): MetadataRoute.Sitemap[0] => ({
      url: `${baseUrl}/especialistas/${doc.id}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
  }, []);

  // URLs dinámicas de noticias desde Firebase
  const noticiasRoutes = await safeQuery(async (db) => {
    const snapshot = await db
      .collection('blogs')
      .where('lugar', '==', 'clinica')
      .orderBy('date', 'desc')
      .get();
    
    return snapshot.docs.map((doc): MetadataRoute.Sitemap[0] => {
      const data = doc.data();
      return {
        url: `${baseUrl}/noticias/${doc.id}`,
        lastModified: data.date ? new Date(data.date) : currentDate,
        changeFrequency: 'monthly',
        priority: 0.6,
      };
    });
  }, []);

  // URLs dinámicas de ofertas de empleo desde Firebase
  const ofertasRoutes = await safeQuery(async (db) => {
    const snapshot = await db
      .collection('ofertasEmpleos')
      .orderBy('fechaPublicacion', 'desc')
      .get();
    
    return snapshot.docs.map((doc): MetadataRoute.Sitemap[0] => ({
      url: `${baseUrl}/trabaja-con-nosotros/${doc.id}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.5,
    }));
  }, []);

  // Combinar todas las rutas
  return [
    ...staticRoutes,
    ...serviciosRoutes,
    ...especialistasRoutes,
    ...noticiasRoutes,
    ...ofertasRoutes,
  ];
}
