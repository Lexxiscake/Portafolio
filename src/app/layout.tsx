import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { SiteShell } from '@/components/SiteShell';
import { SITE_URL } from '@/lib/site';
import { DEFAULT_SKIN, HIDDEN_SKIN_IDS, SKIN_IDS } from '@/lib/skins';

// Static PNGs under public/images/og keep the correct image/png content type on GitHub Pages.
const SHARE_IMAGE = `${SITE_URL}/images/og/home.png`;
const SHARE_IMAGE_ALT = 'Luka Torres — Software y sistemas';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Luka Torres — Software y sistemas',
    template: '%s · Luka Torres',
  },
  description:
    'Portafolio de Luka Torres. Desarrollo de software, bases de datos y Linux, con proyectos explicados desde el problema hasta las decisiones y los resultados.',
  authors: [{ name: 'Luka Torres', url: 'https://github.com/Lexxiscake' }],
  creator: 'Luka Torres',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    title: 'Luka Torres — Software y sistemas',
    description:
      'Proyectos de software, datos y Linux, con las decisiones y los resultados de cada caso.',
    siteName: 'Luka Torres',
    images: [{ url: SHARE_IMAGE, width: 1200, height: 630, alt: SHARE_IMAGE_ALT, type: 'image/png' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luka Torres — Software y sistemas',
    description:
      'Proyectos de software, datos y Linux, con las decisiones y los resultados de cada caso.',
    images: [{ url: SHARE_IMAGE, width: 1200, height: 630, alt: SHARE_IMAGE_ALT, type: 'image/png' }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
};

const bootScript = `
(function () {
  try {
    var skinIds = ${JSON.stringify(SKIN_IDS)};
    var hiddenSkinIds = ${JSON.stringify(HIDDEN_SKIN_IDS)};
    var skin = localStorage.getItem('skin');
    var unlocked = localStorage.getItem('skin-secret') === '1';
    var allowed = skinIds.indexOf(skin) > -1 && (unlocked || hiddenSkinIds.indexOf(skin) === -1);
    document.documentElement.dataset.skin = allowed ? skin : ${JSON.stringify(DEFAULT_SKIN)};
    var lang = localStorage.getItem('lang');
    if (lang === 'es' || lang === 'en') document.documentElement.lang = lang;
  } catch (error) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Dela+Gothic+One&family=Inter:wght@400;600&family=JetBrains+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
