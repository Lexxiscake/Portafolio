'use client';

import React from 'react';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { ProjectCard } from '@/components/ProjectCard';
import { useSite } from '@/context/site-context';
import { PROJECTS_DATA } from '@/lib/constants';
import { SKINS } from '@/lib/skins';

const METRICS = [
  {
    value: '< 12ms',
    label: { es: 'Búsqueda en memoria local', en: 'Local memory search' },
    source: 'Kaoru · SQLite FTS5',
  },
  {
    value: '45+',
    label: { es: 'Controles CIS automatizados', en: 'Automated CIS controls' },
    source: 'Linux Hardener · CI',
  },
  {
    value: '0',
    label: { es: 'Deadlocks en reservas', en: 'Deadlocks in bookings' },
    source: { es: 'Gestión Médica · T-SQL', en: 'Clinical Management · T-SQL' },
  },
  {
    value: '100%',
    label: { es: 'Inferencia en el equipo', en: 'Inference on the machine' },
    source: 'Kaoru · local',
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
    <main>
      <Hero />

      <div
        className="relative z-10 -rotate-[1.6deg] select-none overflow-hidden whitespace-nowrap border-y-4 border-[var(--acc)] bg-black text-white"
        aria-hidden="true"
      >
        <div className="inline-block animate-[tick_30s_linear_infinite] py-2 font-display text-xl italic">
          {tickerText.repeat(6)}
        </div>
      </div>

      <section className="mx-auto max-w-[1120px] px-6 pt-12 sm:px-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--acc)]">
              {lang === 'es' ? '/ cifras' : '/ numbers'}
            </p>
            <h2 className="font-display text-[clamp(30px,5vw,46px)] italic uppercase leading-none">
              {lang === 'es' ? 'Resultados' : 'Results'}
            </h2>
          </div>
          <p className="max-w-md text-sm text-[var(--mut)]">
            {lang === 'es'
              ? 'Cada cifra sale de un proyecto que puedo enseñar. El código y las pruebas están en cada caso.'
              : 'Every number comes from a project I can show. The code and tests live in each case study.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((metric, index) => (
            <div
              key={metric.value}
              className="border-l-4 border-[var(--acc)] bg-[var(--pn)] p-4 shadow-[4px_4px_0_var(--ink)]"
            >
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--acc)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="mt-2 block font-display text-3xl italic leading-none text-[var(--acc)] sm:text-4xl">
                {metric.value}
              </span>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[var(--ink)]">
                {metric.label[lang]}
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--mut)]">
                {typeof metric.source === 'string' ? metric.source : metric.source[lang]}
              </p>
            </div>
          ))}
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

      <section className="mx-auto max-w-[1120px] px-6 pt-16 sm:px-8">
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
              className="group border-2 border-black bg-[var(--pn)] p-5 transition-transform hover:-translate-y-1 dark:border-white/20"
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

      <section className="mx-auto max-w-[1120px] px-6 pb-4 pt-16 sm:px-8">
        <div className="border-t-2 border-ink/20 pt-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--acc)]">
                {lang === 'es' ? '/ contacto' : '/ contact'}
              </p>
              <h2 className="font-display text-[clamp(34px,6vw,64px)] italic uppercase leading-[0.95]">
                {lang === 'es' ? '¿Hablamos?' : 'Let us talk.'}
              </h2>
              <p className="mt-3 max-w-xl text-sm text-[var(--mut)] sm:text-base">
                {t.cp}
              </p>
            </div>
            <Link href="/contacto" className="btn-manga hot shrink-0 font-display">
              {lang === 'es' ? 'Escribirme →' : 'Write to me →'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
