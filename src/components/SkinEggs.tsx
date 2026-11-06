'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSite } from '@/context/site-context';
import { PROJECTS_DATA } from '@/lib/constants';
import { dripGeometry } from '@/lib/drip';
import { SKIN_ORDER, SKINS, isSkinId } from '@/lib/skins';
import { SkinMotif } from '@/components/SkinMotif';

/**
 * One hidden behavior per skin. None of these change colors; they change what the page does.
 *
 *   persona    five clicks on the hero portrait  -> full-screen attack banner
 *   toga       click on empty space              -> blood-colored splat that fades
 *              type "muejeje"                    -> rain of 恋
 *   yofukashi  five clicks on the hero portrait  -> shooting star and a night message
 *   nichijou   click on the hero portrait        -> squash and stretch; five clicks -> a deer walks by
 *   killlakill double click on empty space       -> diagonal slash and screen shake
 *   dregxmoon  press `                           -> working mini terminal
 */

const INTERACTIVE =
  'a, button, input, textarea, select, label, summary, [role="button"], .btn-manga';

function reducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isEditable(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
}

function spawnBurst(text: string, x: number, y: number) {
  const span = document.createElement('span');
  span.className = 'sfx burst';
  span.textContent = text;
  span.style.left = `${x}px`;
  span.style.top = `${y}px`;
  document.body.appendChild(span);
  setTimeout(() => span.remove(), 520);
}

/* ------------------------------------------------------------------ */
/* Hero portrait: persona, yofukashi, nichijou                         */
/* ------------------------------------------------------------------ */

type Overlay = 'allout' | 'deer' | 'insomnia' | null;

const MESSAGES = {
  allout: { es: 'ALL-OUT ATTACK!', en: 'ALL-OUT ATTACK!' },
  deer: {
    es: 'Un ciervo gigante cruzó la pantalla.',
    en: 'A giant deer crossed the screen.',
  },
  insomnia: {
    es: '¿No puedes dormir? Yo tampoco.',
    en: "Can't sleep? Me neither.",
  },
};

