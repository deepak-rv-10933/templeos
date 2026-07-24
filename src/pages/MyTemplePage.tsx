import { Link } from 'react-router-dom';
import { CalendarCheck, HeartHandshake, Landmark, MapPin, QrCode, Star } from 'lucide-react';
import { useLocale } from '@/store/locale';
import { useBookings, useDonations, useJourney, useMe, useTemples } from '@/hooks/queries';
import { formatCompact, formatInr } from '@/utils/format';
import { Container } from '@/components/common/Container';
import { SectionHeader } from '@/components/common/SectionHeader';
import { BookingCard, DonationCard, JourneyCard } from '@/components/temple';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { SmartImage } from '@/components/ui/SmartImage';

export function MyTemplePage() {
  const { tx, t } = useLocale();
  const me = useMe();
  const journey = useJourney();
  const bookings = useBookings();
  const donations = useDonations();
  const allTemples = useTemples();

  const passport = me.data?.passport;
  const favourites = allTemples.data?.filter((tpl) => me.data?.favouriteTempleIds.includes(tpl.id));
  const following = allTemples.data?.filter((tpl) => me.data?.followingIds.includes(tpl.id));
  const upcoming = bookings.data?.filter((b) => b.status === 'confirmed' || b.status === 'pending');

  const stats = [
    { icon: Landmark, value: passport?.templesVisited ?? 0, label: tx({ ta: 'தரிசனம்', en: 'Visited' }) },
    { icon: QrCode, value: passport?.qrVisits ?? 0, label: tx({ ta: 'QR வருகைகள்', en: 'QR visits' }) },
    { icon: CalendarCheck, value: passport?.festivalsAttended ?? 0, label: tx({ ta: 'திருவிழாக்கள்', en: 'Festivals' }) },
    {
      icon: HeartHandshake,
      value: formatInr(passport?.totalDonatedInr ?? 0),
      label: tx({ ta: 'நன்கொடை', en: 'Donated' }),
    },
  ];

  return (
    <Container className="space-y-10 py-6">
      <div>
        <h1 className="text-h2">
          {tx({ ta: 'வணக்கம்', en: 'Vanakkam' })}, {me.data?.name ?? '…'}
        </h1>
        <p className="mt-1 text-body text-muted">
          {tx({ ta: 'உங்கள் ஆன்மீக பயணத்தின் மையம்.', en: 'The hub for your spiritual journey.' })}
        </p>
      </div>

      {/* Passport stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} padded>
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-violet-light">
              <s.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="mt-3 text-h3 tabular-nums">{s.value}</div>
            <div className="text-caption text-muted">{s.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left: passport collections + bookings + donations */}
        <div className="space-y-10 lg:col-span-2">
          {/* Temple Passport (spec §8) */}
          <section>
            <SectionHeader
              title={tx({ ta: 'கோயில் பாஸ்போர்ட்', en: 'Temple Passport' })}
              subtitle={tx({ ta: 'சேகரிப்புகள்', en: 'Your collections' })}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {passport?.collections.map((c) => {
                const pct = Math.round((c.visited / c.total) * 100);
                return (
                  <Card key={c.key} padded>
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-text">{tx(c.name)}</span>
                      <span className="text-caption text-muted">
                        {c.visited}/{c.total}
                      </span>
                    </div>
                    <ProgressBar value={pct} className="mt-3" tone={pct === 100 ? 'success' : 'primary'} />
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Upcoming bookings */}
          <section>
            <SectionHeader title={tx({ ta: 'வரவிருக்கும் முன்பதிவுகள்', en: 'Upcoming bookings' })} to="/bookings" />
            <div className="space-y-4">
              {upcoming?.length ? (
                upcoming.map((b) => <BookingCard key={b.id} booking={b} />)
              ) : (
                <p className="text-body text-muted">{t('common.noResults')}</p>
              )}
            </div>
          </section>

          {/* Donations */}
          <section>
            <SectionHeader title={tx({ ta: 'நன்கொடைகள் & ரசீதுகள்', en: 'Donations & receipts' })} />
            <div className="space-y-3">
              {donations.data?.map((d) => <DonationCard key={d.id} donation={d} />)}
            </div>
          </section>
        </div>

        {/* Right: journey + following/favourites */}
        <div className="space-y-10">
          {journey.data && <JourneyCard journey={journey.data} />}

          <section>
            <SectionHeader title={tx({ ta: 'பிடித்தவை', en: 'Favourites' })} />
            <div className="space-y-2">
              {favourites?.map((tpl) => (
                <MiniTempleRow key={tpl.id} slug={tpl.slug} image={tpl.heroImage} name={tx(tpl.name)} meta={`★ ${tpl.rating}`} />
              ))}
            </div>
          </section>

          <section>
            <SectionHeader title={tx({ ta: 'பின்தொடர்பவை', en: 'Following' })} />
            <div className="space-y-2">
              {following
                ?.filter((tpl) => tpl)
                .map((tpl) => (
                  <MiniTempleRow
                    key={tpl.id}
                    slug={tpl.slug}
                    image={tpl.heroImage}
                    name={tx(tpl.name)}
                    meta={`${formatCompact(tpl.followers)} ${t('common.followers')}`}
                  />
                ))}
            </div>
          </section>
        </div>
      </div>
    </Container>
  );
}

function MiniTempleRow({
  slug,
  image,
  name,
  meta,
}: {
  slug: string;
  image: string;
  name: string;
  meta: string;
}) {
  return (
    <Link
      to={`/temple/${slug}`}
      className="flex items-center gap-3 rounded-lg border border-border bg-surface p-2.5 transition-colors hover:bg-background"
    >
      <div className="h-11 w-11 shrink-0 overflow-hidden rounded-md">
        <SmartImage src={image} alt={name} rounded />
      </div>
      <div className="min-w-0 flex-1">
        <div className="line-clamp-1 font-medium text-text">{name}</div>
        <div className="flex items-center gap-1 text-caption text-muted">
          {meta.startsWith('★') ? <Star className="h-3 w-3 fill-warning text-warning" /> : <MapPin className="h-3 w-3" />}
          {meta.replace('★ ', '')}
        </div>
      </div>
    </Link>
  );
}
