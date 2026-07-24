import { Link } from 'react-router-dom';
import { ArrowRight, Award, CalendarDays, Heart } from 'lucide-react';
import { useBookings, useMe, useTemples } from '@/hooks/queries';
import { useLocale } from '@/store/locale';
import { formatDate } from '@/utils/format';
import { Container } from '@/components/common/Container';
import { SmartImage } from '@/components/ui/SmartImage';

/**
 * "Continue your journey" — recent bookings, saved temples and the user's
 * Temple Passport surfaced right on the home page.
 */
export function ContinueJourney() {
  const { tx, t, lang } = useLocale();
  const bookings = useBookings();
  const me = useMe();
  const temples = useTemples();

  const heroById = new Map((temples.data ?? []).map((tpl) => [tpl.id, tpl.heroImage] as const));

  // Upcoming (confirmed / pending) first, then the rest.
  const rank = (s: string) => (s === 'confirmed' || s === 'pending' ? 0 : 1);
  const recent = [...(bookings.data ?? [])].sort((a, b) => rank(a.status) - rank(b.status)).slice(0, 2);

  const saved = me.data?.favouriteTempleIds.length ?? 0;
  const visited = me.data?.passport.templesVisited ?? 0;

  if (!bookings.data && !me.data) return null;

  return (
    <Container>
      <div className="mb-4">
        <h2 className="text-h3">{tx({ ta: 'உங்கள் பயணத்தைத் தொடருங்கள்', en: 'Continue your journey' })}</h2>
        <p className="mt-0.5 text-body text-muted">
          {tx({
            ta: 'சமீபத்திய முன்பதிவுகள் மற்றும் சேமித்த கோயில்கள்',
            en: 'Your recent bookings and saved temples',
          })}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {recent.map((b) => (
          <Link
            key={b.id}
            to={`/bookings/${b.id}`}
            className="group flex gap-3 rounded-lg border border-border bg-surface p-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md">
              <SmartImage src={heroById.get(b.templeId) ?? b.templeId} alt={tx(b.templeName)} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-1 font-semibold text-text">{tx(b.templeName)}</h3>
              <p className="mt-0.5 line-clamp-1 text-caption text-muted">{tx(b.serviceName)}</p>
              <p className="mt-1.5 flex items-center gap-1 text-caption text-muted">
                <CalendarDays className="h-3.5 w-3.5" />
                {formatDate(b.date, lang)}
              </p>
              <span className="mt-1 inline-flex items-center gap-1 text-caption font-medium text-primary">
                {tx({ ta: 'முன்பதிவைக் காண', en: 'View booking' })}
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </Link>
        ))}

        {/* Saved temples */}
        <Link
          to="/my-temple"
          className="group flex flex-col justify-between gap-4 rounded-lg border border-border bg-surface p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-light text-primary">
            <Heart className="h-5 w-5" />
          </span>
          <div>
            <div className="text-h2 tabular-nums">{saved}</div>
            <div className="text-caption text-muted">{tx({ ta: 'சேமித்த கோயில்கள்', en: 'Saved temples' })}</div>
          </div>
          <span className="inline-flex items-center gap-1 text-caption font-medium text-primary">
            {t('action.viewAll')}
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>

        {/* Temple Passport */}
        <Link
          to="/my-temple"
          className="group flex flex-col justify-between gap-4 overflow-hidden rounded-lg p-4 text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          style={{ backgroundImage: 'linear-gradient(135deg, #7C6CF2, #9D5BF0)' }}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
            <Award className="h-5 w-5" />
          </span>
          <div>
            <div className="text-h2 tabular-nums">{visited}</div>
            <div className="text-caption text-white/85">
              {tx({ ta: 'தரிசித்த கோயில்கள் · பாஸ்போர்ட்', en: 'Temples visited · Passport' })}
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-caption font-medium">
            {tx({ ta: 'பாஸ்போர்ட்டைத் திற', en: 'Open passport' })}
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </Link>
      </div>
    </Container>
  );
}
