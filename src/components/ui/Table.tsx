import type { HTMLAttributes, ReactNode, ThHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

/** Composable table primitives for admin views (spec §17). */
export function Table({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-border bg-surface">
      <table className={cn('w-full border-collapse text-body', className)}>{children}</table>
    </div>
  );
}

export function THead({ children }: { children: ReactNode }) {
  return <thead className="border-b border-border bg-background">{children}</thead>;
}

export function TBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-border">{children}</tbody>;
}

export function TR({ children, className, ...rest }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={cn('transition-colors hover:bg-background', className)} {...rest}>
      {children}
    </tr>
  );
}

export function TH({ children, className, ...rest }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        'px-4 py-3 text-left text-caption font-semibold tracking-wide text-muted uppercase',
        className,
      )}
      {...rest}
    >
      {children}
    </th>
  );
}

export function TD({ children, className, ...rest }: HTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn('px-4 py-3 align-middle', className)} {...rest}>
      {children}
    </td>
  );
}
