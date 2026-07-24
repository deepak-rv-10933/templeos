import { useLocale } from '@/store/locale';
import { cn } from '@/utils/cn';

export function LanguageToggle() {
  const { lang, setLang } = useLocale();
  return (
    <div
      className="inline-flex rounded-full border border-border bg-surface p-0.5"
      role="group"
      aria-label="Language"
    >
      {(['ta', 'en'] as const).map((code) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={cn(
            'rounded-full px-3 py-1 text-caption font-medium transition-colors',
            lang === code ? 'bg-primary text-primary-foreground' : 'text-muted hover:text-text',
          )}
        >
          {code === 'ta' ? 'த' : 'EN'}
        </button>
      ))}
    </div>
  );
}
