import { Link } from 'react-router-dom';
import { useLocale } from '@/store/locale';
import { BrandMark } from './BrandMark';

const columns = [
  {
    title: { ta: 'கண்டறி', en: 'Discover' },
    links: [
      { label: { ta: 'கோயில்கள்', en: 'Temples' }, to: '/explore' },
      { label: { ta: 'திருவிழாக்கள்', en: 'Festivals' }, to: '/updates' },
      { label: { ta: 'யாத்திரைகள்', en: 'Pilgrimages' }, to: '/explore' },
      { label: { ta: 'செய்திகள்', en: 'Updates' }, to: '/updates' },
    ],
  },
  {
    title: { ta: 'சேவைகள்', en: 'Services' },
    links: [
      { label: { ta: 'முன்பதிவு', en: 'Bookings' }, to: '/bookings' },
      { label: { ta: 'நன்கொடை', en: 'Donations' }, to: '/my-temple' },
      { label: { ta: 'திருப்பணி', en: 'Renovation' }, to: '/explore' },
      { label: { ta: 'என் கோயில்', en: 'My Temple' }, to: '/my-temple' },
    ],
  },
  {
    title: { ta: 'துறை', en: 'HR&CE' },
    links: [{ label: { ta: 'நிர்வாகம்', en: 'Admin' }, to: '/admin' }],
  },
];

export function Footer() {
  const { t, tx } = useLocale();
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-content gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <BrandMark className="h-8 w-8" />
            <span className="text-h4 font-bold">{t('brand')}</span>
          </div>
          <p className="mt-3 max-w-xs text-caption text-muted">{t('tagline')}</p>
        </div>
        {columns.map((col) => (
          <div key={col.title.en}>
            <h3 className="mb-3 text-caption font-semibold uppercase tracking-wide text-muted">
              {tx(col.title)}
            </h3>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.label.en}>
                  <Link
                    to={link.to}
                    className="text-body text-muted transition-colors hover:text-primary"
                  >
                    {tx(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border py-5 text-center text-caption text-muted">
        © 2026 Tamil Nadu HR&CE · TempleOS
      </div>
    </footer>
  );
}
