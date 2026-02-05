import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { auth } from '@/auth';
import { SignIn } from '@/components/auth/SignIn';
import { UserMenu } from '@/components/auth/UserMenu';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Decision Log',
  description: 'Track your important decisions with context, confidence, and outcomes',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased font-sans">
        <div className="min-h-screen bg-slate-50">
          <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
              <h1 className="text-xl font-semibold text-slate-900 tracking-tight">
                <Link href="/">Decision Log</Link>
              </h1>
              <div>
                {session?.user ? (
                  <UserMenu user={session.user} />
                ) : (
                  <SignIn />
                )}
              </div>
            </div>
          </header>
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
