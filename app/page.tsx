'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { SearchBar } from '@/components/decisions/SearchBar';
import { Filters } from '@/components/decisions/Filters';
import { DecisionsTable } from '@/components/decisions/DecisionsTable';
import { DecisionCards } from '@/components/decisions/DecisionCards';
import { ReviewDueBanner } from '@/components/decisions/ReviewDueBanner';

interface Decision {
  id: string;
  title: string;
  status: 'Proposed' | 'Decided' | 'Reversed';
  date: Date;
  confidence: number;
  reversible: boolean;
  reviewDate: Date | null;
  tags: string[];
  context?: string | null;
  decision?: string | null;
}

export default function HomePage() {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [reviewDueDecisions, setReviewDueDecisions] = useState<Decision[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('');
  const [reviewDueFilter, setReviewDueFilter] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [decisionsRes, tagsRes, reviewDueRes] = await Promise.all([
        fetch('/api/decisions'),
        fetch('/api/tags'),
        fetch('/api/decisions/review-due'),
      ]);

      if (decisionsRes.status === 401) {
        setDecisions([]);
        setAllTags([]);
        setReviewDueDecisions([]);
        setLoading(false);
        return;
      }

      const decisionsData = await decisionsRes.json();
      const tagsData = await tagsRes.json();
      const reviewDueData = await reviewDueRes.json();

      setDecisions(
        Array.isArray(decisionsData) ? decisionsData.map((d: any) => ({
          ...d,
          date: new Date(d.date),
          reviewDate: d.reviewDate ? new Date(d.reviewDate) : null,
        })) : []
      );
      setAllTags(Array.isArray(tagsData) ? tagsData : []);
      setReviewDueDecisions(
        Array.isArray(reviewDueData) ? reviewDueData.map((d: any) => ({
          ...d,
          reviewDate: d.reviewDate ? new Date(d.reviewDate) : null,
        })) : []
      );
    } catch (error) {
      console.error('Error fetching data:', error);
      setDecisions([]);
      setAllTags([]);
      setReviewDueDecisions([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleExportCSV() {
    try {
      const response = await fetch('/api/decisions/export');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `decisions-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting CSV:', error);
    }
  }

  const filteredDecisions = decisions.filter((decision) => {
    if (search) {
      const searchLower = search.toLowerCase();
      const matchesTitle = decision.title.toLowerCase().includes(searchLower);
      const matchesContext = decision.context?.toLowerCase().includes(searchLower);
      if (!matchesTitle && !matchesContext) return false;
    }

    if (statusFilter !== 'all' && decision.status !== statusFilter) {
      return false;
    }

    if (tagFilter && !decision.tags.includes(tagFilter)) {
      return false;
    }

    if (reviewDueFilter !== 'all' && decision.reviewDate) {
      const days = parseInt(reviewDueFilter);
      const today = new Date();
      const reviewDate = new Date(decision.reviewDate);
      const diffTime = reviewDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays < 0 || diffDays > days) return false;
    }

    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground text-sm">Loading decisions...</div>
      </div>
    );
  }

  return (
    <div>
      <ReviewDueBanner decisions={reviewDueDecisions} />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Decisions</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {filteredDecisions.length} total
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            Export CSV
          </Button>
          <Link href="/decisions/new">
            <Button size="sm">New Decision</Button>
          </Link>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by title or context..."
        />
        <Filters
          status={statusFilter}
          onStatusChange={setStatusFilter}
          tag={tagFilter}
          onTagChange={setTagFilter}
          reviewDue={reviewDueFilter}
          onReviewDueChange={setReviewDueFilter}
          allTags={allTags}
        />
      </div>

      {filteredDecisions.length === 0 ? (
        <div className="rounded-lg border bg-card p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted mx-auto mb-4">
            <svg
              className="h-6 w-6 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-sm font-medium text-foreground mb-1">
            {decisions.length === 0 ? 'No decisions yet' : 'No results found'}
          </h3>
          <p className="text-sm text-muted-foreground mb-5">
            {decisions.length === 0
              ? 'Start tracking your decisions to see them here.'
              : 'Try adjusting your filters or search terms.'}
          </p>
          {decisions.length === 0 && (
            <Link href="/decisions/new">
              <Button size="sm">Create Your First Decision</Button>
            </Link>
          )}
        </div>
      ) : (
        <>
          <DecisionsTable decisions={filteredDecisions} />
          <DecisionCards decisions={filteredDecisions} />
        </>
      )}
    </div>
  );
}
