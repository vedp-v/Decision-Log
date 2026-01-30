'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { createDecision, updateDecision } from '@/lib/actions';
import { DecisionFormData, Link } from '@/types/decision';

interface DecisionFormProps {
  initialData?: Partial<DecisionFormData> & { id?: string };
  isEdit?: boolean;
}

export function DecisionForm({ initialData, isEdit = false }: DecisionFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<DecisionFormData>({
    title: initialData?.title || '',
    date: initialData?.date || new Date(),
    status: initialData?.status || 'Proposed',
    context: initialData?.context || '',
    optionsConsidered: initialData?.optionsConsidered || '',
    decision: initialData?.decision || '',
    expectedImpact: initialData?.expectedImpact || '',
    confidence: initialData?.confidence || 60,
    reversible: initialData?.reversible ?? true,
    reviewDate: initialData?.reviewDate || null,
    links: initialData?.links || [],
    tags: initialData?.tags || [],
  });

  const [tagsInput, setTagsInput] = useState(
    initialData?.tags?.join(', ') || ''
  );

  function handleAddLink() {
    setFormData({
      ...formData,
      links: [...(formData.links || []), { label: '', url: '' }],
    });
  }

  function handleRemoveLink(index: number) {
    const newLinks = [...(formData.links || [])];
    newLinks.splice(index, 1);
    setFormData({ ...formData, links: newLinks });
  }

  function handleLinkChange(
    index: number,
    field: 'label' | 'url',
    value: string
  ) {
    const newLinks = [...(formData.links || [])];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setFormData({ ...formData, links: newLinks });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setLoading(true);
    try {
      const tags = tagsInput
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const dataToSubmit = {
        ...formData,
        tags,
        links: formData.links?.filter((link) => link.label && link.url),
      };

      let result;
      if (isEdit && initialData?.id) {
        result = await updateDecision(initialData.id, dataToSubmit);
        if (result.success) {
          router.push(`/decisions/${initialData.id}`);
        }
      } else {
        result = await createDecision(dataToSubmit);
        if (result.success && result.id) {
          router.push(`/decisions/${result.id}`);
        }
      }
    } catch (error) {
      console.error('Error saving decision:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Title"
        required
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="What decision are you making?"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Date"
          type="date"
          value={formData.date.toISOString().split('T')[0]}
          onChange={(e) =>
            setFormData({ ...formData, date: new Date(e.target.value) })
          }
        />

        <Select
          label="Status"
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value as 'Proposed' | 'Decided' | 'Reversed',
            })
          }
          options={[
            { value: 'Proposed', label: 'Proposed' },
            { value: 'Decided', label: 'Decided' },
            { value: 'Reversed', label: 'Reversed' },
          ]}
        />
      </div>

      <Textarea
        label="Context"
        value={formData.context}
        onChange={(e) => setFormData({ ...formData, context: e.target.value })}
        placeholder="What's the background and situation?"
        rows={4}
      />

      <Textarea
        label="Options Considered"
        value={formData.optionsConsidered}
        onChange={(e) =>
          setFormData({ ...formData, optionsConsidered: e.target.value })
        }
        placeholder="List the options you considered (one per line)"
        rows={4}
      />

      <Textarea
        label="Decision"
        value={formData.decision}
        onChange={(e) => setFormData({ ...formData, decision: e.target.value })}
        placeholder="What did you decide?"
        rows={3}
      />

      <Textarea
        label="Expected Impact / Success Metric"
        value={formData.expectedImpact}
        onChange={(e) =>
          setFormData({ ...formData, expectedImpact: e.target.value })
        }
        placeholder="What do you expect to happen?"
        rows={3}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confidence: {formData.confidence}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={formData.confidence}
          onChange={(e) =>
            setFormData({ ...formData, confidence: parseInt(e.target.value) })
          }
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Low (0%)</span>
          <span>High (100%)</span>
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            checked={formData.reversible}
            onChange={(e) =>
              setFormData({ ...formData, reversible: e.target.checked })
            }
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          Reversible
        </label>
        <p className="text-xs text-gray-500 mt-1 ml-6">
          Can this decision be changed later?
        </p>
      </div>

      <Input
        label="Review Date"
        type="date"
        value={
          formData.reviewDate
            ? new Date(formData.reviewDate).toISOString().split('T')[0]
            : ''
        }
        onChange={(e) =>
          setFormData({
            ...formData,
            reviewDate: e.target.value ? new Date(e.target.value) : null,
          })
        }
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Links
        </label>
        {formData.links && formData.links.length > 0 && (
          <div className="space-y-2 mb-2">
            {formData.links.map((link, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="Label"
                  value={link.label}
                  onChange={(e) =>
                    handleLinkChange(index, 'label', e.target.value)
                  }
                  className="flex-1"
                />
                <Input
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) =>
                    handleLinkChange(index, 'url', e.target.value)
                  }
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemoveLink(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
        <Button type="button" variant="secondary" size="sm" onClick={handleAddLink}>
          Add Link
        </Button>
      </div>

      <Input
        label="Tags"
        value={tagsInput}
        onChange={(e) => setTagsInput(e.target.value)}
        placeholder="Career, Product, Personal (comma separated)"
      />

      <div className="flex gap-3 pt-4 border-t">
        <Button type="submit" disabled={loading || !formData.title.trim()}>
          {loading ? 'Saving...' : isEdit ? 'Update' : 'Save'}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push(isEdit && initialData?.id ? `/decisions/${initialData.id}` : '/')}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
