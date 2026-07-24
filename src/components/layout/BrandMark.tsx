import { useId } from 'react';
import { cn } from '@/utils/cn';

/** TempleOS rajagopuram brandmark (matches the favicon). */
export function BrandMark({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 64 64" className={cn('shrink-0', className)} aria-hidden role="img">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8B7BF6" />
          <stop offset="1" stopColor="#6A58EE" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill={`url(#${id})`} />
      <g fill="#fff">
        <circle cx="29" cy="13.5" r="1.3" />
        <circle cx="32" cy="12.1" r="1.6" />
        <circle cx="35" cy="13.5" r="1.3" />
        <path d="M28 15.5H36L37.2 19H26.8Z" />
        <path d="M27 20H37L39.5 26H24.5Z" />
        <path d="M24.5 27H39.5L42 34H22Z" />
        <path d="M22 35H42L44.5 43H19.5Z" />
        <path d="M19.5 44H44.5L47.5 53H16.5Z" />
        <rect x="14" y="53" width="36" height="4" rx="1.2" />
      </g>
      <path d="M28.5 53V47a3.5 3.5 0 0 1 7 0V53Z" fill={`url(#${id})`} />
    </svg>
  );
}
