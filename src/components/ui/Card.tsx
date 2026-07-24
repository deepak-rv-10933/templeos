import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  padded?: boolean;
}

/** Surface container — white, soft border, soft shadow (spec §4). */
export function Card({ interactive, padded, className, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border bg-surface shadow-sm',
        padded && 'p-5',
        interactive &&
          'cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
