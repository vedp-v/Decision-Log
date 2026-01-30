'use client';

import React from 'react';
import { Select } from '@/components/ui/Input';
import { DecisionStatus } from '@/types/decision';

interface FiltersProps {
  status: string;
  onStatusChange: (status: string) => void;
  tag: string;
  onTagChange: (tag: string) => void;
  reviewDue: string;
  onReviewDueChange: (reviewDue: string) => void;
  allTags: string[];
}

export function Filters({
  status,
  onStatusChange,
  tag,
  onTagChange,
  reviewDue,
  onReviewDueChange,
  allTags,
}: FiltersProps) {
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'Proposed', label: 'Proposed' },
    { value: 'Decided', label: 'Decided' },
    { value: 'Reversed', label: 'Reversed' },
  ];

  const reviewDueOptions = [
    { value: 'all', label: 'All Dates' },
    { value: '7', label: 'Due in 7 days' },
    { value: '14', label: 'Due in 14 days' },
    { value: '30', label: 'Due in 30 days' },
  ];

  const tagOptions = [
    { value: '', label: 'All Tags' },
    ...allTags.map((t) => ({ value: t, label: t })),
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Select
        label="Status"
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        options={statusOptions}
      />
      <Select
        label="Tag"
        value={tag}
        onChange={(e) => onTagChange(e.target.value)}
        options={tagOptions}
      />
      <Select
        label="Review Due"
        value={reviewDue}
        onChange={(e) => onReviewDueChange(e.target.value)}
        options={reviewDueOptions}
      />
    </div>
  );
}
