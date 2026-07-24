/**
 * Service registry — the single swap point between mock and real backends.
 *
 * To move to Zoho Catalyst later:
 *   1. Implement `Api` in `services/catalyst/index.ts` (Data Store + Functions).
 *   2. Change the line below to `export const api = catalystApi;`
 * No component changes required (spec §21).
 */
import type { Api } from './api.types';
import { mockApi } from './mock';

export const api: Api = mockApi;

export type { Api } from './api.types';
export * from './api.types';

/** Centralised TanStack Query keys — keeps cache invalidation consistent. */
export const qk = {
  temples: (query?: unknown) => ['temples', query] as const,
  temple: (slug: string) => ['temple', slug] as const,
  featured: () => ['temples', 'featured'] as const,
  nearby: (point?: unknown) => ['temples', 'nearby', point] as const,
  categories: () => ['categories'] as const,
  districts: () => ['districts'] as const,
  deities: () => ['deities'] as const,
  feed: (filter?: unknown) => ['feed', filter] as const,
  festivals: () => ['festivals'] as const,
  liveFestivals: () => ['festivals', 'live'] as const,
  routes: () => ['routes'] as const,
  route: (id: string) => ['route', id] as const,
  bookings: () => ['bookings'] as const,
  booking: (id: string) => ['booking', id] as const,
  slots: (templeId: string, date: string) => ['slots', templeId, date] as const,
  donations: () => ['donations'] as const,
  renovations: () => ['renovations'] as const,
  renovation: (id: string) => ['renovation', id] as const,
  me: () => ['me'] as const,
  journey: () => ['journey'] as const,
  kpis: () => ['kpis'] as const,
};
