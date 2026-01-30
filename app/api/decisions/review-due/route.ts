import { NextResponse } from 'next/server';
import { getReviewDueDecisions } from '@/lib/actions';

export async function GET() {
  try {
    const decisions = await getReviewDueDecisions(14);
    return NextResponse.json(decisions);
  } catch (error) {
    console.error('Error fetching review due decisions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch review due decisions' },
      { status: 500 }
    );
  }
}
