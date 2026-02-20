import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { auth } from '@/auth';
import { SignIn } from '@/components/auth/SignIn';
import { UserMenu } from '@/components/auth/UserMenu';

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
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen bg-slate-50">
          <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
              <h1 className="text-xl font-semibold text-slate-900 tracking-tight">
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-gray-900 rounded-md flex items-center justify-center flex-shrink-0">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <path d="M14 2v6h6" />
                      <line x1="12" y1="18" x2="12" y2="12" />
                      <line x1="9" y1="15" x2="15" y2="15" />
                    </svg>
                  </div>
                  Decision Log
                </Link>
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
