'use client';

import React from 'react';
import Link from 'next/link';
import { useSite } from '@/context/site-context';
import { HERO_IMAGE } from '@/lib/constants';
import { PageTransition } from '@/components/PageTransition';

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
      year: 'Julio 2026',
      title: 'Kaoru AI Agent',
      body: 'Agente de escritorio con memoria SQLite FTS5, IPC seguro e inferencia local.',
      tag: 'ia local',
    },
    {
      year: 'Abril 2026',
      title: 'Linux Hardener',
      body: 'Auditoría y hardening de servidores Linux con checks automatizados e idempotentes.',
      tag: 'linux / seguridad',
    },
    {
      year: 'Noviembre 2025',
      title: 'Gestión Clínica & Triaje',
      body: 'Backend para citas y expedientes médicos: transacciones cortas, T-SQL y control de accesos.',
      tag: 'datos / backend',
    },
  ],
  en: [
    {
      year: 'July 2026',
      title: 'Kaoru AI Agent',
      body: 'Desktop agent with SQLite FTS5 memory, secure IPC, and local inference.',
      tag: 'local ai',
    },
    {
      year: 'April 2026',
      title: 'Linux Hardener',
      body: 'Linux server audit and hardening with automated idempotent checks.',
      tag: 'linux / security',
    },
    {
      year: 'November 2025',
      title: 'Clinical Management & Triage',
      body: 'Backend for appointments and medical records: short transactions, T-SQL, and access control.',
      tag: 'data / backend',
    },
  ],
};

const FOCUS = {
  es: [
    'Bases de datos SQL Server',
    'Auditorías Linux con CIS',
    'Desarrollo de software C# y .NET',
    'Inteligencia Artificial y herramientas locales',
  ],
  en: [
    'SQL Server databases',
    'Linux CIS auditing',
    'C# and .NET software development',
    'Artificial Intelligence and local tools',
  ],
};

const STACK = {
  es: [
    {
      layer: 'Lenguajes',
      items: ['C#', 'Python', 'Java', 'JavaScript'],
      usage: 'lógica, servicios, scripts',
    },
    {
      layer: 'Frameworks / Plataformas',
      items: ['.NET', 'Node.js', 'Vite', 'Next.js'],
      usage: 'aplicaciones y servicios',
    },
    {
      layer: 'Web',
      items: ['HTML5', 'CSS3', 'JavaScript'],
      usage: 'interfaces y maquetación',
    },
    {
      layer: 'Bases de datos',
      items: ['SQL Server', 'T-SQL', 'SQLite FTS5'],
      usage: 'consultas, procedimientos, integridad',
    },
    {
      layer: 'Sistemas / Herramientas',
      items: ['Linux', 'Bash', 'Git', 'GitHub Actions'],
      usage: 'hardening, automatización, CI/CD',
    },
  ],
  en: [
    {
      layer: 'Languages',
      items: ['C#', 'Python', 'Java', 'JavaScript'],
      usage: 'logic, services, scripts',
    },
    {
      layer: 'Frameworks / Platforms',
      items: ['.NET', 'Node.js', 'Vite', 'Next.js'],
      usage: 'applications and services',
    },
    {
      layer: 'Web',
      items: ['HTML5', 'CSS3', 'JavaScript'],
      usage: 'interfaces and layout',
    },
    {
      layer: 'Databases',
      items: ['SQL Server', 'T-SQL', 'SQLite FTS5'],
      usage: 'queries, procedures, integrity',
    },
    {
      layer: 'Systems / Tools',
      items: ['Linux', 'Bash', 'Git', 'GitHub Actions'],
      usage: 'hardening, automation, CI/CD',
    },
  ],
};

export default function AboutPage() {
  const { lang } = useSite();
  const principles = PRINCIPLES[lang];
  const timeline = TIMELINE[lang];
  const focus = FOCUS[lang];
  const stack = STACK[lang];

  return (
    <PageTransition>
      <main className="mx-auto max-w-[1120px] px-6 pb-16 pt-10 sm:px-8 sm:pt-12">
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
                ? 'Tengo 21 años y estudio Ingeniería en Sistemas Computacionales en el Instituto Tecnológico de Tijuana (ITT), donde ingresé en agosto de 2023 y actualmente me encuentro cursando. He trabajado en desarrollo de backend, bases de datos con SQL Server, hardening en Linux y agentes locales con IA. Aprendo leyendo código, diseñando arquitecturas sólidas y midiendo lo que cambia.'
                : 'I am 21 years old and studying Computer Systems Engineering at the Instituto Tecnológico de Tijuana (ITT), where I started in August 2023 and am currently enrolled. I have worked on backend development, SQL Server databases, Linux hardening, and local AI agents. I learn by reading code, designing solid architectures, and measuring what changes.'}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/proyectos" className="btn-manga hot font-display text-sm">
                {lang === 'es' ? 'Ver proyectos →' : 'View projects →'}
              </Link>
              <a
                href="https://github.com/Lexxiscake"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-manga font-display text-sm"
              >
                GitHub ↗
              </a>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink/15 pt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--mut)]">
              <span>
                <strong className="text-[var(--ink)]">{lang === 'es' ? 'edad:' : 'age:'}</strong>{' '}
                {lang === 'es' ? '21 años' : '21 years old'}
              </span>
              <span>
                <strong className="text-[var(--ink)]">{lang === 'es' ? 'ingreso:' : 'started:'}</strong>{' '}
                {lang === 'es' ? 'Agosto 2023 (cursando)' : 'August 2023 (enrolled)'}
              </span>
              <span>
                <strong className="text-[var(--ink)]">{lang === 'es' ? 'estudio:' : 'studying:'}</strong>{' '}
                {lang === 'es' ? 'Ing. en Sistemas · ITT' : 'Computer Systems Eng. · ITT'}
              </span>
              <span>
                <strong className="text-[var(--ink)]">{lang === 'es' ? 'base:' : 'based in:'}</strong>{' '}
                Tijuana, MX · UTC-7
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
                {lang === 'es' ? 'áreas de interés' : 'areas of interest'}
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
                {lang === 'es' ? '/ tecnologías' : '/ technologies'}
              </p>
              <h2 className="font-display text-[clamp(28px,4vw,42px)] italic uppercase leading-none">
                {lang === 'es' ? 'Tecnologías y herramientas' : 'Technologies & tools'}
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
                className={`grid grid-cols-1 gap-3 px-4 py-4 md:grid-cols-[180px_1fr_200px] md:items-center ${
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
                <li key={item.title} className="relative grid grid-cols-[100px_1fr] gap-4 pb-7">
                  <div className="relative">
                    <span className="font-display text-xl italic text-[var(--acc)]">{item.year}</span>
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
                  ? 'Instituto Tecnológico de Tijuana · Ingreso agosto 2023 (actualmente cursando)'
                  : 'Instituto Tecnológico de Tijuana · Started August 2023 (currently enrolled)'}
              </p>
            </div>

            <div className="border-4 border-[var(--acc)] bg-black p-5 text-white">
              <p className="font-display text-xl italic uppercase leading-tight">
                GitHub
              </p>
              <p className="mt-2 text-sm text-neutral-300">
                {lang === 'es'
                  ? 'Revisa el código fuente y mis proyectos en GitHub.'
                  : 'Check out the source code and my projects on GitHub.'}
              </p>
              <a
                href="https://github.com/Lexxiscake"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-manga hot mt-4 inline-flex w-full justify-center font-display text-sm"
              >
                GitHub ↗
              </a>
            </div>
          </aside>
        </section>
      </main>
    </PageTransition>
  );
}
