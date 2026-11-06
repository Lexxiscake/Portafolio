'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSite } from '@/context/site-context';
import { SkinMotif } from '@/components/SkinMotif';
import {
  LAYER_ASSETS,
  SCENE_HEIGHT,
  SKY_STOPS,
  characterPlacement,
  sceneWidthFor,
} from '@/lib/yofukashi-scene';
import {
  YofukashiBats,
  YofukashiCursor,
  YofukashiStars,
} from '@/components/YofukashiEffects';

/* ------------------------------------------------------------------ */
/* Moon phase (Dregxmoon)                                              */
/* ------------------------------------------------------------------ */

const SYNODIC_DAYS = 29.530588853;
const REFERENCE_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);

/** 0 = new moon, 0.5 = full moon. */
function moonPhase(date: Date): number {
  const days = (date.getTime() - REFERENCE_NEW_MOON) / 86_400_000;
  return (((days % SYNODIC_DAYS) + SYNODIC_DAYS) % SYNODIC_DAYS) / SYNODIC_DAYS;
}

/** Path of the lit part of the moon. Northern-hemisphere orientation. */
function litMoonPath(phase: number, r: number, cx: number, cy: number): string {
  const waxing = phase < 0.5;
  const k = Math.cos(2 * Math.PI * phase);
  const rx = Math.max(Math.abs(k) * r, 0.01);
  const limbSweep = waxing ? 1 : 0;
  const terminatorSweep = waxing === k > 0 ? 0 : 1;

  return [
    `M ${cx} ${cy - r}`,
    `A ${r} ${r} 0 0 ${limbSweep} ${cx} ${cy + r}`,
    `A ${rx} ${r} 0 0 ${terminatorSweep} ${cx} ${cy - r}`,
    'Z',
  ].join(' ');
}

function Sky({ onMoonClick }: { onMoonClick?: (x: number, y: number) => void }) {
  const { skin, lang } = useSite();
  const [phase, setPhase] = useState<number | null>(null);
  const [scrollPhase, setScrollPhase] = useState(0.12);

  useEffect(() => {
    setPhase(moonPhase(new Date()));
  }, []);

  // Yofukashi: moon phase driven by scroll (crescent → nearly full)
  useEffect(() => {
    if (skin !== 'yofukashi') return;
    const update = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      setScrollPhase(0.12 + progress * 0.35);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [skin]);

  const displayPhase = skin === 'yofukashi' ? scrollPhase : (phase ?? 0.5);

  const label =
    lang === 'es'
      ? `Luna (${Math.round(((1 - Math.cos(2 * Math.PI * displayPhase)) / 2) * 100)}% iluminada)`
      : `Moon (${Math.round(((1 - Math.cos(2 * Math.PI * displayPhase)) / 2) * 100)}% lit)`;

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    onMoonClick?.(e.clientX, e.clientY);
  };

  return (
    <>
      <div className="sky-stars" aria-hidden="true" />
      <svg
        className="sky-moon"
        viewBox="0 0 100 100"
        role={skin === 'yofukashi' ? 'button' : 'img'}
        aria-label={label}
        onClick={skin === 'yofukashi' ? handleClick : undefined}
        tabIndex={skin === 'yofukashi' ? 0 : undefined}
        onKeyDown={
          skin === 'yofukashi'
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleClick(e as unknown as React.MouseEvent<SVGSVGElement>);
                }
              }
            : undefined
        }
      >
        <defs>
          <pattern id="sky-moon-screentone" width="5" height="5" patternUnits="userSpaceOnUse">
            <circle cx="2.5" cy="2.5" r="1.1" fill="var(--acc)" opacity="0.4" />
          </pattern>
          <clipPath id="sky-moon-clip">
            <path d={litMoonPath(displayPhase, 46, 50, 50)} />
          </clipPath>
          <clipPath id="sky-moon-disk">
            <circle cx="50" cy="50" r="46" />
          </clipPath>
        </defs>

        {/* Base dark disk with screentone shadow */}
        <circle cx="50" cy="50" r="46" className="sky-moon-dim" />
        <rect
          x="4"
          y="4"
          width="92"
          height="92"
          fill="url(#sky-moon-screentone)"
          clipPath="url(#sky-moon-disk)"
          className="sky-moon-halftone"
        />

        {/* Lit portion with craters */}
        <g clipPath="url(#sky-moon-clip)">
          <circle cx="50" cy="50" r="46" className="sky-moon-lit" />
          {skin === 'yofukashi' && (
            <g className="sky-moon-craters" aria-hidden="true">
              {/* Crater tone 1 (warmer shadow) */}
              <ellipse cx="38" cy="36" rx="9" ry="7" fill="#f59e0b" opacity="0.28" />
              <ellipse cx="62" cy="62" rx="11" ry="8" fill="#f59e0b" opacity="0.24" />
              <ellipse cx="34" cy="68" rx="6" ry="5" fill="#f59e0b" opacity="0.22" />
              <ellipse cx="66" cy="30" rx="6" ry="5" fill="#f59e0b" opacity="0.26" />
              {/* Crater tone 2 (deeper centers) */}
              <ellipse cx="39" cy="37" rx="5" ry="3.8" fill="#d97706" opacity="0.25" />
              <ellipse cx="63" cy="63" rx="6" ry="4.5" fill="#d97706" opacity="0.22" />
              <circle cx="48" cy="52" r="3.2" fill="#d97706" opacity="0.18" />
            </g>
          )}
        </g>

        {/* Outline ring */}
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="var(--acc)"
          strokeWidth={skin === 'yofukashi' ? 2.5 : 1}
          opacity={skin === 'yofukashi' ? 0.9 : 0.4}
        />
      </svg>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Yofukashi no Uta: dusk scene built from depth layers                */
