'use client';

import React from 'react';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { ProjectCard } from '@/components/ProjectCard';
import { useSite } from '@/context/site-context';
import { PROJECTS_DATA, LocalizedString, localized } from '@/lib/constants';
import { SKINS } from '@/lib/skins';
import { PageTransition } from '@/components/PageTransition';

interface TechCategory {
  category: { es: string; en: string };
  items: LocalizedString[];
}

const TECH_STACK: TechCategory[] = [
  {
    category: { es: 'Lenguajes', en: 'Languages' },
    items: [
      'Python',
      'JavaScript (Node.js)',
      'T-SQL',
      { es: 'C# (en estudio)', en: 'C# (in progress)' },
      { es: 'Java (en estudio)', en: 'Java (in progress)' },
    ],
  },
  {
    category: { es: 'Frameworks / Plataformas', en: 'Frameworks / Platforms' },
    items: ['Electron', 'PyQt5', 'Node.js', { es: '.NET (en estudio)', en: '.NET (in progress)' }],
  },
  {
    category: { es: 'Web', en: 'Web' },
    items: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    category: { es: 'Bases de datos', en: 'Databases' },
    items: ['SQL Server', 'SQLite (sqlite-vec)'],
  },
  {
    category: { es: 'Herramientas', en: 'Tools' },
    items: ['Linux', 'Git', 'GitHub Actions', 'Playwright'],
  },
  {
    category: { es: 'Áreas de interés', en: 'Areas of Interest' },
    items: [
      { es: 'Inteligencia Artificial', en: 'Artificial Intelligence' },
      { es: 'Desarrollo Web', en: 'Web Development' },
      { es: 'Redes', en: 'Networking' },
    ],
  },
];

export default function HomePage() {
  const { t, lang, skin } = useSite();
  const tickerText = SKINS[skin].ticker[lang];

  return (
    <PageTransition>
      <main>
        <Hero />

        {/* Decorative ticker: hidden from assistive tech; the repeated copies only keep the loop seamless. */}
        <div
          className="hero-marquee relative z-10 -rotate-[1.6deg] select-none overflow-hidden whitespace-nowrap border-y-4 border-[var(--acc)] bg-black text-white"
          aria-hidden="true"
        >
          <div className="inline-block animate-[tick_30s_linear_infinite] py-2 font-display text-xl italic motion-reduce:animate-none">
            {tickerText.repeat(6)}
          </div>
        </div>

        <section className="mx-auto max-w-[1120px] px-6 pt-12 sm:px-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--acc)]">
                {lang === 'es' ? '/ tecnologías' : '/ technologies'}
              </p>
              <h2 className="font-display text-[clamp(28px,5vw,46px)] italic uppercase leading-none">
                {lang === 'es' ? 'Tecnologías y herramientas' : 'Technologies & Tools'}
              </h2>
              <p className="mt-2 font-mono text-xs uppercase tracking-wider text-[var(--mut)]">
                {lang === 'es' ? 'stack actual · herramientas de trabajo' : 'current stack · working tools'}
              </p>
            </div>
          </div>

          <div className="overflow-hidden border-2 border-[color:var(--line)] bg-[var(--pn)] shadow-[6px_6px_0_var(--acc)]">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left font-mono text-sm">
                <thead className="border-b-2 border-[color:var(--line)] bg-black/50 text-[var(--acc)]">
                  <tr>
                    <th scope="col" className="w-1/3 border-r border-[color:var(--line-soft)] px-5 py-3.5 font-display text-base italic uppercase tracking-wider">
                      {lang === 'es' ? 'Categoría' : 'Category'}
                    </th>
                    <th scope="col" className="px-5 py-3.5 font-display text-base italic uppercase tracking-wider">
                      {lang === 'es' ? 'Tecnologías' : 'Technologies'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[color:var(--line-soft)]">
                  {TECH_STACK.map((row) => (
                    <tr key={row.category.es} className="transition-colors hover:bg-[var(--wash)]">
                      <td className="whitespace-nowrap border-r border-[color:var(--line-soft)] px-5 py-3.5 font-bold text-[var(--ink)]">
                        {row.category[lang]}
                      </td>
                      <td className="px-5 py-3.5 text-[var(--ink)]">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          {row.items.map((item, idx) => (
                            <React.Fragment key={localized(item, 'es')}>
                              {idx > 0 && (
                                <span className="select-none font-bold text-[var(--acc)]" aria-hidden="true">
                                  ·
                                </span>
                              )}
                              <span className="inline-block font-semibold">{localized(item, lang)}</span>
                            </React.Fragment>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1120px] px-6 pt-16 sm:px-8">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--acc)]">
                {lang === 'es' ? '/ proyectos' : '/ projects'}
              </p>
              <h2 className="font-display text-[clamp(30px,5vw,46px)] italic uppercase leading-none">
                {t.t1}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-[var(--mut)]">
                {lang === 'es'
                  ? 'Tres proyectos, tres problemas distintos. En cada uno cuento qué fallaba, qué cambié y qué costó la decisión.'
                  : 'Three projects, three different problems. Each one explains what was failing, what I changed, and what the decision cost.'}
              </p>
            </div>
            <Link href="/proyectos" className="btn-manga font-display whitespace-nowrap text-sm">
              {t.viewAll}
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
            {PROJECTS_DATA.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                lang={lang}
                badgeText={t.shot}
                repoText={t.repo}
              />
            ))}
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
