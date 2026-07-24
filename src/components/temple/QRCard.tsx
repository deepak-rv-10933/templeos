import { QRCodeSVG } from 'qrcode.react';
import type { Booking } from '@/types';
import { useLocale } from '@/store/locale';
import { formatDate } from '@/utils/format';

/** Scannable QR ticket (spec §10 — Temple Scan). */
export function QRCard({ booking }: { booking: Booking }) {
  const { tx, lang } = useLocale();
  return (
    <div className="mx-auto w-full max-w-xs overflow-hidden rounded-xl border border-border bg-surface shadow-md">
      <div className="bg-primary px-5 py-4 text-primary-foreground">
        <div className="text-caption/relaxed opacity-90">{tx(booking.serviceName)}</div>
        <div className="text-h4 font-semibold">{tx(booking.templeName)}</div>
      </div>
      <div className="flex flex-col items-center gap-4 p-6">
        <div className="rounded-lg border border-border p-3">
          <QRCodeSVG
            value={booking.code}
            size={168}
            level="M"
            fgColor="#111827"
            bgColor="#ffffff"
          />
        </div>
        <div className="text-center">
          <div className="font-mono text-body font-semibold tracking-wider text-text">
            {booking.code}
          </div>
          <div className="mt-1 text-caption text-muted">
            {formatDate(booking.date, lang)} · {booking.slot}
          </div>
        </div>
      </div>
      <div className="border-t border-dashed border-border px-5 py-3 text-center text-caption text-muted">
        {lang === 'ta' ? 'கோயில் நுழைவாயிலில் இந்த QR-ஐக் காட்டவும்' : 'Show this code at the temple entrance'}
      </div>
    </div>
  );
}
