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
import {
  CategoryChip,
  FeedCard,
  FestivalCard,
  HomeHero,
  KpiStat,
  RouteCard,
  TempleCard,
  TempleCardSkeleton,
} from '@/components/temple';

// Default "near me" anchor (Chennai) until geolocation is wired.
const HERE = { lat: 13.0827, lng: 80.2707 };

export function HomePage() {
  const { t } = useLocale();

  const featured = useFeaturedTemples();
  const categories = useCategories();
  const festivals = useLiveFestivals();
  const nearby = useNearbyTemples(HERE.lat, HERE.lng);
  const routes = useRoutes();
  const feed = useFeed();
  const kpis = useKpis();

  return (
    <div className="pb-8">
      {/* Full-bleed cover hero (Srirangam) */}
      <HomeHero templeCount={kpis.data?.[0]?.value} />

      <div className="space-y-14 py-14">
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
            {categories.data?.map((c) => (
              <CategoryChip key={c.id} category={c} />
            ))}
          </div>
        </Container>

        {/* Live festivals */}
        <Container>
          <SectionHeader title={t('home.liveFestivals')} to="/updates" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {festivals.data?.map((f) => (
              <FestivalCard key={f.id} festival={f} />
            ))}
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
            {routes.data?.map((r) => (
              <RouteCard key={r.id} route={r} />
            ))}
          </div>
        </Container>

        {/* Updates */}
        <Container feed>
          <SectionHeader title={t('home.updates')} to="/updates" />
          <div className="space-y-5">
            {feed.data?.slice(0, 3).map((item) => (
              <FeedCard key={item.id} item={item} />
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}
