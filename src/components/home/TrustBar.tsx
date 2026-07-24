import { BadgeCheck, CreditCard, Headset, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { LocalizedText } from '@/types';
import { useLocale } from '@/store/locale';
import { Container } from '@/components/common/Container';

const ITEMS: { icon: LucideIcon; title: LocalizedText; sub: LocalizedText }[] = [
  {
    icon: ShieldCheck,
    title: { ta: 'பாதுகாப்பானது & நம்பகமானது', en: 'Secure & trusted' },
    sub: { ta: 'பாதுகாப்பான பரிவர்த்தனைகளுக்கு வங்கி நிலை பாதுகாப்பு', en: 'Bank-level security for safe transactions' },
  },
  {
    icon: BadgeCheck,
    title: { ta: 'உடனடி உறுதிப்படுத்தல்', en: 'Instant confirmation' },
    sub: { ta: 'SMS & மின்னஞ்சல் மூலம் முன்பதிவு உறுதி', en: 'Booking confirmation via SMS & email' },
  },
  {
    icon: Headset,
    title: { ta: '24/7 ஆதரவு', en: '24/7 support' },
    sub: { ta: 'எப்போதும் உங்களுக்கு உதவ நாங்கள் இங்கே', en: 'We are here to help you, always' },
  },
  {
    icon: CreditCard,
    title: { ta: 'பல கட்டண முறைகள்', en: 'Multiple payment options' },
    sub: { ta: 'UPI, கார்டுகள், நெட் பேங்கிங் மற்றும் பல', en: 'UPI, cards, netbanking and more' },
  },
];

/** Trust / assurance strip at the foot of the home page. */
export function TrustBar() {
  const { tx } = useLocale();
  return (
    <Container>
      <div className="grid grid-cols-1 gap-4 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((it) => (
          <div key={it.title.en} className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-light text-primary">
              <it.icon className="h-5 w-5" />
            </span>
            <div>
              <div className="font-semibold text-text">{tx(it.title)}</div>
              <div className="mt-0.5 text-caption text-muted">{tx(it.sub)}</div>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
