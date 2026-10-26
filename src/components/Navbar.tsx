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
  const { lang, setLanguage, t } = useSite();
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
          <span className="nav-avatar-wrap relative inline-flex">
            <img
              src={AVATAR_IMAGE}
              alt="Avatar Luka"
              className="block h-10 w-10 rounded-full border-2 border-white object-cover transition-all duration-300 group-hover:-rotate-6 group-hover:scale-105 group-hover:border-[var(--acc)]"
            />
            <span className="nav-spark" aria-hidden="true">
              ✦
            </span>
          </span>
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
              className={`nav-link relative border-b-2 px-1 py-2 transition-all ${
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
            className={`lang-btn min-h-[36px] min-w-[36px] border-2 border-white text-xs font-semibold transition-colors hover:-translate-y-0.5 active:translate-y-0 sm:min-h-[40px] sm:min-w-[42px] sm:text-sm ${
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
            className={`lang-btn min-h-[36px] min-w-[36px] border-2 border-l-0 border-white text-xs font-semibold transition-colors hover:-translate-y-0.5 active:translate-y-0 sm:min-h-[40px] sm:min-w-[42px] sm:text-sm ${
              lang === 'en'
                ? 'border-[var(--acc)] bg-[var(--acc)] text-black'
                : 'bg-[#0a0a0a] text-white'
            }`}
          >
            EN
          </button>
        </div>

        <SkinPicker />

        <a
          href="https://github.com/Lexxiscake"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-manga github-link hidden gap-1.5 font-display text-xs sm:text-sm lg:inline-flex"
        >
          GitHub
          <span className="github-mark" aria-hidden="true">
            ↗
          </span>
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
          className="menu-toggle flex min-h-[36px] min-w-[36px] items-center justify-center border-2 border-white bg-[#0a0a0a] transition-colors hover:border-[var(--acc)] hover:bg-[var(--acc)] hover:text-black md:hidden"
        >
          <span
            className={`menu-icon ${menuOpen ? 'is-open' : ''}`}
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      {menuOpen ? (
        <div
          id="mobile-navigation"
          className="menu-panel border-t border-white/15 bg-[#0a0a0a] px-4 pb-4 pt-2 md:hidden"
        >
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`menu-item border-b border-white/10 py-3 font-display text-lg italic uppercase transition-colors ${
                  isActive(link.href)
                    ? 'text-[var(--acc)]'
                    : 'text-white hover:text-[var(--acc)]'
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
              className="menu-item github-link flex items-center gap-1.5 border-b border-white/10 py-3 font-display text-lg italic uppercase text-white hover:text-[var(--acc)]"
            >
              GitHub
              <span className="github-mark" aria-hidden="true">
                ↗
              </span>
            </a>
          </div>
        </div>
      ) : null}
    </nav>
  );
};
