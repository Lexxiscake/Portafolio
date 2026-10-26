'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSite } from '@/context/site-context';
import { PROJECTS_DATA } from '@/lib/constants';
import { SKIN_ORDER, SKINS, isSkinId } from '@/lib/skins';

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
          <span className="deer-bob">鹿</span>
        </div>
      ) : null}

      {overlay === 'insomnia' ? <div className="shooting-star" aria-hidden="true" /> : null}

      {toast ? (
        <div
          role="status"
          className="fixed bottom-4 left-1/2 z-[70] w-[min(92vw,360px)] -translate-x-1/2 border-2 border-black bg-[var(--pn)] p-3 text-center text-sm text-[var(--ink)] shadow-[5px_5px_0_var(--acc)] dark:border-white/30"
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

interface Splat {
  id: number;
  x: number;
  y: number;
  size: number;
  dots: Array<{ dx: number; dy: number; r: number }>;
}

interface Heart {
  id: number;
  left: number;
  delay: number;
  size: number;
  duration: number;
}

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
      const count = 6 + Math.floor(Math.random() * 5);
      const dots = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 10 + Math.random() * 26;
        return {
          dx: Math.cos(angle) * distance,
          dy: Math.sin(angle) * distance,
          r: 2 + Math.random() * 6,
        };
      });

      setSplats((previous) => [
        ...previous.slice(-11),
        { id, x: event.clientX, y: event.clientY, size: 10 + Math.random() * 8, dots },
      ]);
      timers.push(setTimeout(() => setSplats((p) => p.filter((s) => s.id !== id)), 3600));
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
          style={{ left: splat.x - 48, top: splat.y - 48 }}
          viewBox="-48 -48 96 96"
          aria-hidden="true"
        >
          <circle r={splat.size} fill="var(--acc)" />
          {splat.dots.map((dot, index) => (
            <circle key={index} cx={dot.dx} cy={dot.dy} r={dot.r} fill="var(--acc)" />
          ))}
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

function DregTerminal() {
  const { lang, setSkin, availableSkins, toggleTheme } = useSite();
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
        out.push('help  whoami  projects  skins  skin <id>  theme  konami  clear  exit');
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
      case 'theme':
        toggleTheme();
        out.push(es ? 'tema alternado' : 'theme toggled');
        break;
      case 'konami':
        out.push('up up down down left right left right b a');
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
