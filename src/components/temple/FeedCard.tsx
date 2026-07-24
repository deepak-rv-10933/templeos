import type { FeedItem, FeedKind, LocalizedText } from '@/types';
import { useLocale } from '@/store/locale';
import { relativeTime } from '@/utils/format';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { SmartImage } from '@/components/ui/SmartImage';
import { cn } from '@/utils/cn';

const kindLabel: Record<FeedKind, LocalizedText> = {
  announcement: { ta: 'அறிவிப்பு', en: 'Announcement' },
  festival: { ta: 'திருவிழா', en: 'Festival' },
  'booking-open': { ta: 'முன்பதிவு', en: 'Booking' },
  photo: { ta: 'படம்', en: 'Photo' },
  video: { ta: 'வீடியோ', en: 'Video' },
  'heritage-fact': { ta: 'பாரம்பரியம்', en: 'Heritage' },
  'crowd-alert': { ta: 'கூட்ட எச்சரிக்கை', en: 'Crowd alert' },
  'renovation-milestone': { ta: 'மறுசீரமைப்பு', en: 'Renovation' },
};

const kindTone: Partial<Record<FeedKind, 'primary' | 'success' | 'warning' | 'danger'>> = {
  festival: 'primary',
  'booking-open': 'success',
  'crowd-alert': 'warning',
  'renovation-milestone': 'primary',
};

export function FeedCard({ item }: { item: FeedItem }) {
  const { tx, lang } = useLocale();
  const media = item.media ?? [];
  return (
    <article className="rounded-lg border border-border bg-surface p-5 shadow-sm">
      <header className="flex items-center gap-3">
        <Avatar name={tx(item.source.name)} src={item.source.avatar} size="md" />
        <div className="min-w-0 flex-1">
          <div className="line-clamp-1 font-medium text-text">{tx(item.source.name)}</div>
          <div className="text-caption text-muted">{relativeTime(item.publishedAt, lang)}</div>
        </div>
        <Badge tone={kindTone[item.kind] ?? 'default'}>{tx(kindLabel[item.kind])}</Badge>
      </header>

      <h3 className="mt-3 text-body-lg font-semibold text-text">{tx(item.title)}</h3>
      <p className="mt-1 text-body text-muted">{tx(item.body)}</p>

      {media.length > 0 && (
        <div
          className={cn(
            'mt-4 grid gap-2 overflow-hidden rounded-md',
            media.length === 1 ? 'grid-cols-1' : 'grid-cols-2',
          )}
        >
          {media.map((m, i) => (
            <div key={i} className={cn('aspect-video', media.length === 1 && 'aspect-[16/9]')}>
              <SmartImage src={m} alt={tx(item.title)} rounded />
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
