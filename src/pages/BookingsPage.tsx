import { Link } from 'react-router-dom';
import { Ticket } from 'lucide-react';
import { useLocale } from '@/store/locale';
import { useBookings } from '@/hooks/queries';
import { Container } from '@/components/common/Container';
import { EmptyState } from '@/components/common/EmptyState';
import { BookingCard } from '@/components/temple';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';

export function BookingsPage() {
  const { t, tx } = useLocale();
  const bookings = useBookings();

  const upcoming = bookings.data?.filter((b) => b.status === 'confirmed' || b.status === 'pending');
  const past = bookings.data?.filter((b) => b.status === 'used' || b.status === 'cancelled');

  return (
    <Container className="max-w-3xl py-6">
      <div className="mb-1 flex items-center gap-2">
        <Ticket className="h-5 w-5 text-primary" />
        <h1 className="text-h2">{t('nav.bookings')}</h1>
      </div>
      <p className="mb-6 text-body text-muted">
        {tx({ ta: 'உங்கள் தரிசன மற்றும் பூஜை முன்பதிவுகள்.', en: 'Your darshan and pooja reservations.' })}
      </p>

      {bookings.isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-lg" />
          ))}
        </div>
      ) : bookings.data && bookings.data.length === 0 ? (
        <EmptyState
          icon={Ticket}
          title={tx({ ta: 'முன்பதிவுகள் இல்லை', en: 'No bookings yet' })}
          description={tx({ ta: 'ஒரு கோயிலைத் தேர்ந்தெடுத்து முன்பதிவு செய்யுங்கள்.', en: 'Pick a temple to make your first booking.' })}
        />
      ) : (
        <div className="space-y-8">
          {upcoming && upcoming.length > 0 && (
            <section>
              <h2 className="mb-3 text-h4">{tx({ ta: 'வரவிருக்கும்', en: 'Upcoming' })}</h2>
              <div className="space-y-4">
                {upcoming.map((b) => (
                  <BookingCard key={b.id} booking={b} />
                ))}
              </div>
            </section>
          )}
          {past && past.length > 0 && (
            <section>
              <h2 className="mb-3 text-h4">{tx({ ta: 'முந்தையவை', en: 'Past' })}</h2>
              <div className="space-y-4">
                {past.map((b) => (
                  <BookingCard key={b.id} booking={b} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link to="/explore">
          <Button variant="secondary">{tx({ ta: 'கோயில்களை ஆராய', en: 'Explore temples' })}</Button>
        </Link>
      </div>
    </Container>
  );
}
