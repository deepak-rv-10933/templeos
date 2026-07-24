import type { Lang } from '@/i18n/strings';

/** ₹ with Indian digit grouping. */
export function formatInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Compact number, e.g. 184000 → "1.84L" (Indian) / abbreviated. */
export function formatCompact(n: number): string {
  if (n >= 10000000) return `${(n / 10000000).toFixed(2).replace(/\.00$/, '')}Cr`;
  if (n >= 100000) return `${(n / 100000).toFixed(2).replace(/\.00$/, '')}L`;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  return String(n);
}

export function formatDate(iso: string, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === 'ta' ? 'ta-IN' : 'en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso));
}

export function formatDateRange(startIso: string, endIso: string, lang: Lang): string {
  const start = new Date(startIso);
  const end = new Date(endIso);
  const fmt = new Intl.DateTimeFormat(lang === 'ta' ? 'ta-IN' : 'en-IN', {
    day: 'numeric',
    month: 'short',
  });
  return `${fmt.format(start)} – ${fmt.format(end)}`;
}

/** Relative "time ago" for the feed. */
export function relativeTime(iso: string, lang: Lang, now = new Date('2026-07-24T10:00:00+05:30')): string {
  const diffMs = now.getTime() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  const rtf = new Intl.RelativeTimeFormat(lang === 'ta' ? 'ta' : 'en', { numeric: 'auto' });
  if (Math.abs(mins) < 60) return rtf.format(-mins, 'minute');
  const hrs = Math.round(mins / 60);
  if (Math.abs(hrs) < 24) return rtf.format(-hrs, 'hour');
  const days = Math.round(hrs / 24);
  return rtf.format(-days, 'day');
}
