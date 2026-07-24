import { cn } from '@/utils/cn';
import { SmartImage } from './SmartImage';

interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'h-8 w-8 text-caption',
  md: 'h-10 w-10 text-body',
  lg: 'h-14 w-14 text-h4',
};

function initials(name: string): string {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  return (
    <div
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-violet-light font-semibold text-primary',
        sizes[size],
        className,
      )}
    >
      {src ? <SmartImage src={src} alt={name} glyph={false} /> : <span>{initials(name)}</span>}
    </div>
  );
}
