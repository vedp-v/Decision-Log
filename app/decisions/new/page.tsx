
import React from 'react';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { NewDecisionContent } from '@/components/decisions/NewDecisionContent';

export default async function NewDecisionPage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/api/auth/signin');
  }

  return <NewDecisionContent />;
}
