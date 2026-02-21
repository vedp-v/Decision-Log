import { auth } from '@/auth';
import { LoginPage } from '@/components/auth/LoginPage';
import { HomePage } from '@/components/decisions/HomePage';

export default async function Page() {
  const session = await auth();

  if (!session?.user) {
    return <LoginPage />;
  }

  return <HomePage />;
}
