import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import News from '@/models/News';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '10');

    const query: {
      isPublished?: boolean;
      featured?: boolean;
      category?: string;
    } = {};
    if (published === 'true') query.isPublished = true;
    if (featured === 'true') query.featured = true;
    if (category) query.category = category;

    const news = await News.find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit);

    return NextResponse.json({ success: true, data: news });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Set publishedAt if publishing
    if (body.isPublished && !body.publishedAt) {
      body.publishedAt = new Date();
    }

    const news = new News(body);
    await news.save();

    return NextResponse.json({ success: true, data: news }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating news:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create news';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 400 }
    );
  }
}