'use client';

import React, { ViewTransition } from 'react';
import { useSite } from '@/context/site-context';
import type { SkinId } from '@/lib/skins';

/**
 * Each skin gets a different motion signature. The class is applied by React
 * to the view-transition pseudo-elements, so the page body moves while the
 * navbar, footer, and background stay put.
 */
const TRANSITION_CLASS: Record<SkinId, string> = {
  persona: 'page-tx-persona',
  toga: 'page-tx-toga',
  yofukashi: 'page-tx-yofukashi',
  nichijou: 'page-tx-nichijou',
  killlakill: 'page-tx-killlakill',
  dregxmoon: 'page-tx-dregxmoon',
};

/**
 * Wraps a page body in a React ViewTransition.
 *
 * `enter` and `exit` only run when the page mounts or unmounts, so in-page
 * state changes (filters, form fields, language) never animate. Without
 * browser support the page simply swaps, with no fallback overlay.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const { skin } = useSite();
  const className = TRANSITION_CLASS[skin];

  return (
    <ViewTransition enter={className} exit={className} default="none">
      <div className="page-tx-body">{children}</div>
    </ViewTransition>
  );
}
