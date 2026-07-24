import { useState } from 'react';
import { Landmark } from 'lucide-react';
import { cn } from '@/utils/cn';

/**
 * Renders an image from a URL/path, OR a deterministic calm gradient when given
 * a seed string. This lets the mock layer ship zero external assets while still
 * looking intentional. Swap seeds for real URLs later — no component change.
 */
interface SmartImageProps {
  /** A URL/path (rendered as <img>) or a seed string (rendered as a gradient). */
  src: string;
  alt?: string;
  className?: string;
  /** Show a subtle temple glyph on gradient placeholders. */
  glyph?: boolean;
  rounded?: boolean;
}

function isUrl(s: string): boolean {
  return /^(https?:)?\/\//.test(s) || s.startsWith('/') || s.startsWith('data:');
}

/** Deterministic hue pair from a seed — kept in a warm terracotta/saffron/gold range. */
function gradientFor(seed: string): { from: string; to: string } {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  const base = 18 + (hash % 40); // 18–58 → terracotta → saffron → gold
  const h1 = base;
  const h2 = base + 16;
  return {
    from: `hsl(${h1} 56% 66%)`,
    to: `hsl(${h2} 52% 52%)`,
  };
}

export function SmartImage({ src, alt = '', className, glyph = true, rounded }: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (isUrl(src) && !failed) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className={cn('h-full w-full object-cover', rounded && 'rounded-lg', className)}
      />
    );
  }

  const { from, to } = gradientFor(src || alt || 'templeos');
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        'relative flex h-full w-full items-center justify-center overflow-hidden',
        rounded && 'rounded-lg',
        className,
      )}
      style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(120% 80% at 20% 10%, rgba(255,255,255,0.45), transparent 55%)',
        }}
      />
      {glyph && <Landmark className="relative h-1/4 w-1/4 max-h-16 max-w-16 text-white/40" strokeWidth={1.25} />}
    </div>
  );
}