function HeroPokes() {
  const { skin, lang } = useSite();
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setOverlay(null);
    setToast(null);

    let count = 0;
    let resetTimer: ReturnType<typeof setTimeout> | undefined;
    let endTimer: ReturnType<typeof setTimeout> | undefined;

    const fire = (kind: Exclude<Overlay, null>, ms: number) => {
      const message = MESSAGES[kind][lang];
      if (reducedMotion()) {
        setToast(message);
        endTimer = setTimeout(() => setToast(null), 4000);
        return;
      }
      setOverlay(kind);
      if (kind === 'insomnia') setToast(message);
      endTimer = setTimeout(() => {
        setOverlay(null);
        setToast(null);
      }, ms);
    };

    const onClick = (event: MouseEvent) => {
      const photo = (event.target as HTMLElement).closest<HTMLElement>('[data-hero-photo]');
      if (!photo) return;

      const list = SKINS[skin].sfx;
      spawnBurst(list[Math.floor(Math.random() * list.length)], event.clientX, event.clientY);

      if (skin === 'nichijou' && !reducedMotion()) {
        photo.classList.remove('nichijou-boing');
        void photo.offsetWidth;
        photo.classList.add('nichijou-boing');
      }

      count += 1;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        count = 0;
      }, 1800);

      if (count < 5) return;
      count = 0;

      if (skin === 'persona') fire('allout', 1900);
      if (skin === 'nichijou') fire('deer', 7200);
      if (skin === 'yofukashi') fire('insomnia', 6000);
    };

    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
      clearTimeout(resetTimer);
      clearTimeout(endTimer);
    };
  }, [skin, lang]);

  return (
    <>
      {overlay === 'allout' ? (
        <div className="allout" aria-hidden="true">
          <span className="allout-text">ALL-OUT ATTACK!</span>
        </div>
      ) : null}

      {overlay === 'deer' ? (
        <div className="deer-walk" aria-hidden="true">
          <span className="deer-bob block h-[1em] w-[1em]">
            <SkinMotif skin="nichijou" className="h-full w-full" />
          </span>
        </div>
      ) : null}

      {overlay === 'insomnia' ? <div className="shooting-star" aria-hidden="true" /> : null}

      {toast ? (
        <div
          role="status"
          className="fixed bottom-4 left-1/2 z-[70] w-[min(92vw,360px)] -translate-x-1/2 border-2 border-[color:var(--line)] bg-[var(--pn)] p-3 text-center text-sm text-[var(--ink)] shadow-[5px_5px_0_var(--acc)]"
        >
          {toast}
        </div>
      ) : null}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Toga: splats and heart rain                                         */
/* ------------------------------------------------------------------ */

type SplatDropKind = 'dot' | 'drop' | 'streak';

interface SplatDrop {
  id: number;
  kind: SplatDropKind;
  x: number;
  y: number;
  angle: number;
  size: number;
  stretch: number;
  opacity: number;
  delay: number;
}

interface SplatSpeckle {
  x: number;
  y: number;
  rx: number;
  ry: number;
  angle: number;
  dark: boolean;
  opacity: number;
}

interface SplatDrip {
  d: string;
  glintX: number;
  glintY: number;
  glintR: number;
}

interface Splat {
  id: number;
  x: number;
  y: number;
  radius: number;
  blob: string;
  drops: SplatDrop[];
  speckles: SplatSpeckle[];
  drips: SplatDrip[];
}

interface Heart {
  id: number;
  left: number;
  delay: number;
  size: number;
  duration: number;
}

const DROP_SHAPE =
  'M0 -1C0.32 -0.45 0.58 -0.02 0.58 0.34C0.58 0.72 0.32 1 0 1C-0.32 1 -0.58 0.72 -0.58 0.34C-0.58 -0.02 -0.32 -0.45 0 -1Z';
const STREAK_SHAPE =
  'M0 -1C0.18 -0.5 0.2 -0.05 0.5 0.35C0.7 0.62 0.55 0.95 0 0.95C-0.55 0.95 -0.7 0.62 -0.5 0.35C-0.2 -0.05 -0.18 -0.5 0 -1Z';

function catmullRomClosed(points: Array<{ x: number; y: number }>) {
  const total = points.length;
  let d = `M${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;

  for (let index = 0; index < total; index++) {
    const previous = points[(index - 1 + total) % total];
    const current = points[index];
    const next = points[(index + 1) % total];
    const after = points[(index + 2) % total];
    const controlOneX = current.x + (next.x - previous.x) / 6;
    const controlOneY = current.y + (next.y - previous.y) / 6;
    const controlTwoX = next.x - (after.x - current.x) / 6;
    const controlTwoY = next.y - (after.y - current.y) / 6;
    d += `C${controlOneX.toFixed(2)} ${controlOneY.toFixed(2)} ${controlTwoX.toFixed(2)} ${controlTwoY.toFixed(2)} ${next.x.toFixed(2)} ${next.y.toFixed(2)}`;
  }

  return `${d}Z`;
}

function buildSplat(id: number, x: number, y: number): Splat {
  const radius = 20 + Math.random() * 8;
  const pointCount = 12 + Math.floor(Math.random() * 5);
  const shuffled = Array.from({ length: pointCount }, (_, index) => index).sort(
    () => Math.random() - 0.5
  );
  const spikeCount = 2 + Math.floor(Math.random() * 3);
  const notchCount = Math.random() < 0.55 ? 1 : 0;
  const spikes = new Set(shuffled.slice(0, spikeCount));
  const notches = new Set(shuffled.slice(spikeCount, spikeCount + notchCount));
  const lobes = new Set(shuffled.slice(spikeCount + notchCount, spikeCount + notchCount + 2));

  const impactAngle = Math.random() * Math.PI * 2;
  const impactStretch = 1.08 + Math.random() * 0.12;
  const impactCos = Math.cos(impactAngle);
  const impactSin = Math.sin(impactAngle);

  const points = Array.from({ length: pointCount }, (_, index) => {
    const angle = (index / pointCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.18;
    let reach = 0.72 + Math.random() * 0.3;
    if (spikes.has(index)) reach = 1.15 + Math.random() * 0.28;
    else if (notches.has(index)) reach = 0.52 + Math.random() * 0.12;
    else if (lobes.has(index)) reach = 1.0 + Math.random() * 0.14;

    const rawX = Math.cos(angle) * radius * reach;
    const rawY = Math.sin(angle) * radius * reach;
    const along = (rawX * impactCos + rawY * impactSin) * impactStretch;
    const across = -rawX * impactSin + rawY * impactCos;

    return {
      x: along * impactCos - across * impactSin,
      y: along * impactSin + across * impactCos,
    };
  });

  const drops: SplatDrop[] = [];
  const lobeDrops = 1 + Math.floor(Math.random() * 2);
  for (let index = 0; index < lobeDrops; index++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = radius * (0.72 + Math.random() * 0.22);
    drops.push({
      id: drops.length,
      kind: 'drop',
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      angle: (angle * 180) / Math.PI + 90,
      size: 3.8 + Math.random() * 2.6,
      stretch: 1,
      opacity: 0.9 + Math.random() * 0.1,
      delay: 40 + Math.random() * 70,
    });
  }

  const dropCount = 7 + Math.floor(Math.random() * 4);
  for (let index = 0; index < dropCount; index++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = radius * (1.08 + Math.random() * 0.75);
    const roll = Math.random();
    const kind: SplatDropKind = roll < 0.4 ? 'dot' : roll < 0.76 ? 'drop' : 'streak';
    drops.push({
      id: drops.length,
      kind,
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      angle: (angle * 180) / Math.PI + 90,
      size:
        kind === 'streak'
          ? 0.9 + Math.random() * 0.9
          : kind === 'drop'
            ? 1.8 + Math.random() * 2.6
            : 1.2 + Math.random() * 2.6,
      stretch: kind === 'streak' ? 4.5 + Math.random() * 6 : 1,
      opacity: 0.72 + Math.random() * 0.28,
      delay: 60 + Math.random() * 150,
    });
  }

  const mistCount = 5 + Math.floor(Math.random() * 4);
  for (let index = 0; index < mistCount; index++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = radius * (1.55 + Math.random() * 0.7);
    drops.push({
      id: drops.length,
      kind: 'dot',
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      angle: 0,
      size: 0.6 + Math.random() * 0.8,
      stretch: 1,
      opacity: 0.35 + Math.random() * 0.3,
      delay: 100 + Math.random() * 180,
    });
  }

  const edgeCount = 4 + Math.floor(Math.random() * 3);
  for (let index = 0; index < edgeCount; index++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = radius * (0.92 + Math.random() * 0.2);
    const isDrop = Math.random() < 0.45;
    drops.push({
      id: drops.length,
      kind: isDrop ? 'drop' : 'dot',
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      angle: (angle * 180) / Math.PI + 90,
      size: isDrop ? 1.1 + Math.random() * 1.3 : 0.8 + Math.random() * 1.2,
      stretch: 1,
      opacity: 0.8 + Math.random() * 0.2,
      delay: 30 + Math.random() * 90,
    });
  }

  const speckleCount = 9 + Math.floor(Math.random() * 7);
  const speckles: SplatSpeckle[] = Array.from({ length: speckleCount }, () => {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.sqrt(Math.random()) * radius * 0.7;
    const rx = 0.6 + Math.random() * 1.7;
    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
      rx,
      ry: Math.random() < 0.3 ? rx * (1.8 + Math.random() * 1.6) : rx,
      angle: Math.random() * 180,
      dark: Math.random() < 0.62,
      opacity: 0.24 + Math.random() * 0.42,
    };
  });

  const drips: SplatDrip[] = [];
  const dripCount = Math.random() < 0.25 ? 2 : Math.random() < 0.72 ? 1 : 0;
  const sortedPoints = [...points].sort((first, second) => second.y - first.y);
  for (let index = 0; index < dripCount; index++) {
    const anchor = sortedPoints[Math.min(index * 2, sortedPoints.length - 1)];
    const dripX = Math.max(-radius * 0.6, Math.min(radius * 0.6, anchor.x * 0.7));
    const startY = anchor.y - radius * 0.14;
    const length =
      radius * (index === 0 ? 0.45 + Math.random() * 0.45 : 0.32 + Math.random() * 0.3);
    const width = 2.0 + Math.random() * 1.4;
    const bend = (Math.random() - 0.5) * 3.2;
    const wave = (Math.random() - 0.5) * 2.4;
    const geometry = dripGeometry(dripX, startY, length, width, bend, wave);
    drips.push({
      d: geometry.d,
      glintX: geometry.bulbX - geometry.bulbR * 0.3,
      glintY: geometry.bulbY - geometry.bulbR * 0.36,
      glintR: geometry.bulbR * 0.27,
    });
  }

  return { id, x, y, radius, blob: catmullRomClosed(points), drops, speckles, drips };
}

// Keep the page readable: never render more than six click splats at once.
const MAX_TOGA_SPLATS = 6;

function TogaEggs() {
  const [splats, setSplats] = useState<Splat[]>([]);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const timers: Array<ReturnType<typeof setTimeout>> = [];

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      if ((event.target as HTMLElement).closest(INTERACTIVE)) return;

      const id = ++nextId.current;
      setSplats((previous) => [
        ...previous.slice(-(MAX_TOGA_SPLATS - 1)),
        buildSplat(id, event.clientX, event.clientY),
      ]);
      timers.push(setTimeout(() => setSplats((p) => p.filter((s) => s.id !== id)), 1950));
    };

    let buffer = '';
    const onKeyDown = (event: KeyboardEvent) => {
      if (isEditable(event.target) || event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.key.length !== 1) return;

      buffer = (buffer + event.key.toLowerCase()).slice(-7);
      if (buffer !== 'muejeje') return;
      buffer = '';

      if (reducedMotion()) return;
      setHearts(
        Array.from({ length: 18 }, () => ({
          id: ++nextId.current,
          left: Math.random() * 96,
          delay: Math.random() * 1.2,
          size: 22 + Math.random() * 30,
          duration: 2.6 + Math.random() * 1.8,
        }))
      );
      timers.push(setTimeout(() => setHearts([]), 5200));
    };

    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      {splats.map((splat) => (
        <svg
          key={splat.id}
          className="toga-splat"
          style={{ left: splat.x - 80, top: splat.y - 80 }}
          viewBox="-80 -80 160 160"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id={`toga-blood-${splat.id}`} cx="34%" cy="26%" r="84%">
              <stop offset="0%" stopColor="#e23a53" />
              <stop offset="20%" stopColor="#c01733" />
              <stop offset="52%" stopColor="#961026" />
              <stop offset="78%" stopColor="#6a0719" />
              <stop offset="100%" stopColor="#34010c" />
            </radialGradient>
            <radialGradient id={`toga-shine-${splat.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="55%" stopColor="#ffb9c2" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#ffb9c2" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`toga-shade-${splat.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#240006" stopOpacity="0.55" />
              <stop offset="70%" stopColor="#240006" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#240006" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`toga-impact-${splat.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffd7dc" stopOpacity="0.75" />
              <stop offset="35%" stopColor="#ff5a70" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#d21f3c" stopOpacity="0" />
            </radialGradient>
            <clipPath id={`toga-clip-${splat.id}`}>
              <path d={splat.blob} />
            </clipPath>
          </defs>

          <g transform="scale(1.32)">
            <path
              className="toga-splat-ring"
              d={splat.blob}
              fill="none"
              stroke="#e62d4b"
              strokeWidth="0.7"
              strokeLinejoin="round"
            />
          </g>

          <circle
            className="toga-splat-impact"
            r={splat.radius * 0.8}
            fill={`url(#toga-impact-${splat.id})`}
          />

          {splat.drips.map((drip, index) => (
            <g
              key={index}
              className="toga-splat-drip"
              fill={`url(#toga-blood-${splat.id})`}
              style={{ animationDelay: `${60 + index * 70}ms` }}
            >
              <path d={drip.d} stroke="#470310" strokeWidth="0.7" strokeLinejoin="round" />
              <ellipse
                cx={drip.glintX}
                cy={drip.glintY}
                rx={drip.glintR}
                ry={drip.glintR * 0.78}
                fill="#ff9daa"
                opacity="0.5"
              />
            </g>
          ))}

          {splat.drops.map((drop) => (
            <g
              key={drop.id}
              transform={`translate(${drop.x.toFixed(2)} ${drop.y.toFixed(2)}) rotate(${drop.angle.toFixed(1)})`}
              opacity={drop.opacity}
            >
              {drop.kind === 'dot' ? (
                <circle
                  className="toga-splat-drop"
                  r={drop.size}
                  fill={`url(#toga-blood-${splat.id})`}
                  stroke="#470310"
                  strokeWidth="0.6"
                  style={{ animationDelay: `${drop.delay}ms` }}
                />
              ) : (
                <g
                  transform={`scale(${drop.kind === 'drop' ? drop.size : drop.size * 0.75} ${drop.kind === 'drop' ? drop.size : drop.stretch})`}
                >
                  <path
                    className="toga-splat-drop"
                    d={drop.kind === 'drop' ? DROP_SHAPE : STREAK_SHAPE}
                    fill={`url(#toga-blood-${splat.id})`}
                    stroke="#470310"
                    strokeWidth="0.6"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    style={{ animationDelay: `${drop.delay}ms` }}
                  />
                </g>
              )}
            </g>
          ))}

          <g className="toga-splat-blob">
            <path
              d={splat.blob}
              fill={`url(#toga-blood-${splat.id})`}
              stroke="#3a020d"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <g clipPath={`url(#toga-clip-${splat.id})`}>
              <ellipse
                cx={splat.radius * 0.34}
                cy={splat.radius * 0.42}
                rx={splat.radius * 0.72}
                ry={splat.radius * 0.55}
                fill={`url(#toga-shade-${splat.id})`}
              />
              <ellipse
                cx={-splat.radius * 0.34}
                cy={-splat.radius * 0.42}
                rx={splat.radius * 0.5}
                ry={splat.radius * 0.32}
                transform={`rotate(-24 ${-splat.radius * 0.34} ${-splat.radius * 0.42})`}
                fill={`url(#toga-shine-${splat.id})`}
              />
              <path
                d={splat.blob}
                fill="none"
                stroke="#ff8a9a"
                strokeOpacity="0.18"
                strokeWidth="0.7"
                transform="scale(0.94)"
              />
              {splat.speckles.map((speckle, index) => (
                <ellipse
                  key={index}
                  cx={speckle.x}
                  cy={speckle.y}
                  rx={speckle.rx}
                  ry={speckle.ry}
                  transform={`rotate(${speckle.angle} ${speckle.x} ${speckle.y})`}
                  fill={speckle.dark ? '#3f020e' : '#ff9daa'}
                  opacity={speckle.opacity}
                />
              ))}
            </g>
          </g>
        </svg>
      ))}

      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="toga-rain"
          aria-hidden="true"
          style={{
            left: `${heart.left}%`,
            fontSize: heart.size,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          恋
        </span>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Kill la Kill: double click slashes the page                         */
/* ------------------------------------------------------------------ */

function SlashEgg() {
  const [slashes, setSlashes] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const timers: Array<ReturnType<typeof setTimeout>> = [];

    const onDoubleClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest(INTERACTIVE)) return;

      const id = ++nextId.current;
      setSlashes((previous) => [...previous.slice(-2), { id, x: event.clientX, y: event.clientY }]);
      spawnBurst('ザンッ!', event.clientX, event.clientY - 30);
      timers.push(setTimeout(() => setSlashes((p) => p.filter((s) => s.id !== id)), 900));

      if (!reducedMotion()) {
        const main = document.getElementById('main-content');
        if (main) {
          main.classList.remove('klk-shake');
          void main.offsetWidth;
          main.classList.add('klk-shake');
          timers.push(setTimeout(() => main.classList.remove('klk-shake'), 300));
        }
      }
    };

    document.addEventListener('dblclick', onDoubleClick);
    return () => {
      document.removeEventListener('dblclick', onDoubleClick);
      timers.forEach(clearTimeout);
    };
  }, []);

  const ANGLE = (-28 * Math.PI) / 180;
  const REACH = 3000;

  return (
    <>
      {slashes.map((slash) => {
        const dx = Math.cos(ANGLE) * REACH;
        const dy = Math.sin(ANGLE) * REACH;
        return (
          <svg key={slash.id} className="klk-slash" aria-hidden="true">
            <line
              x1={slash.x - dx}
              y1={slash.y - dy}
              x2={slash.x + dx}
              y2={slash.y + dy}
              pathLength={1}
              stroke="var(--acc2)"
              strokeWidth={9}
              strokeLinecap="round"
            />
            <line
              x1={slash.x - dx}
              y1={slash.y - dy}
              x2={slash.x + dx}
              y2={slash.y + dy}
              pathLength={1}
              stroke="#ffffff"
              strokeWidth={3}
              strokeLinecap="round"
            />
          </svg>
        );
      })}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Dregxmoon: a small working terminal                                  */
/* ------------------------------------------------------------------ */

const SYNODIC_DAYS = 29.530588853;
const REFERENCE_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);

