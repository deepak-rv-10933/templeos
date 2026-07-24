import { Link } from 'react-router-dom';
import { BedDouble, Flame, HeartHandshake, History, LifeBuoy, Ticket } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { LocalizedText } from '@/types';
import { useLocale } from '@/store/locale';
import { Container } from '@/components/common/Container';

const SERVICES: { icon: LucideIcon; color: string; to: string; title: LocalizedText; sub: LocalizedText }[] = [
  {
    icon: Ticket,
    color: '#7C6CF2',
    to: '/explore',
    title: { ta: 'தரிசன முன்பதிவு', en: 'Book Darshan' },
    sub: { ta: 'தரிசன நேரத்தை ஆன்லைனில் முன்பதிவு', en: 'Reserve your darshan slots online' },
  },
  {
    icon: Flame,
    color: '#F0883E',
    to: '/explore',
    title: { ta: 'பூஜை முன்பதிவு', en: 'Book Pooja' },
    sub: { ta: 'பூஜைகள் & சிறப்பு சேவைகள்', en: 'Perform poojas & special sevas' },
  },
  {
    icon: HeartHandshake,
    color: '#E5484D',
    to: '/explore',
    title: { ta: 'நன்கொடை', en: 'Donate' },
    sub: { ta: 'கோயில்கள் & சேவைகளுக்கு உதவி', en: 'Support temples and causes' },
  },
  {
    icon: BedDouble,
    color: '#30A46C',
    to: '/explore',
    title: { ta: 'தங்கும் வசதி', en: 'Accommodation' },
    sub: { ta: 'கோயில் விடுதிகளைக் கண்டறியுங்கள்', en: 'Find temple guest houses' },
  },
  {
    icon: History,
    color: '#3B82F6',
    to: '/bookings',
    title: { ta: 'முன்பதிவு வரலாறு', en: 'Booking History' },
    sub: { ta: 'உங்கள் முன்பதிவுகள் & ரசீதுகள்', en: 'View your bookings & receipts' },
  },
  {
    icon: LifeBuoy,
    color: '#8B5CF6',
    to: '/updates',
    title: { ta: 'உதவி & ஆதரவு', en: 'Help & Support' },
    sub: { ta: 'உதவி மற்றும் தகவல்கள்', en: 'Get assistance and information' },
  },
];

/** Divine services quick-access grid (mirrors the HR&CE portal home). */
export function DivineServices() {
  const { tx } = useLocale();
  return (
    <Container>
      <div className="mb-4">
        <h2 className="text-h3">{tx({ ta: 'தெய்வீக சேவைகள்', en: 'Divine services' })}</h2>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {SERVICES.map((s) => (
          <Link
            key={s.title.en}
            to={s.to}
            className="group flex flex-col items-start gap-3 rounded-lg border border-border bg-surface p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
          >
            <span
              className="flex h-11 w-11 items-center justify-center rounded-lg"
              style={{ backgroundColor: `${s.color}1A`, color: s.color }}
            >
              <s.icon className="h-5 w-5" />
            </span>
            <div>
              <div className="font-semibold text-text">{tx(s.title)}</div>
              <div className="mt-0.5 text-caption text-muted">{tx(s.sub)}</div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
