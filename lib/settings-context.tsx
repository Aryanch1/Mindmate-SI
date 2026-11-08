import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { loadSettings, saveSettings } from './storage';
import { DEFAULT_SETTINGS, type AiSettings } from './types';

interface SettingsContextValue {
  settings: AiSettings;
  loaded: boolean;
  update: (patch: Partial<AiSettings>) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextValue>({
  settings: DEFAULT_SETTINGS,
  loaded: false,
  update: async () => undefined,
});

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AiSettings>(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    loadSettings().then((stored) => {
      if (mounted) {
        setSettings(stored);
        setLoaded(true);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const update = useCallback(async (patch: Partial<AiSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      void saveSettings(next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ settings, loaded, update }), [settings, loaded, update]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
  return useContext(SettingsContext);
}
