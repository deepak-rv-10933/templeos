import { Link } from 'react-router-dom';
import { MapPinned, Clock, Route as RouteIcon } from 'lucide-react';
import type { PilgrimageRoute } from '@/types';
import { useLocale } from '@/store/locale';
import { SmartImage } from '@/components/ui/SmartImage';

export function RouteCard({ route }: { route: PilgrimageRoute }) {
  const { tx, t } = useLocale();
  return (
    <Link
      to={`/routes/${route.id}`}
      className="group flex overflow-hidden rounded-lg border border-border bg-surface shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="w-28 shrink-0 sm:w-36">
        <SmartImage src={route.image} alt={tx(route.name)} className="h-full" />
      </div>
      <div className="flex flex-1 flex-col justify-center p-4">
        <h3 className="line-clamp-1 font-semibold text-text">{tx(route.name)}</h3>
        <p className="mt-1 line-clamp-2 text-caption text-muted">{tx(route.description)}</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-caption text-muted">
          <span className="inline-flex items-center gap-1">
            <MapPinned className="h-3.5 w-3.5" />
            {route.stops} {t('common.stops')}
          </span>
          <span className="inline-flex items-center gap-1">
            <RouteIcon className="h-3.5 w-3.5" />
            {route.distanceKm} {t('common.km')}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {route.durationDays} {t('common.days')}
          </span>
        </div>
      </div>
    </Link>
  );
}
