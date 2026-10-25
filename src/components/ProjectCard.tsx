'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { Language, ProjectDetail } from '@/lib/constants';

interface ProjectCardProps {
  project: ProjectDetail;
  index: number;
  lang: Language;
  badgeText: string;
  repoText: string;
  detailLabel?: string;
}

const CATEGORY_LABEL: Record<Language, Record<ProjectDetail['category'], string>> = {
  es: {
    ai: 'IA LOCAL',
    security: 'LINUX',
    systems: 'DATOS',
  },
  en: {
    ai: 'LOCAL AI',
    security: 'LINUX',
    systems: 'DATA',
  },
};

const STATUS_LABEL: Record<string, string> = {
  Activo: 'Active',
  'Caso de estudio': 'Case study',
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  lang,
  badgeText,
  repoText,
  detailLabel = lang === 'es' ? 'Abrir proyecto →' : 'Open project →',
}) => {
  const cardRef = useRef<HTMLElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const mx = `${((event.clientX - rect.left) / rect.width) * 100}%`;
    const my = `${((event.clientY - rect.top) / rect.height) * 100}%`;
    card.style.setProperty('--mx', mx);
    card.style.setProperty('--my', my);
  };

  const caseNumber = String(index + 1).padStart(2, '0');

  return (
    <div className="filter drop-shadow-[7px_7px_0_var(--acc)] transition-all hover:-rotate-1 hover:-translate-x-1 hover:-translate-y-1 hover:drop-shadow-[11px_11px_0_var(--acc)]">
      <article
        ref={cardRef}
        onPointerMove={handlePointerMove}
        className="card-clip foil relative flex h-full flex-col overflow-hidden bg-[var(--pn)] text-[var(--ink)]"
      >
        <div className="relative flex h-[150px] items-end justify-between overflow-hidden bg-[var(--acc)] p-4 text-black">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                'radial-gradient(rgba(0,0,0,0.35) 1.2px, transparent 1.4px)',
              backgroundSize: '9px 9px',
            }}
            aria-hidden="true"
          />
          <div className="relative">
            <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black/65">
              {badgeText} · {CATEGORY_LABEL[lang][project.category]}
            </span>
            <span className="mt-1 block font-display text-4xl italic leading-none">
              {caseNumber}
            </span>
          </div>

          <div className="relative text-right font-mono text-[9px] uppercase tracking-[0.12em] text-black/70">
            <span className="block">
              {lang === 'es' ? project.status : STATUS_LABEL[project.status] ?? project.status}
            </span>
            <span className="mt-1 block font-bold text-black">{project.year}</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5 pb-6">
          <h3 className="font-display text-2xl italic uppercase leading-none md:text-3xl">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-[var(--mut)]">{project.summary}</p>

          <div className="border-l-2 border-[var(--acc)] bg-black/[0.035] px-3 py-2 dark:bg-white/[0.045]">
            <span className="block font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--acc)]">
              {lang === 'es' ? 'resultado' : 'result'}
            </span>
            <span className="mt-0.5 block text-[11px] font-medium leading-snug text-[var(--ink)]">
              {project.metrics[0]}
            </span>
          </div>

          <div className="mt-1 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="-skew-x-[10deg] bg-[var(--ink)] px-2.5 py-0.5 text-[10px] font-semibold text-[var(--bg)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-2 pt-4">
            <Link
              href={`/proyectos/${project.id}`}
              className="btn-manga hot font-display flex-1 justify-center whitespace-nowrap text-xs sm:text-sm"
            >
              {detailLabel}
            </Link>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-manga font-display justify-center whitespace-nowrap text-xs sm:text-sm"
              aria-label={`${repoText}: ${project.title}`}
            >
              {repoText} ↗
            </a>
          </div>
        </div>
      </article>
    </div>
  );
};
