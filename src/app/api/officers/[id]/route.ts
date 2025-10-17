import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Officer, { IOfficer } from '@/models/Officer';

interface Params {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const officer = await Officer.findById(params.id);

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

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const body = await request.json();
    const officer = await Officer.findByIdAndUpdate(
      params.id,
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
  } catch (error: any) {
    console.error('Error updating officer:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update officer' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    await connectDB();

    const officer = await Officer.findByIdAndDelete(params.id);

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