import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { TopBar } from '@/components/layout/TopBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { PageLoader } from '@/components/common/PageLoader';
import { AskAI } from '@/features/ai/AskAI';

/** Public application shell — desktop top nav + mobile bottom nav (spec §5). */
export function AppShell() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <TopBar />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      {/* Spacer so the fixed bottom nav never covers footer content on mobile */}
      <div className="h-16 md:hidden" aria-hidden />
      <AskAI />
      <BottomNav />
    </div>
  );
}
