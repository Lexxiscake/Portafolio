'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_SKIN, SKIN_ORDER, SkinId } from '@/lib/skins';

const SKIN_KEY = 'skin';

export function useSkin() {
  const [skin, setSkinState] = useState<SkinId>(DEFAULT_SKIN);
  const [_secretUnlocked, setSecretUnlocked] = useState(false);

  useEffect(() => {
    // Force toga on production
    setSecretUnlocked(false);
    setSkinState(DEFAULT_SKIN);
    document.documentElement.dataset.skin = DEFAULT_SKIN;
    try {
      localStorage.setItem(SKIN_KEY, DEFAULT_SKIN);
    } catch {}
  }, []);

  const setSkin = useCallback((_next: SkinId) => {
    // In production, keep toga locked
    setSkinState(DEFAULT_SKIN);
    document.documentElement.dataset.skin = DEFAULT_SKIN;
  }, []);

  const unlockSecret = useCallback(() => {}, []);

  const availableSkins = useMemo(
    () => SKIN_ORDER,
    []
  );

  return { skin, setSkin, availableSkins, unlockSecret };
}
