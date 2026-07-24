import { useLocale } from '@/store/locale';
import {
  useCategories,
  useFeaturedTemples,
  useKpis,
  useLiveFestivals,
  useRoutes,
} from '@/hooks/queries';
import { Container } from '@/components/common/Container';
import { SectionHeader } from '@/components/common/SectionHeader';
import {
  CategoryChip,
  FestivalCard,
  HomeHero,
  RouteCard,
  TempleCard,
  TempleCardSkeleton,
} from '@/components/temple';
import {
  Announcements,
  AppPromo,
  ContinueJourney,
  DivineServices,
  ExploreByDistrict,
  TrustBar,
  UpcomingFestivals,
} from '@/components/home';

export function HomePage() {
  const { t, tx } = useLocale();

  const featured = useFeaturedTemples();
  const categories = useCategories();
  const festivals = useLiveFestivals();
  const routes = useRoutes();
  const kpis = useKpis();

  return (
    <div className="pb-8">
      {/* Full-bleed cover hero (Srirangam) */}
      <HomeHero templeCount={kpis.data?.[0]?.value} />

      <div className="space-y-14 py-14">
        {/* Continue your journey — bookings, saved temples, passport */}
        <ContinueJourney />

        {/* Divine services quick access */}
        <DivineServices />

        {/* Live festivals today */}
        <Container>
          <SectionHeader
            title={tx({ ta: 'இன்று நடக்கும் திருவிழாக்கள்', en: 'Live festivals today' })}
            to="/updates"
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {festivals.data?.map((f) => (
              <FestivalCard key={f.id} festival={f} />
            ))}
          </div>
        </Container>

        {/* Trending temples */}
        <Container>
          <SectionHeader title={tx({ ta: 'பிரபல கோயில்கள்', en: 'Trending temples' })} to="/explore" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.isLoading
              ? Array.from({ length: 4 }).map((_, i) => <TempleCardSkeleton key={i} />)
              : featured.data?.map((tpl) => <TempleCard key={tpl.id} temple={tpl} />)}
          </div>
        </Container>

        {/* Explore by district — map + district list + live stats */}
        <ExploreByDistrict />

        {/* Categories */}
        <Container>
          <SectionHeader title={t('home.categories')} to="/explore" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.data?.map((c) => (
              <CategoryChip key={c.id} category={c} />
            ))}
          </div>
        </Container>

        {/* Pilgrimage routes */}
        <Container>
          <SectionHeader title={t('home.routes')} to="/explore" />
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {routes.data?.map((r) => (
              <RouteCard key={r.id} route={r} />
            ))}
          </div>
        </Container>

        {/* Upcoming festivals + announcements */}
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            <UpcomingFestivals />
            <Announcements />
          </div>
        </Container>

        {/* App download promo */}
        <AppPromo />

        {/* Trust / assurance strip */}
        <TrustBar />
      </div>
    </div>
  );
}
