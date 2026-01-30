import React from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { DecisionStatus } from '@/types/decision';

interface Decision {
  id: string;
  title: string;
  status: DecisionStatus;
  date: Date;
  confidence: number;
  reversible: boolean;
  reviewDate: Date | null;
  tags: string[];
  decision?: string | null;
}

interface DecisionCardsProps {
  decisions: Decision[];
}

function StatusBadge({ status }: { status: DecisionStatus }) {
  const styles = {
    Proposed: 'badge-blue',
    Decided: 'badge-green',
    Reversed: 'badge-gray',
  };

  return (
    <span className={`badge ${styles[status]}`}>
      {status}
    </span>
  );
}

export function DecisionCards({ decisions }: DecisionCardsProps) {
  return (
    <div className="md:hidden space-y-3">
      {decisions.map((decision) => (
        <Link
          key={decision.id}
          href={`/decisions/${decision.id}`}
          className="block bg-white rounded-xl border border-slate-200 p-4 shadow-sm active:bg-slate-50 transition-colors"
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-base font-semibold text-slate-900 flex-1 leading-snug">
              {decision.title}
            </h3>
            <StatusBadge status={decision.status} />
          </div>

          {decision.decision && (
            <p className="text-sm text-slate-600 mb-3 line-clamp-2 leading-relaxed">
              {decision.decision}
            </p>
          )}

          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm mb-3">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Date</span>
              <span className="text-slate-700 font-medium">
                {formatDate(decision.date)}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Confidence</span>
              <span className="text-slate-700 font-medium">{decision.confidence}%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Reversible</span>
              <span className="text-slate-700 font-medium">
                {decision.reversible ? 'Yes' : 'No'}
              </span>
            </div>
            {decision.reviewDate && (
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Review</span>
                <span className="text-slate-700 font-medium">
                  {formatDate(decision.reviewDate)}
                </span>
              </div>
            )}
          </div>

          {decision.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {decision.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}
