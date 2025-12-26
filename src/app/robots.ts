import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.eimar-paiporta.com' // TODO: Cambiar por dominio real cuando esté en producción
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/preview/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}