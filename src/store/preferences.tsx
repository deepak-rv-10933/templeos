import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

/** Accessibility preferences (spec §20). Applied as data-attributes on <html>. */
interface PreferencesContextValue {
  senior: boolean;
  highContrast: boolean;
  toggleSenior: () => void;
  toggleContrast: () => void;
}

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

const SENIOR_KEY = 'templeos.a11y.senior';
const CONTRAST_KEY = 'templeos.a11y.contrast';

function readBool(key: string): boolean {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(key) === '1';
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [senior, setSenior] = useState(() => readBool(SENIOR_KEY));
  const [highContrast, setHighContrast] = useState(() => readBool(CONTRAST_KEY));

  useEffect(() => {
    const root = document.documentElement;
    if (senior) root.setAttribute('data-a11y', 'senior');
    else root.removeAttribute('data-a11y');
    window.localStorage.setItem(SENIOR_KEY, senior ? '1' : '0');
  }, [senior]);

  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) root.setAttribute('data-contrast', 'high');
    else root.removeAttribute('data-contrast');
    window.localStorage.setItem(CONTRAST_KEY, highContrast ? '1' : '0');
  }, [highContrast]);

  const value = useMemo<PreferencesContextValue>(
    () => ({
      senior,
      highContrast,
      toggleSenior: () => setSenior((s) => !s),
      toggleContrast: () => setHighContrast((c) => !c),
    }),
    [senior, highContrast],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePreferences(): PreferencesContextValue {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error('usePreferences must be used within <PreferencesProvider>');
  return ctx;
}
