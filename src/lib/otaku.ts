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
    id: 'persona',
    skin: 'persona',
    title: 'Persona',
    jp: 'ペルソナ',
    kind: { es: 'Serie de juegos · Atlus', en: 'Game series · Atlus' },
    about: {
      es: 'Serie de juegos de rol japonesa con una dirección de arte muy reconocible.',
      en: 'Japanese role-playing game series with a very recognizable art direction.',
    },
    borrowed: {
      es: 'Es la skin base: rojo y negro, bloques inclinados y botones con sombra dura.',
      en: 'This is the base skin: red and black, slanted blocks, and buttons with hard shadows.',
    },
  },
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
      es: 'Rosa carmesí con acento amarillo, goteo bajo la barra de navegación, cursor en forma de gota y manchas al hacer clic.',
      en: 'Crimson pink with a yellow accent, drips under the navigation bar, a drop-shaped cursor, and splats when you click.',
    },
  },
  {
    id: 'yofukashi',
    skin: 'yofukashi',
    title: 'Yofukashi no Uta',
    jp: 'よふかしのうた',
    kind: { es: 'Manga y anime · Kotoyama', en: 'Manga and anime · Kotoyama' },
    about: {
      es: 'Un estudiante con insomnio sale a caminar de noche y conoce a una vampira.',
      en: 'A student with insomnia goes for night walks and meets a vampire.',
    },
    borrowed: {
      es: 'Un atardecer por capas (cielo, nubes, colinas, ciudad y los dos personajes) con parallax de profundidad con el mouse y el scroll.',
      en: 'A layered dusk scene (sky, clouds, hills, city, and both characters) with depth parallax on mouse and scroll.',
    },
  },
  {
    id: 'nichijou',
    skin: 'nichijou',
    title: 'Nichijou',
    jp: '日常',
    kind: { es: 'Manga y anime · Keiichi Arawi', en: 'Manga and anime · Keiichi Arawi' },
    about: {
      es: 'Comedia absurda sobre la vida cotidiana. El anime lo produjo Kyoto Animation.',
      en: 'Absurd comedy about everyday life. The anime was produced by Kyoto Animation.',
    },
    borrowed: {
      es: 'Colores cálidos y un evento absurdo que aparece una vez por visita.',
      en: 'Warm colors and one absurd event that appears once per visit.',
    },
  },
  {
    id: 'killlakill',
    skin: 'killlakill',
    title: 'Kill la Kill',
    jp: 'キルラキル',
    kind: { es: 'Anime · Studio Trigger', en: 'Anime · Studio Trigger' },
    about: {
      es: 'Anime de acción dirigido por Hiroyuki Imaishi.',
      en: 'Action anime directed by Hiroyuki Imaishi.',
    },
    borrowed: {
      es: 'Rojo y negro de alto contraste, medios tonos marcados y un corte diagonal al cambiar de página.',
      en: 'High-contrast red and black, bold halftones, and a diagonal cut when you change page.',
    },
  },
];
