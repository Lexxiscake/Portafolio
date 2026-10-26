'use client';

import React, { useMemo } from 'react';
import { SiteContext, SiteContextValue } from '@/context/site-context';
import { useLanguage } from '@/hooks/useLanguage';
import { useSkin } from '@/hooks/useSkin';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { EasterEggs } from '@/components/EasterEggs';
import { SkinEffects } from '@/components/SkinEffects';
import { SkinEggs } from '@/components/SkinEggs';

export function SiteShell({ children }: { children: React.ReactNode }) {
  const { lang, setLanguage, t } = useLanguage();
  const { skin, setSkin, availableSkins, unlockSecret } = useSkin();

  const value = useMemo<SiteContextValue>(
    () => ({
      lang,
      setLanguage,
      t,
      skin,
      setSkin,
      availableSkins,
      unlockSecret,
    }),
    [availableSkins, lang, setLanguage, setSkin, skin, t, unlockSecret]
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
        <SkinEffects />
        <SkinEggs />
        <Navbar />
        <div id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </div>
        <Footer />
      </div>
    </SiteContext.Provider>
  );
}
