'use client';

import React from 'react';
import Link from 'next/link';
import { useSite } from '@/context/site-context';
import { HERO_IMAGE } from '@/lib/constants';
import { PageTransition } from '@/components/PageTransition';

interface TimelineItem {
  year?: string;
  title: string;
  body: string;
}

const TIMELINE: Record<'es' | 'en', TimelineItem[]> = {
  es: [
    {
      year: 'Julio 2026',
      title: 'Kaoru AI Agent',
      body: 'Asistente de escritorio con memoria local, proactividad auditable y acciones con permisos. Beta.',
    },
    {
      year: 'Abril 2026',
      title: 'Linux Hardener',
      body: 'Auditoría y endurecimiento base para Ubuntu y Debian: SSH, UFW y fail2ban, con respaldo, simulación y reversión.',
    },
    {
      title: 'Horarios Universitarios',
      body: 'Carga de materias sin conflictos con Backtracking sobre SQL Server.',
    },
  ],
  en: [
    {
      year: 'July 2026',
      title: 'Kaoru AI Agent',
      body: 'Desktop assistant with local memory, auditable proactivity, and permissioned actions. Beta.',
    },
    {
      year: 'April 2026',
      title: 'Linux Hardener',
      body: 'Baseline audit and hardening for Ubuntu and Debian: SSH, UFW, and fail2ban, with backup, simulation, and rollback.',
    },
    {
      title: 'University Schedule Management System',
      body: 'Subject scheduling without conflicts using Backtracking on SQL Server.',
    },
  ],
};

const FOCUS = {
  es: [
    'Bases de datos SQL Server',
    'Seguridad y hardening en Linux',
    'Desarrollo de software C# y .NET',
    'Agentes de IA con control de permisos',
  ],
  en: [
    'SQL Server databases',
    'Security and hardening on Linux',
    'C# and .NET software development',
    'AI agents with permission control',
  ],
};

interface DecisionBlock {
  project: string;
  body: string;
}

const DECISIONS: Record<'es' | 'en', DecisionBlock[]> = {
  es: [
    {
      project: 'Linux Hardener',
      body: 'Lo peor que le puede pasar a quien endurece un servidor remoto es quedarse fuera. Por eso apply guarda un respaldo antes de tocar cada archivo, valida SSH con sshd -t antes de recargarlo y, si falla, restaura el original. El puerto SSH siempre entra a las reglas de UFW antes de activar el firewall, y con --dry-run se ve cada comando antes de ejecutarlo.',
    },
    {
      project: 'Kaoru',
      body: 'En Kaoru separé quién decide de quién redacta. Qué mensaje proactivo se admite lo decide un núcleo determinista con reason codes que puedo rastrear; el modelo solo escribe el texto. Con las acciones pasa igual: los permisos allow/ask/deny se resuelven fuera del LLM, así que el modelo puede proponer pero no concederse acceso a nada. Después de editar archivos, la verificación (tipos, lint, tests y build) se ejecuta sola y su resultado siempre se muestra.',
    },
    {
      project: 'Horarios',
      body: 'En el sistema de horarios la dificultad era que nada se cruzara entre maestro, grupo y aula. La carga inteligente toma una materia sin asignar, busca un maestro disponible y, si hay conflicto, retrocede y prueba otra combinación hasta cerrar un horario completo.',
    },
  ],
  en: [
    {
      project: 'Linux Hardener',
      body: 'The worst thing that can happen to someone hardening a remote server is getting locked out. That is why apply saves a backup before touching each file, validates SSH with sshd -t before reloading it, and restores the original if it fails. The SSH port always goes into the UFW rules before the firewall is enabled, and --dry-run shows every command before it runs.',
    },
    {
      project: 'Kaoru',
      body: 'In Kaoru I separated who decides from who writes. Which proactive message is allowed is decided by a deterministic core with reason codes I can trace; the model only writes the text. The same goes for actions: allow/ask/deny permissions are resolved outside the LLM, so the model can propose but cannot grant itself access to anything. After editing files, verification (types, lint, tests, and build) runs on its own and its result is always shown.',
    },
    {
      project: 'Horarios',
      body: 'In the scheduling system the difficulty was making sure nothing collided between teacher, group, and classroom. Intelligent scheduling takes an unassigned subject, looks for an available teacher, and if there is a conflict, backtracks and tries another combination until it closes a complete schedule.',
    },
  ],
};

