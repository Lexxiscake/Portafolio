/**
 * Layered dusk scene for the Yofukashi skin.
 *
 * Coordinates: the scene is SCENE_HEIGHT tall and as wide as the viewport needs
 * (see sceneWidthFor). Characters are images cut from the original illustration,
 * positioned with the offsets they had in it.
 */

export const SCENE_HEIGHT = 900;

/** Size of the source illustration the layers were cut from. */
export const SOURCE_WIDTH = 736;

export const LAYER_ASSETS = {
  left: { href: '/images/yofukashi/char-left.webp', x: 0, y: 215, w: 407, h: 585 },
  right: { href: '/images/yofukashi/char-right.webp', x: 342, y: 106, w: 352, h: 432 },
} as const;

/** Sky colors sampled from the illustration, top to horizon. */
export const SKY_STOPS: ReadonlyArray<readonly [number, string]> = [
  [0, '#94add5'],
  [0.22, '#96afd5'],
  [0.44, '#9cb1c6'],
  [0.58, '#b2b4be'],
  [0.7, '#c7b5aa'],
  [0.86, '#d5b494'],
  [1, '#e9b88a'],
];

/** Scene width that matches the viewport aspect ratio, so nothing gets cropped. */
export function sceneWidthFor(viewportWidth: number, viewportHeight: number): number {
  const raw = (SCENE_HEIGHT * viewportWidth) / Math.max(viewportHeight, 1);
  // Quantized so a window resize does not rebuild the scene on every pixel.
  return Math.min(2600, Math.max(400, Math.round(raw / 40) * 40));
}

/** Scale and offset that center the two characters in the scene. */
export function characterPlacement(width: number) {
  // Fill about half the width on desktop; shrink to fit on narrow screens.
  const scale = Math.max(0.5, Math.min(1.12, (width * 0.96) / SOURCE_WIDTH, (width * 0.55) / SOURCE_WIDTH));
  return {
    scale,
    x: (width - SOURCE_WIDTH * scale) / 2,
    y: -30 * scale,
  };
}

