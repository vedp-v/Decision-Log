'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { OutcomeSection } from './OutcomeSection';
import { NotesTimeline } from './NotesTimeline';
import { deleteDecision } from '@/lib/actions';
import { formatDate } from '@/lib/utils';
import { DecisionWithNotes } from '@/types/decision';

interface DecisionDetailProps {
  decision: DecisionWithNotes;
}

export function DecisionDetail({ decision }: DecisionDetailProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      const result = await deleteDecision(decision.id);
      if (result.success) {
        router.push('/');
      }
    } catch (error) {
      console.error('Error deleting decision:', error);
    } finally {
      setDeleting(false);
      setShowDeleteDialog(false);
    }
  }

  const statusStyles = {
    Proposed: 'badge-blue',
    Decided: 'badge-green',
    Reversed: 'badge-gray',
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
        <div>
          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-slate-700 mb-3 inline-flex items-center gap-1 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to decisions
          </Link>
          <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">{decision.title}</h2>
          <div className="flex items-center gap-3 mt-2">
            <span className={`badge ${statusStyles[decision.status]}`}>
              {decision.status}
            </span>
            <span className="text-sm text-slate-500">{formatDate(decision.date)}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/decisions/${decision.id}/edit`}>
            <Button variant="secondary">Edit</Button>
          </Link>
          <Button variant="danger" onClick={() => setShowDeleteDialog(true)}>
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Details */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">
            <h3 className="text-base font-semibold text-slate-900">Details</h3>

            {decision.context && (
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                  Context
                </h4>
                <p className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed">
                  {decision.context}
                </p>
              </div>
            )}

            {decision.optionsConsidered && (
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                  Options Considered
                </h4>
                <div className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed">
                  {decision.optionsConsidered.split('\n').map((line, i) => (
                    <div key={i} className="mb-1">
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {decision.decision && (
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                  Decision
                </h4>
                <p className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed">
                  {decision.decision}
                </p>
              </div>
            )}

            {decision.expectedImpact && (
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">
                  Expected Impact
                </h4>
                <p className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed">
                  {decision.expectedImpact}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-slate-100">
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                  Confidence
                </h4>
                <p className="text-slate-900 text-sm font-medium">{decision.confidence}%</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                  Reversible
                </h4>
                <p className="text-slate-900 text-sm font-medium">
                  {decision.reversible ? 'Yes' : 'No'}
                </p>
              </div>
              {decision.reviewDate && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
                    Review Date
                  </h4>
                  <p className="text-slate-900 text-sm font-medium">
                    {formatDate(decision.reviewDate)}
                  </p>
                </div>
              )}
            </div>

            {decision.links && decision.links.length > 0 && (
              <div className="pt-2 border-t border-slate-100">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Links
                </h4>
                <ul className="space-y-1.5">
                  {decision.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm inline-flex items-center gap-1 transition-colors"
                      >
                        {link.label || link.url}
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {decision.tags.length > 0 && (
              <div className="pt-2 border-t border-slate-100">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Tags</h4>
                <div className="flex flex-wrap gap-1.5">
                  {decision.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Outcome Section */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <OutcomeSection
              decisionId={decision.id}
              initialData={{
                outcomeStatus: decision.outcomeStatus,
                actualImpact: decision.actualImpact,
                learnings: decision.learnings,
                whatIdDoDifferently: decision.whatIdDoDifferently,
                reviewedOn: decision.reviewedOn,
              }}
            />
          </div>
        </div>

        {/* Notes Timeline */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sticky top-20">
            <NotesTimeline decisionId={decision.id} notes={decision.notes} />
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDelete}
        title="Delete Decision"
        message="Are you sure you want to delete this decision? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
