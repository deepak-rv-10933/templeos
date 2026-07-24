import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Building2,
  Flame,
  Flower2,
  Landmark,
  LayoutGrid,
  List,
  Map as MapIcon,
  Orbit,
  Search,
  Sparkles,
  Star,
  Sun,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { LocalizedText, TempleCategoryKey, TempleQuery } from '@/types';
import { useLocale } from '@/store/locale';
import { useDistricts, useTemples } from '@/hooks/queries';
import { Container } from '@/components/common/Container';
import { EmptyState } from '@/components/common/EmptyState';
import { TempleCard, TempleCardSkeleton, TempleMap } from '@/components/temple';
import { cn } from '@/utils/cn';

type View = 'grid' | 'list' | 'map';

const PILLS: { key: string; label: LocalizedText; icon: LucideIcon }[] = [
  { key: '', label: { ta: 'அனைத்தும்', en: 'All' }, icon: Landmark },
  { key: 'shiva', label: { ta: 'சிவன்', en: 'Shiva' }, icon: Flame },
  { key: 'vishnu', label: { ta: 'விஷ்ணு', en: 'Vishnu' }, icon: Sparkles },
  { key: 'murugan', label: { ta: 'முருகன்', en: 'Murugan' }, icon: Sun },
  { key: 'amman', label: { ta: 'அம்மன்', en: 'Amman' }, icon: Flower2 },
  { key: 'navagraha', label: { ta: 'நவகிரகம்', en: 'Navagraha' }, icon: Orbit },
  { key: 'divya-desam', label: { ta: 'திவ்ய தேசம்', en: 'Divya Desam' }, icon: Star },
  { key: 'heritage', label: { ta: 'பாரம்பரியம்', en: 'Heritage' }, icon: Building2 },
];

const VIEWS: { key: View; icon: LucideIcon }[] = [
  { key: 'grid', icon: LayoutGrid },
  { key: 'list', icon: List },
  { key: 'map', icon: MapIcon },
];

export function ExplorePage() {
  const { t, tx } = useLocale();
  const [params, setParams] = useSearchParams();
  const [view, setView] = useState<View>('grid');

  const [search, setSearch] = useState(params.get('search') ?? '');
  const category = (params.get('category') as TempleCategoryKey | null) ?? undefined;
  const [districtId, setDistrictId] = useState<string>(params.get('district') ?? '');
  const [openNow, setOpenNow] = useState(params.get('openNow') === '1');
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const districts = useDistricts();

  const query = useMemo<TempleQuery>(
    () => ({ search: search || undefined, category, districtId: districtId || undefined, openNow: openNow || undefined }),
    [search, category, districtId, openNow],
  );
  const temples = useTemples(query);

  const setCategory = (key: string) => {
    const next = new URLSearchParams(params);
    if (key) next.set('category', key);
    else next.delete('category');
    setParams(next, { replace: true });
  };
  const setSearchParam = (value: string) => {
    setSearch(value);
    const next = new URLSearchParams(params);
    if (value) next.set('search', value);
    else next.delete('search');
    setParams(next, { replace: true });
  };

  return (
    <Container className="py-5">
      {/* Search + view toggle */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearchParam(e.target.value)}
            placeholder={t('home.searchPlaceholder')}
            aria-label={t('action.search')}
            className="h-12 w-full rounded-full border border-border bg-surface pl-12 pr-4 text-body shadow-sm placeholder:text-muted focus:border-primary"
          />
        </div>
        <div className="inline-flex shrink-0 rounded-full border border-border bg-surface p-0.5">
          {VIEWS.map((v) => (
            <button
              key={v.key}
              onClick={() => setView(v.key)}
              aria-label={v.key}
              aria-pressed={view === v.key}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full transition-colors sm:w-11',
                view === v.key ? 'bg-primary text-primary-foreground' : 'text-muted hover:text-text',
              )}
            >
              <v.icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Category pills (scroll on overflow) */}
      <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {PILLS.map((p) => {
          const active = (category ?? '') === p.key;
          return (
            <button
              key={p.key || 'all'}
              onClick={() => setCategory(p.key)}
              className={cn(
                'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-caption font-medium transition-colors',
                active
                  ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                  : 'border-border bg-surface text-muted hover:text-text',
              )}
            >
              <p.icon className="h-4 w-4" />
              {tx(p.label)}
            </button>
          );
        })}
      </div>

      {/* Secondary controls */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <select
          value={districtId}
          onChange={(e) => setDistrictId(e.target.value)}
          className="h-9 w-40 shrink-0 truncate rounded-full border border-border bg-surface px-4 text-caption text-text focus:border-primary"
        >
          <option value="">{tx({ ta: 'எல்லா மாவட்டமும்', en: 'All districts' })}</option>
          {districts.data?.map((d) => (
            <option key={d.id} value={d.id}>
              {tx(d.name)}
            </option>
          ))}
        </select>
        <button
          onClick={() => setOpenNow((o) => !o)}
          aria-pressed={openNow}
          className={cn(
            'h-9 shrink-0 rounded-full border px-4 text-caption font-medium transition-colors',
            openNow
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border bg-surface text-muted hover:text-text',
          )}
        >
          {t('common.openNow')}
        </button>
        {temples.data && (
          <span className="ml-auto shrink-0 text-caption text-muted">
            {temples.data.length} {tx({ ta: 'கோயில்கள்', en: 'temples' })}
          </span>
        )}
      </div>

      {/* Results */}
      <div className="mt-6">
        {temples.isLoading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <TempleCardSkeleton key={i} />
            ))}
          </div>
        ) : temples.data && temples.data.length === 0 ? (
          <EmptyState
            icon={Search}
            title={t('common.noResults')}
            description={tx({ ta: 'வேறு வடிகட்டியை முயற்சிக்கவும்.', en: 'Try adjusting your filters.' })}
          />
        ) : view === 'map' ? (
          <div className="space-y-5">
            <TempleMap
              temples={temples.data ?? []}
              selectedId={selectedId}
              onSelect={(tpl) => setSelectedId(tpl.id)}
              className="h-[55vh] min-h-80"
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {temples.data?.map((tpl) => (
                <TempleCard key={tpl.id} temple={tpl} />
              ))}
            </div>
          </div>
        ) : view === 'list' ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {temples.data?.map((tpl) => <TempleCard key={tpl.id} temple={tpl} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {temples.data?.map((tpl) => <TempleCard key={tpl.id} temple={tpl} />)}
          </div>
        )}
      </div>
    </Container>
  );
}
