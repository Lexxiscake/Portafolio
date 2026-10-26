'use client';

import React from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useSite } from '@/context/site-context';
import { PROJECTS_DATA, ProjectDetail } from '@/lib/constants';
import { CodeBlock } from '@/components/CodeBlock';

const DOMAIN_LABEL: Record<'es' | 'en', Record<ProjectDetail['category'], string>> = {
  es: {
    ai: 'IA local',
    security: 'Linux',
    systems: 'Datos',
  },
  en: {
    ai: 'Local AI',
    security: 'Linux',
    systems: 'Data',
  },
};

export default function ProjectDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const project = PROJECTS_DATA.find((item) => item.id === id);
  const { lang, t } = useSite();

  if (!project) {
    notFound();
  }

  const projectIndex = PROJECTS_DATA.findIndex((item) => item.id === project.id);
  const previousProject = PROJECTS_DATA[(projectIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length];
  const nextProject = PROJECTS_DATA[(projectIndex + 1) % PROJECTS_DATA.length];
  const caseNumber = String(projectIndex + 1).padStart(2, '0');

  return (
    <main className="mx-auto max-w-[1120px] px-6 pb-10 pt-8 sm:px-8 sm:pt-10">
      <div className="mb-6">
        <Link
          href="/proyectos"
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--acc)] hover:underline"
        >
          ← {lang === 'es' ? 'Proyectos' : 'Projects'}
        </Link>
      </div>

      <header className="grid grid-cols-1 gap-8 border-b-2 border-ink/20 pb-8 lg:grid-cols-[1fr_310px] lg:items-start">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em]">
            <span className="bg-black px-2.5 py-1 font-bold text-white">
              {lang === 'es' ? 'proyecto' : 'project'} {caseNumber}
            </span>
            <span className="bg-[var(--acc)] px-2.5 py-1 font-bold text-black">
              {lang === 'es'
                ? project.status
                : project.status === 'Activo'
                  ? 'Active'
                  : 'Case study'}
            </span>
            <span className="border border-ink/25 px-2.5 py-1 text-[var(--mut)]">{project.year}</span>
          </div>

          <h1 className="font-display text-[clamp(42px,8vw,78px)] italic uppercase leading-[0.9]">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-[var(--mut)] sm:text-lg">{project.subtitle}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="-skew-x-[10deg] bg-[var(--ink)] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.06em] text-[var(--bg)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-manga hot font-display text-sm"
            >
              {t.repo} ↗
            </a>
            <Link href="/contacto" className="btn-manga font-display text-sm">
              {lang === 'es' ? 'Escribirme sobre este caso →' : 'Write to me about this case →'}
            </Link>
          </div>
        </div>

        <aside className="border-2 border-[color:var(--line)] bg-[var(--pn)] p-4 shadow-[5px_5px_0_var(--acc)]">
          <p className="mb-3 border-b border-ink/15 pb-2 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--acc)]">
            {lang === 'es' ? 'ficha' : 'overview'}
          </p>
          <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 font-mono text-[10px]">
            <dt className="uppercase tracking-[0.1em] text-[var(--mut)]">
              {lang === 'es' ? 'rol' : 'role'}
            </dt>
            <dd className="m-0 text-right font-semibold text-[var(--ink)]">{project.role}</dd>
            <dt className="uppercase tracking-[0.1em] text-[var(--mut)]">
              {lang === 'es' ? 'área' : 'area'}
            </dt>
            <dd className="m-0 text-right font-semibold uppercase text-[var(--ink)]">
              {DOMAIN_LABEL[lang][project.category]}
            </dd>
            <dt className="uppercase tracking-[0.1em] text-[var(--mut)]">
              {lang === 'es' ? 'año' : 'year'}
            </dt>
            <dd className="m-0 text-right font-semibold text-[var(--ink)]">{project.year}</dd>
            <dt className="uppercase tracking-[0.1em] text-[var(--mut)]">
              {lang === 'es' ? 'estado' : 'status'}
            </dt>
            <dd className="m-0 text-right font-semibold text-[var(--ink)]">
              {lang === 'es'
                ? project.status
                : project.status === 'Activo'
                  ? 'Active'
                  : 'Case study'}
            </dd>
          </dl>
          <div className="mt-4 border-t border-ink/15 pt-3">
            <p className="m-0 font-mono text-[9px] uppercase leading-relaxed tracking-[0.08em] text-[var(--mut)]">
              {lang === 'es'
                ? 'Aquí están las decisiones que tomé y lo que costó cada una.'
                : 'These are the decisions I made and what each one cost.'}
            </p>
          </div>
        </aside>
      </header>

      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="font-display text-2xl italic uppercase">
            {lang === 'es' ? 'Resultados' : 'Results'}
          </h2>
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--mut)]">
            {project.metrics.length} {lang === 'es' ? 'puntos' : 'points'}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {project.metrics.map((metric, index) => (
            <div
              key={metric}
              className="border-l-4 border-[var(--acc)] bg-[var(--pn)] p-4 shadow-[4px_4px_0_var(--ink)]"
            >
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--acc)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="mt-1 text-sm font-medium leading-relaxed">{metric}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="border-2 border-[color:var(--line)] bg-[var(--pn)] p-5 shadow-[6px_6px_0_var(--line)]">
          <h2 className="font-display text-xl italic uppercase text-[var(--acc)]">
            {lang === 'es' ? 'El problema' : 'The problem'}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--mut)]">{project.problem}</p>
        </div>
        <div className="border-2 border-[color:var(--line)] bg-[var(--pn)] p-5 shadow-[6px_6px_0_var(--acc)]">
          <h2 className="font-display text-xl italic uppercase text-emerald-500">
            {lang === 'es' ? 'Lo que hice' : 'What I did'}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--mut)]">{project.solution}</p>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--acc)]">
              {lang === 'es' ? '/ arquitectura' : '/ architecture'}
            </p>
            <h2 className="font-display text-2xl italic uppercase">
              {lang === 'es' ? 'Cómo funciona' : 'How it works'}
            </h2>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--mut)]">
            {project.pipeline.length} {lang === 'es' ? 'etapas' : 'stages'}
          </span>
        </div>

        <div className="relative grid grid-cols-1 gap-3 md:grid-cols-4">
          <div
            className="absolute left-0 right-0 top-1/2 hidden h-0.5 bg-accent/45 md:block"
            aria-hidden="true"
          />
          {project.pipeline.map((stage, index) => (
            <div
              key={stage.label}
              className="relative border-2 border-[color:var(--line)] bg-[var(--pn)] p-4"
            >
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--acc)]">
                {lang === 'es' ? 'etapa' : 'stage'} {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 font-display text-lg italic uppercase leading-none">
                {stage.label}
              </h3>
              <p className="mt-1.5 font-mono text-[10px] leading-relaxed text-[var(--mut)]">
                {stage.detail}
              </p>
              {index < project.pipeline.length - 1 ? (
                <span
                  className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 bg-[var(--bg)] px-1 font-mono text-xs text-[var(--acc)] md:block"
                  aria-hidden="true"
                >
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--acc)]">
              {lang === 'es' ? '/ decisiones' : '/ decisions'}
            </p>
            <h2 className="font-display text-2xl italic uppercase">
              {lang === 'es' ? 'Decisiones y costes' : 'Decisions and costs'}
            </h2>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--mut)]">
            {lang === 'es' ? 'decisión · coste · por qué' : 'decision · cost · why'}
          </span>
        </div>

        <div className="overflow-hidden border-2 border-[color:var(--line)]">
          <div className="hidden grid-cols-[1fr_1fr_1.2fr] bg-black px-4 py-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white md:grid">
            <span>{lang === 'es' ? 'decisión' : 'decision'}</span>
            <span>{lang === 'es' ? 'coste' : 'cost'}</span>
            <span>{lang === 'es' ? 'por qué' : 'why'}</span>
          </div>
          {project.tradeoffs.map((tradeoff, index) => (
            <div
              key={tradeoff.decision}
              className={`grid grid-cols-1 gap-2 px-4 py-4 md:grid-cols-[1fr_1fr_1.2fr] md:gap-5 ${
                index % 2 === 0 ? 'bg-[var(--pn)]' : 'bg-[var(--bg)]'
              }`}
            >
              <div>
                <span className="mb-1 block font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--acc)] md:hidden">
                  {lang === 'es' ? 'decisión' : 'decision'}
                </span>
                <p className="m-0 text-sm font-bold">{tradeoff.decision}</p>
              </div>
              <div>
                <span className="mb-1 block font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--acc)] md:hidden">
                  {lang === 'es' ? 'coste' : 'cost'}
                </span>
                <p className="m-0 text-sm text-[var(--mut)]">{tradeoff.cost}</p>
              </div>
              <div>
                <span className="mb-1 block font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--acc)] md:hidden">
                  {lang === 'es' ? 'por qué' : 'why'}
                </span>
                <p className="m-0 text-sm text-[var(--mut)]">{tradeoff.rationale}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--acc)]">
              {lang === 'es' ? '/ implementación' : '/ implementation'}
            </p>
            <h2 className="font-display text-2xl italic uppercase">
              {lang === 'es' ? 'Detalles de implementación' : 'Implementation details'}
            </h2>
          </div>
        </div>
        <ul className="grid list-none grid-cols-1 gap-3 p-0 md:grid-cols-3">
          {project.architecture.map((item, index) => (
            <li
              key={item}
              className="flex items-start gap-3 border border-ink/20 bg-[var(--pn)] p-3.5"
            >
              <span className="font-mono text-[10px] font-bold text-[var(--acc)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="font-mono text-[11px] leading-relaxed text-[var(--mut)]">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--acc)]">
              {lang === 'es' ? '/ código' : '/ code'}
            </p>
            <h2 className="font-display text-2xl italic uppercase">
              {lang === 'es' ? 'Código del proyecto' : 'Project code'}
            </h2>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--mut)]">
            {project.codeLanguage}
          </span>
        </div>
        <CodeBlock
          code={project.codeSnippet}
          language={project.codeLanguage}
          title={`${project.id}.${project.codeLanguage}`}
          lang={lang}
        />
      </section>

      <nav className="mt-12 grid grid-cols-1 gap-3 border-t-2 border-ink/20 pt-6 sm:grid-cols-2">
        <Link
          href={`/proyectos/${previousProject.id}`}
          className="group border-2 border-[color:var(--line)] bg-[var(--pn)] p-4 transition-colors hover:border-[var(--acc)]"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--mut)]">
            ← {lang === 'es' ? 'proyecto anterior' : 'previous project'}
          </span>
          <span className="mt-1 block font-display text-xl italic uppercase group-hover:text-[var(--acc)]">
            {previousProject.title}
          </span>
        </Link>
        <Link
          href={`/proyectos/${nextProject.id}`}
          className="group border-2 border-[color:var(--line)] bg-[var(--pn)] p-4 text-right transition-colors hover:border-[var(--acc)]"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--mut)]">
            {lang === 'es' ? 'siguiente proyecto' : 'next project'} →
          </span>
          <span className="mt-1 block font-display text-xl italic uppercase group-hover:text-[var(--acc)]">
            {nextProject.title}
          </span>
        </Link>
      </nav>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <Link href="/proyectos" className="btn-manga font-display text-sm">
          ← {lang === 'es' ? 'Volver a proyectos' : 'Back to projects'}
        </Link>
        <Link href="/contacto" className="btn-manga hot font-display text-sm">
          {lang === 'es' ? 'Escribirme →' : 'Write to me →'}
        </Link>
      </div>
    </main>
  );
}
