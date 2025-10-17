import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Event from '@/models/Event';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '10');

    const query: {
      status?: string;
      type?: string;
    } = {};
    if (status) query.status = status;
    if (type) query.type = type;

    const events = await Event.find(query)
      .sort({ date: 1 })
      .limit(limit);

    return NextResponse.json({ success: true, data: events });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const event = new Event(body);
    await event.save();

    return NextResponse.json({ success: true, data: event }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating event:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create event';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}