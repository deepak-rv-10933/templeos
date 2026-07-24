/**
 * Service interfaces (spec §21).
 *
 * The UI depends ONLY on these interfaces — never on a concrete backend. The
 * mock implementation and a future Catalyst implementation both satisfy `Api`,
 * so the data source can be swapped without touching a single component.
 */
import type {
  Booking,
  Deity,
  District,
  Donation,
  Festival,
  FeedItem,
  FollowTargetType,
  GeoPoint,
  ID,
  JourneyRecap,
  Kpi,
  PilgrimageRoute,
  RenovationProject,
  Slot,
  Temple,
  TempleCategory,
  TempleQuery,
  User,
} from '@/types';

export interface TempleApi {
  list(query?: TempleQuery): Promise<Temple[]>;
  getBySlug(slug: string): Promise<Temple | null>;
  getById(id: ID): Promise<Temple | null>;
  featured(): Promise<Temple[]>;
  nearby(point: GeoPoint, withinKm?: number): Promise<Temple[]>;
  categories(): Promise<TempleCategory[]>;
  districts(): Promise<District[]>;
  deities(): Promise<Deity[]>;
}

export interface FeedApi {
  list(filter?: { type?: FollowTargetType; sourceId?: ID }): Promise<FeedItem[]>;
}

export interface FestivalApi {
  list(): Promise<Festival[]>;
  live(): Promise<Festival[]>;
}

export interface RouteApi {
  list(): Promise<PilgrimageRoute[]>;
  getById(id: ID): Promise<PilgrimageRoute | null>;
}

export interface CreateBookingInput {
  templeId: ID;
  serviceName: { ta: string; en: string };
  date: string;
  slot: string;
  quantity: number;
  amountInr: number;
}

export interface BookingApi {
  list(): Promise<Booking[]>;
  getById(id: ID): Promise<Booking | null>;
  slots(templeId: ID, date: string): Promise<Slot[]>;
  create(input: CreateBookingInput): Promise<Booking>;
}

export interface DonationApi {
  list(): Promise<Donation[]>;
}

export interface RenovationApi {
  list(): Promise<RenovationProject[]>;
  getById(id: ID): Promise<RenovationProject | null>;
}

export interface UserApi {
  me(): Promise<User>;
  journey(): Promise<JourneyRecap>;
  toggleFollow(id: ID): Promise<User>;
  toggleFavourite(templeId: ID): Promise<User>;
}

export interface AnalyticsApi {
  kpis(): Promise<Kpi[]>;
}

/** The full service surface the app consumes. */
export interface Api {
  temples: TempleApi;
  feed: FeedApi;
  festivals: FestivalApi;
  routes: RouteApi;
  bookings: BookingApi;
  donations: DonationApi;
  renovations: RenovationApi;
  user: UserApi;
  analytics: AnalyticsApi;
}
