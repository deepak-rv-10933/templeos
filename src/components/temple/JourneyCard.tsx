import { Award, HeartHandshake, Landmark, Sparkles } from 'lucide-react';
import type { JourneyRecap } from '@/types';
import { useLocale } from '@/store/locale';
import { formatInr } from '@/utils/format';

/** Annual "Temple Journey" recap (spec §9). */
export function JourneyCard({ journey }: { journey: JourneyRecap }) {
  const { tx, lang } = useLocale();
  const stats = [
    { icon: Landmark, value: journey.visits, label: lang === 'ta' ? 'தரிசனங்கள்' : 'Visits' },
    { icon: Sparkles, value: journey.pilgrimages, label: lang === 'ta' ? 'யாத்திரைகள்' : 'Pilgrimages' },
    { icon: Award, value: journey.heritageExplored, label: lang === 'ta' ? 'பாரம்பரியம்' : 'Heritage' },
  ];
  return (
    <div className="overflow-hidden rounded-xl border border-border shadow-md">
      <div
        className="p-6 text-white"
        style={{ backgroundImage: 'linear-gradient(135deg, #0f172a, #1e293b)' }}
      >
        <div className="text-caption uppercase tracking-wide opacity-85">
          {lang === 'ta' ? 'உங்கள் கோயில் பயணம்' : 'Your Temple Journey'}
        </div>
        <div className="text-display leading-none">{journey.year}</div>
        <div className="mt-2 flex items-center gap-1.5 text-body-lg">
          <HeartHandshake className="h-5 w-5" />
          {formatInr(journey.donationsInr)} {lang === 'ta' ? 'நன்கொடை' : 'donated'}
        </div>
      </div>
      <div className="grid grid-cols-3 divide-x divide-border bg-surface">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-1 py-4">
            <s.icon className="h-5 w-5 text-primary" />
            <div className="text-h4 tabular-nums">{s.value}</div>
            <div className="text-caption text-muted">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="border-t border-border bg-surface p-4">
        <div className="text-caption text-muted">
          {lang === 'ta' ? 'பிடித்த கோயில்' : 'Favourite temple'}
        </div>
        <div className="font-medium text-text">{tx(journey.favouriteTemple)}</div>
      </div>
    </div>
  );
}
