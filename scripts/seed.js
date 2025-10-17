const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://colombouptowneminence_db_user:4AFzHYLuYDek63H7@uptownleos.yvrt9da.mongodb.net/?retryWrites=true&w=majority&appName=uptownleos';

const officers = [
  {
    name: "Leo Lion Anuk Nisalitha",
    role: "Club President",
    avatar: "/board/anuk.jpeg",
    biography: "Accomplished environmental leader, scout, and emerging entrepreneur recognized for vision, leadership, and commitment to meaningful change. Proud alumnus of Ananda College and President's Scout Award recipient.",
    background: "Leo Lion Anuk Nisalitha is a distinguished youth leader with exceptional achievements in environmental conservation, scouting, and community service. As a School Coloursman and recipient of the President's Scout Award (highest Scouting honor in Sri Lanka) and President's Environment Pioneer, he has demonstrated outstanding leadership across multiple domains. His educational journey at Ananda College was marked by academic excellence, environmental activism, and exceptional service, laying the foundation for his emergence as one of Sri Lanka's most promising young leaders.",
    achievements: [
      "President's Scout Award - Highest Scouting honor in Sri Lanka",
      "President's Environment Pioneer Award",
      "Led Ananda College Environmental Society (ACES) to Best Society Gold Medal",
      "Secured President's Environmental Award for Ananda College",
      "Founded 'Eco Vision' - Ananda College's first environmental magazine",
      "Environmental Leadership Award from Central Environmental Authority of Sri Lanka",
      "Most Outstanding Environmental Pioneer (2022/23) of Ananda College",
      "District President's Appreciation Award & District Governor's Appreciation Award",
      "Led chartering of LLCCUE under Lions International",
      "Organized Aurum'25 Charter Installation Ceremony"
    ],
    joinedYear: "2025",
    email: "anuk@llccue.org",
    quote: "Leadership exemplifies the essence of the Leo spirit: service before self, vision before victory, and purpose before praise.",
    isActive: true,
    order: 0
  },
  {
    name: "Leo Lion Thusal Ranawaka",
    role: "Club Secretary",
    avatar: "/board/thusal.jpeg",
    biography: "Dedicated administrator ensuring smooth operations and effective communication within the club, instrumental in organizational development.",
    background: "Leo Lion Thusal Ranawaka manages all administrative functions of LLCCUE with exceptional attention to detail. He plays a crucial role in maintaining club records, communications, and ensuring compliance with Lions International standards.",
    achievements: [
      "Managed official documentation for club chartering process",
      "Coordinated successful execution of Aurum'25 ceremony",
      "Established efficient administrative systems",
      "Maintains comprehensive club records and communications"
    ],
    joinedYear: "2025",
    email: "thusal@llccue.org",
    quote: "Efficiency in service amplifies our impact on the community.",
    isActive: true,
    order: 1
  },
  {
    name: "Leo Lion Rinoshi Nihara",
    role: "Club Treasurer",
    avatar: "/board/rinoshi.jpg",
    biography: "Financial steward with expertise in budget management and resource optimization, ensuring transparent and effective financial operations.",
    background: "Leo Lion Rinoshi Nihara oversees all financial aspects of LLCCUE, ensuring responsible management of club funds and sustainable project financing. Her financial acumen supports the club's various service initiatives.",
    achievements: [
      "Established transparent financial systems for the club",
      "Managed budgeting for charter ceremony and major events",
      "Implemented financial reporting mechanisms",
      "Ensures fiscal responsibility in all club activities"
    ],
    joinedYear: "2025",
    email: "rinoshi@llccue.org",
    quote: "Transparency in finances builds trust and multiplies our service capacity.",
    isActive: true,
    order: 2
  }
];

async function seedDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('test');
    const collection = database.collection('officers');

    // Clear existing data
    await collection.deleteMany({});
    console.log('Cleared existing officers');

    // Insert new data
    const result = await collection.insertMany(officers);
    console.log(`Inserted ${result.insertedCount} officers`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

seedDatabase();