import {
  BarChart3,
  Bell,
  CalendarCheck,
  Compass,
  FileBarChart,
  HandCoins,
  Hammer,
  Home,
  Landmark,
  LayoutDashboard,
  Settings,
  Sparkles,
  Ticket,
  User,
  Users,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  /** i18n key under strings.nav, or a literal label for admin. */
  labelKey?: string;
  label?: { ta: string; en: string };
  path: string;
  icon: LucideIcon;
}

/** Public navigation (spec §5). */
export const publicNav: NavItem[] = [
  { labelKey: 'nav.home', path: '/', icon: Home },
  { labelKey: 'nav.explore', path: '/explore', icon: Compass },
  { labelKey: 'nav.updates', path: '/updates', icon: Bell },
  { labelKey: 'nav.bookings', path: '/bookings', icon: Ticket },
  { labelKey: 'nav.myTemple', path: '/my-temple', icon: User },
];

/** Admin navigation (spec §5). */
export const adminNav: NavItem[] = [
  { label: { ta: 'டாஷ்போர்டு', en: 'Dashboard' }, path: '/admin', icon: LayoutDashboard },
  { label: { ta: 'கோயில்கள்', en: 'Temples' }, path: '/admin/temples', icon: Landmark },
  { label: { ta: 'முன்பதிவுகள்', en: 'Bookings' }, path: '/admin/bookings', icon: CalendarCheck },
  { label: { ta: 'சேவைகள்', en: 'Services' }, path: '/admin/services', icon: Sparkles },
  { label: { ta: 'நன்கொடைகள்', en: 'Donations' }, path: '/admin/donations', icon: HandCoins },
  { label: { ta: 'திருப்பணி', en: 'Renovation' }, path: '/admin/renovation', icon: Hammer },
  { label: { ta: 'ஸ்பான்சர்கள்', en: 'Sponsors' }, path: '/admin/sponsors', icon: Users },
  { label: { ta: 'பயனர்கள்', en: 'Users' }, path: '/admin/users', icon: User },
  { label: { ta: 'அறிக்கைகள்', en: 'Reports' }, path: '/admin/reports', icon: FileBarChart },
  { label: { ta: 'பகுப்பாய்வு', en: 'Analytics' }, path: '/admin/analytics', icon: BarChart3 },
  { label: { ta: 'அமைப்புகள்', en: 'Settings' }, path: '/admin/settings', icon: Settings },
];
