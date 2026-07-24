import { useLocale } from '@/store/locale';
import { useDistricts, useKpis } from '@/hooks/queries';
import { Card } from '@/components/ui/Card';
import { KpiStat } from '@/components/temple';

/** Analytics dimensions (spec §16). */
export function AdminAnalytics() {
  const { tx } = useLocale();
  const kpis = useKpis();
  const districts = useDistricts();

  const maxCount = Math.max(...(districts.data?.map((d) => d.templeCount) ?? [1]));
  const dimensions = [
    { label: { ta: 'மாநிலம்', en: 'State' }, value: { ta: '38 மாவட்டங்கள்', en: '38 districts' } },
    { label: { ta: 'வருகையாளர்கள்', en: 'Visitors' }, value: { ta: '24 லட்சம் / மாதம்', en: '2.4M / mo' } },
    { label: { ta: 'திருவிழாக்கள்', en: 'Festivals' }, value: { ta: '1,284 / ஆண்டு', en: '1,284 / yr' } },
    { label: { ta: 'வருவாய்', en: 'Revenue' }, value: { ta: '₹92 கோடி', en: '₹92 Cr' } },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h2">{tx({ ta: 'பகுப்பாய்வு', en: 'Analytics' })}</h1>
        <p className="mt-1 text-body text-muted">
          {tx({ ta: 'மாநிலம் முதல் கோயில் வரை.', en: 'From statewide trends down to a single temple.' })}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.data?.map((k) => <KpiStat key={k.id} kpi={k} />)}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* District distribution */}
        <Card padded className="lg:col-span-2">
          <h2 className="mb-4 text-h4">{tx({ ta: 'மாவட்ட வாரியான கோயில்கள்', en: 'Temples by district' })}</h2>
          <div className="space-y-3">
            {districts.data?.map((d) => (
              <div key={d.id} className="flex items-center gap-3">
                <div className="w-32 shrink-0 truncate text-caption text-muted">{tx(d.name)}</div>
                <div className="h-3 flex-1 overflow-hidden rounded-full bg-violet-light">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${(d.templeCount / maxCount) * 100}%` }}
                  />
                </div>
                <div className="w-12 shrink-0 text-right text-caption tabular-nums text-text">
                  {d.templeCount}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Dimensions */}
        <div className="space-y-4">
          {dimensions.map((dim) => (
            <Card key={dim.label.en} padded>
              <div className="text-caption text-muted">{tx(dim.label)}</div>
              <div className="mt-1 text-h3 tabular-nums">{tx(dim.value)}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
