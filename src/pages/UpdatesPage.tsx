import { useState } from 'react';
import { Bell } from 'lucide-react';
import type { FollowTargetType, LocalizedText } from '@/types';
import { useLocale } from '@/store/locale';
import { useFeed } from '@/hooks/queries';
import { Container } from '@/components/common/Container';
import { EmptyState } from '@/components/common/EmptyState';
import { FeedCard } from '@/components/temple';
import { Skeleton } from '@/components/ui/Skeleton';
import { cn } from '@/utils/cn';

const filters: { key: FollowTargetType | 'all'; label: LocalizedText }[] = [
  { key: 'all', label: { ta: 'அனைத்தும்', en: 'All' } },
  { key: 'temple', label: { ta: 'கோயில்', en: 'Temple' } },
  { key: 'festival', label: { ta: 'திருவிழா', en: 'Festival' } },
  { key: 'renovation', label: { ta: 'திருப்பணி', en: 'Renovation' } },
  { key: 'district', label: { ta: 'மாவட்டம்', en: 'District' } },
];

export function UpdatesPage() {
  const { t, tx } = useLocale();
  const [active, setActive] = useState<FollowTargetType | 'all'>('all');
  const feed = useFeed(active === 'all' ? undefined : { type: active });

  return (
    <Container feed className="py-6">
      <div className="mb-1 flex items-center gap-2">
        <Bell className="h-5 w-5 text-primary" />
        <h1 className="text-h2">{t('nav.updates')}</h1>
      </div>
      <p className="mb-5 text-body text-muted">
        {tx({ ta: 'நீங்கள் பின்தொடரும் கோயில்களின் அதிகாரப்பூர்வ செய்திகள்.', en: 'Official updates from the temples you follow.' })}
      </p>

      {/* Filter chips */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className={cn(
              'shrink-0 rounded-full border px-4 py-1.5 text-caption font-medium transition-colors',
              active === f.key
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-surface text-muted hover:text-text',
            )}
          >
            {tx(f.label)}
          </button>
        ))}
      </div>

      {/* Feed */}
      {feed.isLoading ? (
        <div className="space-y-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-lg" />
          ))}
        </div>
      ) : feed.data && feed.data.length === 0 ? (
        <EmptyState icon={Bell} title={t('common.noResults')} />
      ) : (
        <div className="space-y-5">
          {feed.data?.map((item) => <FeedCard key={item.id} item={item} />)}
        </div>
      )}
    </Container>
  );
}
