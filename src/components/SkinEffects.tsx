'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSite } from '@/context/site-context';
import {
  LAYER_ASSETS,
  LitWindow,
  SCENE_HEIGHT,
  SKY_STOPS,
  buildSkyline,
  characterPlacement,
  cloudCopies,
  hillPath,
  litWindows,
  sceneWidthFor,
} from '@/lib/yofukashi-scene';

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

function Sky() {
  const { lang } = useSite();
  const [phase, setPhase] = useState<number | null>(null);

  useEffect(() => {
    setPhase(moonPhase(new Date()));
  }, []);

  const label =
    phase === null
      ? ''
      : lang === 'es'
        ? `Luna con la fase de hoy (${Math.round(((1 - Math.cos(2 * Math.PI * phase)) / 2) * 100)}% iluminada)`
        : `Moon at today's phase (${Math.round(((1 - Math.cos(2 * Math.PI * phase)) / 2) * 100)}% lit)`;

  return (
    <>
      <div className="sky-stars" aria-hidden="true" />
      {phase !== null ? (
        <svg
          className="sky-moon"
          viewBox="0 0 100 100"
          role="img"
          aria-label={label}
        >
          <circle cx="50" cy="50" r="46" className="sky-moon-dim" />
          <path d={litMoonPath(phase, 46, 50, 50)} className="sky-moon-lit" />
        </svg>
      ) : null}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Yofukashi no Uta: dusk scene built from depth layers                */
/* ------------------------------------------------------------------ */

type LayerName = 'sky' | 'clouds' | 'far' | 'near' | 'cityFar' | 'city' | 'left' | 'right';

/** p = pointer travel in scene units, s = how much the layer rises while scrolling. */
const DEPTH: Record<LayerName, { p: number; s: number }> = {
  sky: { p: 3, s: 0 },
  clouds: { p: 7, s: 0.008 },
  far: { p: 11, s: 0.02 },
  near: { p: 17, s: 0.035 },
  cityFar: { p: 22, s: 0.045 },
  city: { p: 30, s: 0.06 },
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

  const shapes = useMemo(() => {
    const cityFar = buildSkyline(width, 21, 70, 170, 34, 80);
    const city = buildSkyline(width, 5, 110, 270, 46, 120);
    return {
      farHill: hillPath(width, 690, 120, 3),
      nearHill: hillPath(width, 765, 110, 11),
      cityFar,
      city,
      windows: litWindows(city, 77, 0.09),
      windowsFar: litWindows(cityFar, 31, 0.04),
      clouds: cloudCopies(width),
    };
  }, [width]);

  const placement = characterPlacement(width);
  const bind = (name: LayerName) => (node: SVGGElement | null) => {
    layerRefs.current[name] = node;
  };

  const renderWindows = (list: LitWindow[], size: [number, number]) =>
    list.map((win) => (
      <rect
        key={`${win.x}-${win.y}`}
        className={win.flicker && animated ? 'yofukashi-window' : undefined}
        x={win.x}
        y={win.y}
        width={size[0]}
        height={size[1]}
        fill="#ffe7a3"
        opacity={win.flicker && animated ? undefined : 0.85}
        style={
          win.flicker && animated
            ? { animationDuration: `${win.duration}s`, animationDelay: `${win.delay}s` }
            : undefined
        }
      />
    ));

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
        <linearGradient id="yf-fade-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.2" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.8" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="yf-cloud-fade" maskContentUnits="objectBoundingBox" x="0" y="0" width="1" height="1">
          <rect width="1" height="1" fill="url(#yf-fade-gradient)" />
        </mask>
        <radialGradient id="yf-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffb878" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffb878" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="yf-hill-far" gradientUnits="userSpaceOnUse" x1="0" y1="540" x2="0" y2="800">
          <stop offset="0" stopColor="#7d8290" />
          <stop offset="1" stopColor="#566070" />
        </linearGradient>
        <linearGradient id="yf-hill-near" gradientUnits="userSpaceOnUse" x1="0" y1="630" x2="0" y2="860">
          <stop offset="0" stopColor="#4d5662" />
          <stop offset="1" stopColor="#2b323c" />
        </linearGradient>
        <linearGradient id="yf-haze" gradientUnits="userSpaceOnUse" x1="0" y1="560" x2="0" y2="800">
          <stop offset="0" stopColor="#f0b27a" stopOpacity="0" />
          <stop offset="0.55" stopColor="#f0b27a" stopOpacity="0.32" />
          <stop offset="1" stopColor="#f0b27a" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* 1. Sky and horizon glow */}
      <g ref={bind('sky')}>
        <rect x={-500} y={-400} width={width + 1000} height={SCENE_HEIGHT + 900} fill="url(#yf-sky)" />
        <ellipse cx={width / 2} cy={700} rx={width * 0.65} ry={190} fill="url(#yf-glow)" />
      </g>

      {/* 2. Clouds cut from the illustration; each copy fades out at both edges */}
      <g ref={bind('clouds')}>
        <g className={animated ? 'yofukashi-clouds-drift' : undefined}>
          {shapes.clouds.map((cloud) => (
            <image
              key={cloud.x}
              href={LAYER_ASSETS.clouds.href}
              x={cloud.x}
              y={cloud.y}
              width={cloud.w}
              height={cloud.h}
              preserveAspectRatio="none"
              opacity={cloud.opacity}
              mask="url(#yf-cloud-fade)"
            />
          ))}
        </g>
      </g>

      {/* 3. Far hills with haze */}
      <g ref={bind('far')}>
        <path d={shapes.farHill} fill="url(#yf-hill-far)" />
        <rect x={-500} y={560} width={width + 1000} height={240} fill="url(#yf-haze)" />
      </g>

      {/* 4. Near hills */}
      <g ref={bind('near')}>
        <path d={shapes.nearHill} fill="url(#yf-hill-near)" />
      </g>

      {/* 5. Far skyline */}
      <g ref={bind('cityFar')}>
        {shapes.cityFar.map((b) => (
          <rect key={`${b.x}`} x={b.x} y={b.y} width={b.w} height={b.h} fill="#1f1f30" />
        ))}
        {renderWindows(shapes.windowsFar, [4, 6])}
      </g>

      {/* 6. Near skyline */}
      <g ref={bind('city')}>
        {shapes.city.map((b) => (
          <rect key={`${b.x}`} x={b.x} y={b.y} width={b.w} height={b.h} fill="#0b0707" />
        ))}
        {renderWindows(shapes.windows, [6, 9])}
      </g>

      {/* 7. Characters, each on its own layer */}
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
/* Kill la Kill: diagonal cut on route change                          */
/* ------------------------------------------------------------------ */

function ScissorsTransition() {
  const pathname = usePathname();
  const previous = useRef(pathname);
  const [cut, setCut] = useState(0);

  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setCut((n) => n + 1);
    const timer = setTimeout(() => setCut(0), 900);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!cut) return null;

  return (
    <div key={cut} className="klk-cut" aria-hidden="true">
      <span className="klk-cut-a" />
      <span className="klk-cut-b" />
    </div>
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
      <span className="font-kanji text-3xl leading-none text-[var(--acc)]" aria-hidden="true">
        鹿
      </span>
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

const DRIPS = [
  { left: 5, height: 14, delay: 0.05 },
  { left: 13, height: 26, delay: 0.2 },
  { left: 24, height: 10, delay: 0.1 },
  { left: 36, height: 20, delay: 0.3 },
  { left: 47, height: 30, delay: 0.15 },
  { left: 58, height: 12, delay: 0.35 },
  { left: 69, height: 24, delay: 0.1 },
  { left: 80, height: 16, delay: 0.25 },
  { left: 91, height: 28, delay: 0.05 },
];

export function NavDrips() {
  const { skin } = useSite();
  if (skin !== 'toga') return null;

  return (
    <div className="pointer-events-none absolute left-0 right-0 top-full h-10" aria-hidden="true">
      {DRIPS.map((drip) => (
        <span
          key={drip.left}
          className="nav-drip"
          style={{
            left: `${drip.left}%`,
            height: drip.height,
            animationDelay: `${drip.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function SkinEffects() {
  const { skin } = useSite();

  return (
    <>
      {skin === 'yofukashi' ? <YofukashiScene /> : null}
      {skin === 'dregxmoon' ? <Sky /> : null}
      {skin === 'killlakill' ? <ScissorsTransition /> : null}
      {skin === 'nichijou' ? <AbsurdEvent /> : null}
    </>
  );
}
