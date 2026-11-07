'use client';

import React from 'react';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { ProjectCard } from '@/components/ProjectCard';
import { useSite } from '@/context/site-context';
import { PROJECTS_DATA } from '@/lib/constants';
import { SKINS } from '@/lib/skins';
import { PageTransition } from '@/components/PageTransition';

interface TechCategory {
  category: { es: string; en: string };
  items: string[];
}

const TECH_STACK: TechCategory[] = [
  {
    category: { es: 'Lenguajes', en: 'Languages' },
    items: ['C#', 'Python', 'Java'],
  },
  {
    category: { es: 'Frameworks / Plataformas', en: 'Frameworks / Platforms' },
    items: ['.NET', 'Node.js', 'Vite'],
  },
  {
    category: { es: 'Web', en: 'Web' },
    items: ['HTML5', 'CSS3', 'Javascript'],
  },
  {
    category: { es: 'Bases de datos', en: 'Databases' },
    items: ['SQL Server'],
  },
  {
    category: { es: 'Áreas de interés', en: 'Areas of Interest' },
    items: ['Inteligencia Artificial', 'Desarrollo Web', 'Redes'],
  },
];

const PRINCIPLES = {
  es: [
    {
      title: 'Entender antes de optimizar',
      body: 'Empiezo por reproducir el fallo y medir dónde duele. Un cambio rápido sobre una suposición suele crear otro problema.',
      signal: 'depurar',
    },
    {
      title: 'Datos que cuadran',
      body: 'Transacciones cortas, índices para las consultas reales y migraciones que se pueden deshacer.',
      signal: 'datos',
    },
    {
      title: 'Poca superficie',
      body: 'Permisos mínimos, dependencias justificadas y configuración explícita. Si no lo necesito, no lo instalo.',
      signal: 'sistemas',
    },
    {
      title: 'Local cuando hace falta',
      body: 'En Kaoru, la memoria y la inferencia se quedan en el equipo. Las conversaciones no salen de ahí.',
      signal: 'local',
    },
  ],
  en: [
    {
      title: 'Understand before optimizing',
      body: 'I start by reproducing the failure and measuring where it hurts. A quick change based on a guess usually creates another problem.',
      signal: 'debug',
    },
    {
      title: 'Data that adds up',
      body: 'Short transactions, indexes for real queries, and migrations I can undo.',
      signal: 'data',
    },
    {
      title: 'Small surface',
      body: 'Least privilege, justified dependencies, and explicit configuration. If I do not need it, I do not install it.',
      signal: 'systems',
    },
    {
      title: 'Local when it matters',
      body: 'In Kaoru, memory and inference stay on the machine. Conversations do not leave it.',
      signal: 'local',
    },
  ],
};

export default function HomePage() {
  const { t, lang, skin } = useSite();
  const principles = PRINCIPLES[lang];
  const tickerText = SKINS[skin].ticker[lang];

  return (
    <PageTransition>
      <main>
        <Hero />

        <div
          className="hero-marquee relative z-10 -rotate-[1.6deg] select-none overflow-hidden whitespace-nowrap border-y-4 border-[var(--acc)] bg-black text-white"
          aria-hidden="true"
        >
          <div className="inline-block animate-[tick_30s_linear_infinite] py-2 font-display text-xl italic">
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
                {lang === 'es' ? '技術 — Tecnologías y herramientas' : '技術 — Technologies & Tools'}
              </h2>
              <p className="mt-2 font-mono text-xs uppercase tracking-wider text-[var(--mut)]">
                {lang === 'es' ? 'tecnologías' : 'technologies'}
              </p>
            </div>
          </div>

          <div className="overflow-hidden border-2 border-[color:var(--line)] bg-[var(--pn)] shadow-[6px_6px_0_var(--acc)]">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left font-mono text-sm">
                <thead className="border-b-2 border-[color:var(--line)] bg-black/50 text-[var(--acc)]">
                  <tr>
                    <th className="w-1/3 border-r border-[color:var(--line-soft)] px-5 py-3.5 font-display text-base italic uppercase tracking-wider">
                      分類 <span className="font-mono text-xs normal-case opacity-75">({lang === 'es' ? 'Categoría' : 'Category'})</span>
                    </th>
                    <th className="px-5 py-3.5 font-display text-base italic uppercase tracking-wider">
                      技術 <span className="font-mono text-xs normal-case opacity-75">({lang === 'es' ? 'Tecnologías' : 'Technologies'})</span>
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
                            <React.Fragment key={item}>
                              {idx > 0 && (
                                <span className="select-none font-bold text-[var(--acc)]" aria-hidden="true">
                                  ・
                                </span>
                              )}
                              <span className="inline-block font-semibold">{item}</span>
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

        <section className="mx-auto max-w-[1120px] px-6 pb-16 pt-16 sm:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--acc)]">
                {lang === 'es' ? '/ forma de trabajo' : '/ how I work'}
              </p>
              <h2 className="font-display text-[clamp(30px,5vw,46px)] italic uppercase leading-none">
                {t.t2}
              </h2>
            </div>
            <Link
              href="/sobre-mi"
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--acc)] hover:underline"
            >
              {lang === 'es' ? 'Conocer más sobre mí →' : 'More about me →'}
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {principles.map((principle, index) => (
              <article
                key={principle.title}
                className="group border-2 border-[color:var(--line)] bg-[var(--pn)] p-5 transition-transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-display text-4xl italic leading-none text-[var(--acc)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="border border-ink/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--mut)]">
                    {principle.signal}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl italic uppercase">{principle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--mut)]">{principle.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PageTransition>
  );
}
