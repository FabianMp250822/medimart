import { MetadataRoute } from 'next';

/**
 * Robots.txt dinámico para control de crawling
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://clinica-de-la-costa.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/pacientes/dashboard/',
          '/_next/',
          '/admin/',
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: ['/'],
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: ['/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
