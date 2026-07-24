import { cn } from '@/utils/cn';

/** Funding / completion progress (renovation, collections). */
export function ProgressBar({
  value,
  className,
  tone = 'primary',
}: {
  value: number; // 0–100
  className?: string;
  tone?: 'primary' | 'success';
}) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      className={cn('h-2 w-full overflow-hidden rounded-full bg-violet-light', className)}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          'h-full rounded-full transition-[width] duration-500',
          tone === 'primary' ? 'bg-primary' : 'bg-success',
        )}
        style={{ width: `${pct}%`, transitionTimingFunction: 'var(--ease-out-soft)' }}
      />
    </div>
  );
}
