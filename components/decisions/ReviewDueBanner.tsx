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
    <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-4 mb-6">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg
            className="h-4 w-4 text-amber-600"
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
          <h3 className="text-sm font-semibold text-amber-900 mb-1.5">
            {decisions.length} {decisions.length === 1 ? 'decision' : 'decisions'} due for review
          </h3>
          <ul className="space-y-1">
            {decisions.map((decision) => (
              <li key={decision.id}>
                <Link
                  href={`/decisions/${decision.id}`}
                  className="text-sm text-amber-800 hover:text-amber-950 transition-colors inline-flex items-center gap-2"
                >
                  <span className="font-medium truncate">{decision.title}</span>
                  {decision.reviewDate && (
                    <span className="text-amber-600 text-xs whitespace-nowrap">
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