const STACK = {
  es: [
    {
      layer: 'Lenguajes',
      items: ['Python', 'JavaScript (Node.js)', 'T-SQL', 'C# (en estudio)', 'Java (en estudio)'],
      usage: 'lógica, servicios, scripts',
    },
    {
      layer: 'Frameworks / Plataformas',
      items: ['Electron', 'PyQt5', 'Node.js', '.NET (en estudio)'],
      usage: 'aplicaciones y servicios',
    },
    {
      layer: 'Web',
      items: ['HTML5', 'CSS3', 'JavaScript'],
      usage: 'interfaces y maquetación',
    },
    {
      layer: 'Bases de datos',
      items: ['SQL Server', 'SQLite (sqlite-vec)'],
      usage: 'consultas, procedimientos, integridad',
    },
    {
      layer: 'Herramientas',
      items: ['Linux', 'Git', 'GitHub Actions', 'Playwright'],
      usage: 'hardening, automatización, CI/CD',
    },
  ],
  en: [
    {
      layer: 'Languages',
      items: ['Python', 'JavaScript (Node.js)', 'T-SQL', 'C# (in progress)', 'Java (in progress)'],
      usage: 'logic, services, scripts',
    },
    {
      layer: 'Frameworks / Platforms',
      items: ['Electron', 'PyQt5', 'Node.js', '.NET (in progress)'],
      usage: 'applications and services',
    },
    {
      layer: 'Web',
      items: ['HTML5', 'CSS3', 'JavaScript'],
      usage: 'interfaces and layout',
    },
    {
      layer: 'Databases',
      items: ['SQL Server', 'SQLite (sqlite-vec)'],
      usage: 'queries, procedures, integrity',
    },
    {
      layer: 'Tools',
      items: ['Linux', 'Git', 'GitHub Actions', 'Playwright'],
      usage: 'hardening, automation, CI/CD',
    },
  ],
};

export default function AboutPage() {
  const { lang } = useSite();
  const timeline = TIMELINE[lang];
  const focus = FOCUS[lang];
  const decisions = DECISIONS[lang];
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
                ? 'Estudio Ingeniería en Sistemas Computacionales en el Instituto Tecnológico de Tijuana (ITT), donde ingresé en agosto de 2023 y actualmente me encuentro cursando. He trabajado en un agente de escritorio con IA, en una herramienta de hardening para Linux y en una aplicación de horarios con SQL Server. Aprendo leyendo código, diseñando arquitecturas sólidas y probando lo que construyo.'
                : 'I study Computer Systems Engineering at the Instituto Tecnológico de Tijuana (ITT), where I started in August 2023 and am currently enrolled. I have worked on a desktop AI agent, a Linux hardening tool, and a scheduling application with SQL Server. I learn by reading code, designing solid architectures, and testing what I build.'}
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
                <strong className="text-[var(--ink)]">{lang === 'es' ? 'ingreso:' : 'started:'}</strong>{' '}
                {lang === 'es' ? 'Agosto 2023 · 7mo semestre' : 'August 2023 · 7th semester'}
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
                {lang === 'es' ? '/ criterios' : '/ criteria'}
              </p>
              <h2 className="font-display text-[clamp(28px,4vw,42px)] italic uppercase leading-none">
                {lang === 'es' ? 'Cómo tomo decisiones' : 'How I make decisions'}
              </h2>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--mut)]">
              {lang === 'es' ? 'tres proyectos' : 'three projects'}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {decisions.map((block) => (
              <article
                key={block.project}
                className="border-2 border-[color:var(--line)] bg-[var(--pn)] p-5"
              >
                <h3 className="font-display text-xl italic uppercase leading-tight text-[var(--acc)]">
                  {block.project}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--mut)]">{block.body}</p>
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
                <li
                  key={item.title}
                  className="relative grid grid-cols-[84px_1fr] gap-4 pb-7 sm:grid-cols-[100px_1fr]"
                >
                  <span
                    className={`absolute left-1 w-px bg-ink/20 ${
                      item.year ? 'top-8' : 'top-0'
                    } ${index < timeline.length - 1 ? 'bottom-0' : 'bottom-7'}`}
                    aria-hidden="true"
                  />
                  <div className="relative">
                    {item.year ? (
                      <span className="font-display text-lg italic text-[var(--acc)] sm:text-xl">
                        {item.year}
                      </span>
                    ) : null}
                  </div>
                  <div className="min-w-0 border-l-2 border-[var(--acc)] pl-4">
                    <h3 className="font-display text-xl italic uppercase leading-none">{item.title}</h3>
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
                  ? 'Instituto Tecnológico de Tijuana · Ingreso agosto 2023 · 7mo semestre'
                  : 'Instituto Tecnológico de Tijuana · Started August 2023 · 7th semester'}
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
