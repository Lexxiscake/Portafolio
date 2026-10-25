import type { Metadata } from 'next';
import { PROJECTS_DATA } from '@/lib/constants';

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const project = PROJECTS_DATA.find((item) => item.id === params.id);

  if (!project) {
    return {
      title: 'Caso no encontrado',
      description: 'El caso de estudio solicitado no existe.',
    };
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} · Luka Torres`,
      description: project.summary,
      type: 'article',
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
