import { Link } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';
import { useFestivals } from '@/hooks/queries';
import { useLocale } from '@/store/locale';
import { formatDate } from '@/utils/format';
import { SectionHeader } from '@/components/common/SectionHeader';
import { SmartImage } from '@/components/ui/SmartImage';

/** Compact list of upcoming (not-yet-live) festivals. */
export function UpcomingFestivals() {
  const { tx, lang } = useLocale();
  const festivals = useFestivals();
  const upcoming = (festivals.data ?? []).filter((f) => !f.isLive).slice(0, 4);
  const list = upcoming.length ? upcoming : (festivals.data ?? []).slice(0, 4);

  return (
    <div>
      <SectionHeader title={tx({ ta: 'வரவிருக்கும் திருவிழாக்கள்', en: 'Upcoming festivals' })} to="/updates" />
      <div className="rounded-lg border border-border bg-surface shadow-sm">
        <ul className="divide-y divide-border">
          {list.map((f) => (
            <li key={f.id}>
              <Link to="/updates" className="flex items-center gap-3 p-3 transition-colors hover:bg-violet-light">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md">
                  <SmartImage src={f.image} alt={tx(f.name)} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="line-clamp-1 font-medium text-text">{tx(f.name)}</div>
                  <div className="line-clamp-1 text-caption text-muted">{tx(f.templeName)}</div>
                </div>
                <div className="flex shrink-0 items-center gap-1 text-caption text-muted">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {formatDate(f.startDate, lang)}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
