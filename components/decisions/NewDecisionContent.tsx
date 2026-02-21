
'use client';

import React, { useState } from 'react';
import { QuickAddForm } from '@/components/decisions/QuickAddForm';
import { DecisionForm } from '@/components/decisions/DecisionForm';

export function NewDecisionContent() {
    const [useFullForm, setUseFullForm] = useState(false);

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-lg font-semibold tracking-tight">New Decision</h2>
                <p className="text-sm text-muted-foreground mt-1">
                    {useFullForm
                        ? 'Fill in the details about your decision.'
                        : 'Quick add a decision with just the essentials.'}
                </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
                {useFullForm ? (
                    <DecisionForm />
                ) : (
                    <QuickAddForm onExpand={() => setUseFullForm(true)} />
                )}
            </div>
        </div>
    );
}
