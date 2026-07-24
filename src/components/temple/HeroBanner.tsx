import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

/** Home hero banner — calm warm gradient with a primary CTA slot (search). */
export function HeroBanner({
  title,
  subtitle,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn('relative overflow-hidden rounded-xl px-6 py-12 sm:px-10 sm:py-16', className)}
      style={{ backgroundImage: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 55%, #FAFAF9 100%)' }}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-30 blur-3xl"
        style={{ backgroundColor: '#C2410C' }}
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <h1 className="text-h1 sm:text-display">{title}</h1>
        {subtitle && <p className="mx-auto mt-3 max-w-xl text-body-lg text-muted">{subtitle}</p>}
        {children && <div className="mx-auto mt-7 max-w-xl">{children}</div>}
      </div>
    </section>
  );
}
