import { Link } from 'react-router-dom';
import { useLocale } from '@/store/locale';
import { Container } from '@/components/common/Container';
import { Button } from '@/components/ui/Button';
import { BrandMark } from '@/components/layout/BrandMark';

export function NotFoundPage() {
  const { tx } = useLocale();
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <BrandMark className="h-16 w-16" />
      <div className="mt-6 text-display leading-none text-primary">404</div>
      <h1 className="mt-2 text-h3">{tx({ ta: 'பக்கம் கிடைக்கவில்லை', en: 'Page not found' })}</h1>
      <p className="mt-1 max-w-sm text-body text-muted">
        {tx({
          ta: 'நீங்கள் தேடிய பக்கம் இல்லை அல்லது நகர்த்தப்பட்டுள்ளது.',
          en: 'The page you were looking for does not exist or has moved.',
        })}
      </p>
      <Link to="/" className="mt-6">
        <Button>{tx({ ta: 'முகப்புக்குச் செல்', en: 'Back to home' })}</Button>
      </Link>
    </Container>
  );
}
