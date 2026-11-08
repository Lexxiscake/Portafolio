import type { Metadata } from 'next';
import { PROJECTS_DATA, localized } from '@/lib/constants';
import { SITE_URL } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS_DATA.find((item) => item.id === id);

  if (!project) {
    return {
      title: 'Caso no encontrado',
      description: 'El caso de estudio solicitado no existe.',
    };
  }

  // Static PNGs live in public/images/og so GitHub Pages serves image/png.
  // Regenerate them if a project title, subtitle, or tags change.
  const imageUrl = `${SITE_URL}/images/og/${project.id}.png`;
  const title = localized(project.title, 'es');
  const summary = localized(project.summary, 'es');
  const imageAlt = `${title} — ${localized(project.subtitle, 'es')}`;

  return {
    title,
    description: summary,
    openGraph: {
      title: `${title} · Luka Torres`,
      description: summary,
      type: 'article',
      locale: 'es_MX',
      siteName: 'Luka Torres',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: imageAlt, type: 'image/png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} · Luka Torres`,
      description: summary,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: imageAlt, type: 'image/png' }],
    },
  };
}

export default function ProjectDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
