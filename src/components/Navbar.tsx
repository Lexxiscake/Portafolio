'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AVATAR_IMAGE } from '@/lib/constants';
import { useSite } from '@/context/site-context';
import { SkinPicker, SkinPickerInline } from '@/components/SkinPicker';
import { NavDrips } from '@/components/SkinEffects';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { lang, setLanguage, isDark, toggleTheme, t } = useSite();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const navLinks = [
    { href: '/', label: lang === 'es' ? 'Inicio' : 'Home' },
    { href: '/proyectos', label: t.np },
    { href: '/sobre-mi', label: t.na },
    { href: '/otaku', label: 'Otaku' },
    { href: '/contacto', label: t.nc },
  ];

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <nav className="sticky top-0 z-40 border-b-4 border-[var(--acc)] bg-[#0a0a0a] text-white">
      <NavDrips />
      <div className="mx-auto flex max-w-[1280px] items-center gap-2 px-4 py-2 sm:gap-4 sm:px-7">
        <Link href="/" className="group flex shrink-0 items-center gap-2">
          <img
            src={AVATAR_IMAGE}
            alt="Avatar Luka"
            className="block h-10 w-10 rounded-full border-2 border-white object-cover transition-colors group-hover:border-[var(--acc)]"
          />
          <span className="hidden font-display text-lg italic tracking-wider sm:inline">
            LUKA
          </span>
        </Link>

        <div className="hidden items-center gap-3 font-semibold text-sm md:flex lg:gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`border-b-2 px-1 py-2 transition-all ${
                isActive(link.href)
                  ? 'border-[var(--acc)] font-bold text-[var(--acc)]'
                  : 'border-transparent hover:border-[var(--acc)]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex-1" />

        <div className="flex" role="group" aria-label={lang === 'es' ? 'Idioma' : 'Language'}>
          <button
            type="button"
            onClick={() => setLanguage('es')}
            aria-pressed={lang === 'es'}
            className={`min-h-[36px] min-w-[36px] border-2 border-white text-xs font-semibold transition-colors sm:min-h-[40px] sm:min-w-[42px] sm:text-sm ${
              lang === 'es'
                ? 'border-[var(--acc)] bg-[var(--acc)] text-black'
                : 'bg-[#0a0a0a] text-white'
            }`}
          >
            ES
          </button>
          <button
            type="button"
            onClick={() => setLanguage('en')}
            aria-pressed={lang === 'en'}
            className={`min-h-[36px] min-w-[36px] border-2 border-l-0 border-white text-xs font-semibold transition-colors sm:min-h-[40px] sm:min-w-[42px] sm:text-sm ${
              lang === 'en'
                ? 'border-[var(--acc)] bg-[var(--acc)] text-black'
                : 'bg-[#0a0a0a] text-white'
            }`}
          >
            EN
          </button>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={lang === 'es' ? 'Cambiar tema' : 'Toggle theme'}
          className="flex min-h-[36px] min-w-[36px] items-center justify-center border-2 border-white bg-[#0a0a0a] transition-colors hover:border-[var(--acc)] hover:bg-[var(--acc)] hover:text-black sm:min-h-[40px] sm:min-w-[42px]"
        >
          {isDark ? (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
            </svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            </svg>
          )}
        </button>

        <SkinPicker />

        <a
          href="https://github.com/Lexxiscake"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-manga hidden font-display text-xs sm:text-sm lg:inline-flex"
        >
          GitHub ↗
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={
            menuOpen
              ? lang === 'es'
                ? 'Cerrar menú'
                : 'Close menu'
              : lang === 'es'
                ? 'Abrir menú'
                : 'Open menu'
          }
          className="flex min-h-[36px] min-w-[36px] items-center justify-center border-2 border-white bg-[#0a0a0a] text-lg transition-colors hover:border-[var(--acc)] hover:bg-[var(--acc)] hover:text-black md:hidden"
        >
          {menuOpen ? '×' : '☰'}
        </button>
      </div>

      {menuOpen ? (
        <div
          id="mobile-navigation"
          className="border-t border-white/15 bg-[#0a0a0a] px-4 pb-4 pt-2 md:hidden"
        >
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`border-b border-white/10 py-3 font-display text-lg italic uppercase ${
                  isActive(link.href) ? 'text-[var(--acc)]' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <SkinPickerInline />
            <a
              href="https://github.com/Lexxiscake"
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-white/10 py-3 font-display text-lg italic uppercase text-white"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      ) : null}
    </nav>
  );
};
