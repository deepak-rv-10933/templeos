import { Receipt } from 'lucide-react';
import type { Donation } from '@/types';
import { useLocale } from '@/store/locale';
import { formatDate, formatInr } from '@/utils/format';

export function DonationCard({ donation }: { donation: Donation }) {
  const { tx, lang } = useLocale();
  return (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-surface p-4 shadow-sm">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-violet-light text-primary">
        <Receipt className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="line-clamp-1 font-medium text-text">{tx(donation.templeName)}</div>
        <div className="text-caption text-muted">
          {tx(donation.purpose)} · {formatDate(donation.date, lang)}
        </div>
        <div className="mt-0.5 font-mono text-caption text-muted">{donation.receiptNo}</div>
      </div>
      <div className="shrink-0 font-semibold text-text">{formatInr(donation.amountInr)}</div>
    </div>
  );
}
