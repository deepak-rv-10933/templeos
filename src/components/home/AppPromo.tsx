import { Apple, Play } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLocale } from '@/store/locale';
import { Container } from '@/components/common/Container';
import { homeCover } from '@/services/mock/images';

/** "Take the divine experience anywhere" — app download promo. */
export function AppPromo() {
  const { tx } = useLocale();
  return (
    <Container>
      <div
        className="relative overflow-hidden rounded-2xl px-6 py-8 sm:px-10 sm:py-10"
        style={{ backgroundImage: 'linear-gradient(135deg, #0f172a, #1e293b)' }}
      >
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div className="max-w-md text-center text-white md:text-left">
            <h2 className="text-h2 font-bold">
              {tx({ ta: 'தெய்வீக அனுபவம் எங்கும் உங்களுடன்', en: 'Take the divine experience anywhere' })}
            </h2>
            <p className="mt-2 text-body text-white/80">
              {tx({
                ta: 'எங்கள் செயலியைப் பதிவிறக்கி தரிசனம், பூஜைகள் மற்றும் நன்கொடைகளை எங்கிருந்தும் முன்பதிவு செய்யுங்கள்.',
                en: 'Download our app to book darshan, poojas and donations on the go.',
              })}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3 md:justify-start">
              <StoreButton icon={Play} top={tx({ ta: 'இதில் கிடைக்கும்', en: 'GET IT ON' })} bottom="Google Play" />
              <StoreButton icon={Apple} top={tx({ ta: 'பதிவிறக்கவும்', en: 'Download on the' })} bottom="App Store" />
            </div>
          </div>

          {/* Phone mockup */}
          <div className="relative w-40 shrink-0 rotate-3">
            <div className="overflow-hidden rounded-[2rem] border-[6px] border-black/70 bg-black shadow-2xl">
              <img src={homeCover} alt="" aria-hidden className="aspect-[9/19] w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

function StoreButton({ icon: Icon, top, bottom }: { icon: LucideIcon; top: string; bottom: string }) {
  return (
    <button className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-black/40 px-4 py-2 text-left text-white backdrop-blur-sm transition-colors hover:bg-black/60">
      <Icon className="h-6 w-6" />
      <span className="leading-tight">
        <span className="block text-[10px] uppercase tracking-wide text-white/70">{top}</span>
        <span className="block text-body font-semibold">{bottom}</span>
      </span>
    </button>
  );
}
