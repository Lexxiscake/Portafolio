import type { MetadataRoute } from 'next';
import { PROJECTS_DATA } from '@/lib/constants';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority: number;
  }> = [
    { path: '', changeFrequency: 'monthly', priority: 1 },
    { path: '/proyectos', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/sobre-mi', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/contacto', changeFrequency: 'yearly', priority: 0.6 },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route.path}`,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...PROJECTS_DATA.map((project) => ({
      url: `${SITE_URL}/proyectos/${project.id}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
