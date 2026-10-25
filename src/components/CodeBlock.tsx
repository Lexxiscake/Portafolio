'use client';

import React, { useState } from 'react';

import { Language } from '@/lib/constants';

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  lang?: Language;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  title,
  lang = 'es',
}) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="overflow-hidden border-2 border-neutral-700 bg-[#0e0e14] shadow-[8px_8px_0_var(--acc)]">
      <div className="flex items-center justify-between gap-3 border-b border-[#2b2b35] bg-[#15151c] px-3 py-2">
        <span className="truncate font-mono text-[10px] uppercase tracking-[0.12em] text-[#8d897f]">
          {title ?? `snippet.${language}`}
        </span>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#6f6b63]">
            {language}
          </span>
          <button
            type="button"
            onClick={copy}
            className="border border-[#3a3b46] bg-[#1f2029] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-[#cfcbc2] transition-colors hover:border-[var(--acc)] hover:bg-[var(--acc)] hover:text-black"
          >
            {copied
              ? lang === 'es'
                ? 'copiado'
                : 'copied'
              : lang === 'es'
                ? 'copiar'
                : 'copy'}
          </button>
        </div>
      </div>

      <pre className="m-0 overflow-x-auto p-4 font-mono text-[11px] leading-relaxed text-[#e8e4da] sm:p-5 sm:text-xs">
        <code>{code}</code>
      </pre>
    </div>
  );
};
