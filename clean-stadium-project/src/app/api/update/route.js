import { simulationState } from '@/lib/state';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    const { type, id, action } = data; // action = 'increment' or 'decrement'

    if (type === 'gate') {
      const gate = simulationState.gates.find(g => g.id === id);
      if (gate) {
        if (action === 'increment') gate.crowdCount += 10;
        if (action === 'decrement' && gate.crowdCount >= 10) gate.crowdCount -= 10;
      }
    } else if (type === 'stall') {
      const stall = simulationState.stalls.find(s => s.id === id);
      if (stall) {
        if (action === 'increment') stall.queueLength += 1;
        if (action === 'decrement' && stall.queueLength >= 1) stall.queueLength -= 1;
      }
    }

    return NextResponse.json({ success: true, state: simulationState });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
