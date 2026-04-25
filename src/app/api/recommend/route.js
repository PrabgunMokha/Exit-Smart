import { getRecommendations } from '@/lib/state';
import { NextResponse } from 'next/server';

export async function GET() {
  const recommendations = getRecommendations();
  return NextResponse.json(recommendations);
}
