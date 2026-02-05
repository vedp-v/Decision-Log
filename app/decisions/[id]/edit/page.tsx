import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { DecisionForm } from '@/components/decisions/DecisionForm';
import { getDecision } from '@/lib/actions';
import { auth } from '@/auth';

export default async function EditDecisionPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  if (!session?.user) {
    redirect('/api/auth/signin');
  }

  const decision = await getDecision(params.id);

  if (!decision) {
    notFound();
  }

  // Security Check: ensure user owns this decision
  if (decision.userId && decision.userId !== session.user.id) {
    return <div>Unauthorized</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Edit Decision</h2>
        <p className="text-gray-600 mt-1">Update the details of your decision.</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <DecisionForm
          initialData={{
            id: decision.id,
            title: decision.title,
            date: decision.date,
            status: decision.status,
            context: decision.context || '',
            optionsConsidered: decision.optionsConsidered || '',
            decision: decision.decision || '',
            expectedImpact: decision.expectedImpact || '',
            confidence: decision.confidence,
            reversible: decision.reversible || false,
            reviewDate: decision.reviewDate,
            links: decision.links || [],
            tags: decision.tags,
          }}
          isEdit
        />
      </div>
    </div>
  );
}
