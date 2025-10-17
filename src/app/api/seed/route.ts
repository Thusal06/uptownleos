import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Officer from '@/models/Officer';
import { officers } from '@/data/officers';

export async function POST(request: NextRequest) {
  try {
    // Check for secret key to prevent unauthorized seeding
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');

    if (secret !== process.env.SEED_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    console.log('Clearing existing officers...');
    await Officer.deleteMany({});

    console.log('Seeding officers...');
    const officerDocs = officers.map((officer, index) => ({
      ...officer,
      order: index,
      isActive: true
    }));

    await Officer.insertMany(officerDocs);
    console.log('Successfully seeded officers!');

    return NextResponse.json({
      success: true,
      message: 'Successfully seeded officers',
      count: officers.length
    });

  } catch (error: any) {
    console.error('Error seeding officers:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to seed officers' },
      { status: 500 }
    );
  }
}