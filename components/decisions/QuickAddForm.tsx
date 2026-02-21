'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { createDecision } from '@/lib/actions';

interface QuickAddFormProps {
  onExpand: () => void;
}

export function QuickAddForm({ onExpand }: QuickAddFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    decision: '',
    confidence: 60,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setLoading(true);
    try {
      const result = await createDecision({
        title: formData.title,
        date: new Date(),
        status: 'Proposed',
        decision: formData.decision || undefined,
        confidence: formData.confidence,
        reversible: true,
        tags: [],
      });

      if (result.success && result.id) {
        router.push(`/decisions/${result.id}`);
      }
    } catch (error) {
      console.error('Error creating decision:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        required
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="What decision are you making?"
      />

      <Textarea
        label="Decision"
        value={formData.decision}
        onChange={(e) => setFormData({ ...formData, decision: e.target.value })}
        placeholder="What did you decide?"
        rows={3}
      />

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Confidence: <span className="tabular-nums">{formData.confidence}%</span>
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={formData.confidence}
          onChange={(e) =>
            setFormData({ ...formData, confidence: parseInt(e.target.value) })
          }
          className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-foreground"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" size="sm" disabled={loading || !formData.title.trim()}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={onExpand}>
          Expand to Full Form
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => router.push('/')}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
