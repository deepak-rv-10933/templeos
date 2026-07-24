/**
 * Curated icon registry — maps the string icon names used in domain data to
 * explicitly-imported lucide icons. Using a registry (instead of `import * as`)
 * keeps the bundle tree-shakeable for the Lighthouse 95+ target (spec §19).
 */
import {
  Accessibility,
  Activity,
  Backpack,
  Bath,
  CalendarCheck,
  Car,
  Droplets,
  Flame,
  HeartHandshake,
  Landmark,
  Mountain,
  Orbit,
  ScrollText,
  Sparkles,
  Sun,
  Users,
  Utensils,
  type LucideIcon,
} from 'lucide-react';

const registry: Record<string, LucideIcon> = {
  Accessibility,
  Activity,
  Backpack,
  Bath,
  CalendarCheck,
  Car,
  Droplets,
  Flame,
  HeartHandshake,
  Landmark,
  Mountain,
  Orbit,
  ScrollText,
  Sparkles,
  Sun,
  Users,
  Utensils,
};

export function getIcon(name: string): LucideIcon {
  return registry[name] ?? Landmark;
}
