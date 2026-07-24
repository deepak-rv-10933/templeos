/**
 * TempleOS domain model.
 *
 * Tamil-first: user-facing strings are `LocalizedText` ({ ta, en }) so the UI
 * can render Tamil by default and switch to English instantly (spec §2.3).
 */

export interface LocalizedText {
  /** Tamil — the default language. */
  ta: string;
  /** English. */
  en: string;
}

export type ID = string;

/* -------------------------------------------------------------------------- */
/* Reference data                                                             */
/* -------------------------------------------------------------------------- */

export interface Deity {
  id: ID;
  name: LocalizedText;
  /** e.g. "shiva" | "vishnu" | "murugan" | "amman" — used for filtering. */
  tradition: string;
}

export interface District {
  id: ID;
  name: LocalizedText;
  templeCount: number;
}

export type TempleCategoryKey =
  | 'navagraha'
  | 'arupadai-veedu'
  | 'divya-desam'
  | 'padal-petra-sthalam'
  | 'shiva'
  | 'vishnu'
  | 'amman'
  | 'murugan'
  | 'heritage';

export interface TempleCategory {
  id: ID;
  key: TempleCategoryKey;
  name: LocalizedText;
  description: LocalizedText;
  templeCount: number;
  icon: string; // lucide icon name
}

/* -------------------------------------------------------------------------- */
/* Temple                                                                     */
/* -------------------------------------------------------------------------- */

export interface Timing {
  label: LocalizedText;
  /** 24h "HH:mm" */
  open: string;
  close: string;
}

export interface Pooja {
  id: ID;
  name: LocalizedText;
  description: LocalizedText;
  time?: string;
  priceInr?: number;
  bookable: boolean;
}

export interface TempleService {
  id: ID;
  name: LocalizedText;
  description: LocalizedText;
  priceInr: number;
  category: 'darshan' | 'archana' | 'abhishekam' | 'annadhanam' | 'accommodation' | 'special';
  bookable: boolean;
}

export interface Facility {
  id: ID;
  name: LocalizedText;
  icon: string;
  available: boolean;
}

export interface HeritageDetail {
  history: LocalizedText;
  dynasties: LocalizedText[];
  architecture: LocalizedText;
  timeline: { year: string; event: LocalizedText }[];
  hasAudioGuide: boolean;
  has360Tour: boolean;
  hasDroneGallery: boolean;
}

export interface GeoPoint {
  lat: number;
  lng: number;
}

export interface Temple {
  id: ID;
  slug: string;
  name: LocalizedText;
  deity: Deity;
  districtId: ID;
  district: LocalizedText;
  town: LocalizedText;
  categories: TempleCategoryKey[];
  location: GeoPoint;
  heroImage: string;
  gallery: string[];
  shortDescription: LocalizedText;
  rating: number;
  followers: number;
  isOpenNow: boolean;
  timings: Timing[];
  poojas: Pooja[];
  services: TempleService[];
  facilities: Facility[];
  heritage: HeritageDetail;
  featured?: boolean;
  /** Distance in km, populated for "nearby" queries. */
  distanceKm?: number;
}

/* -------------------------------------------------------------------------- */
/* Festivals & pilgrimage                                                     */
/* -------------------------------------------------------------------------- */

export interface Festival {
  id: ID;
  name: LocalizedText;
  templeId: ID;
  templeName: LocalizedText;
  image: string;
  startDate: string; // ISO
  endDate: string; // ISO
  isLive: boolean;
  description: LocalizedText;
}

export interface PilgrimageRoute {
  id: ID;
  name: LocalizedText;
  description: LocalizedText;
  image: string;
  templeIds: ID[];
  stops: number;
  distanceKm: number;
  durationDays: number;
}

/* -------------------------------------------------------------------------- */
/* Updates feed (spec §7)                                                     */
/* -------------------------------------------------------------------------- */

export type FeedKind =
  | 'announcement'
  | 'festival'
  | 'booking-open'
  | 'photo'
  | 'video'
  | 'heritage-fact'
  | 'crowd-alert'
  | 'renovation-milestone';

export type FollowTargetType =
  | 'temple'
  | 'district'
  | 'festival'
  | 'deity'
  | 'route'
  | 'renovation';

export interface FeedItem {
  id: ID;
  kind: FeedKind;
  source: {
    type: FollowTargetType;
    id: ID;
    name: LocalizedText;
    avatar?: string;
  };
  title: LocalizedText;
  body: LocalizedText;
  media?: string[];
  publishedAt: string; // ISO
}

/* -------------------------------------------------------------------------- */
/* Booking                                                                    */
/* -------------------------------------------------------------------------- */

export type BookingStatus = 'confirmed' | 'pending' | 'used' | 'cancelled';

export interface Booking {
  id: ID;
  code: string; // QR payload
  templeId: ID;
  templeName: LocalizedText;
  serviceName: LocalizedText;
  date: string; // ISO date
  slot: string; // "06:00 – 07:00"
  quantity: number;
  amountInr: number;
  status: BookingStatus;
}

export interface Slot {
  id: ID;
  label: string;
  capacity: number;
  booked: number;
}

/* -------------------------------------------------------------------------- */
/* Donations & renovation (spec §12)                                          */
/* -------------------------------------------------------------------------- */

export interface Donation {
  id: ID;
  templeId: ID;
  templeName: LocalizedText;
  amountInr: number;
  purpose: LocalizedText;
  date: string; // ISO
  receiptNo: string;
}

export interface Sponsor {
  id: ID;
  name: string;
  avatar?: string;
  amountInr: number;
  tier: 'platinum' | 'gold' | 'silver' | 'patron';
}

export interface Milestone {
  id: ID;
  title: LocalizedText;
  date: string;
  completed: boolean;
}

export interface RenovationProject {
  id: ID;
  templeId: ID;
  templeName: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  image: string;
  budgetInr: number;
  raisedInr: number;
  progressPct: number;
  milestones: Milestone[];
  sponsors: Sponsor[];
}

/* -------------------------------------------------------------------------- */
/* User, passport, journey (spec §8, §9, §14)                                 */
/* -------------------------------------------------------------------------- */

export interface Collection {
  key: TempleCategoryKey;
  name: LocalizedText;
  total: number;
  visited: number;
}

export interface Passport {
  templesVisited: number;
  routesCompleted: number;
  festivalsAttended: number;
  totalDonatedInr: number;
  qrVisits: number;
  collections: Collection[];
}

export interface JourneyRecap {
  year: number;
  visits: number;
  donationsInr: number;
  pilgrimages: number;
  favouriteTemple: LocalizedText;
  heritageExplored: number;
  achievements: LocalizedText[];
}

export interface User {
  id: ID;
  name: string;
  avatar?: string;
  email: string;
  passport: Passport;
  followingIds: ID[];
  favouriteTempleIds: ID[];
}

/* -------------------------------------------------------------------------- */
/* Home / analytics KPIs                                                      */
/* -------------------------------------------------------------------------- */

export interface Kpi {
  id: ID;
  label: LocalizedText;
  value: string;
  delta?: string;
  icon: string;
}

/* -------------------------------------------------------------------------- */
/* Query params                                                               */
/* -------------------------------------------------------------------------- */

export interface TempleQuery {
  search?: string;
  districtId?: ID;
  category?: TempleCategoryKey;
  deityTradition?: string;
  openNow?: boolean;
  near?: GeoPoint;
  sort?: 'popular' | 'rating' | 'distance' | 'name';
}
