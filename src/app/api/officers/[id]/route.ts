import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Officer from '@/models/Officer';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const { id } = await params;
    const officer = await Officer.findById(id);

    if (!officer) {
      return NextResponse.json(
        { success: false, error: 'Officer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: officer });
  } catch (error) {
    console.error('Error fetching officer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch officer' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();
    const officer = await Officer.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );

    if (!officer) {
      return NextResponse.json(
        { success: false, error: 'Officer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: officer });
  } catch (error: unknown) {
    console.error('Error updating officer:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to update officer';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const { id } = await params;
    const officer = await Officer.findByIdAndDelete(id);

    if (!officer) {
      return NextResponse.json(
        { success: false, error: 'Officer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: officer });
  } catch (error) {
    console.error('Error deleting officer:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete officer' },
      { status: 500 }
    );
  }
}