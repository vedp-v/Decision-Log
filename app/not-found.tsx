import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-4xl font-bold text-foreground mb-4">404</h2>
      <p className="text-lg text-muted-foreground mb-8">Decision not found</p>
      <Link href="/">
        <Button variant="outline">Go back home</Button>
      </Link>
    </div>
  );
}
