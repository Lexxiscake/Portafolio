import React from 'react';
import type { SkinId } from '@/lib/skins';

interface SkinMotifProps {
  skin: SkinId;
  className?: string;
  /** When provided, the motif is announced as an image with this label. */
  title?: string;
}

/**
 * Small original symbol for each skin. The SVG lives in `public/deco/skins.svg`
 * so all motifs share one cached file and inherit the current text color.
 */
export function SkinMotif({ skin, className, title }: SkinMotifProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <use href={`/deco/skins.svg#motif-${skin}`} />
    </svg>
  );
}
