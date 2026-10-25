'use client';

import React, { useMemo } from 'react';
import { SiteContext, SiteContextValue } from '@/context/site-context';
import { useLanguage } from '@/hooks/useLanguage';
import { useTheme } from '@/hooks/useTheme';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { EasterEggs } from '@/components/EasterEggs';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const { lang, setLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const value = useMemo<SiteContextValue>(
    () => ({
      lang,
      setLanguage,
      t,
      isDark,
      toggleTheme,
    }),
    [isDark, lang, setLanguage, t, toggleTheme]
  );

  return (
    <SiteContext.Provider value={value}>
      <div className="relative flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border-2 focus:border-[var(--acc)] focus:bg-black focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-white"
        >
          Saltar al contenido / Skip to content
        </a>
        <EasterEggs />
        <Navbar />
        <div id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </div>
        <Footer />
      </div>
    </SiteContext.Provider>
  );
}
