import type { Language } from '@/lib/constants';
import type { SkinId } from '@/lib/skins';

export interface OtakuEntry {
  id: string;
  skin: SkinId;
  title: string;
  jp: string;
  kind: Record<Language, string>;
  /** What the work is. Factual, one sentence. */
  about: Record<Language, string>;
  /** What this site borrowed from it. */
  borrowed: Record<Language, string>;
  /**
   * Optional personal note. Fill it in with your own words and it appears on the card.
   * Example: why: { es: 'Me gusta porque ...', en: 'I like it because ...' }
   */
  why?: Record<Language, string>;
}

export const OTAKU_ENTRIES: OtakuEntry[] = [
  {
    id: 'toga',
    skin: 'toga',
    title: 'Himiko Toga',
    jp: '渡我被身子',
    kind: { es: 'Personaje · Boku no Hero Academia', en: 'Character · My Hero Academia' },
    about: {
      es: 'Personaje de Boku no Hero Academia, la obra de Kohei Horikoshi.',
      en: 'Character from My Hero Academia, the work of Kohei Horikoshi.',
    },
    borrowed: {
      es: 'Dorado de ojos y cabello, negro azulado del uniforme, beige del cardigan y rojo sangre de la bufanda; goteo bajo la barra de navegación, cursor en forma de gota y manchas al hacer clic.',
      en: 'Gold from her eyes and hair, navy from her uniform, beige from her cardigan, and blood red from her scarf; drips under the navigation bar, a drop-shaped cursor, and splats when you click.',
    },
  },
];
