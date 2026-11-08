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
  /** Onomatopoeia used for small click bursts. */
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
    sfx: ['ドン!', 'ポン!', 'カッ!', 'ピカッ', 'バシッ'],
    ticker: {
      es: 'PYTHON ✦ JAVASCRIPT ✦ NODE.JS ✦ ELECTRON ✦ PYQT5 ✦ SQL SERVER ✦ SQLITE ✦ LINUX ✦ GITHUB ACTIONS ✦ IA ✦ ',
      en: 'PYTHON ✦ JAVASCRIPT ✦ NODE.JS ✦ ELECTRON ✦ PYQT5 ✦ SQL SERVER ✦ SQLITE ✦ LINUX ✦ GITHUB ACTIONS ✦ AI ✦ ',
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
    sfx: ['ポン!', 'カッ!', 'ピカッ', 'バシッ', 'ドン!'],
    ticker: {
      es: 'PYTHON ✦ JAVASCRIPT ✦ NODE.JS ✦ ELECTRON ✦ PYQT5 ✦ SQL SERVER ✦ SQLITE ✦ LINUX ✦ GITHUB ACTIONS ✦ IA ✦ ',
      en: 'PYTHON ✦ JAVASCRIPT ✦ NODE.JS ✦ ELECTRON ✦ PYQT5 ✦ SQL SERVER ✦ SQLITE ✦ LINUX ✦ GITHUB ACTIONS ✦ AI ✦ ',
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
    sfx: ['しん…', 'ふわっ', 'きらり', 'すぅ…', 'ぽつり'],
    ticker: {
      es: 'PYTHON ✦ JAVASCRIPT ✦ NODE.JS ✦ ELECTRON ✦ PYQT5 ✦ SQL SERVER ✦ SQLITE ✦ LINUX ✦ GITHUB ACTIONS ✦ IA ✦ ',
      en: 'PYTHON ✦ JAVASCRIPT ✦ NODE.JS ✦ ELECTRON ✦ PYQT5 ✦ SQL SERVER ✦ SQLITE ✦ LINUX ✦ GITHUB ACTIONS ✦ AI ✦ ',
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
    sfx: ['ぽよーん', 'ガーン!', 'えっ?', 'ぷっ', 'ドーン!'],
    ticker: {
      es: 'PYTHON ✦ JAVASCRIPT ✦ NODE.JS ✦ ELECTRON ✦ PYQT5 ✦ SQL SERVER ✦ SQLITE ✦ LINUX ✦ GITHUB ACTIONS ✦ IA ✦ ',
      en: 'PYTHON ✦ JAVASCRIPT ✦ NODE.JS ✦ ELECTRON ✦ PYQT5 ✦ SQL SERVER ✦ SQLITE ✦ LINUX ✦ GITHUB ACTIONS ✦ AI ✦ ',
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
    sfx: ['ザンッ!', 'バッ!', 'ドォン!', 'ゴゴゴ', 'キッ!'],
    ticker: {
      es: 'PYTHON ✦ JAVASCRIPT ✦ NODE.JS ✦ ELECTRON ✦ PYQT5 ✦ SQL SERVER ✦ SQLITE ✦ LINUX ✦ GITHUB ACTIONS ✦ IA ✦ ',
      en: 'PYTHON ✦ JAVASCRIPT ✦ NODE.JS ✦ ELECTRON ✦ PYQT5 ✦ SQL SERVER ✦ SQLITE ✦ LINUX ✦ GITHUB ACTIONS ✦ AI ✦ ',
    },
    notFound: {
      es: 'Esta página ya no está. Vuelve al inicio.',
      en: 'This page is gone. Go back home.',
    },
  },
  dregxmoon: {
    id: 'dregxmoon',
    hidden: true,
    label: 'Terminal',
    swatch: ['#1be6ff', '#05090d'],
    sfx: ['ピッ', 'ガガ', 'ビビッ', '0101', 'ERR'],
    ticker: {
      es: 'PYTHON ✦ JAVASCRIPT ✦ NODE.JS ✦ ELECTRON ✦ PYQT5 ✦ SQL SERVER ✦ SQLITE ✦ LINUX ✦ GITHUB ACTIONS ✦ IA ✦ ',
      en: 'PYTHON ✦ JAVASCRIPT ✦ NODE.JS ✦ ELECTRON ✦ PYQT5 ✦ SQL SERVER ✦ SQLITE ✦ LINUX ✦ GITHUB ACTIONS ✦ AI ✦ ',
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
