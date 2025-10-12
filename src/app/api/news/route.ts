import { NextRequest, NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: ['image', 'media:content', 'enclosure']
  }
});

// Lions-related RSS feeds
const RSS_FEEDS = [
  {
    name: 'Lions Clubs International',
    url: 'https://www.lionsclubs.org/en/feed',
    category: 'Official'
  },
  {
    name: 'LION Magazine',
    url: 'https://www.lionmagazine.org/feed/',
    category: 'Magazine'
  },
  {
    name: 'District 306 D7',
    url: 'https://lions306d7.org/feed/',
    category: 'Regional'
  },
  // Fallback to service-related news if Lions feeds are unavailable
  {
    name: 'Service News',
    url: 'https://www.reliefweb.int/rssupdates.xml',
    category: 'Humanitarian'
  }
];

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  image?: string;
  source: string;
  category: string;
  publishedDate: string;
  url: string;
  guid?: string;
}

interface RSSItem {
  title?: string;
  link?: string;
  pubDate?: string;
  contentSnippet?: string;
  description?: string;
  content?: string;
  image?: string;
  'media:content'?: {
    $?: {
      url?: string;
    };
  };
  enclosure?: {
    url?: string;
    type?: string;
  };
  'content:encoded'?: string;
  guid?: string;
}

async function fetchRSSFeed(feedUrl: string): Promise<RSSItem[]> {
  try {
    const feed = await parser.parseURL(feedUrl);
    return feed.items || [];
  } catch (error) {
    console.warn(`Failed to fetch RSS feed: ${feedUrl}`, error);
    return [];
  }
}

function extractImageUrl(item: RSSItem): string | undefined {
  // Try multiple image sources
  if (item.image) return item.image;
  if (item['media:content']?.['$']?.url) return item['media:content']['$'].url;
  if (item.enclosure?.url && item.enclosure.type?.startsWith('image/')) return item.enclosure.url;
  if (item['content:encoded']) {
    const imgMatch = item['content:encoded'].match(/<img[^>]+src="([^"]+)"/);
    if (imgMatch) return imgMatch[1];
  }
  if (item.content) {
    const imgMatch = item.content.match(/<img[^>]+src="([^"]+)"/);
    if (imgMatch) return imgMatch[1];
  }
  // Fallback to Lions images
  const lionsImages = [
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=800&q=80"
  ];

  // Generate deterministic fallback image based on title
  const titleHash = item.title ? item.title.length % lionsImages.length : 0;
  return lionsImages[titleHash];
}

function generateArticleId(item: RSSItem): string {
  const content = `${item.title || ''}${item.link || ''}${item.pubDate || ''}`;
  return Buffer.from(content).toString('base64').substring(0, 16);
}

function cleanText(text: string): string {
  if (!text) return '';

  // Remove HTML tags
  const withoutHtml = text.replace(/<[^>]*>/g, '');

  // Fix common encoding issues
  const cleaned = withoutHtml
    .replace(/[â\u20AC\u201A][â\u20AC\u2122]/g, "'") // Fix apostrophes
    .replace(/[â\u20AC\u201D][â\u20AC\u0153]/g, '"') // Fix quotes
    .replace(/[â\u20AC\u201C][â\u20AC\u00A6]/g, '...') // Fix ellipsis
    .replace(/\[â\u20ACÂ¦\]/g, '...') // Fix ellipsis in brackets
    .replace(/\\u[\dA-F]{4}/gi, '') // Remove unicode escape sequences
    .replace(/The post.*?appeared first on.*?Lion Magazine\./g, '') // Remove blog footer
    .trim();

  return cleaned;
}

function isLionsRelated(item: RSSItem): boolean {
  const text = `${item.title || ''} ${item.contentSnippet || ''} ${item.description || ''}`.toLowerCase();
  const lionsKeywords = [
    'lions', 'lionism', 'leo club', 'lions club', 'lions international',
    'service', 'community', 'humanitarian', 'volunteer', 'charity'
  ];
  return lionsKeywords.some(keyword => text.includes(keyword));
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '20');

    const allArticles: NewsArticle[] = [];

    // Fetch all RSS feeds
    for (const feed of RSS_FEEDS) {
      const items = await fetchRSSFeed(feed.url);

      const articles = items
        .filter(isLionsRelated) // Filter for Lions-related content
        .map(item => ({
          id: generateArticleId(item),
          title: cleanText(item.title || 'Untitled Article'),
          description: cleanText(item.contentSnippet || item.description || 'No description available'),
          image: extractImageUrl(item),
          source: feed.name,
          category: feed.category,
          publishedDate: item.pubDate || new Date().toISOString(),
          url: item.link || '#',
          guid: item.guid
        }));

      allArticles.push(...articles);
    }

    // Remove duplicates based on title similarity
    const uniqueArticles = allArticles.filter((article, index, self) =>
      index === self.findIndex(a =>
        a.title.toLowerCase().trim() === article.title.toLowerCase().trim()
      )
    );

    // Sort by publication date (newest first)
    uniqueArticles.sort((a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    );

    // Apply category filter if specified
    const filteredArticles = category
      ? uniqueArticles.filter(article => article.category === category)
      : uniqueArticles;

    // Apply limit
    const limitedArticles = filteredArticles.slice(0, limit);

    // Cache for 2 hours
    const response = NextResponse.json({
      articles: limitedArticles,
      total: filteredArticles.length,
      lastUpdated: new Date().toISOString(),
      categories: [...new Set(uniqueArticles.map(a => a.category))]
    });

    response.headers.set('Cache-Control', 'public, s-maxage=7200, stale-while-revalidate=3600');

    return response;

  } catch (error) {
    console.error('News API Error:', error);

    // Return fallback response
    return NextResponse.json({
      articles: [],
      total: 0,
      lastUpdated: new Date().toISOString(),
      categories: [],
      error: 'Failed to fetch news'
    }, { status: 500 });
  }
}

// Enable ISR for better performance
export const revalidate = 7200; // 2 hours