/**
 * Mock implementation of the `Api` interface.
 * Swap this for a Catalyst-backed implementation in `services/index.ts` without
 * changing any UI code.
 */
import type { Api, CreateBookingInput } from '@/services/api.types';
import type { Booking, GeoPoint, ID, Temple, TempleQuery } from '@/types';
import * as db from './db';

/** Simulate network latency so skeleton/loading states are exercised. */
const LATENCY = 280;
function delay<T>(value: T, ms = LATENCY): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

/** Haversine distance in km. */
function distanceKm(a: GeoPoint, b: GeoPoint): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return Math.round(2 * R * Math.asin(Math.sqrt(h)) * 10) / 10;
}

/** Mutable session state (clone so we never mutate the seed data). */
let user = structuredClone(db.currentUser);
let bookingList = structuredClone(db.bookings);

function applyQuery(list: Temple[], q: TempleQuery = {}): Temple[] {
  let result = [...list];

  if (q.search) {
    const term = q.search.toLowerCase();
    result = result.filter(
      (t) =>
        t.name.en.toLowerCase().includes(term) ||
        t.name.ta.includes(q.search!) ||
        t.town.en.toLowerCase().includes(term) ||
        t.district.en.toLowerCase().includes(term) ||
        t.deity.name.en.toLowerCase().includes(term),
    );
  }
  if (q.districtId) result = result.filter((t) => t.districtId === q.districtId);
  if (q.category) result = result.filter((t) => t.categories.includes(q.category!));
  if (q.deityTradition) result = result.filter((t) => t.deity.tradition === q.deityTradition);
  if (q.openNow) result = result.filter((t) => t.isOpenNow);

  if (q.near) {
    const near = q.near;
    result = result
      .map((t) => ({ ...t, distanceKm: distanceKm(near, t.location) }))
      .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
  }

  switch (q.sort) {
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'name':
      result.sort((a, b) => a.name.en.localeCompare(b.name.en));
      break;
    case 'distance':
      result.sort((a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity));
      break;
    case 'popular':
    default:
      if (!q.near) result.sort((a, b) => b.followers - a.followers);
  }

  return result;
}

export const mockApi: Api = {
  temples: {
    list: (query) => delay(applyQuery(db.temples, query)),
    getBySlug: (slug) => delay(db.temples.find((t) => t.slug === slug) ?? null),
    getById: (id) => delay(db.temples.find((t) => t.id === id) ?? null),
    featured: () => delay(db.temples.filter((t) => t.featured)),
    nearby: (point, withinKm = 500) =>
      delay(
        db.temples
          .map((t) => ({ ...t, distanceKm: distanceKm(point, t.location) }))
          .filter((t) => (t.distanceKm ?? 0) <= withinKm)
          .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0))
          .slice(0, 6),
      ),
    categories: () => delay(db.categories),
    districts: () => delay(db.districts),
    deities: () => delay(db.deities),
  },

  feed: {
    list: (filter) => {
      let items = [...db.feed];
      if (filter?.type) items = items.filter((i) => i.source.type === filter.type);
      if (filter?.sourceId) items = items.filter((i) => i.source.id === filter.sourceId);
      items.sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
      return delay(items);
    },
  },

  festivals: {
    list: () => delay(db.festivals),
    live: () => delay(db.festivals.filter((f) => f.isLive)),
  },

  routes: {
    list: () => delay(db.routes),
    getById: (id) => delay(db.routes.find((r) => r.id === id) ?? null),
  },

  bookings: {
    list: () => delay([...bookingList].sort((a, b) => +new Date(b.date) - +new Date(a.date))),
    getById: (id) => delay(bookingList.find((b) => b.id === id) ?? null),
    slots: (_templeId, _date) =>
      delay([
        { id: 's1', label: '06:00 – 07:00', capacity: 200, booked: 142 },
        { id: 's2', label: '07:00 – 08:00', capacity: 200, booked: 188 },
        { id: 's3', label: '08:00 – 09:00', capacity: 200, booked: 96 },
        { id: 's4', label: '17:00 – 18:00', capacity: 200, booked: 63 },
        { id: 's5', label: '18:00 – 19:00', capacity: 200, booked: 201 },
      ]),
    create: (input: CreateBookingInput) => {
      const temple = db.temples.find((t) => t.id === input.templeId);
      const seq = bookingList.length + 1;
      const booking: Booking = {
        id: `b-new-${seq}`,
        code: `TOS-NEW-${1000 + seq}`,
        templeId: input.templeId,
        templeName: temple?.name ?? { ta: '', en: '' },
        serviceName: input.serviceName,
        date: input.date,
        slot: input.slot,
        quantity: input.quantity,
        amountInr: input.amountInr,
        status: 'confirmed',
      };
      bookingList = [booking, ...bookingList];
      return delay(booking);
    },
  },

  donations: {
    list: () => delay([...db.donations].sort((a, b) => +new Date(b.date) - +new Date(a.date))),
  },

  renovations: {
    list: () => delay(db.renovations),
    getById: (id) => delay(db.renovations.find((r) => r.id === id) ?? null),
  },

  user: {
    me: () => delay(user),
    journey: () => delay(db.journey),
    toggleFollow: (id: ID) => {
      const following = new Set(user.followingIds);
      if (following.has(id)) following.delete(id);
      else following.add(id);
      user = { ...user, followingIds: [...following] };
      return delay(user, 120);
    },
    toggleFavourite: (templeId: ID) => {
      const favs = new Set(user.favouriteTempleIds);
      if (favs.has(templeId)) favs.delete(templeId);
      else favs.add(templeId);
      user = { ...user, favouriteTempleIds: [...favs] };
      return delay(user, 120);
    },
  },

  analytics: {
    kpis: () => delay(db.kpis),
  },
};
