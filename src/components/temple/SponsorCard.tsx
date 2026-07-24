import type { Sponsor } from '@/types';
import { formatInr } from '@/utils/format';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';

const tierTone = {
  platinum: 'primary',
  gold: 'warning',
  silver: 'default',
  patron: 'success',
} as const;

const tierLabel: Record<Sponsor['tier'], string> = {
  platinum: 'Platinum',
  gold: 'Gold',
  silver: 'Silver',
  patron: 'Patron',
};

export function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-surface p-4 shadow-sm">
      <Avatar name={sponsor.name} src={sponsor.avatar} size="md" />
      <div className="min-w-0 flex-1">
        <div className="line-clamp-1 font-medium text-text">{sponsor.name}</div>
        <div className="text-caption text-muted">{formatInr(sponsor.amountInr)}</div>
      </div>
      <Badge tone={tierTone[sponsor.tier]}>{tierLabel[sponsor.tier]}</Badge>
    </div>
  );
}
