import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { LocalizedText } from '@/types';
import { strings, type Lang } from '@/i18n/strings';

const STORAGE_KEY = 'templeos.lang';

interface LocaleContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  /** Resolve a LocalizedText (domain content) to the active language. */
  tx: (value: LocalizedText | undefined) => string;
  /** Resolve a UI string by dotted key, e.g. t('nav.home'). */
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readInitial(): Lang {
  if (typeof window === 'undefined') return 'ta';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === 'en' || stored === 'ta' ? stored : 'ta'; // Tamil-first default
}

function lookup(key: string): LocalizedText | undefined {
  return key.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, strings) as LocalizedText | undefined;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitial);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LocaleContextValue>(() => {
    const tx = (v: LocalizedText | undefined) => (v ? v[lang] : '');
    const t = (key: string) => {
      const leaf = lookup(key);
      return leaf ? leaf[lang] : key;
    };
    return {
      lang,
      setLang,
      toggleLang: () => setLang(lang === 'ta' ? 'en' : 'ta'),
      tx,
      t,
    };
  }, [lang, setLang]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within <LocaleProvider>');
  return ctx;
}
