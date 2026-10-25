import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre mí',
  description:
    'Perfil, formación, herramientas y forma de trabajo de Luka Torres.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
