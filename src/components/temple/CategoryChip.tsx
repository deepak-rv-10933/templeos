import { Link } from 'react-router-dom';
import type { TempleCategory } from '@/types';
import { useLocale } from '@/store/locale';
import { getIcon } from '@/utils/icons';

export function CategoryChip({ category }: { category: TempleCategory }) {
  const { tx } = useLocale();
  const Icon = getIcon(category.icon);
  return (
    <Link
      to={`/explore?category=${category.key}`}
      className="group flex items-center gap-3 rounded-lg border border-border bg-surface p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-violet-light text-primary transition-colors group-hover:bg-primary group-hover:text-white">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="line-clamp-1 font-medium text-text">{tx(category.name)}</div>
        <div className="text-caption text-muted">{category.templeCount.toLocaleString()}</div>
      </div>
    </Link>
  );
}
