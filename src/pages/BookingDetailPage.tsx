import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Share2 } from 'lucide-react';
import { useLocale } from '@/store/locale';
import { useBooking } from '@/hooks/queries';
import { Container } from '@/components/common/Container';
import { EmptyState } from '@/components/common/EmptyState';
import { QRCard } from '@/components/temple';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatDate, formatInr } from '@/utils/format';

export function BookingDetailPage() {
  const { id = '' } = useParams();
  const { t, tx, lang } = useLocale();
  const booking = useBooking(id);

  if (booking.isLoading) {
    return (
      <Container className="max-w-md py-6">
        <Skeleton className="mx-auto h-96 w-80 rounded-xl" />
      </Container>
    );
  }
  if (!booking.data) {
    return (
      <Container className="max-w-md py-10">
        <EmptyState title={tx({ ta: 'முன்பதிவு கிடைக்கவில்லை', en: 'Booking not found' })} />
      </Container>
    );
  }

  const b = booking.data;
  const rows = [
    { label: tx({ ta: 'சேவை', en: 'Service' }), value: tx(b.serviceName) },
    { label: tx({ ta: 'தேதி', en: 'Date' }), value: formatDate(b.date, lang) },
    { label: tx({ ta: 'நேரம்', en: 'Slot' }), value: b.slot },
    { label: tx({ ta: 'எண்ணிக்கை', en: 'Devotees' }), value: String(b.quantity) },
    { label: tx({ ta: 'தொகை', en: 'Amount' }), value: formatInr(b.amountInr) },
  ];

  return (
    <Container className="max-w-md py-6">
      <Link
        to="/bookings"
        className="mb-5 inline-flex items-center gap-1.5 text-caption font-medium text-muted hover:text-text"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('nav.bookings')}
      </Link>

      <QRCard booking={b} />

      <div className="mt-6 divide-y divide-border rounded-lg border border-border bg-surface">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between px-4 py-3">
            <span className="text-caption text-muted">{r.label}</span>
            <span className="font-medium text-text">{r.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex gap-3">
        <Button variant="outline" fullWidth leftIcon={<MapPin className="h-4 w-4" />}>
          {t('action.navigate')}
        </Button>
        <Button variant="outline" fullWidth leftIcon={<Share2 className="h-4 w-4" />}>
          {t('action.share')}
        </Button>
      </div>
    </Container>
  );
}
