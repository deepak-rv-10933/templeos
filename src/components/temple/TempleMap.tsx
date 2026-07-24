import { Compass } from 'lucide-react';
import type { GeoPoint, ID, Temple } from '@/types';
import { useLocale } from '@/store/locale';
import { cn } from '@/utils/cn';

/**
 * Stylised Tamil Nadu map (spec §3 "Mapbox abstraction").
 *
 * Dependency-free: a green landmass with the Bay of Bengal to the east, a couple
 * of rivers, and temple markers plotted from lat/lng. The prop shape mirrors a
 * real Mapbox component so it can be swapped later without changing callers.
 */

// Rough bounding box of Tamil Nadu for normalising coordinates → 0..1.
const TN_BOUNDS = { minLat: 8.0, maxLat: 13.6, minLng: 76.2, maxLng: 80.4 };

function project({ lat, lng }: GeoPoint) {
  const x = ((lng - TN_BOUNDS.minLng) / (TN_BOUNDS.maxLng - TN_BOUNDS.minLng)) * 100;
  const y = ((TN_BOUNDS.maxLat - lat) / (TN_BOUNDS.maxLat - TN_BOUNDS.minLat)) * 100;
  return { x: Math.max(5, Math.min(90, x)), y: Math.max(8, Math.min(92, y)) };
}

export function TempleMap({
  temples,
  className,
  selectedId,
  onSelect,
}: {
  temples: Temple[];
  className?: string;
  selectedId?: ID;
  onSelect?: (t: Temple) => void;
}) {
  const { tx } = useLocale();
  return (
    <div
      className={cn('relative overflow-hidden rounded-lg border border-border', className)}
      role="group"
      aria-label="Temple locations map"
    >
      {/* Land */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(140deg, #eef7ee 0%, #e4f1e7 55%, #dbeadf 100%)' }}
      />

      {/* Sea + rivers + grid */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        <defs>
          <pattern id="tos-grid" width="7" height="7" patternUnits="userSpaceOnUse">
            <path d="M7 0H0V7" fill="none" stroke="rgba(56,120,80,0.09)" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#tos-grid)" />
        {/* Bay of Bengal (east coast) */}
        <path d="M82 0 Q78 26 82 52 Q86 78 82 100 L100 100 L100 0 Z" fill="#c9e6f4" />
        <path d="M82 0 Q78 26 82 52 Q86 78 82 100" fill="none" stroke="#a9d4ea" strokeWidth="0.6" />
        {/* Rivers (Kaveri & Vaigai, stylised) */}
        <path d="M8 38 Q38 46 64 42 T92 50" fill="none" stroke="#93c4de" strokeWidth="1.3" opacity="0.85" strokeLinecap="round" />
        <path d="M16 72 Q44 64 72 70 T94 66" fill="none" stroke="#93c4de" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
      </svg>

      {/* Markers */}
      {temples.map((t) => {
        const { x, y } = project(t.location);
        const selected = t.id === selectedId;
        return (
          <button
            key={t.id}
            onClick={() => onSelect?.(t)}
            className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
            title={tx(t.name)}
            aria-label={tx(t.name)}
            aria-pressed={selected}
          >
            <span
              className={cn(
                'flex items-center justify-center rounded-full bg-surface shadow-md ring-2 transition-all',
                selected ? 'h-11 w-11 text-xl ring-primary' : 'h-9 w-9 text-lg ring-white group-hover:scale-110',
              )}
            >
              🛕
            </span>
            <span className="pointer-events-none absolute left-1/2 top-full mt-1 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-text px-2 py-1 text-caption text-white group-hover:block">
              {tx(t.name)}
            </span>
          </button>
        );
      })}

      {/* Region label */}
      <div className="absolute left-3 top-3 z-20 inline-flex items-center gap-2 rounded-full bg-surface/90 px-3 py-1.5 text-caption shadow-sm backdrop-blur-sm">
        <Compass className="h-4 w-4 text-primary" />
        <span className="font-semibold text-text">Tamil Nadu</span>
        <span className="text-muted">
          {temples.length} {tx({ ta: 'கோயில்கள்', en: 'temples' })}
        </span>
      </div>

      {/* Hint */}
      <div className="absolute right-3 top-3 z-20 hidden rounded-full bg-warning/15 px-3 py-1.5 text-caption font-medium text-[#B45309] sm:block">
        {tx({ ta: 'ஒரு மார்க்கரைத் தட்டவும்', en: 'Map preview — tap a marker' })}
      </div>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 z-20 space-y-1.5 rounded-lg bg-surface/90 p-3 text-caption shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="text-muted">{tx({ ta: 'தேர்ந்தெடுத்தது', en: 'Selected' })}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full border border-border bg-surface" />
          <span className="text-muted">{tx({ ta: 'கோயில்', en: 'Temple' })}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-0.5 w-3 rounded-full" style={{ backgroundColor: '#93c4de' }} />
          <span className="text-muted">{tx({ ta: 'ஆறு', en: 'River' })}</span>
        </div>
      </div>
    </div>
  );
}
