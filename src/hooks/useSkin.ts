'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { DEFAULT_SKIN, SKIN_ORDER, SKINS, SkinId, isSkinId } from '@/lib/skins';

const SKIN_KEY = 'skin';
const SECRET_KEY = 'skin-secret';

export function useSkin() {
  const [skin, setSkinState] = useState<SkinId>(DEFAULT_SKIN);
  const [secretUnlocked, setSecretUnlocked] = useState(false);

  useEffect(() => {
    try {
      const unlocked = localStorage.getItem(SECRET_KEY) === '1';
      setSecretUnlocked(unlocked);

      const saved = localStorage.getItem(SKIN_KEY);
      if (isSkinId(saved) && (unlocked || !SKINS[saved].hidden)) {
        setSkinState(saved);
        document.documentElement.dataset.skin = saved;
      } else {
        document.documentElement.dataset.skin = DEFAULT_SKIN;
      }
    } catch {
      document.documentElement.dataset.skin = DEFAULT_SKIN;
    }
  }, []);

  const setSkin = useCallback((next: SkinId) => {
    setSkinState(next);
    document.documentElement.dataset.skin = next;
    try {
      localStorage.setItem(SKIN_KEY, next);
    } catch {}
  }, []);

  const unlockSecret = useCallback(() => {
    setSecretUnlocked(true);
    try {
      localStorage.setItem(SECRET_KEY, '1');
    } catch {}
    setSkin('dregxmoon');
  }, [setSkin]);

  const availableSkins = useMemo(
    () => SKIN_ORDER.filter((id) => secretUnlocked || !SKINS[id].hidden),
    [secretUnlocked]
  );

  return { skin, setSkin, availableSkins, unlockSecret };
}
