import React from 'react';
import { notFound } from 'next/navigation';
import { DecisionDetail } from '@/components/decisions/DecisionDetail';
import { getDecision } from '@/lib/actions';

export default async function DecisionPage({
  params,
}: {
  params: { id: string };
}) {
  const decision = await getDecision(params.id);

  if (!decision) {
    notFound();
  }

  return <DecisionDetail decision={decision} />;
}
