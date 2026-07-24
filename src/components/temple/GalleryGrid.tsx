import { useState } from 'react';
import type { LocalizedText } from '@/types';
import { useLocale } from '@/store/locale';
import { SmartImage } from '@/components/ui/SmartImage';
import { Dialog } from '@/components/ui/Dialog';
import { cn } from '@/utils/cn';

export function GalleryGrid({ images, title }: { images: string[]; title: LocalizedText }) {
  const { tx } = useLocale();
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              'aspect-square overflow-hidden rounded-lg transition-transform duration-200 hover:scale-[1.02]',
              i === 0 && 'col-span-2 row-span-2 aspect-auto sm:col-span-2 sm:row-span-2',
            )}
          >
            <SmartImage src={img} alt={`${tx(title)} ${i + 1}`} rounded />
          </button>
        ))}
      </div>

      <Dialog open={active !== null} onClose={() => setActive(null)} className="max-w-3xl p-2">
        {active !== null && (
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <SmartImage src={images[active]} alt={tx(title)} rounded />
          </div>
        )}
      </Dialog>
    </>
  );
}
