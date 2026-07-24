import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, Flower2, Landmark, Orbit, Search, Sparkles, Sun } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLocale } from '@/store/locale';
import { homeCover } from '@/services/mock/images';
import { Button } from '@/components/ui/Button';

const chips: { label: { ta: string; en: string }; to: string; icon: LucideIcon }[] = [
  { label: { ta: 'சிவன்', en: 'Shiva' }, to: '/explore?category=shiva', icon: Flame },
  { label: { ta: 'விஷ்ணு', en: 'Vishnu' }, to: '/explore?category=divya-desam', icon: Sparkles },
  { label: { ta: 'முருகன்', en: 'Murugan' }, to: '/explore?category=murugan', icon: Sun },
  { label: { ta: 'அம்மன்', en: 'Amman' }, to: '/explore?search=Amman', icon: Flower2 },
  { label: { ta: 'நவகிரகம்', en: 'Navagraha' }, to: '/explore?category=navagraha', icon: Orbit },
  { label: { ta: 'பாரம்பரியம்', en: 'Heritage' }, to: '/explore?category=heritage', icon: Landmark },
];

/** Full-bleed cover hero — Srirangam Rajagopuram behind a calm dark scrim. */
export function HomeHero({ templeCount }: { templeCount?: string }) {
  const { t, tx, lang } = useLocale();
  const navigate = useNavigate();
  const [q, setQ] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/explore${q ? `?search=${encodeURIComponent(q)}` : ''}`);
  };

  return (
    <section
      className="relative isolate flex min-h-[600px] items-center justify-center overflow-hidden md:min-h-[680px]"
      style={{ backgroundColor: '#1e1b4b' }}
    >
      {/* Background photo */}
      <img
        src={homeCover}
        alt=""
        aria-hidden
        // eager + high priority: this is the above-the-fold hero
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      {/* Dark violet scrim for text legibility */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(23,20,54,0.82) 0%, rgba(30,27,75,0.42) 40%, rgba(15,10,31,0.92) 100%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center sm:px-6"
      >
        {/* Badge */}
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-4 py-1.5 text-caption font-medium text-white/90 backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-primary" />
          {t('home.badge')}
        </span>

        {/* Headline */}
        <h1 className="mt-6 text-h1 font-bold text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] sm:text-display">
          {t('home.heroTitle')}
        </h1>
        <p className="mt-3 text-body-lg text-white/90 md:text-h4">{t('home.coverSubtitle')}</p>

        {/* Stats */}
        <p className="mt-4 text-caption text-white/75 md:text-body">
          {templeCount ?? '46,218'} {tx({ ta: 'கோயில்கள்', en: 'temples' })}
          <span className="mx-2">·</span>
          38 {tx({ ta: 'மாவட்டங்கள்', en: 'districts' })}
          <span className="mx-2">·</span>
          {t('home.onePlatform')}
        </p>

        {/* Search */}
        <form onSubmit={submit} className="mt-8 flex w-full max-w-2xl gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('home.searchPlaceholder')}
              aria-label={t('action.search')}
              className="h-13 w-full rounded-full border border-white/20 bg-surface pl-12 pr-4 text-body text-text shadow-lg placeholder:text-muted focus:border-primary"
            />
          </div>
          <Button type="submit" size="lg" className="rounded-full px-5 shadow-lg sm:px-7">
            <Search className="h-5 w-5 sm:hidden" />
            <span className="hidden sm:inline">{t('action.search')}</span>
          </Button>
        </form>

        {/* Deity / category quick chips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {chips.map((c) => (
            <Link
              key={c.label.en}
              to={c.to}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-caption font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <c.icon className="h-4 w-4" />
              {lang === 'ta' ? c.label.ta : c.label.en}
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
