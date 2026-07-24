import type { ReactNode } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface TimelineItem {
  label: string;
  title: ReactNode;
  description?: ReactNode;
  done?: boolean;
}

/** Vertical timeline — used for heritage history and renovation milestones. */
export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative ml-3 border-l border-border">
      {items.map((item, i) => (
        <li key={i} className="relative mb-6 pl-6 last:mb-0">
          <span
            className={cn(
              'absolute -left-[9px] flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-surface',
              item.done ? 'bg-success' : 'bg-primary',
            )}
          >
            {item.done && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3} />}
          </span>
          <div className="text-caption font-medium text-muted">{item.label}</div>
          <div className="mt-0.5 font-medium text-text">{item.title}</div>
          {item.description && <div className="mt-1 text-body text-muted">{item.description}</div>}
        </li>
      ))}
    </ol>
  );
}
