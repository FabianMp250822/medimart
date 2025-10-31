import { Metadata } from 'next';
import { ServiceMetadata } from './services-metadata';

/**
 * Genera metadatos completos para una página de servicio
 * Incluye keywords tradicionales + searchTerms (variaciones coloquiales)
 */
export function generateServiceMetadata(service: ServiceMetadata): Metadata {
  // Combinar keywords con searchTerms para mejor posicionamiento
  const allKeywords = [
    ...service.keywords,
    ...(service.searchTerms || [])
  ];

  return {
    title: service.title,
    description: service.description,
    keywords: allKeywords,
    alternates: {
      canonical: `/${service.slug}`
    },
    openGraph: {
      title: `${service.name} - Clínica de la Costa`,
      description: service.description,
      url: `https://clinica-de-la-costa.app/${service.slug}`,
      siteName: 'Clínica de la Costa',
      locale: 'es_CO',
      type: 'website',
      images: service.image ? [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: `${service.name} - Clínica de la Costa`
        }
      ] : []
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.name} - Clínica de la Costa`,
      description: service.description,
      images: service.image ? [service.image] : []
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      }
    }
  };
}
