import { cn } from '@/utils/cn';

/** TempleOS gopuram brandmark (matches the favicon). */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn('shrink-0', className)} aria-hidden role="img">
      <rect width="64" height="64" rx="16" fill="#7C6CF2" />
      <g fill="#fff">
        <path d="M32 10 40 20H24Z" />
        <rect x="25" y="22" width="14" height="4" rx="1" opacity="0.95" />
        <path d="M22 28H42l-2 5H24Z" opacity="0.9" />
        <path d="M20 35H44l-2 6H22Z" opacity="0.82" />
        <path d="M18 43H46l-2 7H20Z" opacity="0.74" />
        <rect x="29" y="44" width="6" height="10" rx="1" fill="#7C6CF2" />
      </g>
    </svg>
  );
}
