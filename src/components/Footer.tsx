'use client';

import React from 'react';
import Link from 'next/link';
import { useSite } from '@/context/site-context';

export const Footer: React.FC = () => {
  const { t, lang, skin } = useSite();

  return (
    <footer className="border-t border-[color:var(--line-soft)] px-4 pb-9 pt-8 text-sm text-[var(--mut)]">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 font-display text-lg italic uppercase text-[var(--ink)]">
            Luka Torres <span className="text-[var(--acc)]">/ Lexxiscake</span>
          </p>
          <p className="m-0 font-mono text-[11px]">{t.st}</p>
          <p className="mt-2 max-w-md text-sm">
            {lang === 'es'
              ? 'Backend, datos y Linux. Me gusta entender qué hay detrás de cada sistema y construir herramientas que duren.'
              : 'Backend, data, and Linux. I like to understand what is behind each system and build tools that last.'}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:items-end">
          <nav className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold" aria-label="Footer">
            <Link href="/proyectos" className="footer-link hover:text-[var(--acc)]">
              {t.np}
            </Link>
            <Link href="/sobre-mi" className="footer-link hover:text-[var(--acc)]">
              {t.na}
            </Link>
            <Link href="/otaku" className="footer-link hover:text-[var(--acc)]">
              Otaku
            </Link>
            <Link href="/contacto" className="footer-link hover:text-[var(--acc)]">
              {t.nc}
            </Link>
            <a
              href="https://github.com/Lexxiscake"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link hover:text-[var(--acc)]"
            >
              GitHub
              <span className="footer-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <a href="mailto:lukaleonardojesus@gmail.com" className="footer-link hover:text-[var(--acc)]">
              {lang === 'es' ? 'Correo' : 'Email'}
            </a>
          </nav>
          <p className="m-0 font-mono text-[10px]">© 2026 Luka Torres · ルカ</p>
          {skin === 'yofukashi' ? (
            <p className="m-0 max-w-xs font-mono text-[10px] sm:text-right">
              {lang === 'es'
                ? 'Fondo: ilustración de よふかしのうた. © Kotoyama / Shogakukan / Yofukashi no Uta Production Committee. Uso de fan, sin fines de lucro.'
                : 'Background: よふかしのうた illustration. © Kotoyama / Shogakukan / Yofukashi no Uta Production Committee. Fan use, non-commercial.'}
            </p>
          ) : null}
        </div>
      </div>
    </footer>
  );
};
