import { Suspense, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { ArrowLeft, Menu } from 'lucide-react';
import { PageLoader } from '@/components/common/PageLoader';
import { adminNav } from '@/app/navigation';
import { useLocale } from '@/store/locale';
import { Avatar } from '@/components/ui/Avatar';
import { Drawer } from '@/components/ui/Drawer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { BrandMark } from '@/components/layout/BrandMark';
import { LanguageToggle } from '@/components/layout/LanguageToggle';
import { cn } from '@/utils/cn';

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const { tx } = useLocale();
  return (
    <nav className="flex flex-col gap-0.5">
      {adminNav.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-body font-medium transition-colors',
                isActive ? 'bg-violet-light text-primary' : 'text-muted hover:bg-background hover:text-text',
              )
            }
          >
            <Icon className="h-5 w-5 shrink-0" />
            {tx(item.label!)}
          </NavLink>
        );
      })}
    </nav>
  );
}

export function AdminLayout() {
  const { t } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      {/* Sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-border bg-surface p-4 lg:flex">
        <Link to="/admin" className="mb-6 flex items-center gap-2 px-2">
          <BrandMark className="h-8 w-8" />
          <div className="leading-tight">
            <div className="font-bold">{t('brand')}</div>
            <div className="text-caption text-muted">{t('nav.admin')}</div>
          </div>
        </Link>
        <NavList />
        <Link
          to="/"
          className="mt-auto flex items-center gap-2 rounded-md px-3 py-2.5 text-body text-muted transition-colors hover:bg-background hover:text-text"
        >
          <ArrowLeft className="h-5 w-5" />
          {t('action.back')}
        </Link>
      </aside>

      {/* Content */}
      <div className="lg:pl-60">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-surface/80 px-4 backdrop-blur-md sm:px-6">
          <button
            className="rounded-md p-2 text-muted hover:bg-background lg:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="font-semibold lg:hidden">{t('brand')}</div>
          <div className="ml-auto flex items-center gap-3">
            <LanguageToggle />
            <Avatar name="Admin" size="sm" />
          </div>
        </header>
        <main className="mx-auto max-w-content p-4 sm:p-6">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>

      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} side="right" title={t('nav.admin')}>
        <NavList onNavigate={() => setMenuOpen(false)} />
      </Drawer>
    </div>
  );
}
