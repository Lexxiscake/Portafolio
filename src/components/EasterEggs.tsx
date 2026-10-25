'use client';
import React, { useEffect, useState } from 'react';

export const EasterEggs: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // 1. Scroll progress bar
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 2. SFX click bursts on manga buttons
    const SFX_LIST = ['ドン!', 'ポン!', 'カッ!', 'ピカッ', 'バシッ'];
    const handlePointerDown = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('.btn-manga, .ib, .lg');
      if (!target) return;

      const span = document.createElement('span');
      span.className = 'sfx burst';
      span.textContent = SFX_LIST[Math.floor(Math.random() * SFX_LIST.length)];
      span.style.left = `${e.clientX}px`;
      span.style.top = `${e.clientY}px`;
      document.body.appendChild(span);
      setTimeout(() => span.remove(), 520);
    };
    document.addEventListener('pointerdown', handlePointerDown);

    // 3. Developer console note
    console.log(
      '%cLuka Torres %c— backend, datos y Linux\n%chttps://github.com/Lexxiscake',
      'color:#FF2E63;font:600 14px sans-serif;',
      'color:#8d897f;font:12px sans-serif;',
      'color:#00E5FF;font:11px monospace;'
    );

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return (
    <>
      {/* Scroll indicator bar */}
      <div
        id="bar"
        className="fixed left-0 right-0 top-0 h-1 bg-[var(--acc)] origin-left z-50 transition-transform duration-75"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
    </>
  );
};
