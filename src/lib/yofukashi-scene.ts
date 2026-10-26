/**
 * Layered dusk scene for the Yofukashi skin.
 *
 * Coordinates: the scene is SCENE_HEIGHT tall and as wide as the viewport needs
 * (see sceneWidthFor). Characters and clouds are separate images cut from the
 * original illustration, positioned with the offsets they had in it.
 */

export const SCENE_HEIGHT = 900;

/** Size of the source illustration the layers were cut from. */
export const SOURCE_WIDTH = 736;

export const LAYER_ASSETS = {
  left: { href: '/images/yofukashi/char-left.webp', x: 0, y: 215, w: 407, h: 585 },
  right: { href: '/images/yofukashi/char-right.webp', x: 342, y: 106, w: 352, h: 432 },
  clouds: { href: '/images/yofukashi/clouds.webp', x: 0, y: 0, w: 736, h: 428 },
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
  // Quantized so a window resize does not rebuild the skyline on every pixel.
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

export interface CloudCopy {
  x: number;
  y: number;
  w: number;
  h: number;
  opacity: number;
}

/** Overlapping, non-mirrored cloud copies with varied scale so the pattern does not read as a repeat. */
export function cloudCopies(width: number): CloudCopy[] {
  const variants = [
    { scale: 1.5, y: -20, opacity: 0.92 },
    { scale: 1.25, y: -30, opacity: 0.8 },
    { scale: 1.7, y: -70, opacity: 0.88 },
  ];
  const copies: CloudCopy[] = [];
  let x = -260;
  let index = 0;
  while (x < width + 260) {
    const v = variants[index % variants.length];
    const w = LAYER_ASSETS.clouds.w * v.scale;
    copies.push({ x, y: v.y, w, h: LAYER_ASSETS.clouds.h * v.scale, opacity: v.opacity });
    x += w * 0.78;
    index += 1;
  }
  return copies;
}

/* ------------------------------------------------------------------ */
/* Deterministic procedural pieces: hills and skyline                  */
/* ------------------------------------------------------------------ */

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hillPath(width: number, baseY: number, amplitude: number, seed: number): string {
  const random = mulberry32(seed);
  const step = 150;
  const points: Array<[number, number]> = [];
  for (let x = -260; x <= width + 260; x += step) {
    const wave = Math.sin(x * 0.006 + seed) * 0.5 + Math.sin(x * 0.0023 + seed * 2) * 0.5;
    points.push([x, baseY - amplitude * (0.55 + 0.45 * wave) - random() * amplitude * 0.25]);
  }

  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i += 1) {
    const [x, y] = points[i];
    const [nx, ny] = points[i + 1];
    d += ` Q ${x} ${y} ${(x + nx) / 2} ${(y + ny) / 2}`;
  }
  const last = points[points.length - 1];
  d += ` L ${last[0]} ${last[1]} L ${last[0]} ${SCENE_HEIGHT + 220} L ${points[0][0]} ${SCENE_HEIGHT + 220} Z`;
  return d;
}

export interface Building {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface LitWindow {
  x: number;
  y: number;
  flicker: boolean;
  duration: number;
  delay: number;
}

export function buildSkyline(
  width: number,
  seed: number,
  minHeight: number,
  maxHeight: number,
  minWidth: number,
  maxWidth: number
): Building[] {
  const random = mulberry32(seed);
  const buildings: Building[] = [];
  let x = -240;
  while (x < width + 240) {
    const w = minWidth + random() * (maxWidth - minWidth);
    const h = minHeight + random() * (maxHeight - minHeight);
    buildings.push({ x, y: SCENE_HEIGHT - h, w: w + 1, h: h + 260 });
    x += w * (0.85 + random() * 0.2);
  }
  return buildings;
}

export function litWindows(buildings: Building[], seed: number, probability: number): LitWindow[] {
  const random = mulberry32(seed);
  const windows: LitWindow[] = [];
  for (const building of buildings) {
    const columns = Math.floor((building.w - 10) / 14);
    const rows = Math.floor((SCENE_HEIGHT - building.y - 24) / 20);
    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        if (random() > probability) continue;
        windows.push({
          x: building.x + 7 + column * 14,
          y: building.y + 14 + row * 20,
          flicker: random() < 0.3,
          duration: 5 + random() * 8,
          delay: -random() * 9,
        });
      }
    }
  }
  return windows;
}
