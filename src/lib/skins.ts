import type { Language } from '@/lib/constants';

export type SkinId =
  | 'persona'
  | 'toga'
  | 'yofukashi'
  | 'nichijou'
  | 'killlakill'
  | 'dregxmoon';

export interface Skin {
  id: SkinId;
  /** Hidden skins only appear after the secret is unlocked (Konami code). */
  hidden?: boolean;
  label: string;
  /** Two colors used for the swatch in the picker. */
  swatch: [string, string];
  /** Decorative kanji drawn behind the hero. */
  kanji: string;
  /** Onomatopoeia used for click bursts. The first one is also used in the hero. */
  sfx: string[];
  ticker: Record<Language, string>;
  notFound: Record<Language, string>;
}

export const DEFAULT_SKIN: SkinId = 'toga';

export const SKINS: Record<SkinId, Skin> = {
  persona: {
    id: 'persona',
    label: 'Persona',
    swatch: ['#e60012', '#0a0a0a'],
    kanji: '技術',
    sfx: ['ドン!', 'ポン!', 'カッ!', 'ピカッ', 'バシッ'],
    ticker: {
      es: 'C# ✦ .NET ✦ PYTHON ✦ SQL SERVER ✦ JAVASCRIPT ✦ HTML5 & CSS3 ✦ LINUX ✦ NODE.JS ✦ VITE ✦ IA ✦ ',
      en: 'C# ✦ .NET ✦ PYTHON ✦ SQL SERVER ✦ JAVASCRIPT ✦ HTML5 & CSS3 ✦ LINUX ✦ NODE.JS ✦ VITE ✦ AI ✦ ',
    },
    notFound: {
      es: 'No hay nada en esta dirección. Vuelve al inicio.',
      en: 'There is nothing at this address. Go back home.',
    },
  },
  toga: {
    id: 'toga',
    label: 'Toga',
    swatch: ['#f2c230', '#d21f3c'],
    kanji: '技術',
    sfx: ['ポン!', 'カッ!', 'ピカッ', 'バシッ', 'ドン!'],
    ticker: {
      es: 'C# ✦ .NET ✦ PYTHON ✦ SQL SERVER ✦ JAVASCRIPT ✦ HTML5 & CSS3 ✦ LINUX ✦ NODE.JS ✦ VITE ✦ IA ✦ ',
      en: 'C# ✦ .NET ✦ PYTHON ✦ SQL SERVER ✦ JAVASCRIPT ✦ HTML5 & CSS3 ✦ LINUX ✦ NODE.JS ✦ VITE ✦ AI ✦ ',
    },
    notFound: {
      es: 'Esta página no existe. Vuelve al inicio.',
      en: 'This page does not exist. Go back home.',
    },
  },
  yofukashi: {
    id: 'yofukashi',
    label: 'Yofukashi no Uta',
    swatch: ['#a78bfa', '#f472b6'],
    kanji: '夜',
    sfx: ['しん…', 'ふわっ', 'きらり', 'すぅ…', 'ぽつり'],
    ticker: {
      es: 'C# ✦ .NET ✦ PYTHON ✦ SQL SERVER ✦ JAVASCRIPT ✦ HTML5 & CSS3 ✦ LINUX ✦ NODE.JS ✦ VITE ✦ IA ✦ ',
      en: 'C# ✦ .NET ✦ PYTHON ✦ SQL SERVER ✦ JAVASCRIPT ✦ HTML5 & CSS3 ✦ LINUX ✦ NODE.JS ✦ VITE ✦ AI ✦ ',
    },
    notFound: {
      es: 'Aquí no hay página. Regresa al inicio.',
      en: 'No page here. Head back home.',
    },
  },
  nichijou: {
    id: 'nichijou',
    label: 'Nichijou',
    swatch: ['#ff8fb0', '#ffcf5c'],
    kanji: '日常',
    sfx: ['ぽよーん', 'ガーン!', 'えっ?', 'ぷっ', 'ドーン!'],
    ticker: {
      es: 'C# ✦ .NET ✦ PYTHON ✦ SQL SERVER ✦ JAVASCRIPT ✦ HTML5 & CSS3 ✦ LINUX ✦ NODE.JS ✦ VITE ✦ IA ✦ ',
      en: 'C# ✦ .NET ✦ PYTHON ✦ SQL SERVER ✦ JAVASCRIPT ✦ HTML5 & CSS3 ✦ LINUX ✦ NODE.JS ✦ VITE ✦ AI ✦ ',
    },
    notFound: {
      es: 'Esta página no existe. Vuelve al inicio.',
      en: 'This page does not exist. Go back home.',
    },
  },
  killlakill: {
    id: 'killlakill',
    label: 'Kill la Kill',
    swatch: ['#ff3b24', '#ffe500'],
    kanji: '戦',
    sfx: ['ザンッ!', 'バッ!', 'ドォン!', 'ゴゴゴ', 'キッ!'],
    ticker: {
      es: 'C# ✦ .NET ✦ PYTHON ✦ SQL SERVER ✦ JAVASCRIPT ✦ HTML5 & CSS3 ✦ LINUX ✦ NODE.JS ✦ VITE ✦ IA ✦ ',
      en: 'C# ✦ .NET ✦ PYTHON ✦ SQL SERVER ✦ JAVASCRIPT ✦ HTML5 & CSS3 ✦ LINUX ✦ NODE.JS ✦ VITE ✦ AI ✦ ',
    },
    notFound: {
      es: 'Esta página ya no está. Vuelve al inicio.',
      en: 'This page is gone. Go back home.',
    },
  },
  dregxmoon: {
    id: 'dregxmoon',
    hidden: true,
    label: 'Dregxmoon',
    swatch: ['#1be6ff', '#05090d'],
    kanji: '月',
    sfx: ['ピッ', 'ガガ', 'ビビッ', '0101', 'ERR'],
    ticker: {
      es: 'C# ✦ .NET ✦ PYTHON ✦ SQL SERVER ✦ JAVASCRIPT ✦ HTML5 & CSS3 ✦ LINUX ✦ NODE.JS ✦ VITE ✦ IA ✦ ',
      en: 'C# ✦ .NET ✦ PYTHON ✦ SQL SERVER ✦ JAVASCRIPT ✦ HTML5 & CSS3 ✦ LINUX ✦ NODE.JS ✦ VITE ✦ AI ✦ ',
    },
    notFound: {
      es: 'Error 404. Regresa al inicio.',
      en: 'Error 404. Return home.',
    },
  },
};

export const SKIN_ORDER: SkinId[] = ['toga'];

export const SKIN_IDS: SkinId[] = SKIN_ORDER;
export const HIDDEN_SKIN_IDS: SkinId[] = [];

export function isSkinId(value: unknown): value is SkinId {
  return typeof value === 'string' && value in SKINS;
}
