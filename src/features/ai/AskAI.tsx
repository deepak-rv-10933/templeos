import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Sparkles } from 'lucide-react';
import type { LocalizedText } from '@/types';
import { useLocale } from '@/store/locale';
import { useDistricts } from '@/hooks/queries';
import { Dialog } from '@/components/ui/Dialog';
import { cn } from '@/utils/cn';

const SUGGESTIONS: LocalizedText[] = [
  { ta: 'தஞ்சாவூர் அருகே சிவன் கோயில்கள்', en: 'Find Shiva temples near Thanjavur' },
  { ta: 'இப்போது திறந்துள்ள கோயில்கள்', en: 'Temples open now' },
  { ta: 'ஆடியோ வழிகாட்டி உள்ள பாரம்பரிய கோயில்கள்', en: 'Heritage temples with audio guides' },
  { ta: 'மதுரையில் புகழ்பெற்ற அம்மன் கோயில்கள்', en: 'Famous Amman temples in Madurai' },
  { ta: 'விஷ்ணு கோயில்கள்', en: 'Vishnu temples' },
  { ta: 'சக்கர நாற்காலி அணுகல் கோயில்கள்', en: 'Wheelchair accessible temples' },
];

const DEITY_KEYWORDS: { match: RegExp; category: string }[] = [
  { match: /shiva|சிவ/i, category: 'shiva' },
  { match: /vishnu|perumal|விஷ்ணு|பெருமாள்/i, category: 'vishnu' },
  { match: /murugan|முருக/i, category: 'murugan' },
  { match: /amman|அம்மன்/i, category: 'amman' },
  { match: /navagraha|நவகிரக/i, category: 'navagraha' },
  { match: /divya|திவ்ய/i, category: 'divya-desam' },
  { match: /heritage|பாரம்பரிய/i, category: 'heritage' },
];

export function AskAI() {
  const { t, tx } = useLocale();
  const navigate = useNavigate();
  const districts = useDistricts();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');

  const run = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    const params = new URLSearchParams();

    const deity = DEITY_KEYWORDS.find((d) => d.match.test(trimmed));
    if (deity) params.set('category', deity.category);

    const district = districts.data?.find(
      (d) => trimmed.toLowerCase().includes(d.name.en.toLowerCase()) || trimmed.includes(d.name.ta),
    );
    if (district) params.set('district', district.id);

    if (/\bopen\b|now|crowd|திறந்த|இப்போது/i.test(trimmed)) params.set('openNow', '1');

    // If nothing structured matched, fall back to a plain text search.
    if ([...params.keys()].length === 0) params.set('search', trimmed);

    setOpen(false);
    setQ('');
    navigate(`/explore?${params.toString()}`);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-3 font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary-hover active:scale-95 md:bottom-6 md:right-6"
        aria-label={tx({ ta: 'நந்தியிடம் கேள்', en: 'Ask Nandi' })}
      >
        <Sparkles className="h-5 w-5" />
        <span className="hidden sm:inline">{tx({ ta: 'நந்தியிடம் கேள்', en: 'Ask Nandi' })}</span>
      </button>

      <Dialog open={open} onClose={() => setOpen(false)} title={tx({ ta: 'நந்தியிடம் கேள்', en: 'Ask Nandi' })}>
        <p className="-mt-2 mb-4 text-body text-muted">
          {tx({
            ta: 'உங்கள் ஆன்மீக கோயில் வழிகாட்டி. நீங்கள் தேடுவதை விவரியுங்கள்.',
            en: 'Your spiritual temple guide — describe what you’re looking for.',
          })}
        </p>

        <div className="mb-2 text-caption font-semibold uppercase tracking-wide text-muted">
          {tx({ ta: 'இப்படிக் கேளுங்கள்', en: 'Try asking' })}
        </div>
        <div className="space-y-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s.en}
              onClick={() => run(tx(s))}
              className="w-full rounded-full border border-border bg-surface px-4 py-2.5 text-left text-body text-text transition-colors hover:border-primary/40 hover:bg-violet-light"
            >
              “{tx(s)}”
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            run(q);
          }}
          className="mt-5 flex items-center gap-2"
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={tx({ ta: 'எ.கா. தஞ்சாவூர் அருகே சிவன் கோயில்…', en: 'e.g. Shiva temples near Thanjavur open now…' })}
            className="h-12 flex-1 rounded-full border border-border bg-surface px-4 text-body placeholder:text-muted focus:border-primary"
          />
          <button
            type="submit"
            disabled={!q.trim()}
            aria-label={t('action.search')}
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors',
              q.trim() ? 'bg-primary text-white hover:bg-primary-hover' : 'bg-violet-light text-muted',
            )}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </Dialog>
    </>
  );
}
