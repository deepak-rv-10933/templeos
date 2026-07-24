import type { Kpi } from '@/types';
import { useLocale } from '@/store/locale';
import { getIcon } from '@/utils/icons';
import { Card } from '@/components/ui/Card';

export function KpiStat({ kpi }: { kpi: Kpi }) {
  const { tx } = useLocale();
  const Icon = getIcon(kpi.icon);
  return (
    <Card padded>
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-violet-light">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        {kpi.delta && <span className="text-caption font-medium text-success">{kpi.delta}</span>}
      </div>
      <div className="mt-3 text-h2 tabular-nums">{kpi.value}</div>
      <div className="text-caption text-muted">{tx(kpi.label)}</div>
    </Card>
  );
}
