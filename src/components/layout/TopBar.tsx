import { Link, NavLink } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { publicNav } from '@/app/navigation';
import { useLocale } from '@/store/locale';
import { Avatar } from '@/components/ui/Avatar';
import { cn } from '@/utils/cn';
import { LanguageToggle } from './LanguageToggle';
import { AccessibilityMenu } from './AccessibilityMenu';
import { BrandMark } from './BrandMark';

export function TopBar() {
  const { t } = useLocale();
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-content items-center gap-6 px-4 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <BrandMark className="h-8 w-8" />
          <span className="hidden text-h4 font-bold sm:inline">{t('brand')}</span>
        </Link>

        <nav className="hidden flex-1 items-center gap-1 md:flex">
          {publicNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-4 py-2 text-body font-medium transition-colors',
                  isActive ? 'bg-violet-light text-primary' : 'text-muted hover:text-text',
                )
              }
            >
              {t(item.labelKey!)}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <LanguageToggle />
          <AccessibilityMenu />
          <Link
            to="/admin"
            className="hidden h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-violet-light hover:text-text sm:flex"
            aria-label={t('nav.admin')}
            title={t('nav.admin')}
          >
            <Shield className="h-5 w-5" />
          </Link>
          <Link to="/my-temple" aria-label={t('nav.myTemple')}>
            <Avatar name="Deepak" size="sm" />
          </Link>
        </div>
      </div>
    </header>
  );
}