function moonSnapshot() {
  const days = (Date.now() - REFERENCE_NEW_MOON) / 86_400_000;
  const phase = (((days % SYNODIC_DAYS) + SYNODIC_DAYS) % SYNODIC_DAYS) / SYNODIC_DAYS;
  const lit = Math.round(((1 - Math.cos(2 * Math.PI * phase)) / 2) * 100);
  return { phase, lit };
}

function moonName(phase: number, es: boolean): string {
  if (phase < 0.03 || phase > 0.97) return es ? 'nueva' : 'new';
  if (phase < 0.22) return es ? 'creciente' : 'waxing crescent';
  if (phase < 0.28) return es ? 'cuarto creciente' : 'first quarter';
  if (phase < 0.47) return es ? 'creciente gibosa' : 'waxing gibbous';
  if (phase < 0.53) return es ? 'llena' : 'full';
  if (phase < 0.72) return es ? 'menguante gibosa' : 'waning gibbous';
  if (phase < 0.78) return es ? 'cuarto menguante' : 'last quarter';
  return es ? 'menguante' : 'waning crescent';
}

function DregTerminal() {
  const { lang, skin, setSkin, availableSkins } = useSite();
  const es = lang === 'es';
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (event.key !== '`' || isEditable(event.target)) return;
      event.preventDefault();
      setOpen((previous) => !previous);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    setLines((previous) =>
      previous.length
        ? previous
        : [es ? 'dregxmoon terminal. Escribe help.' : 'dregxmoon terminal. Type help.']
    );
    inputRef.current?.focus();
  }, [open, es]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [lines, open]);

  const run = (raw: string) => {
    const input = raw.trim();
    if (!input) return;

    const [command, ...args] = input.split(/\s+/);
    const out: string[] = [`$ ${input}`];

    switch (command.toLowerCase()) {
      case 'help':
        out.push('help  whoami  projects  skins  skin <id>  moon  neofetch  sudo  konami  clear  exit');
        break;
      case 'whoami':
        out.push(
          es
            ? 'luka torres | estudiante de ing. en sistemas | tijuana, mx | alias: dregxmoon'
            : 'luka torres | systems engineering student | tijuana, mx | alias: dregxmoon'
        );
        break;
      case 'projects':
        PROJECTS_DATA.forEach((project) => out.push(`${project.id.padEnd(12)} ${project.title}`));
        break;
      case 'skins':
        out.push(availableSkins.join('  '));
        break;
      case 'skin': {
        const id = args[0];
        if (isSkinId(id) && availableSkins.includes(id)) {
          setSkin(id);
          out.push(`skin: ${id}`);
        } else {
          out.push(
            es
              ? `skin desconocida. Opciones: ${SKIN_ORDER.filter((s) => availableSkins.includes(s)).join(', ')}`
              : `unknown skin. Options: ${SKIN_ORDER.filter((s) => availableSkins.includes(s)).join(', ')}`
          );
        }
        break;
      }
      case 'konami':
        out.push('up up down down left right left right b a');
        break;
      case 'moon': {
        const { phase, lit } = moonSnapshot();
        out.push(
          es
            ? `luna: ${lit}% iluminada · ${moonName(phase, true)}`
            : `moon: ${lit}% lit · ${moonName(phase, false)}`
        );
        out.push('  ▗▄▖\n ▐███▌\n  ▝▀▘');
        break;
      }
      case 'neofetch':
        out.push(
          'luka@dregxmoon',
          '----------------',
          'OS: Portfolio 2026',
          'Host: Tijuana, MX',
          'Shell: zsh',
          'Stack: Next.js / React / TypeScript',
          `Skin: ${skin}`,
          'Locale: es-MX / en'
        );
        break;
      case 'sudo':
        out.push(
          es
            ? 'nice try. Este terminal es de solo lectura.'
            : 'nice try. This terminal is read-only.'
        );
        break;
      case 'clear':
        setLines([]);
        return;
      case 'exit':
        setLines((previous) => [...previous, ...out]);
        setOpen(false);
        return;
      default:
        out.push(
          es
            ? `comando no encontrado: ${command}. Escribe help.`
            : `command not found: ${command}. Type help.`
        );
    }

    setLines((previous) => [...previous, ...out]);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-label={es ? 'Terminal' : 'Terminal'}
      className="dreg-terminal fixed inset-x-0 bottom-0 z-[80] border-t-2 border-[var(--acc)] bg-black/95 font-mono text-xs text-[#1be6ff] sm:text-sm"
    >
      <div ref={logRef} className="mx-auto h-44 max-w-[1120px] overflow-y-auto px-4 py-3" aria-live="polite">
        {lines.map((line, index) => (
          <p key={index} className="m-0 whitespace-pre-wrap leading-relaxed">
            {line}
          </p>
        ))}
      </div>
      <form
        className="mx-auto flex max-w-[1120px] items-center gap-2 border-t border-[#1be6ff]/30 px-4 py-2"
        onSubmit={(event) => {
          event.preventDefault();
          run(value);
          setValue('');
        }}
      >
        <label htmlFor="dreg-input" className="sr-only">
          {es ? 'Comando' : 'Command'}
        </label>
        <span aria-hidden="true">$</span>
        <input
          id="dreg-input"
          ref={inputRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          className="min-h-[32px] flex-1 border-0 bg-transparent text-[#1be6ff] outline-none placeholder:text-[#1be6ff]/40"
          placeholder="help"
        />
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="min-h-[32px] px-2 text-[#1be6ff]/70 hover:text-[#1be6ff]"
          aria-label={es ? 'Cerrar terminal' : 'Close terminal'}
        >
          esc
        </button>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function SkinEggs() {
  const { skin } = useSite();

  return (
    <>
      <HeroPokes />
      {skin === 'toga' ? <TogaEggs /> : null}
      {skin === 'killlakill' ? <SlashEgg /> : null}
      {skin === 'dregxmoon' ? <DregTerminal /> : null}
    </>
  );
}
