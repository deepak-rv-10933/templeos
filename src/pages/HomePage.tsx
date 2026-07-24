import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useLocale } from '@/store/locale';
import {
  useCategories,
  useFeaturedTemples,
  useFeed,
  useKpis,
  useLiveFestivals,
  useNearbyTemples,
  useRoutes,
} from '@/hooks/queries';
import { Container } from '@/components/common/Container';
import { SectionHeader } from '@/components/common/SectionHeader';
import { Button } from '@/components/ui/Button';
import {
  CategoryChip,
  FeedCard,
  FestivalCard,
  HeroBanner,
  KpiStat,
  RouteCard,
  TempleCard,
  TempleCardSkeleton,
} from '@/components/temple';

// Default "near me" anchor (Chennai) until geolocation is wired.
const HERE = { lat: 13.0827, lng: 80.2707 };

export function HomePage() {
  const { t } = useLocale();
  const navigate = useNavigate();
  const [q, setQ] = useState('');

  const featured = useFeaturedTemples();
  const categories = useCategories();
  const festivals = useLiveFestivals();
  const nearby = useNearbyTemples(HERE.lat, HERE.lng);
  const routes = useRoutes();
  const feed = useFeed();
  const kpis = useKpis();

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/explore${q ? `?search=${encodeURIComponent(q)}` : ''}`);
  };

  return (
    <div className="space-y-14 pb-8 pt-6">
      {/* Hero */}
      <Container>
        <HeroBanner title={t('home.heroTitle')} subtitle={t('home.heroSubtitle')}>
          <form onSubmit={submitSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t('home.searchPlaceholder')}
                className="h-12 w-full rounded-full border border-border bg-surface pl-11 pr-4 text-body shadow-sm placeholder:text-muted focus:border-primary"
              />
            </div>
            <Button type="submit" size="lg" className="rounded-full">
              {t('action.search')}
            </Button>
          </form>
        </HeroBanner>
      </Container>

      {/* KPIs */}
      <Container>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {(kpis.data ?? []).map((k) => (
            <KpiStat key={k.id} kpi={k} />
          ))}
        </div>
      </Container>

      {/* Featured */}
      <Container>
        <SectionHeader title={t('home.featured')} to="/explore" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.isLoading
            ? Array.from({ length: 4 }).map((_, i) => <TempleCardSkeleton key={i} />)
            : featured.data?.map((tpl) => <TempleCard key={tpl.id} temple={tpl} />)}
        </div>
      </Container>

      {/* Categories */}
      <Container>
        <SectionHeader title={t('home.categories')} to="/explore" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.data?.map((c) => <CategoryChip key={c.id} category={c} />)}
        </div>
      </Container>

      {/* Live festivals */}
      <Container>
        <SectionHeader title={t('home.liveFestivals')} to="/updates" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {festivals.data?.map((f) => <FestivalCard key={f.id} festival={f} />)}
        </div>
      </Container>

      {/* Nearby */}
      <Container>
        <SectionHeader title={t('home.nearby')} to="/explore" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {nearby.isLoading
            ? Array.from({ length: 4 }).map((_, i) => <TempleCardSkeleton key={i} />)
            : nearby.data?.slice(0, 4).map((tpl) => <TempleCard key={tpl.id} temple={tpl} />)}
        </div>
      </Container>

      {/* Routes */}
      <Container>
        <SectionHeader title={t('home.routes')} to="/explore" />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {routes.data?.map((r) => <RouteCard key={r.id} route={r} />)}
        </div>
      </Container>

      {/* Updates */}
      <Container feed>
        <SectionHeader title={t('home.updates')} to="/updates" />
        <div className="space-y-5">
          {feed.data?.slice(0, 3).map((item) => <FeedCard key={item.id} item={item} />)}
        </div>
      </Container>
    </div>
  );
}
