import type { BookingStatus, LocalizedText } from '@/types';

/** Shared booking-status presentation, kept in one place so the public
 *  BookingCard and the admin console never drift out of sync. */
export const statusLabel: Record<BookingStatus, LocalizedText> = {
  confirmed: { ta: 'உறுதி', en: 'Confirmed' },
  pending: { ta: 'நிலுவையில்', en: 'Pending' },
  used: { ta: 'பயன்படுத்தப்பட்டது', en: 'Used' },
  cancelled: { ta: 'ரத்து', en: 'Cancelled' },
};

export const statusTone: Record<BookingStatus, 'success' | 'warning' | 'default' | 'danger'> = {
  confirmed: 'success',
  pending: 'warning',
  used: 'default',
  cancelled: 'danger',
};
