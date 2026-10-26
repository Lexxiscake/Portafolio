'use client';

import React from 'react';
import { useSite } from '@/context/site-context';
import { OTAKU_ENTRIES } from '@/lib/otaku';
import { SKINS } from '@/lib/skins';

export default function OtakuPage() {
  const { lang, skin, setSkin, availableSkins } = useSite();
  const es = lang === 'es';
  const secretUnlocked = availableSkins.includes('dregxmoon');

  return (
    <main className="mx-auto max-w-[1120px] px-6 pb-16 pt-12 sm:px-8">
      <header className="mb-10 max-w-2xl">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--acc)]">
          {es ? '/ otaku' : '/ otaku'}
        </p>
        <h1 className="font-display text-[clamp(40px,7vw,76px)] italic uppercase leading-[0.95]">
          {es ? 'Mi lado otaku' : 'My otaku side'}
        </h1>
        <p className="mt-4 text-base text-[var(--mut)]">
          {es
            ? 'Cada skin de este sitio sale de algo que me gusta. Elige una y mira cómo cambian los colores, los efectos y los sonidos de los botones.'
            : 'Every skin on this site comes from something I like. Pick one and watch the colors, effects, and button sounds change.'}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {OTAKU_ENTRIES.map((entry) => {
          const active = skin === entry.skin;

          return (
            <article
              key={entry.id}
              className="otaku-card flex flex-col border-2 border-[color:var(--line)] bg-[var(--pn)] p-5 shadow-[6px_6px_0_var(--acc)]"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-display text-3xl italic uppercase leading-none">
                  {entry.title}
                </h2>
                <span className="otaku-kanji font-kanji text-xl leading-none text-[var(--acc)]" lang="ja">
                  {entry.jp}
                </span>
              </div>

              <p className="mt-2 font-mono text-[11px] text-[var(--mut)]">{entry.kind[lang]}</p>
              <p className="mt-3 text-sm leading-relaxed">{entry.about[lang]}</p>

              <div className="mt-3 border-l-2 border-[var(--acc)] bg-[var(--wash)] px-3 py-2">
                <span className="block font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--acc)]">
                  {es ? 'lo que tomé para el sitio' : 'what I took for the site'}
                </span>
                <span className="mt-0.5 block text-sm leading-snug">{entry.borrowed[lang]}</span>
              </div>

              {entry.why ? (
                <p className="mt-3 text-sm leading-relaxed text-[var(--mut)]">{entry.why[lang]}</p>
              ) : null}

              <div className="mt-auto pt-5">
                <button
                  type="button"
                  onClick={() => setSkin(entry.skin)}
                  aria-pressed={active}
                  className={`btn-manga font-display text-sm ${active ? 'hot' : ''}`}
                >
                  {active
                    ? es
                      ? 'Skin activa'
                      : 'Skin active'
                    : es
                      ? `Usar skin ${SKINS[entry.skin].label}`
                      : `Use ${SKINS[entry.skin].label} skin`}
                </button>
              </div>
            </article>
          );
        })}

        {secretUnlocked ? (
          <article className="otaku-card flex flex-col border-2 border-dashed border-[color:var(--line)] bg-[var(--pn)] p-5">
            <h2 className="font-display text-3xl italic uppercase leading-none">Dregxmoon</h2>
            <p className="mt-3 text-sm leading-relaxed">
              {es
                ? 'Skin secreta con mi alias en línea: cian sobre negro, luna y líneas de escaneo.'
                : 'Secret skin named after my online alias: cyan on black, a moon, and scanlines.'}
            </p>
            <div className="mt-auto pt-5">
              <button
                type="button"
                onClick={() => setSkin('dregxmoon')}
                aria-pressed={skin === 'dregxmoon'}
                className={`btn-manga font-display text-sm ${skin === 'dregxmoon' ? 'hot' : ''}`}
              >
                {skin === 'dregxmoon'
                  ? es
                    ? 'Skin activa'
                    : 'Skin active'
                  : es
                    ? 'Usar skin Dregxmoon'
                    : 'Use Dregxmoon skin'}
              </button>
            </div>
          </article>
        ) : null}
      </div>
    </main>
  );
}
