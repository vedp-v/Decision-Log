'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { addNote } from '@/lib/actions';
import { formatDateTime } from '@/lib/utils';

interface Note {
  id: string;
  content: string;
  createdAt: Date;
}

interface NotesTimelineProps {
  decisionId: string;
  notes: Note[];
}

export function NotesTimeline({ decisionId, notes }: NotesTimelineProps) {
  const [newNote, setNewNote] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleAddNote() {
    if (!newNote.trim()) return;

    setLoading(true);
    try {
      await addNote(decisionId, newNote);
      setNewNote('');
      window.location.reload();
    } catch (error) {
      console.error('Error adding note:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold">Notes</h4>

      <div className="space-y-2">
        <Textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a note..."
          rows={2}
        />
        <Button
          size="sm"
          onClick={handleAddNote}
          disabled={loading || !newNote.trim()}
        >
          {loading ? 'Adding...' : 'Add Note'}
        </Button>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted mx-auto mb-2">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <p className="text-muted-foreground text-sm">No notes yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notes.map((note) => (
            <div
              key={note.id}
              className="rounded-md border bg-muted/50 p-3"
            >
              <p className="text-sm whitespace-pre-wrap leading-relaxed mb-1.5">
                {note.content}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDateTime(note.createdAt)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
