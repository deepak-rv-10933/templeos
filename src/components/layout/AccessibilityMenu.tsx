import { useEffect, useRef, useState } from 'react';
import { Accessibility, Check } from 'lucide-react';
import { useLocale } from '@/store/locale';
import { usePreferences } from '@/store/preferences';
import { cn } from '@/utils/cn';

export function AccessibilityMenu() {
  const { t } = useLocale();
  const { senior, highContrast, toggleSenior, toggleContrast } = usePreferences();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  const rows = [
    { label: t('a11y.senior'), active: senior, onToggle: toggleSenior },
    { label: t('a11y.contrast'), active: highContrast, onToggle: toggleContrast },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t('a11y.title')}
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-violet-light hover:text-text"
      >
        <Accessibility className="h-5 w-5" />
      </button>
      {open && (
        <div className="absolute right-0 top-11 z-40 w-60 rounded-lg border border-border bg-surface p-2 shadow-lg">
          <div className="px-2 py-1.5 text-caption font-semibold text-muted">{t('a11y.title')}</div>
          {rows.map((row) => (
            <button
              key={row.label}
              onClick={row.onToggle}
              className="flex w-full items-center justify-between rounded-md px-2 py-2 text-body transition-colors hover:bg-violet-light"
            >
              <span>{row.label}</span>
              <span
                className={cn(
                  'flex h-5 w-5 items-center justify-center rounded-full border',
                  row.active ? 'border-primary bg-primary text-white' : 'border-border',
                )}
              >
                {row.active && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
