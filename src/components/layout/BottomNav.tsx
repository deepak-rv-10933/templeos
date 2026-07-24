import { NavLink } from 'react-router-dom';
import { publicNav } from '@/app/navigation';
import { useLocale } from '@/store/locale';
import { cn } from '@/utils/cn';

/** Mobile bottom navigation (spec §5). Hidden on md+ where TopBar takes over. */
export function BottomNav() {
  const { t } = useLocale();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/90 backdrop-blur-md md:hidden">
      <div className="flex items-stretch justify-around pb-[env(safe-area-inset-bottom)]">
        {publicNav.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                cn(
                  'flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors',
                  isActive ? 'text-primary' : 'text-muted',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={cn('h-5 w-5', isActive && 'scale-105')} strokeWidth={isActive ? 2.4 : 2} />
                  <span className="max-w-full truncate">{t(item.labelKey!)}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
