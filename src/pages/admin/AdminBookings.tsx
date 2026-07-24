import { useLocale } from '@/store/locale';
import { useBookings } from '@/hooks/queries';
import { statusLabel, statusTone } from '@/components/temple/bookingStatus';
import { Badge } from '@/components/ui/Badge';
import { Table, TBody, TD, TH, THead, TR } from '@/components/ui/Table';
import { formatDate, formatInr } from '@/utils/format';

export function AdminBookings() {
  const { tx, lang } = useLocale();
  const bookings = useBookings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h2">{tx({ ta: 'முன்பதிவுகள்', en: 'Bookings' })}</h1>
        <p className="mt-1 text-body text-muted">
          {tx({ ta: 'அனைத்து சேவை முன்பதிவுகளும்.', en: 'All service reservations across temples.' })}
        </p>
      </div>

      <Table>
        <THead>
          <TR>
            <TH>{tx({ ta: 'குறியீடு', en: 'Code' })}</TH>
            <TH>{tx({ ta: 'கோயில்', en: 'Temple' })}</TH>
            <TH>{tx({ ta: 'சேவை', en: 'Service' })}</TH>
            <TH>{tx({ ta: 'தேதி', en: 'Date' })}</TH>
            <TH>{tx({ ta: 'நேரம்', en: 'Slot' })}</TH>
            <TH>{tx({ ta: 'நிலை', en: 'Status' })}</TH>
            <TH className="text-right">{tx({ ta: 'தொகை', en: 'Amount' })}</TH>
          </TR>
        </THead>
        <TBody>
          {bookings.data?.map((b) => (
            <TR key={b.id}>
              <TD className="font-mono text-caption text-muted">{b.code}</TD>
              <TD className="font-medium">{tx(b.templeName)}</TD>
              <TD className="text-muted">{tx(b.serviceName)}</TD>
              <TD className="text-muted">{formatDate(b.date, lang)}</TD>
              <TD className="text-muted">{b.slot}</TD>
              <TD>
                <Badge tone={statusTone[b.status]}>{tx(statusLabel[b.status])}</Badge>
              </TD>
              <TD className="text-right font-medium">{formatInr(b.amountInr)}</TD>
            </TR>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
