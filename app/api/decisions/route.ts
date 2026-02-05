import { NextResponse } from 'next/server';
import { getDecisions } from '@/lib/actions';
import { auth } from '@/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decisions = await getDecisions({}, session.user.id);
    return NextResponse.json(decisions);
  } catch (error) {
    console.error('Error fetching decisions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch decisions' },
      { status: 500 }
    );
  }
}
