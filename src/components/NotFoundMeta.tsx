'use client';

import { useEffect } from 'react';

interface NotFoundMetaProps {
  title: string;
}

/**
 * Next.js 14 does not apply metadata exported from `not-found.tsx` to
 * unmatched routes, and the root layout title wins during hydration.
 * This keeps the browser tab and robots directive accurate without
 * affecting rendered content.
 */
export function NotFoundMeta({ title }: NotFoundMetaProps) {
  useEffect(() => {
    document.title = title;

    document.querySelectorAll('meta[name="robots"]').forEach((meta) => meta.remove());

    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex, nofollow';
    document.head.appendChild(robots);
  }, [title]);

  return null;
}
