import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@/auth';
import { signOut } from '@/auth';
import { prisma } from '@/lib/db';
import { Button } from '@/components/ui/Button';

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/');
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { createdAt: true },
  });

  const memberSince = user?.createdAt
    ? new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(user.createdAt)
    : null;

  return (
    <div className="max-w-xl mx-auto py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        Back to decisions
      </Link>

      <div className="bg-card rounded-xl border border-border shadow-sm p-8">
        <div className="flex flex-col items-center text-center">
          {session.user.image && (
            <Image
              src={session.user.image}
              alt={session.user.name || 'Profile'}
              width={80}
              height={80}
              className="rounded-full ring-2 ring-border mb-4"
            />
          )}

          <h2 className="text-xl font-semibold text-foreground">
            {session.user.name}
          </h2>

          <p className="text-sm text-muted-foreground mt-1">
            {session.user.email}
          </p>

          {memberSince && (
            <p className="text-xs text-muted-foreground mt-3">
              Member since {memberSince}
            </p>
          )}

          <div className="border-t border-border mt-6 pt-6">
            <form
              action={async () => {
                'use server';
                await signOut({ redirectTo: '/' });
              }}
            >
              <Button type="submit" variant="outline">
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
