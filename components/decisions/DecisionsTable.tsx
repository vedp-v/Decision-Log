import React from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { DecisionStatus, OutcomeStatus } from '@/types/decision';

interface Decision {
  id: string;
  title: string;
  status: DecisionStatus;
  date: Date;
  confidence: number;
  reversible: boolean;
  reviewDate: Date | null;
  tags: string[];
}

interface DecisionsTableProps {
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

export function DecisionsTable({ decisions }: DecisionsTableProps) {
  return (
    <div className="hidden md:block overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Title
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Status
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Date
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Confidence
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Reversible
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Review
            </th>
            <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Tags
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {decisions.map((decision) => (
            <tr
              key={decision.id}
              className="hover:bg-slate-50/50 transition-colors"
            >
              <td className="px-5 py-3.5">
                <Link
                  href={`/decisions/${decision.id}`}
                  className="text-slate-900 font-medium hover:text-blue-600 transition-colors"
                >
                  {decision.title}
                </Link>
              </td>
              <td className="px-5 py-3.5">
                <StatusBadge status={decision.status} />
              </td>
              <td className="px-5 py-3.5 text-sm text-slate-600">
                {formatDate(decision.date)}
              </td>
              <td className="px-5 py-3.5">
                <span className="text-sm font-medium text-slate-700">{decision.confidence}%</span>
              </td>
              <td className="px-5 py-3.5 text-sm text-slate-600">
                {decision.reversible ? 'Yes' : 'No'}
              </td>
              <td className="px-5 py-3.5 text-sm text-slate-500">
                {decision.reviewDate ? formatDate(decision.reviewDate) : '—'}
              </td>
              <td className="px-5 py-3.5">
                <div className="flex flex-wrap gap-1.5">
                  {decision.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  {decision.tags.length > 2 && (
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md text-xs font-medium">
                      +{decision.tags.length - 2}
                    </span>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
