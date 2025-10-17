import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Officer from '@/models/Officer';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

interface QueryFilter {
  isActive?: boolean;
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const active = searchParams.get('active');

    const query: QueryFilter = {};
    if (active === 'true') {
      query.isActive = true;
    }

    const officers = await Officer.find(query).sort({ order: 1, createdAt: -1 });

    return NextResponse.json({ success: true, data: officers });
  } catch (error) {
    console.error('Error fetching officers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch officers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const officer = new Officer(body);
    await officer.save();

    return NextResponse.json({ success: true, data: officer }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating officer:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create officer';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}