'use client';

import React, { useState } from 'react';
import { QuickAddForm } from '@/components/decisions/QuickAddForm';
import { DecisionForm } from '@/components/decisions/DecisionForm';

export default function NewDecisionPage() {
  const [useFullForm, setUseFullForm] = useState(false);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">New Decision</h2>
        <p className="text-gray-600 mt-1">
          {useFullForm
            ? 'Fill in the details about your decision.'
            : 'Quick add a decision with just the essentials.'}
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {useFullForm ? (
          <DecisionForm />
        ) : (
          <QuickAddForm onExpand={() => setUseFullForm(true)} />
        )}
      </div>
    </div>
  );
}
