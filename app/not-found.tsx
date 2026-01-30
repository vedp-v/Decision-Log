import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">404</h2>
      <p className="text-xl text-gray-600 mb-8">Decision not found</p>
      <Link href="/">
        <Button>Go back home</Button>
      </Link>
    </div>
  );
}
