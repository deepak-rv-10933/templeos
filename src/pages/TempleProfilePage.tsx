import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Check,
  Clock,
  Headphones,
  Heart,
  MapPin,
  Orbit,
  Plane,
  Share2,
  Star,
  Ticket,
} from 'lucide-react';
import type { TempleService } from '@/types';
import { useLocale } from '@/store/locale';
import {
  useFestivals,
  useMe,
  useRenovations,
  useTemple,
  useTemples,
  useToggleFollow,
} from '@/hooks/queries';
import { getIcon } from '@/utils/icons';
import { formatCompact, formatInr } from '@/utils/format';
import { Container } from '@/components/common/Container';
import { EmptyState } from '@/components/common/EmptyState';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs';
import { Timeline } from '@/components/ui/Timeline';
import { Skeleton } from '@/components/ui/Skeleton';
import { SmartImage } from '@/components/ui/SmartImage';
import { FestivalCard, GalleryGrid, TempleCard, TempleMap } from '@/components/temple';
import { BookingDialog } from '@/features/booking/BookingDialog';

export function TempleProfilePage() {
  const { slug = '' } = useParams();
  const { t, tx } = useLocale();
  const temple = useTemple(slug);
  const allTemples = useTemples();
  const festivals = useFestivals();
  const renovations = useRenovations();
  const me = useMe();
  const toggleFollow = useToggleFollow();

  const [booking, setBooking] = useState<{ open: boolean; service?: TempleService }>({ open: false });

  if (temple.isLoading) {
    return (
      <Container className="py-6">
        <Skeleton className="h-72 w-full rounded-xl" />
      </Container>
    );
  }
  if (!temple.data) {
    return (
      <Container className="py-10">
        <EmptyState title={tx({ ta: 'கோயில் கிடைக்கவில்லை', en: 'Temple not found' })} />
      </Container>
    );
  }

  const d = temple.data;
  const isFollowing = me.data?.followingIds.includes(d.id);
  const templeFestivals = festivals.data?.filter((f) => f.templeId === d.id) ?? [];
  const renovation = renovations.data?.find((r) => r.templeId === d.id);
  const nearby = allTemples.data?.filter((tpl) => tpl.id !== d.id).slice(0, 4) ?? [];

  const tabs = [
    'overview',
    'history',
    'gallery',
    'timings',
    'poojas',
    'services',
    'heritage',
    'facilities',
    'festivals',
    'nearby',
  ] as const;

  return (
    <div className="pb-8">
      {/* Hero */}
      <div className="relative h-64 w-full sm:h-80">
        <SmartImage src={d.heroImage} alt={tx(d.name)} />
        <div className="absolute inset-0 bg-gradient-to-t from-text/80 via-text/20 to-transparent" />
        <Container className="absolute inset-x-0 bottom-0">
          <div className="pb-6 text-white">
            <div className="flex flex-wrap items-center gap-2">
              {d.isOpenNow ? (
                <Badge tone="success" dot>
                  {t('common.openNow')}
                </Badge>
              ) : (
                <Badge tone="default">{t('common.closed')}</Badge>
              )}
              <Badge tone="primary">{tx(d.deity.name)}</Badge>
            </div>
            <h1 className="mt-2 text-h1">{tx(d.name)}</h1>
            <p className="mt-1 flex items-center gap-2 text-body text-white/85">
              <MapPin className="h-4 w-4" />
              {tx(d.town)}, {tx(d.district)}
              <span className="mx-1">·</span>
              <Star className="h-4 w-4 fill-warning text-warning" />
              {d.rating}
              <span className="mx-1">·</span>
              {formatCompact(d.followers)} {t('common.followers')}
            </p>
          </div>
        </Container>
      </div>

      {/* CTA bar */}
      <Container className="py-4">
        <div className="flex flex-wrap gap-3">
          <Button
            variant={isFollowing ? 'secondary' : 'primary'}
            leftIcon={<Heart className={isFollowing ? 'h-4 w-4 fill-current' : 'h-4 w-4'} />}
            onClick={() => toggleFollow.mutate(d.id)}
          >
            {isFollowing ? t('action.following') : t('action.follow')}
          </Button>
          <Button leftIcon={<Ticket className="h-4 w-4" />} onClick={() => setBooking({ open: true })}>
            {t('action.book')}
          </Button>
          <Button variant="outline" leftIcon={<Heart className="h-4 w-4" />}>
            {t('action.donate')}
          </Button>
          <Button variant="outline" leftIcon={<MapPin className="h-4 w-4" />}>
            {t('action.navigate')}
          </Button>
          <Button variant="ghost" leftIcon={<Share2 className="h-4 w-4" />}>
            {t('action.share')}
          </Button>
        </div>
      </Container>

      {/* Tabs */}
      <Container>
        <Tabs defaultValue="overview">
          <div className="sticky top-16 z-20 -mx-4 bg-background/80 px-4 py-2 backdrop-blur-md sm:top-16">
            <TabsList>
              {tabs.map((key) => (
                <TabsTrigger key={key} value={key}>
                  {t(`section.${key}`)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="py-6">
            {/* Overview */}
            <TabsContent value="overview">
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="space-y-4 lg:col-span-2">
                  <p className="text-body-lg text-text">{tx(d.shortDescription)}</p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {d.facilities.slice(0, 6).map((f) => {
                      const Icon = getIcon(f.icon);
                      return (
                        <div
                          key={f.id}
                          className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2.5 text-caption"
                        >
                          <Icon className="h-4 w-4 text-primary" />
                          {tx(f.name)}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <Card padded className="space-y-3">
                  <div className="text-caption font-semibold uppercase tracking-wide text-muted">
                    {t('section.timings')}
                  </div>
                  {d.timings.map((tm) => (
                    <div key={tm.label.en} className="flex items-center justify-between text-body">
                      <span className="text-muted">{tx(tm.label)}</span>
                      <span className="font-medium">
                        {tm.open} – {tm.close}
                      </span>
                    </div>
                  ))}
                </Card>
              </div>
            </TabsContent>

            {/* History */}
            <TabsContent value="history">
              <div className="max-w-2xl space-y-4">
                <p className="text-body-lg text-text">{tx(d.heritage.history)}</p>
                <div className="flex flex-wrap gap-2">
                  {d.heritage.dynasties.map((dy) => (
                    <Badge key={dy.en} tone="primary">
                      {tx(dy)}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Gallery */}
            <TabsContent value="gallery">
              <GalleryGrid images={[d.heroImage, ...d.gallery]} title={d.name} />
            </TabsContent>

            {/* Timings */}
            <TabsContent value="timings">
              <div className="max-w-md space-y-3">
                {d.timings.map((tm) => (
                  <Card key={tm.label.en} padded className="flex items-center justify-between">
                    <span className="flex items-center gap-2 font-medium">
                      <Clock className="h-4 w-4 text-primary" />
                      {tx(tm.label)}
                    </span>
                    <span className="text-muted">
                      {tm.open} – {tm.close}
                    </span>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Poojas */}
            <TabsContent value="poojas">
              <div className="grid gap-4 sm:grid-cols-2">
                {d.poojas.map((p) => (
                  <Card key={p.id} padded>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-semibold text-text">{tx(p.name)}</div>
                        <div className="mt-0.5 text-caption text-muted">{tx(p.description)}</div>
                      </div>
                      {p.time && <Badge tone="default">{p.time}</Badge>}
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-semibold text-primary">
                        {p.priceInr ? formatInr(p.priceInr) : tx({ ta: 'இலவசம்', en: 'Free' })}
                      </span>
                      {p.bookable && (
                        <Button size="sm" onClick={() => setBooking({ open: true })}>
                          {t('action.book')}
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Services */}
            <TabsContent value="services">
              <div className="grid gap-4 sm:grid-cols-2">
                {d.services.map((s) => (
                  <Card key={s.id} padded>
                    <div className="font-semibold text-text">{tx(s.name)}</div>
                    <div className="mt-0.5 text-caption text-muted">{tx(s.description)}</div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-semibold text-primary">{formatInr(s.priceInr)}</span>
                      {s.bookable && (
                        <Button size="sm" onClick={() => setBooking({ open: true, service: s })}>
                          {t('action.book')}
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Heritage */}
            <TabsContent value="heritage">
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-4">
                  <p className="text-body-lg text-text">{tx(d.heritage.architecture)}</p>
                  <div className="flex flex-wrap gap-2">
                    {d.heritage.hasAudioGuide && (
                      <Badge tone="primary">
                        <Headphones className="h-3.5 w-3.5" />
                        {tx({ ta: 'ஆடியோ வழிகாட்டி', en: 'Audio guide' })}
                      </Badge>
                    )}
                    {d.heritage.has360Tour && (
                      <Badge tone="primary">
                        <Orbit className="h-3.5 w-3.5" />
                        360° {tx({ ta: 'சுற்றுலா', en: 'Tour' })}
                      </Badge>
                    )}
                    {d.heritage.hasDroneGallery && (
                      <Badge tone="primary">
                        <Plane className="h-3.5 w-3.5" />
                        {tx({ ta: 'ட்ரோன் படங்கள்', en: 'Drone gallery' })}
                      </Badge>
                    )}
                  </div>
                </div>
                <div>
                  <div className="mb-4 text-caption font-semibold uppercase tracking-wide text-muted">
                    {tx({ ta: 'காலவரிசை', en: 'Timeline' })}
                  </div>
                  <Timeline
                    items={d.heritage.timeline.map((tl) => ({
                      label: tl.year,
                      title: tx(tl.event),
                      done: true,
                    }))}
                  />
                </div>
              </div>
            </TabsContent>

            {/* Facilities */}
            <TabsContent value="facilities">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {d.facilities.map((f) => {
                  const Icon = getIcon(f.icon);
                  return (
                    <Card key={f.id} padded className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-violet-light">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-body font-medium">{tx(f.name)}</span>
                      {f.available && <Check className="ml-auto h-4 w-4 text-success" />}
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Festivals */}
            <TabsContent value="festivals">
              {templeFestivals.length ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {templeFestivals.map((f) => (
                    <FestivalCard key={f.id} festival={f} />
                  ))}
                </div>
              ) : (
                <p className="text-body text-muted">{t('common.noResults')}</p>
              )}
              {renovation && (
                <Card padded className="mt-8">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{tx(renovation.title)}</div>
                    <span className="text-caption text-muted">{renovation.progressPct}%</span>
                  </div>
                  <ProgressBar value={renovation.progressPct} className="mt-3" />
                  <div className="mt-2 text-caption text-muted">
                    {formatInr(renovation.raisedInr)} {t('common.raised')} · {formatInr(renovation.budgetInr)}{' '}
                    {t('common.goal')}
                  </div>
                </Card>
              )}
            </TabsContent>

            {/* Nearby */}
            <TabsContent value="nearby">
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {nearby.map((tpl) => (
                  <TempleCard key={tpl.id} temple={tpl} />
                ))}
              </div>
              <TempleMap temples={[d, ...nearby]} className="mt-6 h-80" />
            </TabsContent>
          </div>
        </Tabs>
      </Container>

      <BookingDialog
        temple={d}
        service={booking.service}
        open={booking.open}
        onClose={() => setBooking({ open: false })}
      />
    </div>
  );
}
