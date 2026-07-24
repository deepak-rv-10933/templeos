import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, MapPinned, Route as RouteIcon } from 'lucide-react';
import { useLocale } from '@/store/locale';
import { useRoute, useTemples } from '@/hooks/queries';
import { Container } from '@/components/common/Container';
import { EmptyState } from '@/components/common/EmptyState';
import { Skeleton } from '@/components/ui/Skeleton';
import { SmartImage } from '@/components/ui/SmartImage';
import { TempleCard, TempleMap } from '@/components/temple';

export function RouteDetailPage() {
  const { id = '' } = useParams();
  const { t, tx } = useLocale();
  const route = useRoute(id);
  const allTemples = useTemples();

  if (route.isLoading) {
    return (
      <Container className="py-6">
        <Skeleton className="h-64 w-full rounded-xl" />
      </Container>
    );
  }
  if (!route.data) {
    return (
      <Container className="py-10">
        <EmptyState title={tx({ ta: 'யாத்திரை கிடைக்கவில்லை', en: 'Route not found' })} />
      </Container>
    );
  }

  const r = route.data;
  const stops = allTemples.data?.filter((tpl) => r.templeIds.includes(tpl.id)) ?? [];

  const facts = [
    { icon: MapPinned, value: `${r.stops} ${t('common.stops')}` },
    { icon: RouteIcon, value: `${r.distanceKm} ${t('common.km')}` },
    { icon: Clock, value: `${r.durationDays} ${t('common.days')}` },
  ];

  return (
    <div className="pb-8">
      <div className="relative h-56 w-full sm:h-72">
        <SmartImage src={r.image} alt={tx(r.name)} />
        <div className="absolute inset-0 bg-gradient-to-t from-text/80 to-transparent" />
        <Container className="absolute inset-x-0 bottom-0">
          <div className="pb-6 text-white">
            <Link
              to="/explore"
              className="mb-3 inline-flex items-center gap-1.5 text-caption font-medium text-white/85 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('nav.explore')}
            </Link>
            <h1 className="text-h1">{tx(r.name)}</h1>
            <div className="mt-3 flex flex-wrap gap-4">
              {facts.map((f) => (
                <span key={f.value} className="inline-flex items-center gap-1.5 text-body text-white/90">
                  <f.icon className="h-4 w-4" />
                  {f.value}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-6">
        <p className="max-w-2xl text-body-lg text-text">{tx(r.description)}</p>

        <h2 className="mb-4 mt-8 text-h3">
          {tx({ ta: 'இந்த யாத்திரையில் இடம்பெறும் கோயில்கள்', en: 'Temples on this route' })}
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stops.map((tpl) => (
            <TempleCard key={tpl.id} temple={tpl} />
          ))}
        </div>
        {r.stops > stops.length && (
          <p className="mt-4 text-caption text-muted">
            {tx({
              ta: `மேலும் ${r.stops - stops.length} தலங்கள் இந்த வழித்தடத்தில் உள்ளன`,
              en: `${r.stops - stops.length} more stops on this circuit`,
            })}
          </p>
        )}

        {stops.length > 0 && <TempleMap temples={stops} className="mt-8 h-80" />}
      </Container>
    </div>
  );
}
