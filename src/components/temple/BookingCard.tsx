import { Link } from 'react-router-dom';
import { CalendarDays, Clock, QrCode, Users } from 'lucide-react';
import type { Booking } from '@/types';
import { useLocale } from '@/store/locale';
import { formatDate, formatInr } from '@/utils/format';
import { Badge } from '@/components/ui/Badge';
import { statusLabel, statusTone } from './bookingStatus';

export function BookingCard({ booking }: { booking: Booking }) {
  const { tx, lang } = useLocale();
  return (
    <Link
      to={`/bookings/${booking.id}`}
      className="group block rounded-lg border border-border bg-surface p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="line-clamp-1 font-semibold text-text">{tx(booking.templeName)}</h3>
          <p className="mt-0.5 text-caption text-muted">{tx(booking.serviceName)}</p>
        </div>
        <Badge tone={statusTone[booking.status]}>{tx(statusLabel[booking.status])}</Badge>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-caption text-muted">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDays className="h-4 w-4" />
          {formatDate(booking.date, lang)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          {booking.slot}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-4 w-4" />
          {booking.quantity}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <span className="inline-flex items-center gap-1.5 font-mono text-caption text-muted">
          <QrCode className="h-4 w-4" />
          {booking.code}
        </span>
        <span className="font-semibold text-text">{formatInr(booking.amountInr)}</span>
      </div>
    </Link>
  );
}
