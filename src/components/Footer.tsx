'use client';

import React from 'react';
import Link from 'next/link';
import { useSite } from '@/context/site-context';

export const Footer: React.FC = () => {
  const { t, lang } = useSite();

  return (
    <footer className="border-t border-black/15 px-4 pb-9 pt-8 text-sm text-[var(--mut)] dark:border-white/10">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-1 font-display text-lg italic uppercase text-[var(--ink)]">
            Luka Torres <span className="text-[var(--acc)]">/ Lexxiscake</span>
          </p>
          <p className="m-0 font-mono text-[11px]">{t.st}</p>
          <p className="mt-2 max-w-md text-sm">
            {lang === 'es'
              ? 'Backend, bases de datos y Linux. Este sitio reúne los proyectos que he construido y lo que aprendí en cada uno.'
              : 'Backend, databases, and Linux. This site collects the projects I have built and what I learned from each one.'}
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:items-end">
          <nav className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold" aria-label="Footer">
            <Link href="/proyectos" className="hover:text-[var(--acc)]">
              {t.np}
            </Link>
            <Link href="/sobre-mi" className="hover:text-[var(--acc)]">
              {t.na}
            </Link>
            <Link href="/contacto" className="hover:text-[var(--acc)]">
              {t.nc}
            </Link>
            <a
              href="https://github.com/Lexxiscake"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--acc)]"
            >
              GitHub ↗
            </a>
            <a href="mailto:lukaleonardojesus@gmail.com" className="hover:text-[var(--acc)]">
              {lang === 'es' ? 'Correo' : 'Email'}
            </a>
          </nav>
          <p className="m-0 font-mono text-[10px]">© 2026 Luka Torres · ルカ</p>
        </div>
      </div>
    </footer>
  );
};
