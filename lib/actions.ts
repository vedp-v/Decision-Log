'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { DecisionFormData, OutcomeFormData, Link } from '@/types/decision';

export async function createDecision(data: DecisionFormData) {
  try {
    const decision = await prisma.decision.create({
      data: {
        title: data.title,
        date: data.date,
        status: data.status,
        context: data.context || null,
        optionsConsidered: data.optionsConsidered || null,
        decision: data.decision || null,
        expectedImpact: data.expectedImpact || null,
        confidence: data.confidence,
        reversible: data.reversible,
        reviewDate: data.reviewDate || null,
        links: data.links ? (data.links as any) : null,
        tags: data.tags,
      },
    });

    revalidatePath('/');
    return { success: true, id: decision.id };
  } catch (error) {
    console.error('Error creating decision:', error);
    return { success: false, error: 'Failed to create decision' };
  }
}

export async function updateDecision(id: string, data: DecisionFormData) {
  try {
    await prisma.decision.update({
      where: { id },
      data: {
        title: data.title,
        date: data.date,
        status: data.status,
        context: data.context || null,
        optionsConsidered: data.optionsConsidered || null,
        decision: data.decision || null,
        expectedImpact: data.expectedImpact || null,
        confidence: data.confidence,
        reversible: data.reversible,
        reviewDate: data.reviewDate || null,
        links: data.links ? (data.links as any) : null,
        tags: data.tags,
      },
    });

    revalidatePath('/');
    revalidatePath(`/decisions/${id}`);
    return { success: true };
  } catch (error) {
    console.error('Error updating decision:', error);
    return { success: false, error: 'Failed to update decision' };
  }
}

export async function deleteDecision(id: string) {
  try {
    // Soft delete - set deletedAt timestamp instead of hard delete
    await prisma.decision.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting decision:', error);
    return { success: false, error: 'Failed to delete decision' };
  }
}

export async function updateOutcome(id: string, data: OutcomeFormData) {
  try {
    await prisma.decision.update({
      where: { id },
      data: {
        outcomeStatus: data.outcomeStatus,
        actualImpact: data.actualImpact || null,
        learnings: data.learnings || null,
        whatIdDoDifferently: data.whatIdDoDifferently || null,
        reviewedOn: data.reviewedOn || null,
      },
    });

    revalidatePath(`/decisions/${id}`);
    return { success: true };
  } catch (error) {
    console.error('Error updating outcome:', error);
    return { success: false, error: 'Failed to update outcome' };
  }
}

export async function addNote(decisionId: string, content: string) {
  try {
    await prisma.decisionNote.create({
      data: {
        decisionId,
        content,
      },
    });

    revalidatePath(`/decisions/${decisionId}`);
    return { success: true };
  } catch (error) {
    console.error('Error adding note:', error);
    return { success: false, error: 'Failed to add note' };
  }
}

export async function getDecision(id: string) {
  try {
    const decision = await prisma.decision.findFirst({
      where: { 
        id,
        deletedAt: null,  // Exclude soft-deleted records
      },
      include: {
        notes: {
          where: { deletedAt: null },  // Exclude soft-deleted notes
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!decision) {
      return null;
    }

    return {
      ...decision,
      links: decision.links as Link[] | null,
    };
  } catch (error) {
    console.error('Error fetching decision:', error);
    return null;
  }
}

export async function getDecisions(filters?: {
  search?: string;
  status?: string;
  tag?: string;
  dateFrom?: Date;
  dateTo?: Date;
  reviewDue?: string;
}) {
  try {
    const where: any = {
      deletedAt: null,  // Exclude soft-deleted records
    };

    // Search filter (title and context)
    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { context: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    // Status filter
    if (filters?.status && filters.status !== 'all') {
      where.status = filters.status;
    }

    // Tag filter
    if (filters?.tag) {
      where.tags = { has: filters.tag };
    }

    // Date range filter
    if (filters?.dateFrom || filters?.dateTo) {
      where.date = {};
      if (filters.dateFrom) {
        where.date.gte = filters.dateFrom;
      }
      if (filters.dateTo) {
        where.date.lte = filters.dateTo;
      }
    }

    // Review due filter
    if (filters?.reviewDue && filters.reviewDue !== 'all') {
      const days = parseInt(filters.reviewDue);
      const today = new Date();
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + days);

      where.reviewDate = {
        gte: today,
        lte: futureDate,
      };
    }

    const decisions = await prisma.decision.findMany({
      where,
      orderBy: { date: 'desc' },
      include: {
        notes: {
          where: { deletedAt: null },  // Exclude soft-deleted notes
        },
      },
    });

    return decisions.map((decision) => ({
      ...decision,
      links: decision.links as Link[] | null,
    }));
  } catch (error) {
    console.error('Error fetching decisions:', error);
    return [];
  }
}

export async function getReviewDueDecisions(days: number = 14) {
  try {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + days);

    const decisions = await prisma.decision.findMany({
      where: {
        deletedAt: null,  // Exclude soft-deleted records
        reviewDate: {
          gte: today,
          lte: futureDate,
        },
      },
      orderBy: { reviewDate: 'asc' },
    });

    return decisions.map((decision) => ({
      ...decision,
      links: decision.links as Link[] | null,
    }));
  } catch (error) {
    console.error('Error fetching review due decisions:', error);
    return [];
  }
}

export async function getAllTags() {
  try {
    const decisions = await prisma.decision.findMany({
      where: { deletedAt: null },  // Exclude soft-deleted records
      select: { tags: true },
    });

    const allTags = decisions.flatMap((d) => d.tags);
    const uniqueTags = Array.from(new Set(allTags)).sort();

    return uniqueTags;
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}
