import { Link } from 'react-router-dom';
import { CalendarCheck, ChevronRight, Landmark, MapPin, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useDistricts, useKpis, useTemples } from '@/hooks/queries';
import { useLocale } from '@/store/locale';
import { Container } from '@/components/common/Container';
import { SmartImage } from '@/components/ui/SmartImage';
import { TempleMap } from '@/components/temple';

/** Explore-by-district: realistic TN map + district shortlist + live stats. */
export function ExploreByDistrict() {
  const { tx } = useLocale();
  const districts = useDistricts();
  const temples = useTemples();
  const kpis = useKpis();

  const topDistricts = [...(districts.data ?? [])]
    .sort((a, b) => b.templeCount - a.templeCount)
    .slice(0, 5);
  const templeCount = kpis.data?.[0]?.value ?? '46,218';

  const stats: { icon: LucideIcon; value: string; label: string }[] = [
    { icon: Landmark, value: templeCount, label: tx({ ta: 'கோயில்கள்', en: 'Temples' }) },
    { icon: MapPin, value: '38', label: tx({ ta: 'மாவட்டங்கள்', en: 'Districts' }) },
    { icon: CalendarCheck, value: '12,500+', label: tx({ ta: 'தினசரி முன்பதிவுகள்', en: 'Daily bookings' }) },
    { icon: ShieldCheck, value: '99.98%', label: tx({ ta: 'சேவைக் கிடைப்பு', en: 'System availability' }) },
  ];

  return (
    <Container>
      <div className="mb-4">
        <h2 className="text-h3">{tx({ ta: 'மாவட்டம் வாரியாக ஆராயுங்கள்', en: 'Explore by district' })}</h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Map */}
        <TempleMap temples={temples.data ?? []} className="h-72 lg:h-full lg:min-h-[22rem]" />

        {/* District shortlist */}
        <div className="flex flex-col rounded-lg border border-border bg-surface shadow-sm">
          <ul className="divide-y divide-border">
            {topDistricts.map((d) => (
              <li key={d.id}>
                <Link
                  to={`/explore?district=${d.id}`}
                  className="flex items-center gap-3 p-3 transition-colors hover:bg-violet-light"
                >
                  <div className="h-11 w-11 shrink-0 overflow-hidden rounded-md">
                    <SmartImage src={d.id} alt={tx(d.name)} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="line-clamp-1 font-medium text-text">{tx(d.name)}</div>
                    <div className="text-caption text-muted">
                      {d.templeCount.toLocaleString('en-IN')} {tx({ ta: 'கோயில்கள்', en: 'temples' })}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted" />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/explore"
            className="mt-auto flex items-center justify-center gap-1 border-t border-border p-3 text-caption font-medium text-primary transition-colors hover:text-primary-hover"
          >
            {tx({ ta: 'அனைத்து மாவட்டங்களும்', en: 'View all districts' })}
          </Link>
        </div>

        {/* Live stats */}
        <div
          className="overflow-hidden rounded-lg p-6 text-white shadow-sm"
          style={{ backgroundImage: 'linear-gradient(150deg, #0f172a 0%, #1e293b 60%, #334155 100%)' }}
        >
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            {stats.map((s) => (
              <div key={s.label}>
                <s.icon className="h-6 w-6 text-white/80" />
                <div className="mt-2 text-h2 leading-none tabular-nums">{s.value}</div>
                <div className="mt-1 text-caption text-white/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
