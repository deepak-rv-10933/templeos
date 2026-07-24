import { MapPin } from 'lucide-react';
import type { GeoPoint, Temple } from '@/types';
import { useLocale } from '@/store/locale';
import { cn } from '@/utils/cn';

/**
 * Map abstraction (spec §3 "Mapbox abstraction").
 *
 * This is a dependency-free static preview that plots temples on a stylised TN
 * canvas. The prop shape mirrors what a real Mapbox component would take, so it
 * can be swapped for an interactive map without changing callers.
 */

// Rough bounding box of Tamil Nadu for normalising coordinates → 0..1.
const TN_BOUNDS = { minLat: 8.0, maxLat: 13.6, minLng: 76.2, maxLng: 80.4 };

function project({ lat, lng }: GeoPoint) {
  const x = ((lng - TN_BOUNDS.minLng) / (TN_BOUNDS.maxLng - TN_BOUNDS.minLng)) * 100;
  const y = ((TN_BOUNDS.maxLat - lat) / (TN_BOUNDS.maxLat - TN_BOUNDS.minLat)) * 100;
  return { x: Math.max(4, Math.min(96, x)), y: Math.max(6, Math.min(94, y)) };
}

export function TempleMap({
  temples,
  className,
  onSelect,
}: {
  temples: Temple[];
  className?: string;
  onSelect?: (t: Temple) => void;
}) {
  const { tx } = useLocale();
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border border-border bg-violet-light',
        className,
      )}
      style={{
        backgroundImage:
          'linear-gradient(0deg, rgba(124,108,242,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(124,108,242,0.06) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
      role="group"
      aria-label="Temple locations map"
    >
      {temples.map((t) => {
        const { x, y } = project(t.location);
        return (
          <button
            key={t.id}
            onClick={() => onSelect?.(t)}
            className="group absolute -translate-x-1/2 -translate-y-full"
            style={{ left: `${x}%`, top: `${y}%` }}
            title={tx(t.name)}
            aria-label={tx(t.name)}
          >
            <MapPin
              className="h-6 w-6 fill-primary/20 text-primary drop-shadow-sm transition-transform group-hover:scale-125"
              strokeWidth={2}
            />
            <span className="pointer-events-none absolute left-1/2 top-full hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-text px-2 py-1 text-caption text-white group-hover:block">
              {tx(t.name)}
            </span>
          </button>
        );
      })}
      <div className="pointer-events-none absolute bottom-2 right-3 text-caption text-muted">
        Tamil Nadu · {temples.length} temples
      </div>
    </div>
  );
}
