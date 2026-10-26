'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { ProjectCard } from '@/components/ProjectCard';
import { useSite } from '@/context/site-context';
import { PROJECTS_DATA } from '@/lib/constants';

type Category = 'all' | 'ai' | 'security' | 'systems';

const CATEGORIES: Record<'es' | 'en', Array<{ id: Category; label: string; short: string }>> = {
  es: [
    { id: 'all', label: 'Todos', short: 'TODOS' },
    { id: 'ai', label: 'IA local', short: 'IA' },
    { id: 'security', label: 'Linux', short: 'LINUX' },
    { id: 'systems', label: 'Datos', short: 'DATOS' },
  ],
  en: [
    { id: 'all', label: 'All', short: 'ALL' },
    { id: 'ai', label: 'Local AI', short: 'AI' },
    { id: 'security', label: 'Linux', short: 'LINUX' },
    { id: 'systems', label: 'Data', short: 'DATA' },
  ],
};

export default function ProjectsPage() {
  const { t, lang } = useSite();
  const [category, setCategory] = useState<Category>('all');
  const [query, setQuery] = useState('');
  const categories = CATEGORIES[lang];

  const counts = useMemo(
    () => ({
      all: PROJECTS_DATA.length,
      ai: PROJECTS_DATA.filter((project) => project.category === 'ai').length,
      security: PROJECTS_DATA.filter((project) => project.category === 'security').length,
      systems: PROJECTS_DATA.filter((project) => project.category === 'systems').length,
    }),
    []
  );

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return PROJECTS_DATA.filter((project) => {
      const matchesCategory = category === 'all' || project.category === category;
      const haystack = [
        project.title,
        project.subtitle,
        project.summary,
        project.problem,
        project.solution,
        project.tags.join(' '),
        project.metrics.join(' '),
      ]
        .join(' ')
        .toLowerCase();

      return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [category, query]);

  const resultLabel =
    lang === 'es'
      ? `${filteredProjects.length} ${filteredProjects.length === 1 ? 'resultado' : 'resultados'}`
      : `${filteredProjects.length} ${filteredProjects.length === 1 ? 'result' : 'results'}`;

  return (
    <main className="mx-auto max-w-[1180px] px-6 pb-10 pt-10 sm:px-8 sm:pt-12">
      <header className="mb-9 border-b-2 border-ink/20 pb-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-3 inline-block -skew-x-[10deg] bg-black px-3.5 py-1 font-mono text-[11px] font-semibold tracking-wide text-white">
              {lang === 'es' ? 'PROYECTOS / 2026' : 'PROJECTS / 2026'}
            </p>
            <h1 className="font-display text-[clamp(42px,8vw,80px)] italic uppercase leading-[0.9]">
              {lang === 'es' ? 'Proyectos' : 'Selected'}{' '}
              <span className="text-[var(--acc)]">
                {lang === 'es' ? 'seleccionados' : 'work'}
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-[var(--mut)] sm:text-base">
              {lang === 'es'
                ? 'Tres proyectos que llevé de la idea a algo que funciona. En cada uno explico el problema, lo que probé y lo que tuve que sacrificar.'
                : 'Three projects I took from an idea to something that works. Each one explains the problem, what I tried, and what I had to give up.'}
            </p>
          </div>

          <dl className="grid grid-cols-3 gap-3 font-mono text-[10px] uppercase tracking-[0.1em]">
            <div className="border-l-2 border-[var(--acc)] pl-3">
              <dt className="text-[var(--mut)]">{lang === 'es' ? 'proyectos' : 'projects'}</dt>
              <dd className="m-0 font-display text-2xl italic text-[var(--acc)]">03</dd>
            </div>
            <div className="border-l-2 border-[var(--acc)] pl-3">
              <dt className="text-[var(--mut)]">{lang === 'es' ? 'áreas' : 'areas'}</dt>
              <dd className="m-0 font-display text-2xl italic text-[var(--acc)]">03</dd>
            </div>
            <div className="border-l-2 border-[var(--acc)] pl-3">
              <dt className="text-[var(--mut)]">{lang === 'es' ? 'decisiones' : 'decisions'}</dt>
              <dd className="m-0 font-display text-2xl italic text-[var(--acc)]">09</dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[250px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="border-2 border-[color:var(--line)] bg-[var(--pn)] p-4 shadow-[5px_5px_0_var(--acc)]">
            <label className="mb-1.5 block font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--mut)]">
              {lang === 'es' ? 'buscar' : 'search'}
            </label>
            <div className="flex items-center border-2 border-ink/30 bg-[var(--bg)] px-2">
              <span className="font-mono text-xs text-[var(--acc)]">/</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="SQL, Linux, ACID…"
                className="min-h-[38px] w-full border-0 bg-transparent px-2 font-mono text-xs text-[var(--ink)] outline-none placeholder:text-muted/60"
                aria-label={lang === 'es' ? 'Buscar proyectos' : 'Search projects'}
              />
            </div>

            <div className="mt-5 border-t border-ink/15 pt-4">
              <p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--mut)]">
                {lang === 'es' ? 'por área' : 'by area'}
              </p>
              <div className="flex flex-col gap-1.5">
                {categories.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCategory(item.id)}
                    className={`flex items-center justify-between gap-2 border px-2.5 py-2 text-left font-mono text-[10px] uppercase tracking-[0.1em] transition-colors ${
                      category === item.id
                        ? 'border-[var(--acc)] bg-[var(--acc)] font-bold text-black'
                        : 'border-ink/20 text-[var(--ink)] hover:border-[var(--acc)]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`px-1.5 py-0.5 text-[9px] ${
                        category === item.id
                          ? 'bg-black/15 text-black'
                          : 'bg-ink/10 text-[var(--mut)]'
                      }`}
                    >
                      {counts[item.id]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 border-t border-ink/15 pt-4">
              <p className="m-0 font-mono text-[9px] uppercase leading-relaxed tracking-[0.08em] text-[var(--mut)]">
                {lang === 'es'
                  ? 'Cada proyecto incluye diagrama, decisiones y fragmentos de código.'
                  : 'Each project includes a diagram, decisions, and code snippets.'}
              </p>
            </div>
          </div>
        </aside>

        <section>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="m-0 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--mut)]">
              {resultLabel}
              {category !== 'all' ? ` · ${categories.find((item) => item.id === category)?.short}` : ''}
              {query ? ` · “${query}”` : ''}
            </p>
            {(category !== 'all' || query) && (
              <button
                type="button"
                onClick={() => {
                  setCategory('all');
                  setQuery('');
                }}
                className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--acc)] hover:underline"
              >
                {lang === 'es' ? 'limpiar filtros' : 'clear filters'}
              </button>
            )}
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-7 xl:grid-cols-2">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={PROJECTS_DATA.findIndex((item) => item.id === project.id)}
                  lang={lang}
                  badgeText={t.shot}
                  repoText={t.repo}
                  detailLabel={lang === 'es' ? 'Abrir proyecto →' : 'Open project →'}
                />
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-ink/30 bg-[var(--pn)] p-10 text-center">
              <p className="font-display text-2xl italic uppercase">
                {lang === 'es' ? 'Sin resultados' : 'No results'}
              </p>
              <p className="mt-2 text-sm text-[var(--mut)]">
                {lang === 'es'
                  ? 'No hay proyectos con ese filtro. Prueba con SQL, Linux o ACID.'
                  : 'No projects match that filter. Try SQL, Linux, or ACID.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setCategory('all');
                  setQuery('');
                }}
                className="btn-manga hot mt-5 font-display text-sm"
              >
                {lang === 'es' ? 'Limpiar filtros' : 'Clear filters'}
              </button>
            </div>
          )}

          <div className="mt-12 flex flex-col justify-between gap-5 border-4 border-white bg-black p-6 text-white shadow-[10px_10px_0_var(--acc)] sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-2xl italic uppercase text-[var(--acc)]">
                {lang === 'es' ? '¿Tienes un proyecto parecido?' : 'Working on something similar?'}
              </h2>
              <p className="mt-1 max-w-xl text-sm text-neutral-300">
                {lang === 'es'
                  ? 'Cuéntame qué estás construyendo y en qué punto está. Si puedo ayudar, te digo cómo.'
                  : 'Tell me what you are building and where it stands. If I can help, I will tell you how.'}
              </p>
            </div>
            <Link href="/contacto" className="btn-manga hot shrink-0 font-display">
              {lang === 'es' ? 'Escribirme →' : 'Write to me →'}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
