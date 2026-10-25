'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSite } from '@/context/site-context';
import { submitContact } from '@/lib/api-client';

interface FormState {
  name: string;
  email: string;
  message: string;
}

export const Contact: React.FC = () => {
  const { lang, t } = useSite();
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<{
    loading: boolean;
    message: string;
    error?: boolean;
    mailto?: string;
  }>({ loading: false, message: '' });

  const update = (field: keyof FormState, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus({ loading: true, message: '' });

    const response = await submitContact(form);

    if (response.success) {
      setStatus({
        loading: false,
        message: response.message,
        error: false,
        mailto: response.mailto,
      });
      setForm({ name: '', email: '', message: '' });
    } else {
      setStatus({
        loading: false,
        message: response.message || (lang === 'es' ? 'No se pudo enviar el mensaje.' : 'Could not send the message.'),
        error: true,
        mailto: response.mailto,
      });
    }
  };

  return (
    <main className="mx-auto max-w-[1120px] px-6 pb-10 pt-10 sm:px-8 sm:pt-12">
      <header className="border-b-2 border-ink/20 pb-8">
        <p className="mb-3 inline-block -skew-x-[10deg] bg-black px-3.5 py-1 font-mono text-[11px] font-semibold tracking-wide text-white">
          {lang === 'es' ? 'CONTACTO / 2026' : 'CONTACT / 2026'}
        </p>
        <h1 className="max-w-[900px] font-display text-[clamp(44px,9vw,90px)] italic uppercase leading-[0.88]">
          {lang === 'es' ? 'Escríbeme' : 'Write to me'}
          <span className="text-[var(--acc)]">.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base text-[var(--mut)] sm:text-lg">{t.cp}</p>
      </header>

      <div className="mt-9 grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section>
          <div className="border-2 border-black bg-[var(--pn)] p-5 shadow-[6px_6px_0_var(--acc)] dark:border-white/20">
            <p className="mb-3 border-b border-ink/15 pb-2 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--acc)]">
              {lang === 'es' ? 'contacto directo' : 'direct contact'}
            </p>

            <div className="space-y-2 font-mono text-[11px]">
              <a
                href="mailto:lukaleonardojesus@gmail.com"
                className="flex items-center justify-between gap-3 border border-ink/20 px-3 py-2 transition-colors hover:border-[var(--acc)] hover:bg-accent/10"
              >
                <span className="text-[var(--mut)]">{lang === 'es' ? 'correo' : 'email'}</span>
                <span className="text-right font-semibold text-[var(--ink)]">
                  lukaleonardojesus@gmail.com
                </span>
              </a>
              <a
                href="https://github.com/Lexxiscake"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 border border-ink/20 px-3 py-2 transition-colors hover:border-[var(--acc)] hover:bg-accent/10"
              >
                <span className="text-[var(--mut)]">github</span>
                <span className="text-right font-semibold text-[var(--ink)]">
                  github.com/Lexxiscake ↗
                </span>
              </a>
              <div className="flex items-center justify-between gap-3 border border-ink/20 px-3 py-2">
                <span className="text-[var(--mut)]">{lang === 'es' ? 'ubicación' : 'location'}</span>
                <span className="text-right font-semibold text-[var(--ink)]">
                  Tijuana, MX · UTC-7
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 border-2 border-black bg-[var(--pn)] p-5 dark:border-white/20">
            <p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--acc)]">
              {lang === 'es' ? 'para que pueda responder bien' : 'so I can answer well'}
            </p>
            <ul className="m-0 list-none space-y-2 p-0 text-sm text-[var(--mut)]">
              {(lang === 'es'
                ? [
                    'Qué quieres construir o arreglar.',
                    'Qué has probado y qué no funcionó.',
                    'Las restricciones que tienes: tiempo, stack o presupuesto.',
                    'Si aplica, enlaces al código o a un error concreto.',
                  ]
                : [
                    'What you want to build or fix.',
                    'What you have tried and what did not work.',
                    'Your constraints: time, stack, or budget.',
                    'If relevant, links to the code or a specific error.',
                  ]
              ).map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-0.5 font-mono text-[var(--acc)]">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/proyectos" className="btn-manga font-display text-sm">
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
        </section>

        <section className="border-4 border-black bg-[var(--pn)] p-5 shadow-[10px_10px_0_var(--acc)] dark:border-white/20 sm:p-7">
          <div className="mb-5 flex items-center justify-between gap-3 border-b-2 border-ink/15 pb-3">
            <h2 className="font-display text-2xl italic uppercase leading-none">
              {lang === 'es' ? 'Enviar mensaje' : 'Send a message'}
            </h2>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--mut)]">
              {lang === 'es' ? 'formulario' : 'form'}
            </span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--mut)]">
                  {lang === 'es' ? 'nombre' : 'name'}
                </span>
                <input
                  type="text"
                  required
                  maxLength={80}
                  value={form.name}
                  onChange={(event) => update('name', event.target.value)}
                  className="min-h-[42px] w-full border-2 border-black bg-[var(--bg)] px-3 text-sm text-[var(--ink)] outline-none transition-colors focus:border-[var(--acc)] dark:border-white/25"
                  placeholder={lang === 'es' ? 'Tu nombre' : 'Your name'}
                />
              </label>

              <label className="block">
                <span className="mb-1 block font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--mut)]">
                  email
                </span>
                <input
                  type="email"
                  required
                  maxLength={160}
                  value={form.email}
                  onChange={(event) => update('email', event.target.value)}
                  className="min-h-[42px] w-full border-2 border-black bg-[var(--bg)] px-3 text-sm text-[var(--ink)] outline-none transition-colors focus:border-[var(--acc)] dark:border-white/25"
                  placeholder={lang === 'es' ? 'tu@correo.com' : 'you@email.com'}
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1 flex items-center justify-between font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[var(--mut)]">
                <span>{lang === 'es' ? 'mensaje' : 'message'}</span>
                <span>{form.message.length}/3000</span>
              </span>
              <textarea
                required
                rows={7}
                maxLength={3000}
                value={form.message}
                onChange={(event) => update('message', event.target.value)}
                className="w-full resize-y border-2 border-black bg-[var(--bg)] p-3 text-sm leading-relaxed text-[var(--ink)] outline-none transition-colors focus:border-[var(--acc)] dark:border-white/25"
                placeholder={
                  lang === 'es'
                    ? 'Qué quieres hacer, qué has probado y qué restricciones tienes…'
                    : 'What you want to do, what you have tried, and your constraints…'
                }
              />
            </label>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/15 pt-4">
              <p className="m-0 max-w-[280px] font-mono text-[9px] leading-relaxed text-[var(--mut)]">
                {lang === 'es'
                  ? 'El formulario se valida en el servidor. Si el envío directo no está disponible, se abre un borrador en tu cliente de correo.'
                  : 'The form is validated on the server. If direct delivery is unavailable, a draft opens in your mail client.'}
              </p>
              <button
                type="submit"
                disabled={status.loading}
                className="btn-manga hot font-display text-sm disabled:cursor-wait disabled:opacity-60"
              >
                {status.loading
                  ? lang === 'es'
                    ? 'Enviando…'
                    : 'Sending…'
                  : lang === 'es'
                    ? 'Enviar mensaje →'
                    : 'Send message →'}
              </button>
            </div>

            <div aria-live="polite">
              {status.message ? (
                <div
                  className={`border-l-4 p-3 font-mono text-[10px] leading-relaxed ${
                    status.error
                      ? 'border-red-500 bg-red-500/10 text-red-500'
                      : 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  <p className="m-0">{status.message}</p>
                  {status.mailto ? (
                    <a
                      href={status.mailto}
                      className="mt-2 inline-block font-bold underline underline-offset-2"
                    >
                      {lang === 'es'
                        ? 'Abrir borrador en tu cliente de correo →'
                        : 'Open draft in your mail client →'}
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};
