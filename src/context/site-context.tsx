'use client';

import { createContext, useContext } from 'react';
import { Language, TranslationData } from '@/lib/constants';
import type { SkinId } from '@/lib/skins';

export interface SiteContextValue {
  lang: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationData;
  isDark: boolean;
  toggleTheme: () => void;
  skin: SkinId;
  setSkin: (skin: SkinId) => void;
  availableSkins: SkinId[];
  unlockSecret: () => void;
}

export const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite(): SiteContextValue {
  const value = useContext(SiteContext);

  if (!value) {
    throw new Error('useSite must be used inside SiteShell');
  }

  return value;
}
