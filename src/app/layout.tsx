import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { SiteShell } from '@/components/SiteShell';
import { SITE_URL } from '@/lib/site';
import { DEFAULT_SKIN, HIDDEN_SKIN_IDS, SKIN_IDS } from '@/lib/skins';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Luka Torres — Backend y sistemas',
    template: '%s · Luka Torres',
  },
  description:
    'Portafolio de Luka Torres. Backend, bases de datos y Linux, con tres proyectos explicados desde el problema hasta el código.',
  keywords: [
    'backend',
    'bases de datos',
    'SQL Server',
    'Linux',
    'hardening',
    'Luka Torres',
    'Tijuana',
  ],
  authors: [{ name: 'Luka Torres', url: 'https://github.com/Lexxiscake' }],
  creator: 'Luka Torres',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    title: 'Luka Torres — Backend y sistemas',
    description:
      'Proyectos de backend, datos y Linux, con las decisiones y el código de cada caso.',
    siteName: 'Luka Torres',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luka Torres — Backend y sistemas',
    description:
      'Proyectos de backend, datos y Linux, con las decisiones y el código de cada caso.',
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

const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.dataset.theme = stored || (prefersDark ? 'dark' : 'light');
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
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
