import type { LucideIcon } from 'lucide-react';
import type { LocalizedText } from '@/types';
import { useLocale } from '@/store/locale';
import { Badge } from '@/components/ui/Badge';

/** Designed placeholder for admin modules scaffolded for a later phase. */
export function ModulePlaceholder({
  title,
  description,
  icon: Icon,
  features,
}: {
  title: LocalizedText;
  description: LocalizedText;
  icon: LucideIcon;
  features: LocalizedText[];
}) {
  const { tx, t } = useLocale();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h2">{tx(title)}</h1>
          <p className="mt-1 text-body text-muted">{tx(description)}</p>
        </div>
        <Badge tone="primary">{t('common.comingSoon')}</Badge>
      </div>

      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface px-6 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-violet-light">
          <Icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
        </div>
        <h2 className="mt-5 text-h4">{tx(title)}</h2>
        <p className="mt-1 max-w-md text-body text-muted">{tx(description)}</p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {features.map((f) => (
            <Badge key={f.en} tone="default">
              {tx(f)}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
