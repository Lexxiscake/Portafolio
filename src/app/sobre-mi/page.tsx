'use client';

import React from 'react';
import Link from 'next/link';
import { useSite } from '@/context/site-context';
import { HERO_IMAGE } from '@/lib/constants';

const PRINCIPLES = {
  es: [
    {
      title: 'Primero lo entiendo, luego lo cambio',
      body: 'Reproduzco el fallo, leo el código y mido el antes y el después. Si no puedo explicar la causa, tampoco puedo arreglarla.',
      signal: 'depurar',
    },
    {
      title: 'Los datos mandan',
      body: 'Modelo primero las relaciones y las restricciones. Después elijo índices y transacciones. La velocidad sin datos correctos no sirve.',
      signal: 'datos',
    },
    {
      title: 'Menos piezas',
      body: 'Cada dependencia y cada permiso tienen un motivo. Si una pieza no resuelve nada, la quito.',
      signal: 'sistemas',
    },
    {
      title: 'Pruebo en el entorno real',
      body: 'Los checks de hardening corren en Ubuntu, Fedora y Arch. El portafolio se prueba en escritorio y en móvil antes de publicarlo.',
      signal: 'pruebas',
    },
  ],
  en: [
    {
      title: 'Understand first, change later',
      body: 'I reproduce the failure, read the code, and measure before and after. If I cannot explain the cause, I cannot fix it.',
      signal: 'debug',
    },
    {
      title: 'Data comes first',
      body: 'I model relationships and constraints first. Then I choose indexes and transactions. Speed with wrong data is useless.',
      signal: 'data',
    },
    {
      title: 'Fewer parts',
      body: 'Every dependency and permission needs a reason. If a part solves nothing, I remove it.',
      signal: 'systems',
    },
    {
      title: 'Test in the real environment',
      body: 'The hardening checks run on Ubuntu, Fedora, and Arch. The portfolio is tested on desktop and mobile before it ships.',
      signal: 'testing',
    },
  ],
};

const TIMELINE = {
  es: [
    {
      year: '2026',
      title: 'Portafolio 2026',
      body: 'Rediseño del sitio: proyectos con ficha propia, formulario validado y contenido bilingüe.',
      tag: 'web',
    },
    {
      year: '2025',
      title: 'Kaoru · Linux Hardener',
      body: 'Agente local con memoria SQLite y suite de auditoría CIS probada en Ubuntu, Fedora y Arch.',
      tag: 'local ai / linux',
    },
    {
      year: '2024',
      title: 'Gestión Clínica & Triaje',
      body: 'Backend para citas y expedientes: transacciones cortas, índices y control de accesos.',
      tag: 'datos',
    },
  ],
  en: [
    {
      year: '2026',
      title: 'Portfolio 2026',
      body: 'Site redesign: dedicated project pages, validated contact form, and bilingual content.',
      tag: 'web',
    },
    {
      year: '2025',
      title: 'Kaoru · Linux Hardener',
      body: 'Local agent with SQLite memory and a CIS audit suite tested on Ubuntu, Fedora, and Arch.',
      tag: 'local ai / linux',
    },
    {
      year: '2024',
      title: 'Clinical Management & Triage',
      body: 'Backend for appointments and records: short transactions, indexes, and access control.',
      tag: 'data',
    },
  ],
};

const FOCUS = {
  es: [
    'Auditorías Linux con CIS',
    'Consultas y planes en SQL Server',
    'Memoria local con SQLite',
    'Interfaces con Next.js',
  ],
  en: [
    'Linux audits with CIS',
    'SQL Server queries and plans',
    'Local memory with SQLite',
    'Interfaces with Next.js',
  ],
};

const STACK = {
  es: [
    {
      layer: 'Backend',
      items: ['C# / .NET', 'Python / FastAPI', 'TypeScript / Node', 'Java'],
      usage: 'APIs, servicios, scripts',
    },
    {
      layer: 'Datos',
      items: ['SQL Server', 'T-SQL', 'SQLite FTS5', 'Índices / ACID'],
      usage: 'consultas, índices, transacciones',
    },
    {
      layer: 'Sistemas',
      items: ['Linux', 'Bash', 'sysctl', 'Auditd', 'Docker', 'GitHub Actions'],
      usage: 'hardening, CI, despliegue',
    },
    {
      layer: 'Frontend',
      items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
      usage: 'este portafolio',
    },
  ],
  en: [
    {
      layer: 'Backend',
      items: ['C# / .NET', 'Python / FastAPI', 'TypeScript / Node', 'Java'],
      usage: 'APIs, services, scripts',
    },
    {
      layer: 'Data',
      items: ['SQL Server', 'T-SQL', 'SQLite FTS5', 'Indexes / ACID'],
      usage: 'queries, indexes, transactions',
    },
    {
      layer: 'Systems',
      items: ['Linux', 'Bash', 'sysctl', 'Auditd', 'Docker', 'GitHub Actions'],
      usage: 'hardening, CI, deployment',
    },
    {
      layer: 'Frontend',
      items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
      usage: 'this portfolio',
    },
  ],
};

