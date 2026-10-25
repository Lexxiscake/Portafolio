import Link from 'next/link';
import { NotFoundMeta } from '@/components/NotFoundMeta';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[68vh] max-w-[1120px] flex-col justify-center px-6 py-14 sm:px-8">
      <NotFoundMeta title="404 · Página no encontrada | Luka Torres" />
      <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--acc)]">
        Error 404
      </p>
      <h1 className="font-display text-[clamp(52px,11vw,116px)] italic uppercase leading-[0.86]">
        Esta página{' '}
        <span className="block text-[var(--acc)]">no existe.</span>
      </h1>
      <p className="mt-5 max-w-xl text-base text-[var(--mut)]">
        Puede que el enlace esté mal escrito o que la página se haya movido. Revisa la dirección
        o vuelve al inicio.
      </p>

      <div className="mt-8 flex max-w-xl items-center gap-5 border-2 border-black bg-[var(--pn)] p-5 shadow-[6px_6px_0_var(--acc)] dark:border-white/20">
        <span className="font-display text-5xl italic leading-none text-[var(--acc)]">404</span>
        <p className="m-0 font-mono text-[11px] leading-relaxed text-[var(--mut)]">
          No hay una página en esta dirección. Puedes ver los proyectos o ir al inicio.
        </p>
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        <Link href="/" className="btn-manga hot font-display text-sm">
          Ir al inicio →
        </Link>
        <Link href="/proyectos" className="btn-manga font-display text-sm">
          Ver proyectos
        </Link>
      </div>
    </main>
  );
}
