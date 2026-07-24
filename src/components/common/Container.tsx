import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

/** Page-width container. `feed` caps at 550px per spec §7. */
export function Container({
  children,
  className,
  feed,
}: {
  children: ReactNode;
  className?: string;
  feed?: boolean;
}) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6',
        feed ? 'max-w-feed' : 'max-w-content',
        className,
      )}
    >
      {children}
    </div>
  );
}
