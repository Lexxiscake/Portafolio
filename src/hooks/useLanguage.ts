'use client';
import { useState, useEffect } from 'react';
import { Language, DICTIONARY, TranslationData } from '@/lib/constants';

export function useLanguage() {
  const [lang, setLangState] = useState<Language>('es');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('lang') as Language | null;
      if (saved === 'en' || saved === 'es') {
        setLangState(saved);
        document.documentElement.lang = saved;
      }
    } catch (e) {}
  }, []);

  const setLanguage = (newLang: Language) => {
    setLangState(newLang);
    document.documentElement.lang = newLang;
    try {
      localStorage.setItem('lang', newLang);
    } catch (e) {}
  };

  const t: TranslationData = DICTIONARY[lang];

  return { lang, setLanguage, t };
}
