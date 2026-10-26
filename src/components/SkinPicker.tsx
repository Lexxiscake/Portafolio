'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { useSite } from '@/context/site-context';
import { SKINS, SkinId } from '@/lib/skins';

function Swatch({ id }: { id: SkinId }) {
  const [a, b] = SKINS[id].swatch;
  return (
    <span
      aria-hidden="true"
      className="skin-swatch inline-block h-4 w-4 shrink-0 rounded-full border border-white"
      style={{ background: `linear-gradient(135deg, ${a} 50%, ${b} 50%)` }}
    />
  );
}

function SkinList({ onPick }: { onPick?: () => void }) {
  const { skin, setSkin, availableSkins } = useSite();

  return (
    <ul className="m-0 flex list-none flex-col p-0">
      {availableSkins.map((id) => (
        <li key={id}>
          <button
            type="button"
            aria-pressed={skin === id}
            onClick={() => {
              setSkin(id);
              onPick?.();
            }}
            className={`skin-option flex min-h-[44px] w-full items-center gap-3 border-b border-white/10 px-3 py-2 text-left font-display text-base italic uppercase hover:bg-[var(--acc)] hover:text-black ${
              skin === id ? 'text-[var(--acc)]' : 'text-white'
            }`}
          >
            <Swatch id={id} />
            <span className="flex-1">{SKINS[id].label}</span>
            {skin === id ? (
              <span className="skin-dot" aria-hidden="true">
                ●
              </span>
            ) : null}
          </button>
        </li>
      ))}
    </ul>
  );
}

/** Always-visible list, used inside the mobile menu. */
export function SkinPickerInline() {
  const { lang } = useSite();

  return (
    <div className="border-b border-white/10 py-3">
      <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">
        {lang === 'es' ? 'Skin del sitio' : 'Site skin'}
      </p>
      <SkinList />
    </div>
  );
}

/** Button + popover, used in the desktop navbar. */
export function SkinPicker() {
  const { lang, skin } = useSite();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative hidden md:block">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={
          (lang === 'es' ? 'Cambiar skin. Actual: ' : 'Change skin. Current: ') + SKINS[skin].label
        }
        className="skin-trigger flex min-h-[36px] min-w-[36px] items-center justify-center border-2 border-white bg-[#0a0a0a] transition-colors hover:border-[var(--acc)] sm:min-h-[40px] sm:min-w-[42px]"
      >
        <Swatch id={skin} />
      </button>

      {open ? (
        <div
          id={panelId}
          className="skin-panel absolute right-0 top-full z-50 mt-2 w-64 border-2 border-white bg-[#0a0a0a] shadow-[5px_5px_0_var(--acc)]"
        >
          <SkinList onPick={() => setOpen(false)} />
        </div>
      ) : null}
    </div>
  );
}
