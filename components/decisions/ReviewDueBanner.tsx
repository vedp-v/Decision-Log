import React from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

interface Decision {
  id: string;
  title: string;
  reviewDate: Date | null;
}

interface ReviewDueBannerProps {
  decisions: Decision[];
}

export function ReviewDueBanner({ decisions }: ReviewDueBannerProps) {
  if (decisions.length === 0) return null;

  return (
    <div className="rounded-lg border border-warning/30 bg-warning/5 p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-warning/10">
          <svg
            className="h-4 w-4 text-warning"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-foreground mb-1.5">
            {decisions.length} {decisions.length === 1 ? 'decision' : 'decisions'} due for review
          </h3>
          <ul className="space-y-1">
            {decisions.map((decision) => (
              <li key={decision.id}>
                <Link
                  href={`/decisions/${decision.id}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
                >
                  <span className="font-medium truncate">{decision.title}</span>
                  {decision.reviewDate && (
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatDate(decision.reviewDate)}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
