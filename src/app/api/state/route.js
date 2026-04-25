import { simulationState } from '@/lib/state';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(simulationState);
}
