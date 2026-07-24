import { CalendarDays } from 'lucide-react';
import type { Festival } from '@/types';
import { useLocale } from '@/store/locale';
import { formatDateRange } from '@/utils/format';
import { Badge } from '@/components/ui/Badge';
import { SmartImage } from '@/components/ui/SmartImage';

export function FestivalCard({ festival }: { festival: Festival }) {
  const { tx, t, lang } = useLocale();
  return (
    <div className="group relative overflow-hidden rounded-lg border border-border shadow-sm">
      <div className="aspect-[16/10] overflow-hidden">
        <SmartImage
          src={festival.image}
          alt={tx(festival.name)}
          className="transition-transform duration-500 group-hover:scale-[1.04]"
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
    </div>
  );
}