export default function AboutPage() {
  const { lang, t } = useSite();
  const principles = PRINCIPLES[lang];
  const timeline = TIMELINE[lang];
  const focus = FOCUS[lang];
  const stack = STACK[lang];

  return (
    <main className="mx-auto max-w-[1120px] px-6 pb-10 pt-10 sm:px-8 sm:pt-12">
      <header className="grid grid-cols-1 gap-9 border-b-2 border-ink/20 pb-10 lg:grid-cols-[1fr_300px] lg:items-start">
        <div>
          <p className="mb-3 inline-block -skew-x-[10deg] bg-black px-3.5 py-1 font-mono text-[11px] font-semibold tracking-wide text-white">
            {lang === 'es' ? 'SOBRE MÍ / 2026' : 'ABOUT / 2026'}
          </p>
          <h1 className="max-w-[760px] font-display text-[clamp(42px,7vw,76px)] italic uppercase leading-[0.9]">
            {lang === 'es' ? 'Me gusta entender' : 'I like to understand'}
            <span className="mt-2 block text-[var(--acc)]">
              {lang === 'es' ? 'cómo funcionan las cosas.' : 'how things work.'}
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--mut)] sm:text-lg">
            {lang === 'es'
              ? 'Soy Luka Torres, estudio Ingeniería en Sistemas Computacionales en el ITT. He trabajado en un backend clínico, en scripts de hardening para Linux y en un agente local. Aprendo leyendo código, rompiendo entornos de prueba y midiendo lo que cambia.'
              : 'I am Luka Torres, a Computer Systems Engineering student at ITT. I have worked on a clinical backend, Linux hardening scripts, and a local agent. I learn by reading code, breaking test environments, and measuring what changes.'}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/proyectos" className="btn-manga hot font-display text-sm">
              {lang === 'es' ? 'Ver proyectos →' : 'View projects →'}
            </Link>
            <Link href="/contacto" className="btn-manga font-display text-sm">
              {lang === 'es' ? 'Escribirme' : 'Write to me'}
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink/15 pt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--mut)]">
            <span>
              <strong className="text-[var(--ink)]">{lang === 'es' ? 'base:' : 'based in:'}</strong>{' '}
              Tijuana, MX · UTC-7
            </span>
            <span>
              <strong className="text-[var(--ink)]">{lang === 'es' ? 'estudio:' : 'studying:'}</strong>{' '}
              {lang === 'es' ? 'Ing. en Sistemas · ITT' : 'Computer Systems Eng. · ITT'}
            </span>
            <span>
              <strong className="text-[var(--ink)]">{lang === 'es' ? 'semestre:' : 'semester:'}</strong>{' '}
              {lang === 'es' ? '7.º' : '7th'}
            </span>
          </div>
        </div>

        <aside className="relative">
          <div className="filter drop-shadow-[8px_8px_0_var(--acc)]">
            <div className="hero-photo-clip max-w-[280px]">
              <img src={HERO_IMAGE} alt="Luka Torres" className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="mt-5 border-2 border-[color:var(--line)] bg-[var(--pn)] p-4 font-mono text-[10px]">
            <p className="mb-2 border-b border-ink/15 pb-2 font-bold uppercase tracking-[0.16em] text-[var(--acc)]">
              {lang === 'es' ? 'ahora' : 'now'}
            </p>
            <ul className="m-0 list-none space-y-1.5 p-0 text-[var(--mut)]">
              {focus.map((item) => (
                <li key={item}>→ {item}</li>
              ))}
            </ul>
          </div>
        </aside>
      </header>

      <section className="mt-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--acc)]">
              {lang === 'es' ? '/ forma de trabajo' : '/ how I work'}
            </p>
            <h2 className="font-display text-[clamp(28px,4vw,42px)] italic uppercase leading-none">
              {lang === 'es' ? 'Cómo tomo decisiones' : 'How I make decisions'}
            </h2>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--mut)]">
            {lang === 'es' ? 'cuatro criterios' : 'four criteria'}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {principles.map((principle, index) => (
            <article
              key={principle.title}
              className="relative border-2 border-[color:var(--line)] bg-[var(--pn)] p-5 pl-20"
            >
              <span className="absolute left-4 top-4 font-display text-5xl italic leading-none text-[var(--acc)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--mut)]">
                {principle.signal}
              </p>
              <h3 className="font-display text-xl italic uppercase leading-tight">{principle.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--mut)]">{principle.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--acc)]">
              {lang === 'es' ? '/ herramientas' : '/ tools'}
            </p>
            <h2 className="font-display text-[clamp(28px,4vw,42px)] italic uppercase leading-none">
              {lang === 'es' ? 'Herramientas que uso' : 'Tools I use'}
            </h2>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--mut)]">
            {lang === 'es' ? 'por capa' : 'by layer'}
          </span>
        </div>

        <div className="overflow-hidden border-2 border-[color:var(--line)]">
          {stack.map((group, index) => (
            <div
              key={group.layer}
              className={`grid grid-cols-1 gap-3 px-4 py-4 md:grid-cols-[130px_1fr_220px] md:items-center ${
                index % 2 === 0 ? 'bg-[var(--pn)]' : 'bg-[var(--bg)]'
              }`}
            >
              <span className="font-display text-xl italic uppercase text-[var(--acc)]">
                {group.layer}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="bg-[var(--ink)] px-2 py-0.5 font-mono text-[10px] font-semibold text-[var(--bg)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="m-0 font-mono text-[10px] leading-relaxed text-[var(--mut)]">
                {group.usage}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--acc)]">
            {lang === 'es' ? '/ recorrido' : '/ background'}
          </p>
          <h2 className="font-display text-[clamp(28px,4vw,42px)] italic uppercase leading-none">
            {lang === 'es' ? 'Trabajo reciente' : 'Recent work'}
          </h2>

          <ol className="mt-6 list-none space-y-0 p-0">
            {timeline.map((item, index) => (
              <li key={item.year} className="relative grid grid-cols-[72px_1fr] gap-4 pb-7">
                <div className="relative">
                  <span className="font-display text-2xl italic text-[var(--acc)]">{item.year}</span>
                  {index < timeline.length - 1 ? (
                    <span className="absolute left-1 top-8 h-full w-px bg-ink/20" aria-hidden="true" />
                  ) : null}
                </div>
                <div className="border-l-2 border-[var(--acc)] pl-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-xl italic uppercase leading-none">{item.title}</h3>
                    <span className="bg-[var(--ink)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--bg)]">
                      {item.tag}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--mut)]">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <aside className="space-y-4">
          <div className="border-2 border-[color:var(--line)] bg-[var(--pn)] p-5">
            <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--acc)]">
              {lang === 'es' ? 'idiomas' : 'languages'}
            </p>
            <dl className="m-0 space-y-2 font-mono text-[10px]">
              <div className="flex justify-between gap-3">
                <dt className="text-[var(--mut)]">{lang === 'es' ? 'Español' : 'Spanish'}</dt>
                <dd className="m-0 text-right font-semibold">{lang === 'es' ? 'nativo' : 'native'}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[var(--mut)]">{lang === 'es' ? 'Inglés' : 'English'}</dt>
                <dd className="m-0 text-right font-semibold">B2</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[var(--mut)]">{lang === 'es' ? 'Japonés' : 'Japanese'}</dt>
                <dd className="m-0 text-right font-semibold">N5</dd>
              </div>
            </dl>
          </div>

          <div className="border-2 border-[color:var(--line)] bg-[var(--pn)] p-5">
            <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--acc)]">
              {lang === 'es' ? 'formación' : 'education'}
            </p>
            <p className="m-0 text-sm font-bold">
              {lang === 'es' ? 'Ing. en Sistemas Computacionales' : 'Computer Systems Engineering'}
            </p>
            <p className="mt-1 font-mono text-[10px] leading-relaxed text-[var(--mut)]">
              {lang === 'es'
                ? 'Instituto Tecnológico de Tijuana · 7.º semestre'
                : 'Instituto Tecnológico de Tijuana · 7th semester'}
            </p>
          </div>

          <div className="border-4 border-[var(--acc)] bg-black p-5 text-white">
            <p className="font-display text-xl italic uppercase leading-tight">
              {lang === 'es' ? '¿Hablamos?' : 'Want to talk?'}
            </p>
            <p className="mt-2 text-sm text-neutral-300">{t.cp}</p>
            <Link href="/contacto" className="btn-manga hot mt-4 w-full justify-center font-display text-sm">
              {lang === 'es' ? 'Escribirme →' : 'Write to me →'}
            </Link>
          </div>
        </aside>
      </section>
    </main>
  );
}
