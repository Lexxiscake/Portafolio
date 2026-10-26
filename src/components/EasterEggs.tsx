'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useSite } from '@/context/site-context';
import { SKINS } from '@/lib/skins';

const KONAMI = [
  'arrowup',
  'arrowup',
  'arrowdown',
  'arrowdown',
  'arrowleft',
  'arrowright',
  'arrowleft',
  'arrowright',
  'b',
  'a',
];

function isEditable(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
}

export const EasterEggs: React.FC = () => {
  const { skin, lang, unlockSecret } = useSite();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [unlockedMessage, setUnlockedMessage] = useState(false);

  // Handlers registered once read the latest skin/lang through refs.
  const skinRef = useRef(skin);
  const unlockRef = useRef(unlockSecret);
  useEffect(() => {
    skinRef.current = skin;
    unlockRef.current = unlockSecret;
  }, [skin, unlockSecret]);

  useEffect(() => {
    // 1. Scroll progress bar
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 2. SFX click bursts on manga buttons (list depends on the active skin)
    const spawnBurst = (text: string, x: number, y: number) => {
      const span = document.createElement('span');
      span.className = 'sfx burst';
      span.textContent = text;
      span.style.left = `${x}px`;
      span.style.top = `${y}px`;
      document.body.appendChild(span);
      setTimeout(() => span.remove(), 520);
    };

    const handlePointerDown = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('.btn-manga, .ib, .lg');
      if (!target) return;

      const list = SKINS[skinRef.current].sfx;
      spawnBurst(list[Math.floor(Math.random() * list.length)], e.clientX, e.clientY);
    };
    document.addEventListener('pointerdown', handlePointerDown);

    // 3. Konami code unlocks the hidden skin
    let progress = 0;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isEditable(e.target)) return;

      const key = e.key.toLowerCase();
      progress = key === KONAMI[progress] ? progress + 1 : key === KONAMI[0] ? 1 : 0;

      if (progress === KONAMI.length) {
        progress = 0;
        unlockRef.current();
        spawnBurst('月', window.innerWidth / 2, window.innerHeight / 2);
        setUnlockedMessage(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // 4. Developer console note
    console.log(
      '%cLuka Torres %c— software, datos y Linux\n%chttps://github.com/Lexxiscake',
      'color:#FF2E63;font:600 14px sans-serif;',
      'color:#8d897f;font:12px sans-serif;',
      'color:#00E5FF;font:11px monospace;'
    );

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!unlockedMessage) return;
    const timer = setTimeout(() => setUnlockedMessage(false), 5000);
    return () => clearTimeout(timer);
  }, [unlockedMessage]);

  return (
    <>
      {/* Scroll indicator bar */}
      <div
        id="bar"
        className="fixed left-0 right-0 top-0 h-1 bg-[var(--acc)] origin-left z-50 transition-transform duration-75"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {unlockedMessage ? (
        <div
          role="status"
          className="fixed bottom-4 right-4 z-[70] max-w-[300px] border-2 border-white bg-[#0a0a0a] p-3 font-mono text-xs text-white shadow-[5px_5px_0_var(--acc)]"
        >
          {lang === 'es'
            ? 'Skin secreta desbloqueada: Dregxmoon. Prueba la tecla ` para abrir una terminal.'
            : 'Secret skin unlocked: Dregxmoon. Try the ` key to open a terminal.'}
        </div>
      ) : null}
    </>
  );
};
