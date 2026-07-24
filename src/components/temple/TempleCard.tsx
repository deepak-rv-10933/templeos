import { Link } from 'react-router-dom';
import { MapPin, Navigation, Star, Users } from 'lucide-react';
import type { LocalizedText, Temple } from '@/types';
import { useLocale } from '@/store/locale';
import { cn } from '@/utils/cn';
import { SmartImage } from '@/components/ui/SmartImage';

type CrowdTone = 'low' | 'moderate' | 'heavy';

/** Deterministic crowd level derived from popularity (mock stand-in for live data). */
function crowdLevel(temple: Temple): { label: LocalizedText; tone: CrowdTone } {
  if (temple.followers > 150000) return { label: { ta: 'அதிக கூட்டம்', en: 'Heavy crowd' }, tone: 'heavy' };
  if (temple.followers > 80000) return { label: { ta: 'மிதமான கூட்டம்', en: 'Moderate crowd' }, tone: 'moderate' };
  return { label: { ta: 'குறைந்த கூட்டம்', en: 'Low crowd' }, tone: 'low' };
}

const crowdColor: Record<CrowdTone, string> = {
  low: 'text-success',
  moderate: 'text-[#B45309]',
  heavy: 'text-danger',
};

/** Derived review count from followers (mock stand-in). */
function reviewCount(temple: Temple): number {
  return Math.max(1200, Math.round(temple.followers / 12));
}

/** Five stars with fractional fill for the rating. */
function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} / 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className="relative inline-block h-3.5 w-3.5">
            <Star className="absolute inset-0 h-3.5 w-3.5 text-warning/25" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="h-3.5 w-3.5 fill-warning text-warning" />
            </span>
          </span>
        );
      })}
    </span>
  );
}

/** Light pill used for the status overlays on the photo. */
function StatusPill({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-caption font-medium shadow-sm backdrop-blur-sm',
        className,
      )}
    >
      {children}
    </span>
  );
}

export function TempleCard({ temple }: { temple: Temple }) {
  const { tx } = useLocale();
  const crowd = crowdLevel(temple);

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
        {/* Status overlays — justify-between so the two pills never collide */}
        <div className="absolute inset-x-3 top-3 flex items-start justify-between gap-2">
          <StatusPill className="shrink-0">
            <span className={cn('h-1.5 w-1.5 rounded-full', temple.isOpenNow ? 'bg-success' : 'bg-muted')} />
            <span className={temple.isOpenNow ? 'text-success' : 'text-muted'}>
              {temple.isOpenNow ? tx({ ta: 'திறந்து', en: 'Open' }) : tx({ ta: 'மூடி', en: 'Closed' })}
            </span>
          </StatusPill>
          {temple.isOpenNow && (
            <StatusPill className={cn('min-w-0', crowdColor[crowd.tone])}>
              <Users className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{tx(crowd.label)}</span>
            </StatusPill>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 font-semibold text-text">{tx(temple.name)}</h3>
        <p className="mt-0.5 line-clamp-1 text-caption text-muted">{tx(temple.deity.name)}</p>

        <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-caption text-muted">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            <span className="line-clamp-1">{tx(temple.town)}</span>
          </span>
          {temple.distanceKm !== undefined && (
            <span className="inline-flex items-center gap-1">
              <Navigation className="h-3.5 w-3.5" />
              {temple.distanceKm.toFixed(1)} {tx({ ta: 'கி.மீ', en: 'km' })}
            </span>
          )}
        </p>

        <div className="mt-2.5 flex items-center gap-1.5">
          <Stars rating={temple.rating} />
          <span className="text-caption font-semibold text-text">{temple.rating.toFixed(1)}</span>
          <span className="text-caption text-muted">({reviewCount(temple).toLocaleString('en-IN')})</span>
        </div>
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
        <div className="h-3 w-1/3 animate-pulse rounded bg-violet-light" />
      </div>
    </div>
  );
}
