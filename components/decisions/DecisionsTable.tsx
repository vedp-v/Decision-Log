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
    <div className="hidden md:block rounded-lg border bg-card">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="h-10 px-4 text-left text-xs font-medium text-muted-foreground">
              Title
            </th>
            <th className="h-10 px-4 text-left text-xs font-medium text-muted-foreground">
              Status
            </th>
            <th className="h-10 px-4 text-left text-xs font-medium text-muted-foreground">
              Date
            </th>
            <th className="h-10 px-4 text-left text-xs font-medium text-muted-foreground">
              Confidence
            </th>
            <th className="h-10 px-4 text-left text-xs font-medium text-muted-foreground">
              Reversible
            </th>
            <th className="h-10 px-4 text-left text-xs font-medium text-muted-foreground">
              Review
            </th>
            <th className="h-10 px-4 text-left text-xs font-medium text-muted-foreground">
              Tags
            </th>
          </tr>
        </thead>
        <tbody>
          {decisions.map((decision) => (
            <tr
              key={decision.id}
              className="border-b last:border-0 transition-colors hover:bg-muted/50"
            >
              <td className="px-4 py-3">
                <Link
                  href={`/decisions/${decision.id}`}
                  className="text-sm font-medium text-foreground hover:underline underline-offset-4"
                >
                  {decision.title}
                </Link>
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={decision.status} />
              </td>
              <td className="px-4 py-3 text-sm text-muted-foreground">
                {formatDate(decision.date)}
              </td>
              <td className="px-4 py-3">
                <span className="text-sm font-medium tabular-nums">{decision.confidence}%</span>
              </td>
              <td className="px-4 py-3 text-sm text-muted-foreground">
                {decision.reversible ? 'Yes' : 'No'}
              </td>
              <td className="px-4 py-3 text-sm text-muted-foreground">
                {decision.reviewDate ? formatDate(decision.reviewDate) : '—'}
              </td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1">
                  {decision.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                  {decision.tags.length > 2 && (
                    <span className="inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
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
