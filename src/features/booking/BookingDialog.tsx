import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard } from 'lucide-react';
import type { Temple, TempleService } from '@/types';
import { useLocale } from '@/store/locale';
import { useCreateBooking, useSlots } from '@/hooks/queries';
import { Dialog } from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { formatInr } from '@/utils/format';
import { cn } from '@/utils/cn';

/** Booking flow (spec §10): Service → Date → Slot → Payment → QR ticket. */
export function BookingDialog({
  temple,
  service,
  open,
  onClose,
}: {
  temple: Temple;
  service?: TempleService;
  open: boolean;
  onClose: () => void;
}) {
  const { t, tx, lang } = useLocale();
  const navigate = useNavigate();
  const create = useCreateBooking();

  const bookable = temple.services.filter((s) => s.bookable);
  const [serviceId, setServiceId] = useState(service?.id ?? bookable[0]?.id ?? '');
  const selectedService = bookable.find((s) => s.id === serviceId) ?? bookable[0];

  const today = '2026-07-25';
  const dates = useMemo(
    () =>
      Array.from({ length: 5 }).map((_, i) => {
        const d = new Date('2026-07-25T00:00:00');
        d.setDate(d.getDate() + i);
        return d.toISOString().slice(0, 10);
      }),
    [],
  );
  const [date, setDate] = useState(today);
  const slots = useSlots(temple.id, date);
  const [slot, setSlot] = useState<string>('');

  const canConfirm = !!selectedService && !!date && !!slot;

  const confirm = async () => {
    if (!selectedService) return;
    const booking = await create.mutateAsync({
      templeId: temple.id,
      serviceName: selectedService.name,
      date,
      slot,
      quantity: 1,
      amountInr: selectedService.priceInr,
    });
    onClose();
    navigate(`/bookings/${booking.id}`);
  };

  return (
    <Dialog open={open} onClose={onClose} title={tx(temple.name)}>
      <div className="space-y-5">
        {/* Service */}
        <div>
          <div className="mb-2 text-caption font-medium text-muted">
            {t('section.services')}
          </div>
          <div className="space-y-2">
            {bookable.map((s) => (
              <button
                key={s.id}
                onClick={() => setServiceId(s.id)}
                className={cn(
                  'flex w-full items-center justify-between rounded-md border px-4 py-3 text-left transition-colors',
                  serviceId === s.id ? 'border-primary bg-violet-light' : 'border-border hover:bg-background',
                )}
              >
                <span className="font-medium text-text">{tx(s.name)}</span>
                <span className="text-caption font-semibold text-primary">{formatInr(s.priceInr)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Date */}
        <div>
          <div className="mb-2 text-caption font-medium text-muted">
            {tx({ ta: 'தேதி', en: 'Date' })}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {dates.map((d) => {
              const dt = new Date(d);
              return (
                <button
                  key={d}
                  onClick={() => {
                    setDate(d);
                    setSlot('');
                  }}
                  className={cn(
                    'flex shrink-0 flex-col items-center rounded-md border px-4 py-2 transition-colors',
                    date === d ? 'border-primary bg-primary text-white' : 'border-border hover:bg-background',
                  )}
                >
                  <span className="text-caption opacity-80">
                    {new Intl.DateTimeFormat(lang === 'ta' ? 'ta-IN' : 'en-IN', { weekday: 'short' }).format(dt)}
                  </span>
                  <span className="text-body font-semibold">{dt.getDate()}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Slot */}
        <div>
          <div className="mb-2 text-caption font-medium text-muted">
            {tx({ ta: 'நேரம்', en: 'Time slot' })}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {slots.data?.map((s) => {
              const full = s.booked >= s.capacity;
              return (
                <button
                  key={s.id}
                  disabled={full}
                  onClick={() => setSlot(s.label)}
                  className={cn(
                    'rounded-md border px-2 py-2 text-caption font-medium transition-colors disabled:opacity-40',
                    slot === s.label
                      ? 'border-primary bg-primary text-white'
                      : 'border-border hover:bg-background',
                  )}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Confirm */}
        <div className="flex items-center justify-between border-t border-border pt-4">
          <div>
            <div className="text-caption text-muted">{tx({ ta: 'மொத்தம்', en: 'Total' })}</div>
            <div className="text-h4 font-semibold">
              {selectedService ? formatInr(selectedService.priceInr) : '—'}
            </div>
          </div>
          <Button
            onClick={confirm}
            disabled={!canConfirm}
            loading={create.isPending}
            leftIcon={<CreditCard className="h-4 w-4" />}
          >
            {tx({ ta: 'உறுதி செய் & பணம்', en: 'Confirm & pay' })}
          </Button>
        </div>
        <p className="flex items-center justify-center gap-1.5 text-caption text-muted">
          <Check className="h-3.5 w-3.5 text-success" />
          {tx({ ta: 'உடனடியாக QR டிக்கெட் கிடைக்கும்', en: 'Instant QR ticket after payment' })}
        </p>
      </div>
    </Dialog>
  );
}
