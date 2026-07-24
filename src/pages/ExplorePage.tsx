import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LayoutGrid, List, Map as MapIcon, Search, SlidersHorizontal } from 'lucide-react';
import type { TempleCategoryKey, TempleQuery } from '@/types';
import { useLocale } from '@/store/locale';
import { useCategories, useDistricts, useTemples } from '@/hooks/queries';
import { Container } from '@/components/common/Container';
import { EmptyState } from '@/components/common/EmptyState';
import { TempleCard, TempleCardSkeleton, TempleMap } from '@/components/temple';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

type View = 'grid' | 'list' | 'map';

export function ExplorePage() {
  const { t, tx } = useLocale();
  const [params, setParams] = useSearchParams();
  const [view, setView] = useState<View>('grid');

  const [search, setSearch] = useState(params.get('search') ?? '');
  const category = (params.get('category') as TempleCategoryKey | null) ?? undefined;
  const districtId = params.get('district') ?? undefined;
  const [openNow, setOpenNow] = useState(false);

  const categories = useCategories();
  const districts = useDistricts();

  const query = useMemo<TempleQuery>(
    () => ({ search: search || undefined, category, districtId, openNow: openNow || undefined }),
    [search, category, districtId, openNow],
  );
  const temples = useTemples(query);

  const setParam = (key: string, value?: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const views: { key: View; icon: typeof LayoutGrid }[] = [
    { key: 'grid', icon: LayoutGrid },
    { key: 'list', icon: List },
    { key: 'map', icon: MapIcon },
  ];

  return (
    <Container className="py-6">
      <div className="mb-2 flex items-center gap-2">
        <SlidersHorizontal className="h-5 w-5 text-primary" />
        <h1 className="text-h2">{t('nav.explore')}</h1>
      </div>
      <p className="mb-6 text-body text-muted">{t('home.heroSubtitle')}</p>

      {/* Search + view toggle */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setParam('search', e.target.value);
            }}
            placeholder={t('home.searchPlaceholder')}
            className="h-11 w-full rounded-full border border-border bg-surface pl-11 pr-4 text-body shadow-sm placeholder:text-muted focus:border-primary"
          />
        </div>
        <div className="inline-flex shrink-0 rounded-full border border-border bg-surface p-0.5">
          {views.map((v) => (
            <button
              key={v.key}
              onClick={() => setView(v.key)}
              aria-label={v.key}
              aria-pressed={view === v.key}
              className={cn(
                'flex h-9 w-10 items-center justify-center rounded-full transition-colors',
                view === v.key ? 'bg-primary text-primary-foreground' : 'text-muted hover:text-text',
              )}
            >
              <v.icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <select
          value={category ?? ''}
          onChange={(e) => setParam('category', e.target.value || undefined)}
          className="h-9 rounded-full border border-border bg-surface px-4 text-caption text-text focus:border-primary"
        >
          <option value="">{t('home.categories')}</option>
          {categories.data?.map((c) => (
            <option key={c.id} value={c.key}>
              {tx(c.name)}
            </option>
          ))}
        </select>
        <select
          value={districtId ?? ''}
          onChange={(e) => setParam('district', e.target.value || undefined)}
          className="h-9 rounded-full border border-border bg-surface px-4 text-caption text-text focus:border-primary"
        >
          <option value="">{tx({ ta: 'மாவட்டம்', en: 'District' })}</option>
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
            'h-9 rounded-full border px-4 text-caption font-medium transition-colors',
            openNow
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border bg-surface text-muted hover:text-text',
          )}
        >
          {t('common.openNow')}
        </button>
        {temples.data && (
          <span className="ml-auto text-caption text-muted">
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
            description={tx({ ta: 'வேறு தேடலை முயற்சிக்கவும்.', en: 'Try adjusting your filters.' })}
          />
        ) : view === 'map' ? (
          <TempleMap temples={temples.data ?? []} className="h-[60vh] min-h-96" />
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

      {/* AI search teaser (spec §11) */}
      <div className="mt-10 flex items-center justify-between gap-4 rounded-lg border border-dashed border-primary/30 bg-violet-light p-5">
        <div>
          <div className="font-semibold text-text">
            {tx({ ta: 'AI உதவியாளரிடம் கேளுங்கள்', en: 'Ask the AI assistant' })}
          </div>
          <div className="text-caption text-muted">
            {tx({
              ta: '"அருகில் உள்ள சிவன் கோயில்களைக் காட்டு"',
              en: '"Find Shiva temples open now near me"',
            })}
          </div>
        </div>
        <Button variant="secondary">{t('common.comingSoon')}</Button>
      </div>
    </Container>
  );
}
