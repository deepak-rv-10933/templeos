import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import type { Temple } from '@/types';
import { useLocale } from '@/store/locale';
import { formatCompact } from '@/utils/format';
import { Badge } from '@/components/ui/Badge';
import { SmartImage } from '@/components/ui/SmartImage';

export function TempleCard({ temple }: { temple: Temple }) {
  const { tx, t } = useLocale();
  return (
    <Link
      to={`/temple/${temple.slug}`}
      className="group block overflow-hidden rounded-lg border border-border bg-surface shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <SmartImage
          src={temple.heroImage}
          alt={tx(temple.name)}
          className="transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          {temple.isOpenNow ? (
            <Badge tone="success" dot>
              {t('common.openNow')}
            </Badge>
          ) : (
            <Badge tone="default">{t('common.closed')}</Badge>
          )}
        </div>
        {temple.distanceKm !== undefined && (
          <div className="absolute right-3 top-3">
            <Badge tone="primary">
              {temple.distanceKm} {t('common.km')}
            </Badge>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 font-semibold text-text">{tx(temple.name)}</h3>
          <span className="flex shrink-0 items-center gap-1 text-caption font-medium text-text">
            <Star className="h-3.5 w-3.5 fill-warning text-warning" />
            {temple.rating}
          </span>
        </div>
        <p className="mt-1 flex items-center gap-1 text-caption text-muted">
          <MapPin className="h-3.5 w-3.5" />
          <span className="line-clamp-1">
            {tx(temple.deity.name)} · {tx(temple.town)}
          </span>
        </p>
        <p className="mt-2 text-caption text-muted">
          {formatCompact(temple.followers)} {t('common.followers')}
        </p>
      </div>
    </Link>
  );
}

export function TempleCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
      <div className="aspect-[4/3] animate-pulse bg-violet-light" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-2/3 animate-pulse rounded bg-violet-light" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-violet-light" />
      </div>
    </div>
  );
}
