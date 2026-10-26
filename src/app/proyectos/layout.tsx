import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Proyectos',
  description:
    'Tres proyectos de software, datos y Linux explicados con decisiones, código y resultados.',
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
