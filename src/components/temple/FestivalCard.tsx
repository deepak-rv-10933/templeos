import { Link } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';
import type { Festival } from '@/types';
import { useLocale } from '@/store/locale';
import { formatDateRange } from '@/utils/format';
import { temples } from '@/services/mock/db';
import { Badge } from '@/components/ui/Badge';
import { SmartImage } from '@/components/ui/SmartImage';

/** Set `linkToTemple={false}` when the card already renders on that temple's
 *  own profile page (its Festivals tab) — linking there would be a no-op. */
export function FestivalCard({ festival, linkToTemple = true }: { festival: Festival; linkToTemple?: boolean }) {
  const { tx, t, lang } = useLocale();
  const slug = linkToTemple ? temples.find((tpl) => tpl.id === festival.templeId)?.slug : undefined;

  const inner = (
    <>
      <div className="aspect-[16/10] overflow-hidden">
        <SmartImage
          src={festival.image}
          alt={tx(festival.name)}
          className={slug ? 'transition-transform duration-500 group-hover:scale-[1.04]' : undefined}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-text/80 via-text/10 to-transparent" />
      {festival.isLive && (
        <div className="absolute left-3 top-3">
          <Badge tone="live" dot>
            {t('common.live')}
          </Badge>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
        <h3 className="text-h4 font-semibold">{tx(festival.name)}</h3>
        <p className="mt-0.5 line-clamp-1 text-caption text-white/85">{tx(festival.templeName)}</p>
        <p className="mt-2 flex items-center gap-1.5 text-caption text-white/85">
          <CalendarDays className="h-3.5 w-3.5" />
          {formatDateRange(festival.startDate, festival.endDate, lang)}
        </p>
      </div>
    </>
  );

  if (slug) {
    return (
      <Link
        to={`/temple/${slug}`}
        className="group relative block overflow-hidden rounded-lg border border-border shadow-sm transition-shadow duration-200 hover:shadow-md"
      >
        {inner}
      </Link>
    );
  }
  return <div className="relative overflow-hidden rounded-lg border border-border shadow-sm">{inner}</div>;
}
