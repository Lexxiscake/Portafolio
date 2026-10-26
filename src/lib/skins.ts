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

export const DEFAULT_SKIN: SkinId = 'persona';

export const SKINS: Record<SkinId, Skin> = {
  persona: {
    id: 'persona',
    label: 'Persona',
    swatch: ['#e60012', '#0a0a0a'],
    kanji: '技術者',
    sfx: ['ドン!', 'ポン!', 'カッ!', 'ピカッ', 'バシッ'],
    ticker: {
      es: 'SISTEMAS ✦ SQL ✦ LINUX ✦ AUTOMATIZACIÓN ✦ HERRAMIENTAS LOCALES ✦ ',
      en: 'SYSTEMS ✦ SQL ✦ LINUX ✦ AUTOMATION ✦ LOCAL TOOLS ✦ ',
    },
    notFound: {
      es: 'No hay nada en esta dirección. Vuelve al inicio.',
      en: 'There is nothing at this address. Go back home.',
    },
  },
  toga: {
    id: 'toga',
    label: 'Toga',
    swatch: ['#ff4d86', '#ffd400'],
    kanji: '恋',
    sfx: ['ふふっ', 'きゃは!', 'ドクン', 'ぞくっ', 'ニヤッ'],
    ticker: {
      es: 'KAWAII ✦ SISTEMAS ✦ SQL ✦ LINUX ✦ 好き ✦ ',
      en: 'KAWAII ✦ SYSTEMS ✦ SQL ✦ LINUX ✦ 好き ✦ ',
    },
    notFound: {
      es: 'Esta página se escapó. Búscala desde el inicio.',
      en: 'This page ran away. Look for it from the home page.',
    },
  },
  yofukashi: {
    id: 'yofukashi',
    label: 'Yofukashi no Uta',
    swatch: ['#a690ff', '#f2a65a'],
    kanji: '夜',
    sfx: ['しん…', 'ふわっ', 'きらり', 'すぅ…', 'ぽつり'],
    ticker: {
      es: 'INSOMNIO ✦ SISTEMAS ✦ SQL ✦ LINUX ✦ 夜更かし ✦ ',
      en: 'INSOMNIA ✦ SYSTEMS ✦ SQL ✦ LINUX ✦ 夜更かし ✦ ',
    },
    notFound: {
      es: 'Aquí no hay luz de luna ni página. Regresa al inicio.',
      en: 'No moonlight and no page here. Head back home.',
    },
  },
  nichijou: {
    id: 'nichijou',
    label: 'Nichijou',
    swatch: ['#ff8fb0', '#ffcf5c'],
    kanji: '日常',
    sfx: ['ぽよーん', 'ガーン!', 'えっ?', 'ぷっ', 'ドーン!'],
    ticker: {
      es: 'COTIDIANO ✦ SISTEMAS ✦ SQL ✦ LINUX ✦ 日常 ✦ ',
      en: 'EVERYDAY ✦ SYSTEMS ✦ SQL ✦ LINUX ✦ 日常 ✦ ',
    },
    notFound: {
      es: 'Esta página no existe, pero un ciervo gigante pasó por aquí. Vuelve al inicio.',
      en: 'This page does not exist, but a giant deer walked through. Go back home.',
    },
  },
  killlakill: {
    id: 'killlakill',
    label: 'Kill la Kill',
    swatch: ['#ff3b24', '#ffe500'],
    kanji: '戦',
    sfx: ['ザンッ!', 'バッ!', 'ドォン!', 'ゴゴゴ', 'キッ!'],
    ticker: {
      es: 'SISTEMAS ✦ SQL ✦ LINUX ✦ SIN MIEDO AL CÓDIGO ✦ 戦 ✦ ',
      en: 'SYSTEMS ✦ SQL ✦ LINUX ✦ NO FEAR OF CODE ✦ 戦 ✦ ',
    },
    notFound: {
      es: 'Corte limpio: esta página ya no está. Vuelve al inicio.',
      en: 'Clean cut: this page is gone. Go back home.',
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
      es: 'DREGXMOON ✦ SISTEMAS ✦ SQL ✦ LINUX ✦ 月 ✦ ',
      en: 'DREGXMOON ✦ SYSTEMS ✦ SQL ✦ LINUX ✦ 月 ✦ ',
    },
    notFound: {
      es: 'Error 404 en la luna. Regresa al inicio.',
      en: 'Error 404 on the moon. Return home.',
    },
  },
};

export const SKIN_ORDER: SkinId[] = [
  'persona',
  'toga',
  'yofukashi',
  'nichijou',
  'killlakill',
  'dregxmoon',
];

export const SKIN_IDS: SkinId[] = SKIN_ORDER;
export const HIDDEN_SKIN_IDS: SkinId[] = SKIN_ORDER.filter((id) => SKINS[id].hidden);

export function isSkinId(value: unknown): value is SkinId {
  return typeof value === 'string' && value in SKINS;
}
