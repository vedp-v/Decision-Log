'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Select, Textarea } from '@/components/ui/Input';
import { updateOutcome } from '@/lib/actions';
import { OutcomeStatus } from '@/types/decision';

interface OutcomeSectionProps {
  decisionId: string;
  initialData: {
    outcomeStatus: OutcomeStatus;
    actualImpact?: string | null;
    learnings?: string | null;
    whatIdDoDifferently?: string | null;
    reviewedOn?: Date | null;
  };
}

export function OutcomeSection({
  decisionId,
  initialData,
}: OutcomeSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    outcomeStatus: initialData.outcomeStatus,
    actualImpact: initialData.actualImpact || '',
    learnings: initialData.learnings || '',
    whatIdDoDifferently: initialData.whatIdDoDifferently || '',
    reviewedOn: initialData.reviewedOn
      ? new Date(initialData.reviewedOn).toISOString().split('T')[0]
      : '',
  });

  async function handleSubmit() {
    setLoading(true);
    try {
      await updateOutcome(decisionId, {
        outcomeStatus: formData.outcomeStatus as OutcomeStatus,
        actualImpact: formData.actualImpact || undefined,
        learnings: formData.learnings || undefined,
        whatIdDoDifferently: formData.whatIdDoDifferently || undefined,
        reviewedOn: formData.reviewedOn
          ? new Date(formData.reviewedOn)
          : null,
      });
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error('Error updating outcome:', error);
    } finally {
      setLoading(false);
    }
  }

  const hasOutcomeData =
    initialData.outcomeStatus !== 'Unknown' ||
    initialData.actualImpact ||
    initialData.learnings ||
    initialData.whatIdDoDifferently ||
    initialData.reviewedOn;

  const outcomeStatusStyles = {
    Success: 'badge-green',
    Partial: 'badge-amber',
    Fail: 'badge-red',
    Unknown: 'badge-gray',
  };

  if (!isEditing && !hasOutcomeData) {
    return (
      <div className="bg-slate-50 rounded-lg p-6 text-center">
        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-3">
          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-sm text-slate-600 mb-3">No outcome recorded yet</p>
        <Button size="sm" onClick={() => setIsEditing(true)}>
          Add Outcome
        </Button>
      </div>
    );
  }

  if (!isEditing) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-semibold text-slate-900">Outcome</h4>
          <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</span>
          <span className={`badge ${outcomeStatusStyles[initialData.outcomeStatus]}`}>
            {initialData.outcomeStatus}
          </span>
        </div>

        {initialData.actualImpact && (
          <div>
            <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
              Actual Impact
            </h5>
            <p className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed">
              {initialData.actualImpact}
            </p>
          </div>
        )}

        {initialData.learnings && (
          <div>
            <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Learnings</h5>
            <p className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed">
              {initialData.learnings}
            </p>
          </div>
        )}

        {initialData.whatIdDoDifferently && (
          <div>
            <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
              What I'd Do Differently
            </h5>
            <p className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed">
              {initialData.whatIdDoDifferently}
            </p>
          </div>
        )}

        {initialData.reviewedOn && (
          <div className="pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Reviewed on </span>
            <span className="text-sm text-slate-700 font-medium" suppressHydrationWarning>
              {new Date(initialData.reviewedOn).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h4 className="text-base font-semibold text-slate-900">Edit Outcome</h4>

      <Select
        label="Outcome Status"
        value={formData.outcomeStatus}
        onChange={(e) =>
          setFormData({
            ...formData,
            outcomeStatus: e.target.value as OutcomeStatus,
          })
        }
        options={[
          { value: 'Unknown', label: 'Unknown' },
          { value: 'Success', label: 'Success' },
          { value: 'Partial', label: 'Partial' },
          { value: 'Fail', label: 'Fail' },
        ]}
      />

      <Textarea
        label="Actual Impact"
        value={formData.actualImpact}
        onChange={(e) =>
          setFormData({ ...formData, actualImpact: e.target.value })
        }
        placeholder="What actually happened?"
        rows={3}
      />

      <Textarea
        label="Learnings"
        value={formData.learnings}
        onChange={(e) =>
          setFormData({ ...formData, learnings: e.target.value })
        }
        placeholder="What did you learn from this decision?"
        rows={3}
      />

      <Textarea
        label="What I'd Do Differently"
        value={formData.whatIdDoDifferently}
        onChange={(e) =>
          setFormData({ ...formData, whatIdDoDifferently: e.target.value })
        }
        placeholder="What would you change if you could do it again?"
        rows={3}
      />

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          Reviewed On
        </label>
        <input
          type="date"
          value={formData.reviewedOn}
          onChange={(e) =>
            setFormData({ ...formData, reviewedOn: e.target.value })
          }
          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 transition-colors hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
        <Button variant="secondary" onClick={() => setIsEditing(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
