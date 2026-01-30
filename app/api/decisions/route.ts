import { NextResponse } from 'next/server';
import { getDecisions } from '@/lib/actions';

export async function GET() {
  try {
    const decisions = await getDecisions();
    return NextResponse.json(decisions);
  } catch (error) {
    console.error('Error fetching decisions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch decisions' },
      { status: 500 }
    );
  }
}
