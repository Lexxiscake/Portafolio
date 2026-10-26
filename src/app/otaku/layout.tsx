import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Otaku',
  description:
    'Los animes y juegos que inspiran el diseño de este portafolio, con una skin del sitio por cada uno.',
};

export default function OtakuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
