import { connectDB } from '../lib/mongodb';
import Officer from '../models/Officer';
import { officers } from '../data/officers';

async function seedOfficers() {
  try {
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

  } catch (error) {
    console.error('Error seeding officers:', error);
  } finally {
    process.exit(0);
  }
}

seedOfficers();