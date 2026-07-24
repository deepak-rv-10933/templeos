import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLocale } from '@/store/locale';

/** Section title with optional "View all" link. */
export function SectionHeader({
  title,
  subtitle,
  to,
}: {
  title: string;
  subtitle?: string;
  to?: string;
}) {
  const { t } = useLocale();
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-h3">{title}</h2>
        {subtitle && <p className="mt-0.5 text-body text-muted">{subtitle}</p>}
      </div>
      {to && (
        <Link
          to={to}
          className="inline-flex shrink-0 items-center gap-1 text-caption font-medium text-primary transition-colors hover:text-primary-hover"
        >
          {t('action.viewAll')}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
