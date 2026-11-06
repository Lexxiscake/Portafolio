'use client';

/**
 * Yofukashi no Uta — skin effects
 *
 * Exports:
 *   YofukashiStars      – fixed ✦ stars with staggered blink
 *   YofukashiBats       – bat swarm on clicks + moon click
 *   YofukashiShin       – "しん…" silence text (rendered inside hero)
 *   YofukashiClock      – "3:07 AM" with blinking colon (rendered inside marquee string)
 *   YofukashiCursor     – subtle ✦ cursor sparkle trail (desktop only)
 *   YofukashiSky        – re-exports Sky with scroll-reactive moon + bat trigger
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────────────────────────── */
/* Utilities                                                           */
/* ─────────────────────────────────────────────────────────────────── */

function reducedMotion() {
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const INTERACTIVE =
  'a, button, input, textarea, select, label, summary, [role="button"], .btn-manga';

/* ─────────────────────────────────────────────────────────────────── */
/* ✦ Stars                                                             */
/* ─────────────────────────────────────────────────────────────────── */

interface StarDef {
  id: number;
  top: string;
  left: string;
  size: 'sm' | 'md' | 'lg';
  delay: string;
  duration: string;
}

const STARS: StarDef[] = [
  { id: 1, top: '7%',  left: '5%',  size: 'sm', delay: '0s',    duration: '3.8s' },
  { id: 2, top: '14%', left: '22%', size: 'md', delay: '1.1s',  duration: '4.5s' },
  { id: 3, top: '9%',  left: '48%', size: 'sm', delay: '2.3s',  duration: '3.2s' },
  { id: 4, top: '18%', left: '68%', size: 'lg', delay: '0.6s',  duration: '5.1s' },
  { id: 5, top: '5%',  left: '85%', size: 'sm', delay: '3.0s',  duration: '4.0s' },
  { id: 6, top: '28%', left: '12%', size: 'md', delay: '1.7s',  duration: '3.6s' },
  { id: 7, top: '32%', left: '78%', size: 'sm', delay: '2.8s',  duration: '4.8s' },
  { id: 8, top: '42%', left: '92%', size: 'md', delay: '0.2s',  duration: '3.9s' },
  { id: 9, top: '55%', left: '3%',  size: 'sm', delay: '1.5s',  duration: '5.5s' },
  { id: 10, top: '62%', left: '35%', size: 'lg', delay: '3.4s', duration: '4.2s' },
  { id: 11, top: '71%', left: '58%', size: 'sm', delay: '0.9s', duration: '3.4s' },
  { id: 12, top: '80%', left: '80%', size: 'md', delay: '2.1s', duration: '4.7s' },
  { id: 13, top: '88%', left: '15%', size: 'sm', delay: '1.3s', duration: '3.1s' },
  { id: 14, top: '92%', left: '44%', size: 'md', delay: '2.6s', duration: '5.2s' },
];

const SIZE_CLASS: Record<StarDef['size'], string> = {
  sm: 'yofu-star yofu-star--sm',
  md: 'yofu-star',
  lg: 'yofu-star yofu-star--lg',
};

export function YofukashiStars() {
  return (
    <>
      {STARS.map((s) => (
        <span
          key={s.id}
          className={SIZE_CLASS[s.size]}
          aria-hidden="true"
          style={{
            top: s.top,
            left: s.left,
            animationDelay: s.delay,
            animationDuration: s.duration,
          }}
        >
          ✦
        </span>
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* 🦇 Bats                                                             */
/* ─────────────────────────────────────────────────────────────────── */

/* Three flat SVG bat silhouettes */
const BAT_PATHS = [
  // Variant A: classic symmetrical
  'M16 8 C12 2, 2 2, 0 8 C2 11, 6 12, 8 10 C9 13, 8 16, 8 16 C8 16, 8 13, 8 10 C10 12, 14 11, 16 8Z',
  // Variant B: angular, 3 wing points
  'M16 9 C13 3, 4 0, 0 7 C3 12, 7 11, 8 9 C9 11, 13 13, 16 9Z',
  // Variant C: wider span
  'M18 7 C14 1, 3 1, 0 7 C3 10, 6 11, 9 9 C10 12, 9 16, 9 16 L9 9 C12 11, 15 10, 18 7Z',
];

interface BatInstance {
  id: number;
  x: number;
  y: number;
  pathIndex: number;
  size: 'sm' | 'md' | 'lg';
  tx: number;
  ty: number;
  dur: number;
}

const SIZE_W: Record<BatInstance['size'], number> = { sm: 22, md: 32, lg: 44 };
const SIZE_H: Record<BatInstance['size'], number> = { sm: 14, md: 20, lg: 28 };
const SIZE_VB: Record<BatInstance['size'], string> = {
  sm: '0 0 16 16', md: '0 0 16 16', lg: '0 0 18 16',
};

function spawnBats(
  x: number,
  y: number,
  count: number,
  nextId: React.MutableRefObject<number>,
): BatInstance[] {
  return Array.from({ length: count }, () => {
    const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.2;
    const dist = 180 + Math.random() * 160;
    const sizes: BatInstance['size'][] = ['sm', 'md', 'lg'];
    return {
      id: ++nextId.current,
      x,
      y,
      pathIndex: Math.floor(Math.random() * BAT_PATHS.length),
      size: sizes[Math.floor(Math.random() * sizes.length)],
      tx: Math.cos(angle) * dist + (Math.random() - 0.5) * 60,
      ty: Math.sin(angle) * dist - Math.random() * 40,
      dur: 1.1 + Math.random() * 0.7,
    };
  });
}

const MAX_BATS = 6;

interface YofukashiBatsProps {
  /** External trigger: spawn bats at given screen coords (moon click) */
  moonClick?: { x: number; y: number; seq: number } | null;
}

export function YofukashiBats({ moonClick }: YofukashiBatsProps) {
  const [bats, setBats] = useState<BatInstance[]>([]);
  const nextId = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const spawn = useCallback(
    (x: number, y: number, count: number) => {
      if (reducedMotion()) return;
      const newBats = spawnBats(x, y, count, nextId);
      setBats((prev) => {
        const combined = [...prev, ...newBats].slice(-MAX_BATS);
        return combined;
      });
      newBats.forEach((bat) => {
        const t = setTimeout(
          () => setBats((p) => p.filter((b) => b.id !== bat.id)),
          (bat.dur + 0.1) * 1000,
        );
        timers.current.push(t);
      });
    },
    [],
  );

  // Moon click: spawn 3-5 bats
  useEffect(() => {
    if (!moonClick) return;
    spawn(moonClick.x, moonClick.y, 3 + Math.floor(Math.random() * 3));
  }, [moonClick, spawn]);

  // Page click (not on interactive): 1-2 bats
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      if ((e.target as HTMLElement).closest(INTERACTIVE)) return;
      if ((e.target as HTMLElement).closest('.sky-moon')) return; // handled by moonClick
      spawn(e.clientX, e.clientY, 1 + Math.floor(Math.random() * 2));
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      timers.current.forEach(clearTimeout);
    };
  }, [spawn]);

  return (
    <>
      {bats.map((bat) => {
        const w = SIZE_W[bat.size];
        const h = SIZE_H[bat.size];
        const vb = bat.pathIndex === 2 ? SIZE_VB.lg : SIZE_VB.md;
        return (
          <svg
            key={bat.id}
            className={`yofu-bat yofu-bat--${bat.size}`}
            style={{
              left: bat.x - w / 2,
              top: bat.y - h / 2,
              width: w,
              height: h,
              '--tx': `${bat.tx}px`,
              '--ty': `${bat.ty}px`,
              '--dur': `${bat.dur}s`,
            } as React.CSSProperties}
            viewBox={vb}
            aria-hidden="true"
          >
            <g className="yofu-bat-wings">
              <path
                d={BAT_PATHS[bat.pathIndex]}
                fill="#0b0a1f"
                stroke="#a78bfa"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        );
      })}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* しん… silence text                                                  */
/* ─────────────────────────────────────────────────────────────────── */

export function YofukashiShin() {
  return (
    <span className="yofu-shin" aria-hidden="true">
      しん…
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* 3:07 AM clock — inline JSX fragment for marquee                     */
/* ─────────────────────────────────────────────────────────────────── */

export function YofukashiClockSegment() {
  return (
    <span aria-label="3:07 AM">
      {'3'}
      <span className="yofu-clock-blink">:</span>
      {'07 AM'}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* Cursor sparkle trail (desktop only)                                 */
/* ─────────────────────────────────────────────────────────────────── */

interface Spark {
  id: number;
  x: number;
  y: number;
}

export function YofukashiCursor() {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const nextId = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const lastSpawn = useRef(0);

  useEffect(() => {
    // Desktop only
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (reducedMotion()) return;

    const onMove = (e: PointerEvent) => {
      const now = Date.now();
      if (now - lastSpawn.current < 80) return; // throttle ~12fps
      lastSpawn.current = now;

      const id = ++nextId.current;
      setSparks((prev) => [...prev.slice(-12), { id, x: e.clientX, y: e.clientY }]);
      const t = setTimeout(() => setSparks((p) => p.filter((s) => s.id !== id)), 600);
      timers.current.push(t);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      timers.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <>
      {sparks.map((spark) => (
        <span
          key={spark.id}
          className="yofu-spark"
          aria-hidden="true"
          style={{ left: spark.x, top: spark.y }}
        >
          ✦
        </span>
      ))}
    </>
  );
}
