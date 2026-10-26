'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { HERO_IMAGE } from '@/lib/constants';
import { useSite } from '@/context/site-context';
import { SKINS } from '@/lib/skins';

const HERO_LINKS = [
  { href: '/proyectos', key: 'np' as const, index: '01', jp: '作品' },
  { href: '/sobre-mi', key: 'na' as const, index: '02', jp: '経歴' },
  { href: '/contacto', key: 'nc' as const, index: '03', jp: '連絡' },
];

export const Hero: React.FC = () => {
  const { t, lang, skin } = useSite();
  const activeSkin = SKINS[skin];
  const [bubbleText, setBubbleText] = useState('');

  useEffect(() => {
    let index = 0;
    setBubbleText('');
    const timer = setInterval(() => {
      index += 1;
      setBubbleText(t.bub.slice(0, index));
      if (index >= t.bub.length) clearInterval(timer);
    }, 24);

    return () => clearInterval(timer);
  }, [t.bub]);

  return (
    <header className="hero-manga relative overflow-hidden">
      <div
        className="pointer-events-none absolute right-2 top-16 hidden select-none font-kanji text-[150px] leading-none text-black/15 md:block"
        aria-hidden="true"
      >
        {activeSkin.kanji}
      </div>

      <div className="relative mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-10 px-6 pb-20 pt-11 sm:px-8 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="mb-3.5 inline-block -skew-x-[10deg] bg-black px-3.5 py-1 font-mono text-[11px] font-semibold tracking-wide text-white">
            {lang === 'es' ? 'Backend · datos · Linux' : 'Backend · data · Linux'}
          </p>

          <h1 className="font-display text-[clamp(64px,12vw,128px)] italic uppercase leading-[0.95] text-white [text-shadow:6px_6px_0_#000]">
            <span className="block">Luka</span>
            <span className="mt-1.5 inline-block -rotate-2 -skew-x-[8deg] bg-white px-[0.18em] text-black shadow-[8px_8px_0_#000] [text-shadow:none]">
              Torres
            </span>
          </h1>

          <h2 className="rl mt-5 inline-block -skew-x-[10deg] bg-black px-5 py-1.5 text-2xl leading-none text-white">
            {t.role}
          </h2>

          <p className="mt-5 max-w-[560px] border-l-[6px] border-white bg-black p-4 text-sm text-white md:text-base">
            {t.hp}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/proyectos" className="btn-manga hot font-display text-base">
              {t.viewAll}
            </Link>
            <Link href="/sobre-mi" className="btn-manga font-display text-base">
              {lang === 'es' ? 'Sobre mí →' : 'About me →'}
            </Link>
          </div>

          <ul className="mn mt-7 flex max-w-[360px] list-none flex-col gap-1.5 p-0">
            {HERO_LINKS.map((link, index) => (
              <li key={link.href} className={index % 2 === 1 ? 'ml-5' : ''}>
                <Link
                  href={link.href}
                  className="group flex -skew-x-[12deg] items-center justify-between gap-4 bg-white px-5 py-1.5 text-2xl text-black transition-transform hover:translate-x-5 hover:bg-[var(--acc)]"
                >
                  <span className="font-display italic uppercase">{t[link.key]}</span>
                  <span className="flex items-center gap-2 font-mono text-[10px] not-italic tracking-[0.18em] text-black/50 group-hover:text-black/70">
                    {link.index} <span className="font-kanji">{link.jp}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="sfx absolute -right-1.5 -top-8 z-10 select-none text-[58px]" aria-hidden="true">
            {activeSkin.sfx[0]}
          </div>

          <div
            data-hero-photo
            className="select-none filter drop-shadow-[10px_10px_0_#fff] drop-shadow-[18px_18px_0_#000]"
          >
            <div className="hero-photo-clip">
              <img
                src={HERO_IMAGE}
                alt={lang === 'es' ? 'Ilustración de Luka Torres' : 'Illustration of Luka Torres'}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="absolute -left-3 top-4 hidden -rotate-2 border border-black bg-[#f7f4ed] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-black shadow-[4px_4px_0_#000] sm:block">
            Lexxiscake
            <span className="mt-0.5 block text-[8px] text-black/55">
              {lang === 'es' ? 'ITT · 7.º semestre' : 'ITT · 7th semester'}
            </span>
          </div>

          <div className="relative mt-11 min-h-[8.5em] -rotate-[1.5deg] border-[3px] border-white bg-black px-4 py-4 font-semibold text-white sm:min-h-[7em]">
            <span>{bubbleText}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
