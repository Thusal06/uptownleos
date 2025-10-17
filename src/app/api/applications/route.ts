import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Application from '@/models/Application';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '20');

    const query: {
      status?: string;
    } = {};
    if (status) query.status = status;

    const applications = await Application.find(query)
      .sort({ createdAt: -1 })
      .limit(limit);

    return NextResponse.json({ success: true, data: applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const application = new Application(body);
    await application.save();

    return NextResponse.json({ success: true, data: application }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating application:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create application';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}