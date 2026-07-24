import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Tone = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'live';

const tones: Record<Tone, string> = {
  default: 'bg-violet-light text-muted',
  primary: 'bg-primary/12 text-primary',
  success: 'bg-success/12 text-success-text',
  warning: 'bg-warning/15 text-[#B45309]',
  danger: 'bg-danger/12 text-danger',
  live: 'bg-danger text-white',
};

export function Badge({
  children,
  tone = 'default',
  dot,
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-caption font-medium',
        tones[tone],
        className,
      )}
    >
      {dot && (
        <span
          className={cn(
            'h-1.5 w-1.5 rounded-full bg-current',
            tone === 'live' && 'animate-pulse bg-white',
          )}
        />
      )}
      {children}
    </span>
  );
}
