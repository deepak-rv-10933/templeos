import type { LucideIcon } from 'lucide-react';
import { Inbox } from 'lucide-react';

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
}: {
  icon?: LucideIcon;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-violet-light">
        <Icon className="h-7 w-7 text-primary" strokeWidth={1.5} />
      </div>
      <h3 className="text-h4">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-body text-muted">{description}</p>}
    </div>
  );
}