/* ------------------------------------------------------------------ */

type LayerName = 'sky' | 'left' | 'right';

/** p = pointer travel in scene units, s = how much the layer rises while scrolling. */
const DEPTH: Record<LayerName, { p: number; s: number }> = {
  sky: { p: 3, s: 0 },
  left: { p: 42, s: 0.085 },
  right: { p: 50, s: 0.1 },
};

const LAYER_NAMES = Object.keys(DEPTH) as LayerName[];

export function YofukashiScene({ width: forcedWidth }: { width?: number }) {
  const [width, setWidth] = useState(forcedWidth ?? 1600);
  const [animated, setAnimated] = useState(false);
  const layerRefs = useRef<Partial<Record<LayerName, SVGGElement | null>>>({});

  // The scene is as wide as the viewport needs, so nothing is cropped.
  useEffect(() => {
    if (forcedWidth) return;
    const update = () => setWidth(sceneWidthFor(window.innerWidth, window.innerHeight));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [forcedWidth]);

  // Parallax: every layer moves against the pointer and rises with scroll, at its own rate.
  useEffect(() => {
    if (forcedWidth) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setAnimated(!reduce);
    if (reduce) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX / window.innerWidth - 0.5;
      targetY = event.clientY / window.innerHeight - 0.5;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
      const scroll = Math.min(window.scrollY, 2000);

      for (const name of LAYER_NAMES) {
        const { p, s } = DEPTH[name];
        const tx = -currentX * 2 * p;
        const ty = -currentY * p - scroll * s;
        layerRefs.current[name]?.setAttribute('transform', `translate(${tx.toFixed(2)} ${ty.toFixed(2)})`);
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, [forcedWidth]);

  const placement = characterPlacement(width);
  const bind = (name: LayerName) => (node: SVGGElement | null) => {
    layerRefs.current[name] = node;
  };

  return (
    <svg
      className="yofukashi-bg"
      viewBox={`0 0 ${width} ${SCENE_HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="yf-sky" gradientUnits="userSpaceOnUse" x1="0" y1="-100" x2="0" y2="780">
          {SKY_STOPS.map(([offset, color]) => (
            <stop key={offset} offset={offset} stopColor={color} />
          ))}
        </linearGradient>
        <radialGradient id="yf-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffb878" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffb878" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* 1. Sky and horizon glow */}
      <g ref={bind('sky')}>
        <rect x={-500} y={-400} width={width + 1000} height={SCENE_HEIGHT + 900} fill="url(#yf-sky)" />
        <ellipse cx={width / 2} cy={700} rx={width * 0.65} ry={190} fill="url(#yf-glow)" />
      </g>

      {/* 2. Characters, each on its own layer */}
      <g ref={bind('left')}>
        <g transform={`translate(${placement.x} ${placement.y}) scale(${placement.scale})`}>
          <g className={animated ? 'yofukashi-float-a' : undefined}>
            <image
              href={LAYER_ASSETS.left.href}
              x={LAYER_ASSETS.left.x}
              y={LAYER_ASSETS.left.y}
              width={LAYER_ASSETS.left.w}
              height={LAYER_ASSETS.left.h}
            />
          </g>
        </g>
      </g>
      <g ref={bind('right')}>
        <g transform={`translate(${placement.x} ${placement.y}) scale(${placement.scale})`}>
          <g className={animated ? 'yofukashi-float-b' : undefined}>
            <image
              href={LAYER_ASSETS.right.href}
              x={LAYER_ASSETS.right.x}
              y={LAYER_ASSETS.right.y}
              width={LAYER_ASSETS.right.w}
              height={LAYER_ASSETS.right.h}
            />
          </g>
        </g>
      </g>

      {/* Scrim keeps text readable over the scene */}
      <rect className="yofukashi-scrim" x={-500} y={-400} width={width + 1000} height={SCENE_HEIGHT + 900} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Nichijou: one absurd event per session                              */
/* ------------------------------------------------------------------ */

const ABSURD_EVENTS = {
  es: [
    'Un ciervo gigante cruzó tu pantalla. Nadie lo vio.',
    'Tu portafolio fue ascendido a goma de borrar. Sigue funcionando.',
    'Se detectó una tostada con tu nombre. No hay que hacer nada.',
    'Esto es un evento absurdo. Puedes ignorarlo.',
  ],
  en: [
    'A giant deer crossed your screen. Nobody saw it.',
    'Your portfolio was promoted to eraser. It still works.',
    'A piece of toast with your name was detected. No action needed.',
    'This is an absurd event. You can ignore it.',
  ],
};

function AbsurdEvent() {
  const { lang } = useSite();
  const [eventIndex, setEventIndex] = useState<number | null>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('nichijou-event') === '1') return;
    } catch {}

    const delay = 15_000 + Math.random() * 25_000;
    const timer = setTimeout(() => {
      setEventIndex(Math.floor(Math.random() * ABSURD_EVENTS.es.length));
      try {
        sessionStorage.setItem('nichijou-event', '1');
      } catch {}
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (eventIndex === null) return;
    const timer = setTimeout(() => setEventIndex(null), 9_000);
    return () => clearTimeout(timer);
  }, [eventIndex]);

  if (eventIndex === null) return null;

  return (
    <div
      role="status"
      className="absurd-toast fixed bottom-4 left-4 z-[70] flex max-w-[320px] items-start gap-3 border-2 border-[color:var(--line)] bg-[var(--pn)] p-3 pr-2 text-sm text-[var(--ink)] shadow-[5px_5px_0_var(--acc)]"
    >
      <SkinMotif skin="nichijou" className="h-8 w-8 shrink-0 text-[var(--acc)]" />
      <p className="m-0 flex-1 leading-snug">{ABSURD_EVENTS[lang][eventIndex]}</p>
      <button
        type="button"
        onClick={() => setEventIndex(null)}
        aria-label={lang === 'es' ? 'Cerrar aviso' : 'Dismiss message'}
        className="min-h-[28px] min-w-[28px] text-lg leading-none text-[var(--mut)] hover:text-[var(--acc)]"
      >
        ×
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Toga: drips under the navbar                                        */
/* ------------------------------------------------------------------ */

/*
 * One inline SVG keeps the edge, shadows and highlights vector-sharp.
 * The viewBox is wider than the screen on purpose: `slice` crops the
 * pattern horizontally instead of squashing the drops on small screens.
 */
const NAV_VIEWBOX_WIDTH = 3840;
const NAV_VIEWBOX_HEIGHT = 96;
const NAV_STRIP_HEIGHT = 14;
const NAV_DROP_BASE = 12;

/* Global timing multiplier. Lower values make the drip loop faster. */
const NAV_DRIP_TIME_SCALE = 0.62;

type NavDropKind = 'bead' | 'medium' | 'long';

type NavDrop = {
  /** Horizontal offset from the group centre. */
  dx: number;
  /** Half-width at the join with the strip. */
  w: number;
  /** Length below the strip, in viewBox units. */
  len: number;
  /** Tip drift, so the drops do not hang perfectly straight. */
  lean?: number;
  /** Half-width of the tip bulb. */
  bulb?: number;
  kind: NavDropKind;
  /** Loop duration and negative delay, in seconds. */
  dur: number;
  delay: number;
};

type NavGroup = {
  x: number;
  drops: NavDrop[];
};

/*
 * Groups of 2-3 drops with long, irregular gaps. Three long drops live in
 * the first 1440 units, so the desktop view always gets the full silhouette.
 */
const NAV_GROUPS: NavGroup[] = [
  {
    x: 52,
    drops: [
      { dx: -18, w: 7, len: 11, kind: 'bead', dur: 4.2, delay: -1.8 },
      { dx: 4, w: 11, len: 56, lean: 2, bulb: 7.5, kind: 'long', dur: 6.8, delay: -3.2 },
      { dx: 27, w: 6, len: 26, lean: -1, bulb: 4.5, kind: 'medium', dur: 5.4, delay: -0.7 },
    ],
  },
  {
    x: 262,
    drops: [
      { dx: -20, w: 8, len: 29, lean: -2, bulb: 5.5, kind: 'medium', dur: 5.8, delay: -2.6 },
      { dx: 6, w: 6, len: 10, kind: 'bead', dur: 3.9, delay: -1.1 },
      { dx: 24, w: 10, len: 33, lean: 3, bulb: 6, kind: 'medium', dur: 6.3, delay: -4.4 },
    ],
  },
  {
    x: 520,
    drops: [
      { dx: -22, w: 7, len: 34, lean: 1, bulb: 5, kind: 'medium', dur: 6.2, delay: -3.6 },
      { dx: 8, w: 9, len: 14, kind: 'bead', dur: 4.7, delay: -0.4 },
      { dx: 26, w: 6, len: 25, lean: -2, bulb: 4.2, kind: 'medium', dur: 5.1, delay: -2.2 },
    ],
  },
  {
    x: 748,
    drops: [
      { dx: -18, w: 12, len: 52, lean: -2, bulb: 8, kind: 'long', dur: 7.8, delay: -5.1 },
      { dx: 16, w: 7, len: 12, kind: 'bead', dur: 4.4, delay: -1.7 },
      { dx: 32, w: 8, len: 30, lean: 2, bulb: 5, kind: 'medium', dur: 6.6, delay: -3.8 },
    ],
  },
  {
    x: 1040,
    drops: [
      { dx: -26, w: 6, len: 9, kind: 'bead', dur: 3.6, delay: -2.9 },
      { dx: -4, w: 9, len: 27, lean: -1, bulb: 5.4, kind: 'medium', dur: 5.6, delay: -0.9 },
      { dx: 20, w: 7, len: 33, lean: 2, bulb: 4.8, kind: 'medium', dur: 6.9, delay: -4.2 },
    ],
  },
  {
    x: 1288,
    drops: [
      { dx: -20, w: 10, len: 66, lean: 3, bulb: 7.5, kind: 'long', dur: 7.6, delay: -2.1 },
      { dx: 14, w: 6, len: 11, kind: 'bead', dur: 4.1, delay: -3.3 },
      { dx: 28, w: 8, len: 28, lean: -2, bulb: 5, kind: 'medium', dur: 5.3, delay: -1.5 },
    ],
  },
  {
    x: 1510,
    drops: [
      { dx: -16, w: 7, len: 25, lean: 1, bulb: 4.5, kind: 'medium', dur: 5.9, delay: -4.7 },
      { dx: 8, w: 9, len: 13, kind: 'bead', dur: 4.5, delay: -2.4 },
      { dx: 24, w: 6, len: 35, lean: -1, bulb: 4.2, kind: 'medium', dur: 6.3, delay: -0.6 },
    ],
  },
  {
    x: 1780,
    drops: [
      { dx: -22, w: 8, len: 12, kind: 'bead', dur: 4, delay: -1.3 },
      { dx: 0, w: 10, len: 31, lean: 2, bulb: 6, kind: 'medium', dur: 6.1, delay: -3.9 },
      { dx: 24, w: 7, len: 26, lean: -2, bulb: 4.5, kind: 'medium', dur: 5.5, delay: -2.8 },
    ],
  },
  {
    x: 2040,
    drops: [
      { dx: -18, w: 6, len: 9, kind: 'bead', dur: 3.8, delay: -0.5 },
      { dx: 2, w: 9, len: 34, lean: -2, bulb: 5.5, kind: 'medium', dur: 6.7, delay: -4.1 },
      { dx: 26, w: 8, len: 14, kind: 'bead', dur: 4.9, delay: -2 },
    ],
  },
  {
    x: 2310,
    drops: [
      { dx: -24, w: 7, len: 27, lean: 1, bulb: 4.5, kind: 'medium', dur: 5.2, delay: -3.1 },
      { dx: -2, w: 6, len: 10, kind: 'bead', dur: 4.3, delay: -1 },
      { dx: 18, w: 9, len: 35, lean: 2, bulb: 5.2, kind: 'medium', dur: 6.4, delay: -4.9 },
    ],
  },
  {
    x: 2540,
    drops: [
      { dx: -20, w: 8, len: 13, kind: 'bead', dur: 4.6, delay: -2.7 },
      { dx: 0, w: 11, len: 30, lean: -2, bulb: 6, kind: 'medium', dur: 5.9, delay: -0.3 },
      { dx: 28, w: 7, len: 25, lean: 1, bulb: 4.4, kind: 'medium', dur: 5.1, delay: -3.7 },
    ],
  },
  {
    x: 2790,
    drops: [
      { dx: -22, w: 6, len: 9, kind: 'bead', dur: 3.7, delay: -1.9 },
      { dx: -2, w: 9, len: 33, lean: 2, bulb: 5.3, kind: 'medium', dur: 6.6, delay: -4.4 },
      { dx: 22, w: 7, len: 12, kind: 'bead', dur: 4.4, delay: -2.5 },
    ],
  },
  {
    x: 3050,
    drops: [
      { dx: -18, w: 8, len: 28, lean: -1, bulb: 5, kind: 'medium', dur: 5.7, delay: -3.4 },
      { dx: 6, w: 6, len: 11, kind: 'bead', dur: 4.2, delay: -0.8 },
      { dx: 24, w: 10, len: 34, lean: 2, bulb: 5.8, kind: 'medium', dur: 6.8, delay: -4.6 },
    ],
  },
  {
    x: 3300,
    drops: [
      { dx: -20, w: 7, len: 10, kind: 'bead', dur: 3.9, delay: -2.2 },
      { dx: 0, w: 9, len: 29, lean: -2, bulb: 5.2, kind: 'medium', dur: 6, delay: -3.9 },
      { dx: 22, w: 6, len: 26, lean: 1, bulb: 4.2, kind: 'medium', dur: 5.4, delay: -1.4 },
    ],
  },
  {
    x: 3560,
    drops: [
      { dx: -24, w: 8, len: 32, lean: 2, bulb: 5.4, kind: 'medium', dur: 6.2, delay: -4.8 },
      { dx: 2, w: 6, len: 12, kind: 'bead', dur: 4.7, delay: -2.3 },
      { dx: 20, w: 9, len: 27, lean: -1, bulb: 5, kind: 'medium', dur: 5.6, delay: -0.9 },
    ],
  },
  {
    x: 3800,
    drops: [
      { dx: -18, w: 7, len: 11, kind: 'bead', dur: 4.1, delay: -1.6 },
      { dx: 0, w: 10, len: 30, lean: 2, bulb: 5.5, kind: 'medium', dur: 6.5, delay: -3.2 },
      { dx: 22, w: 6, len: 25, lean: -1, bulb: 4, kind: 'medium', dur: 5, delay: -2.9 },
    ],
  },
];

/* The strip edge is a run of shallow, irregular curves, never a straight line. */
const NAV_STRIP_WAVE: Array<{ x: number; dip: number }> = [
  { x: 3680, dip: 1.5 },
  { x: 3510, dip: -1.1 },
  { x: 3340, dip: 1.7 },
  { x: 3170, dip: -0.8 },
  { x: 2990, dip: 1.2 },
  { x: 2820, dip: -1.4 },
  { x: 2640, dip: 1.5 },
  { x: 2470, dip: -0.9 },
  { x: 2290, dip: 1.8 },
  { x: 2110, dip: -1.2 },
  { x: 1940, dip: 1.1 },
  { x: 1770, dip: -1.5 },
  { x: 1590, dip: 1.6 },
  { x: 1420, dip: -1 },
  { x: 1240, dip: 1.3 },
  { x: 1070, dip: -1.6 },
  { x: 890, dip: 1.5 },
  { x: 720, dip: -1.2 },
  { x: 550, dip: 1.7 },
  { x: 380, dip: -0.9 },
  { x: 210, dip: 1.2 },
  { x: 0, dip: -1.3 },
];

/* A couple of drops detach from the long drips and reappear on the next cycle. */
const NAV_FALLING_DROPS = [
  { x: 58, y: 76, r: 2.6, dur: 6.4, delay: -2.2 },
  { x: 1271, y: 76, r: 2.3, dur: 7.2, delay: -5.1 },
];

type DripStyle = React.CSSProperties & {
  '--drip-dur': string;
  '--drip-delay': string;
};

type FallStyle = React.CSSProperties & {
  '--fall-dur': string;
  '--fall-delay': string;
};

/** Small deterministic PRNG, so the texture is stable between renders. */
function navRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function buildNavStripPath() {
  let path = `M0 0H${NAV_VIEWBOX_WIDTH}V${NAV_STRIP_HEIGHT}`;
  let cursor = NAV_VIEWBOX_WIDTH;

  for (const point of NAV_STRIP_WAVE) {
    const mid = (cursor + point.x) / 2;
    path += `Q${mid.toFixed(1)} ${(NAV_STRIP_HEIGHT + point.dip).toFixed(2)} ${point.x} ${NAV_STRIP_HEIGHT}`;
    cursor = point.x;
  }

  return `${path}Z`;
}

function buildNavDropPath(groupX: number, drop: NavDrop) {
  const f = (value: number) => value.toFixed(2);
  const base = NAV_DROP_BASE;
  const center = groupX + drop.dx;
  const tipX = center + (drop.lean ?? 0);
  const tipY = base + drop.len;
  const w = drop.w;
  const bulb = drop.bulb ?? Math.max(3.2, w * 0.58);
  const left = center - w;
  const right = center + w;

  if (drop.kind === 'bead') {
    const b = Math.min(bulb, w * 0.95);
    const outline = [
      `M${f(left)} ${f(base)}`,
      `C${f(left + w * 0.08)} ${f(base + drop.len * 0.28)} ${f(tipX - b * 0.9)} ${f(base + drop.len * 0.55)} ${f(tipX - b)} ${f(base + drop.len * 0.72)}`,
      `C${f(tipX - b * 0.92)} ${f(base + drop.len * 0.94)} ${f(tipX - b * 0.45)} ${f(tipY)} ${f(tipX)} ${f(tipY)}`,
      `C${f(tipX + b * 0.45)} ${f(tipY)} ${f(tipX + b * 0.92)} ${f(base + drop.len * 0.94)} ${f(tipX + b)} ${f(base + drop.len * 0.72)}`,
      `C${f(tipX + b * 0.9)} ${f(base + drop.len * 0.55)} ${f(right - w * 0.08)} ${f(base + drop.len * 0.28)} ${f(right)} ${f(base)}`,
    ].join(' ');

    return { fill: `${outline} Z`, rim: outline };
  }

  const neckRatio = drop.kind === 'long' ? 0.56 : 0.46;
  const neckY = base + drop.len * neckRatio;
  const neckHalf = Math.max(1.3, w * (drop.kind === 'long' ? 0.3 : 0.42));
  const bulbHalf = Math.max(neckHalf * 1.35, bulb);
  const neckX = center + (drop.lean ?? 0) * 0.35;
  const bulbCenterY = tipY - bulbHalf * 0.62;

  const outline = [
    `M${f(left)} ${f(base)}`,
    `C${f(left + w * 0.55)} ${f(base + drop.len * 0.1)} ${f(neckX - neckHalf * 1.7)} ${f(neckY - drop.len * 0.16)} ${f(neckX - neckHalf)} ${f(neckY)}`,
    `C${f(neckX - neckHalf * 1.05)} ${f(neckY + bulbHalf * 0.3)} ${f(tipX - bulbHalf)} ${f(bulbCenterY - bulbHalf * 0.85)} ${f(tipX - bulbHalf)} ${f(bulbCenterY)}`,
    `C${f(tipX - bulbHalf)} ${f(tipY - bulbHalf * 0.15)} ${f(tipX - bulbHalf * 0.55)} ${f(tipY)} ${f(tipX)} ${f(tipY)}`,
    `C${f(tipX + bulbHalf * 0.55)} ${f(tipY)} ${f(tipX + bulbHalf)} ${f(tipY - bulbHalf * 0.15)} ${f(tipX + bulbHalf)} ${f(bulbCenterY)}`,
    `C${f(tipX + bulbHalf)} ${f(bulbCenterY - bulbHalf * 0.85)} ${f(neckX + neckHalf * 1.05)} ${f(neckY + bulbHalf * 0.3)} ${f(neckX + neckHalf)} ${f(neckY)}`,
    `C${f(neckX + neckHalf * 1.7)} ${f(neckY - drop.len * 0.16)} ${f(right - w * 0.55)} ${f(base + drop.len * 0.1)} ${f(right)} ${f(base)}`,
  ].join(' ');

  return { fill: `${outline} Z`, rim: outline };
}

function buildNavGloss(groupX: number, drop: NavDrop) {
  if (drop.kind === 'bead') return null;

  const f = (value: number) => value.toFixed(2);
  const base = NAV_DROP_BASE;
  const center = groupX + drop.dx;
  const tipX = center + (drop.lean ?? 0);
  const tipY = base + drop.len;
  const w = drop.w;
  const bulb = drop.bulb ?? Math.max(3.2, w * 0.58);
  const neckRatio = drop.kind === 'long' ? 0.56 : 0.46;
  const neckY = base + drop.len * neckRatio;
  const neckHalf = Math.max(1.3, w * (drop.kind === 'long' ? 0.3 : 0.42));
  const bulbHalf = Math.max(neckHalf * 1.35, bulb);
  const bulbCenterY = tipY - bulbHalf * 0.62;
  const neckX = center + (drop.lean ?? 0) * 0.35;

  return [
    `M${f(center - w * 0.4)} ${f(base + drop.len * 0.14)}`,
    `C${f(center - w * 0.12)} ${f(base + drop.len * 0.32)} ${f(neckX - neckHalf * 0.9)} ${f(neckY - drop.len * 0.08)} ${f(neckX - neckHalf * 0.55)} ${f(neckY + (tipY - neckY) * 0.1)}`,
    `C${f(neckX - neckHalf * 0.35)} ${f(neckY + (tipY - neckY) * 0.32)} ${f(tipX - bulbHalf * 0.65)} ${f(bulbCenterY - bulbHalf * 0.45)} ${f(tipX - bulbHalf * 0.5)} ${f(bulbCenterY - bulbHalf * 0.05)}`,
  ].join(' ');
}

function buildFallingDropPath(x: number, y: number, r: number) {
  const f = (value: number) => value.toFixed(2);
  const top = y - r * 1.8;
  const half = r * 0.72;

  return [
    `M${f(x)} ${f(top)}`,
    `C${f(x - half * 0.55)} ${f(y - r * 0.7)} ${f(x - half)} ${f(y - r * 0.1)} ${f(x - half)} ${f(y + r * 0.35)}`,
    `C${f(x - half)} ${f(y + r * 1.05)} ${f(x + half)} ${f(y + r * 1.05)} ${f(x + half)} ${f(y + r * 0.35)}`,
    `C${f(x + half)} ${f(y - r * 0.1)} ${f(x + half * 0.55)} ${f(y - r * 0.7)} ${f(x)} ${f(top)}`,
    'Z',
  ].join(' ');
}

const NAV_SPECKLES = (() => {
  const random = navRandom(0x7a9c);
  return Array.from({ length: 64 }, (_, index) => {
    const light = random() < 0.3;
    return {
      id: index,
      x: random() * NAV_VIEWBOX_WIDTH,
      y: 1.5 + random() * 9.5,
      r: 0.18 + random() * 0.55,
      light,
      opacity: light ? 0.16 + random() * 0.16 : 0.18 + random() * 0.2,
    };
  });
})();

const NAV_STRIP_PATH = buildNavStripPath();

const NAV_DROPS = NAV_GROUPS.flatMap((group, groupIndex) =>
  group.drops.map((drop, dropIndex) => {
    const { fill, rim } = buildNavDropPath(group.x, drop);
    const gloss = buildNavGloss(group.x, drop);
    const center = group.x + drop.dx;
    const tipX = center + (drop.lean ?? 0);
    const tipY = NAV_DROP_BASE + drop.len;
    const bulb = drop.bulb ?? Math.max(3.2, drop.w * 0.58);

    return {
      id: `${groupIndex}-${dropIndex}`,
      drop,
      fill,
      rim,
      gloss,
      tipX,
      tipY,
      bulb,
    };
  })
);

export function NavDrips() {
  const { skin } = useSite();
  if (skin !== 'toga') return null;

  return (
    <div className="nav-drips" aria-hidden="true">
      <svg
        className="nav-drips__art"
        viewBox={`0 0 ${NAV_VIEWBOX_WIDTH} ${NAV_VIEWBOX_HEIGHT}`}
        preserveAspectRatio="xMinYMin slice"
        focusable="false"
      >
        <defs>
          <linearGradient id="toga-nav-strip" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" className="nav-blood-stop-base" />
            <stop offset="0.55" className="nav-blood-stop-base" />
            <stop offset="1" className="nav-blood-stop-dark" />
          </linearGradient>
          <linearGradient id="toga-nav-drop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" className="nav-blood-stop-base" />
            <stop offset="0.58" className="nav-blood-stop-base" />
            <stop offset="1" className="nav-blood-stop-dark" />
          </linearGradient>
        </defs>

        <path
          d={NAV_STRIP_PATH}
          className="nav-blood-strip-shadow"
          transform="translate(0 1.4)"
        />
        <path d={NAV_STRIP_PATH} className="nav-blood-strip" />

        <g className="nav-blood-speckles">
          {NAV_SPECKLES.map((speckle) => (
            <circle
              key={speckle.id}
              cx={speckle.x}
              cy={speckle.y}
              r={speckle.r}
              className={speckle.light ? 'nav-blood-speck-light' : 'nav-blood-speck-dark'}
              opacity={speckle.opacity}
            />
          ))}
        </g>

        {NAV_DROPS.map(({ id, drop, fill, rim, gloss, tipX, tipY, bulb }) => (
          <g
            key={id}
            className="nav-drip"
            style={
              {
                '--drip-dur': `${(drop.dur * NAV_DRIP_TIME_SCALE).toFixed(1)}s`,
                '--drip-delay': `${(drop.delay * NAV_DRIP_TIME_SCALE).toFixed(1)}s`,
              } as DripStyle
            }
          >
            <path d={fill} className="nav-blood-shadow" transform="translate(1.3 1.1)" />
            <path d={fill} className="nav-blood-drop" />
            <path d={rim} className="nav-blood-rim" />
            {gloss ? <path d={gloss} className="nav-blood-gloss" /> : null}
            {drop.kind === 'long' ? (
              <>
                <ellipse
                  cx={tipX - bulb * 0.32}
                  cy={tipY - bulb * 0.82}
                  rx={Math.max(0.8, bulb * 0.28)}
                  ry={Math.max(0.9, bulb * 0.42)}
                  className="nav-blood-gloss-fill"
                />
                <circle
                  cx={tipX + bulb * 0.22}
                  cy={tipY - bulb * 0.5}
                  r={Math.max(0.55, bulb * 0.15)}
                  className="nav-blood-bubble"
                />
              </>
            ) : null}
          </g>
        ))}

        {NAV_FALLING_DROPS.map((drop, index) => (
          <path
            key={`fall-${index}`}
            d={buildFallingDropPath(drop.x, drop.y, drop.r)}
            className="nav-drip-fall"
            style={
              {
                '--fall-dur': `${(drop.dur * NAV_DRIP_TIME_SCALE).toFixed(1)}s`,
                '--fall-delay': `${(drop.delay * NAV_DRIP_TIME_SCALE).toFixed(1)}s`,
              } as FallStyle
            }
          />
        ))}
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Toga: layered poster backdrop                                       */
/* ------------------------------------------------------------------ */

type TogaLayer = 'title' | 'character' | 'cat';

const TOGA_DEPTH: Record<TogaLayer, { pointer: number; scroll: number }> = {
  title: { pointer: 4, scroll: 0.012 },
  character: { pointer: 9, scroll: 0.035 },
  cat: { pointer: 15, scroll: 0.07 },
};

export function TogaBackdrop() {
  const layerRefs = useRef<Partial<Record<TogaLayer, HTMLDivElement | null>>>({});

  // The poster is split into three depths: title, Toga, and the cat. Each one
  // drifts against the pointer and rises with the scroll at its own rate.
  // The loop only runs while the pointer or the scroll is moving, then parks.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let frame = 0;
    let running = false;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let lastScroll = -1;

    const apply = (scroll: number) => {
      for (const name of Object.keys(TOGA_DEPTH) as TogaLayer[]) {
        const { pointer, scroll: scrollRate } = TOGA_DEPTH[name];
        const tx = -currentX * pointer;
        const ty = -currentY * pointer * 0.7 - scroll * scrollRate;
        const node = layerRefs.current[name];
        if (node) {
          node.style.setProperty('--toga-tx', `${tx.toFixed(2)}px`);
          node.style.setProperty('--toga-ty', `${ty.toFixed(2)}px`);
        }
      }
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      const scroll = Math.min(window.scrollY, 1800);
      apply(scroll);

      const settled =
        Math.abs(targetX - currentX) < 0.0005 &&
        Math.abs(targetY - currentY) < 0.0005;
      if (settled && scroll === lastScroll) {
        running = false;
        frame = 0;
        return;
      }

      lastScroll = scroll;
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX / window.innerWidth - 0.5;
      targetY = event.clientY / window.innerHeight - 0.5;
      start();
    };

    apply(Math.min(window.scrollY, 1800));
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', start, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', start);
      cancelAnimationFrame(frame);
    };
  }, []);

  const bind = (name: TogaLayer) => (node: HTMLDivElement | null) => {
    layerRefs.current[name] = node;
  };

  return (
    <div className="toga-bg" aria-hidden="true">
      <div className="toga-bg__glow" />
      <div ref={bind('title')} className="toga-bg__title" />
      <div ref={bind('character')} className="toga-bg__figure">
        <div className="toga-bg__aura" />
        <div className="toga-bg__character" />
      </div>
      <div ref={bind('cat')} className="toga-bg__cat" />
      <div className="toga-bg__scrim" />
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function SkinEffects() {
  const { skin } = useSite();
  const [moonClick, setMoonClick] = useState<{ x: number; y: number; seq: number } | null>(null);

  const handleMoonClick = (x: number, y: number) => {
    setMoonClick((prev) => ({ x, y, seq: (prev?.seq ?? 0) + 1 }));
  };

  return (
    <>
      {skin === 'toga' ? <TogaBackdrop /> : null}
      {skin === 'yofukashi' ? (
        <>
          <YofukashiScene />
          <Sky onMoonClick={handleMoonClick} />
          <YofukashiStars />
          <YofukashiBats moonClick={moonClick} />
          <YofukashiCursor />
        </>
      ) : null}
      {skin === 'dregxmoon' ? <Sky /> : null}
      {skin === 'nichijou' ? <AbsurdEvent /> : null}
    </>
  );
}
