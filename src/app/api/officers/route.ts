import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Officer, { IOfficer } from '@/models/Officer';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const active = searchParams.get('active');

    let query: any = {};
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
  } catch (error: any) {
    console.error('Error creating officer:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create officer' },
      { status: 400 }
    );
  }
}