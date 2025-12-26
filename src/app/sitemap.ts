import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.eimar-paiporta.com' // TODO: Cambiar por dominio real cuando esté en producción
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/reservas-y-pedidos`,
      lastModified: new Date(),
      changeFrequency: 'weekly', 
      priority: 0.8,
    },
    {
      url: `${baseUrl}/preview`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    //TODO:  Agregar más páginas cuando las tenga (por ejemplo: Nuestra Carta):
    // {
    //   url: `${baseUrl}/nuestra-carta`,
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.8,
    // },
  ]
}