import { Link } from 'react-router-dom';
import { Bell, CalendarClock, Megaphone, Ticket } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { FeedKind } from '@/types';
import { useFeed } from '@/hooks/queries';
import { useLocale } from '@/store/locale';
import { formatDate } from '@/utils/format';
import { SectionHeader } from '@/components/common/SectionHeader';

const ICONS: Partial<Record<FeedKind, LucideIcon>> = {
  announcement: Megaphone,
  'booking-open': Ticket,
  'renovation-milestone': CalendarClock,
};

/** Official announcements pulled from the updates feed. */
export function Announcements() {
  const { tx, lang } = useLocale();
  const feed = useFeed();
  const items = (feed.data ?? []).slice(0, 4);

  return (
    <div>
      <SectionHeader title={tx({ ta: 'அறிவிப்புகள்', en: 'Announcements' })} to="/updates" />
      <div className="rounded-lg border border-border bg-surface shadow-sm">
        <ul className="divide-y divide-border">
          {items.map((item) => {
            const Icon = ICONS[item.kind] ?? Bell;
            return (
              <li key={item.id}>
                <Link to="/updates" className="flex gap-3 p-3 transition-colors hover:bg-violet-light">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-light text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="line-clamp-1 font-medium text-text">{tx(item.title)}</div>
                    <div className="line-clamp-2 text-caption text-muted">{tx(item.body)}</div>
                    <div className="mt-1 text-caption text-muted">{formatDate(item.publishedAt, lang)}</div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
