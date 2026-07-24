import { cn } from '@/utils/cn';

/** Calm shimmer skeleton for loading states (spec §19). */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-violet-light', className)}
      style={{ backgroundColor: 'var(--color-violet-light)' }}
    />
  );
}
