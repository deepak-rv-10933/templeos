import { useLocale } from '@/store/locale';
import { useBookings, useKpis, useRenovations } from '@/hooks/queries';
import { KpiStat } from '@/components/temple';
import { statusLabel, statusTone } from '@/components/temple/bookingStatus';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Table, TBody, TD, TH, THead, TR } from '@/components/ui/Table';
import { formatDate, formatInr } from '@/utils/format';

export function AdminDashboard() {
  const { t, tx, lang } = useLocale();
  const kpis = useKpis();
  const bookings = useBookings();
  const renovations = useRenovations();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-h2">{tx({ ta: 'நிர்வாக டாஷ்போர்டு', en: 'Admin Dashboard' })}</h1>
        <p className="mt-1 text-body text-muted">
          {tx({ ta: 'மாநில அளவிலான கண்ணோட்டம்.', en: 'Statewide overview of temple operations.' })}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpis.data?.map((k) => <KpiStat key={k.id} kpi={k} />)}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent bookings */}
        <div className="lg:col-span-2">
          <h2 className="mb-3 text-h4">{tx({ ta: 'சமீபத்திய முன்பதிவுகள்', en: 'Recent bookings' })}</h2>
          <Table>
            <THead>
              <TR>
                <TH>{tx({ ta: 'குறியீடு', en: 'Code' })}</TH>
                <TH>{tx({ ta: 'கோயில்', en: 'Temple' })}</TH>
                <TH>{tx({ ta: 'தேதி', en: 'Date' })}</TH>
                <TH>{tx({ ta: 'நிலை', en: 'Status' })}</TH>
                <TH className="text-right">{tx({ ta: 'தொகை', en: 'Amount' })}</TH>
              </TR>
            </THead>
            <TBody>
              {bookings.data?.map((b) => (
                <TR key={b.id}>
                  <TD className="font-mono text-caption text-muted">{b.code}</TD>
                  <TD className="font-medium">{tx(b.templeName)}</TD>
                  <TD className="text-muted">{formatDate(b.date, lang)}</TD>
                  <TD>
                    <Badge tone={statusTone[b.status]}>{tx(statusLabel[b.status])}</Badge>
                  </TD>
                  <TD className="text-right font-medium">{formatInr(b.amountInr)}</TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </div>

        {/* Renovation progress */}
        <div>
          <h2 className="mb-3 text-h4">{t('section.renovation')}</h2>
          <div className="space-y-4">
            {renovations.data?.map((r) => (
              <Card key={r.id} padded>
                <div className="line-clamp-1 font-medium">{tx(r.title)}</div>
                <div className="mt-0.5 text-caption text-muted">{tx(r.templeName)}</div>
                <ProgressBar value={r.progressPct} className="mt-3" />
                <div className="mt-2 flex justify-between text-caption text-muted">
                  <span>{formatInr(r.raisedInr)}</span>
                  <span>{r.progressPct}%</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
