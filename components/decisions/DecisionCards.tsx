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
    <div className="md:hidden space-y-2">
      {decisions.map((decision) => (
        <Link
          key={decision.id}
          href={`/decisions/${decision.id}`}
          className="block rounded-lg border bg-card p-4 transition-colors active:bg-muted/50"
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="text-sm font-medium text-foreground flex-1 leading-snug">
              {decision.title}
            </h3>
            <StatusBadge status={decision.status} />
          </div>

          {decision.decision && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {decision.decision}
            </p>
          )}

          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm mb-3">
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground">Date</span>
              <span className="font-medium">{formatDate(decision.date)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground">Confidence</span>
              <span className="font-medium tabular-nums">{decision.confidence}%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground">Reversible</span>
              <span className="font-medium">{decision.reversible ? 'Yes' : 'No'}</span>
            </div>
            {decision.reviewDate && (
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground">Review</span>
                <span className="font-medium">{formatDate(decision.reviewDate)}</span>
              </div>
            )}
          </div>

          {decision.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {decision.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground"
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
