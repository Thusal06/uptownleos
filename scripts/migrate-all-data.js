const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://colombouptowneminence_db_user:4AFzHYLuYDek63H7@uptownleos.yvrt9da.mongodb.net/?retryWrites=true&w=majority&appName=uptownleos';

// Complete officer data from the existing file
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
    name: "Leo Lion Yohani Gunathilaka",
    role: "Assistant Secretary",
    avatar: "/board/yohani.jpg",
    biography: "Detail-oriented administrator supporting the Club Secretary in managing official documentation, communications, and ensuring smooth administrative operations.",
    background: "Leo Lion Yohani Gunathilaka serves as Assistant Secretary, providing crucial support to the Club Secretary in managing all administrative functions of LLCCUE. Her attention to detail and organizational skills ensure that all club records are maintained accurately and communications are handled efficiently.",
    achievements: [
      "Assists in maintaining official club records and documentation",
      "Supports communication with members and external stakeholders",
      "Helps coordinate club meetings and events",
      "Ensures compliance with Lions International administrative standards"
    ],
    joinedYear: "2025",
    email: "yohani@llccue.org",
    quote: "Efficient administration is the foundation of effective service.",
    isActive: true,
    order: 2
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
    order: 3
  },
  {
    name: "Leo Lion Vihandu Wanniarachchi",
    role: "Vice President",
    avatar: "/board/vihandu.jpg",
    biography: "Dynamic leader supporting the President and ensuring seamless project execution, bridging vision and implementation.",
    background: "Leo Lion Vihandu Wanniarachchi serves as the primary support to the Club President and plays a crucial role in project coordination. His leadership ensures that all club initiatives are executed effectively.",
    achievements: [
      "Assisted in organizing Aurum'25 Charter Installation",
      "Coordinates major club projects and initiatives",
      "Supports team leadership and member development",
      "Bridges communication between leadership and members"
    ],
    joinedYear: "2025",
    email: "vihandu@llccue.org",
    quote: "Great service requires both vision and meticulous execution.",
    isActive: true,
    order: 17
  },
  {
    name: "Leo Lion Savindu Pahasara",
    role: "2nd Vice President",
    avatar: "/board/pahasara.jpg",
    biography: "Innovative leader bringing fresh perspectives and supporting various club initiatives with enthusiasm and dedication.",
    background: "Leo Lion Savindu Pahasara serves as 2nd Vice President, providing additional leadership support and contributing to the strategic direction of LLCCUE. He is known for his creative approach to service projects.",
    achievements: [
      "Supports leadership team in strategic planning",
      "Contributes innovative ideas for service initiatives",
      "Assists in member engagement and recruitment",
      "Participates actively in all major club events"
    ],
    joinedYear: "2025",
    email: "savindu@llccue.org",
    quote: "Protecting our environment is protecting our future.",
    isActive: true,
    order: 17
  },
  {
    name: "Leo Lion Sasira Vihanga",
    role: "Editor",
    avatar: "/board/sasira.jpg",
    biography: "Creative communicator managing all club publications, media content, and ensuring effective communication of LLCCUE's mission and activities.",
    background: "Leo Lion Sasira Vihanga oversees all editorial and communications for LLCCUE. He is responsible for creating compelling content that showcases the club's activities and impact in the community.",
    achievements: [
      "Designed and produced official club publications",
      "Manages social media presence and content creation",
      "Documents club activities and achievements",
      "Creates promotional materials for events and projects"
    ],
    joinedYear: "2025",
    email: "sasira@llccue.org",
    quote: "Every story of service has the power to inspire more service.",
    isActive: true,
    order: 17
  },
  {
    name: "Leo Lion Hesani Vithanage",
    role: "LCIF Coordinator",
    avatar: "/board/hesani.jpg",
    biography: "Dedicated humanitarian connecting local projects with Lions Clubs International Foundation funding and global service opportunities.",
    background: "Leo Lion Hesani Vithanage serves as the LCIF Coordinator, bridging local service initiatives with international funding opportunities. She plays a crucial role in accessing global resources for local impact.",
    achievements: [
      "Researches and applies for LCIF grants",
      "Connects club projects with international funding",
      "Ensures compliance with LCIF requirements",
      "Promotes global service initiatives within the club"
    ],
    joinedYear: "2025",
    email: "hesani@llccue.org",
    quote: "Global service begins with local action and international collaboration.",
    isActive: true,
    order: 17
  },
  {
    name: "Leo Lion Tharuja Wanaguru",
    role: "GMT Coordinator",
    avatar: "/board/tharuja.jpg",
    biography: "Global-minded leader promoting international understanding and coordinating global membership and team activities.",
    background: "Leo Lion Tharuja Wanaguru serves as the GMT Coordinator, focusing on international relations and global service opportunities. He helps expand the club's reach beyond local boundaries.",
    achievements: [
      "Promotes international understanding and cooperation",
      "Coordinates global team activities",
      "Facilitates international partnerships",
      "Encourages participation in global service initiatives"
    ],
    joinedYear: "2025",
    email: "tharuja@llccue.org",
    quote: "Service knows no borders when hearts unite across cultures.",
    isActive: true,
    order: 17
  },
  {
    name: "Leo Lion Seyara Ranaweera",
    role: "GST Coordinator",
    avatar: "/board/seyara.jpg",
    biography: "Service-focused leader ensuring effective service delivery and coordinating global service team initiatives for maximum community impact.",
    background: "Leo Lion Seyara Ranaweera serves as the GST Coordinator, focusing on service project implementation and community impact. She ensures that all service initiatives align with global service objectives.",
    achievements: [
      "Coordinates global service team activities",
      "Ensures quality service delivery",
      "Monitors project impact and effectiveness",
      "Promotes service excellence within the club"
    ],
    joinedYear: "2025",
    email: "seyara@llccue.org",
    quote: "Service is the language that connects hearts and transforms communities.",
    isActive: true,
    order: 17
  },
  {
    name: "Leo Lion Thesara Ranaweera",
    role: "GLT Coordinator",
    avatar: "/board/thesara.jpg",
    biography: "Leadership development expert designing and implementing leadership training programs to empower club members and future leaders.",
    background: "Leo Lion Thesara Ranaweera serves as the GLT Coordinator, focusing on leadership development and training. He plays a crucial role in building the leadership capacity of club members.",
    achievements: [
      "Develops leadership training programs",
      "Mentors emerging leaders within the club",
      "Coordinates leadership development activities",
      "Promotes continuous learning and growth"
    ],
    joinedYear: "2025",
    email: "thesara@llccue.org",
    quote: "Leadership is not inherited, it's cultivated through guidance and practice.",
    isActive: true,
    order: 17
  },
  {
    name: "Leo Lion Methira Gunathilaka",
    role: "Lion Tamer",
    avatar: "/board/methira.jpg",
    biography: "Event management specialist creating engaging activities and ensuring memorable experiences at all club events and activities.",
    background: "Leo Lion Methira Gunathilaka serves as the Lion Tamer, bringing energy and creativity to club events. She ensures that all activities are engaging, fun, and contribute to member development.",
    achievements: [
      "Organizes engaging club activities and events",
      "Creates icebreakers and team-building exercises",
      "Ensures member participation and enjoyment",
      "Promotes fellowship within the club"
    ],
    joinedYear: "2025",
    email: "methira@llccue.org",
    quote: "Fun and service go hand in hand to create lasting impact.",
    isActive: true,
    order: 17
  },
  {
    name: "Leo Lion Devnaka Lakvindu",
    role: "Lion Twister",
    avatar: "/board/devnaka.jpg",
    biography: "Technical specialist bringing modern technology solutions and innovative approaches to traditional service methods and club operations.",
    background: "Leo Lion Devnaka Lakvindu serves as the Lion Twister, bringing technical expertise and innovation to club activities. He ensures that the club leverages technology for maximum impact.",
    achievements: [
      "Provides technical support for club activities",
      "Innovates new approaches to service delivery",
      "Supports digital transformation initiatives",
      "Ensures smooth execution of technical aspects"
    ],
    joinedYear: "2025",
    email: "devnaka@llccue.org",
    quote: "Technology amplifies our service potential and extends our reach.",
    isActive: true,
    order: 17
  },
  {
    name: "Leo Lion Danasiri",
    role: "Project Coordinator",
    avatar: "/board/gayan.jpg",
    biography: "Strategic planner designing and implementing service projects, ensuring effective execution and maximum community impact.",
    background: "Leo Lion Danasiri serves as a Project Coordinator, bringing strategic planning expertise to service initiatives. He ensures that all projects are well-designed and effectively implemented.",
    achievements: [
      "Designs and coordinates service projects",
      "Ensures project quality and effectiveness",
      "Manages project timelines and resources",
      "Monitors project outcomes and impact"
    ],
    joinedYear: "2025",
    email: "danasiri@llccue.org",
    quote: "Great projects are born from great planning and dedicated execution.",
    isActive: true,
    order: 17
  },
  {
    name: "Leo Lion Ruchika Wedisinghe",
    role: "Project Coordinator",
    avatar: "/board/ruchika.jpg",
    biography: "Creative project designer bringing innovative solutions and fresh perspectives to community service initiatives and project development.",
    background: "Leo Lion Ruchika Wedisinghe serves as a Project Coordinator, bringing creativity and innovation to service project design. She ensures that projects are engaging and effective.",
    achievements: [
      "Co-designs innovative service projects",
      "Brings creative solutions to community challenges",
      "Ensures member engagement in project activities",
      "Contributes to project evaluation and improvement"
    ],
    joinedYear: "2025",
    email: "ruchika@llccue.org",
    quote: "Innovation in service creates solutions that truly matter.",
    isActive: true,
    order: 17
  },
  {
    name: "Leo Lion Kawya Ranasinghe",
    role: "Assistant Treasurer",
    avatar: "/board/senuri.jpg",
    biography: "Financial analyst supporting treasury operations and ensuring fiscal responsibility through effective budget planning and resource management.",
    background: "Leo Lion Kawya Ranasinghe serves as Assistant Treasurer, providing crucial support to financial operations. She ensures that all financial activities are properly managed and documented.",
    achievements: [
      "Supports treasury operations and financial management",
      "Assists in budget planning and tracking",
      "Ensures proper financial documentation",
      "Supports fundraising and sponsorship activities"
    ],
    joinedYear: "2025",
    email: "kawya@llccue.org",
    quote: "Financial wisdom ensures sustainable service and long-term impact.",
    isActive: true,
    order: 17
  },
  {
    name: "Leo Lion Supun Perera",
    role: "External Affairs Coordinator",
    avatar: "/board/supun.jpg",
    biography: "Relationship builder connecting the club with external stakeholders, sponsors, and opportunities for enhanced community impact.",
    background: "Leo Lion Supun Perera serves as External Affairs Coordinator, building and maintaining relationships with external stakeholders. He plays a crucial role in expanding the club's reach and impact.",
    achievements: [
      "Builds relationships with external stakeholders",
      "Identifies partnership and sponsorship opportunities",
      "Represents the club in external forums",
      "Enhances the club's public image and reach"
    ],
    joinedYear: "2025",
    email: "supun@llccue.org",
    quote: "Strong relationships amplify our service impact and community reach.",
    isActive: true,
    order: 17
  },
  {
    name: "Leo Lion Ranudi Perera",
    role: "GMCT Coordinator",
    avatar: "/board/ranudi.jpg",
    biography: "Dedicated member serving as GMCT Coordinator, bringing enthusiasm and expertise to all club initiatives while contributing to global membership and team activities.",
    background: "Leo Lion Ranudi Perera serves as the GMCT Coordinator for LLCCUE, playing a crucial role in global membership development and team coordination. Her enthusiasm and dedication make her a valuable member of the leadership team.",
    achievements: [
      "Coordinates global membership and team activities",
      "Contributes innovative ideas for club development",
      "Supports team initiatives and member engagement",
      "Active participant in all service projects"
    ],
    joinedYear: "2025",
    email: "ranudi@llccue.org",
    quote: "Every act of service, no matter how small, creates ripples of positive change.",
    isActive: true,
    order: 17
  }
];

// Events from the main page
const events = [
  {
    title: "Aurum'25 - Charter Installation Ceremony",
    description: "A landmark event that officially chartered LLCCUE under Lions International. Installation of club officers, unveiling of the official club banner, and commencement of the club's journey.",
    date: new Date("2025-07-24"),
    location: "Colombo, Sri Lanka",
    type: "meeting",
    status: "completed",
    organizer: "Leo Lion Anuk Nisalitha",
    contactEmail: "anuk@llccue.org",
    highlights: ["Official chartering ceremony", "Officer installation", "Banner unveiling", "Keynote speeches"]
  },
  {
    title: "BRANDBOOST360 - Digital Marketing Workshop",
    description: "Digital Marketing Basics for Youth Entrepreneurs organized in collaboration with Leo Club of St. Joseph's College Anuradhapura and Lions Club of Anuradhapura City.",
    date: new Date("2025-08-27"),
    location: "Anuradhapura, Sri Lanka",
    type: "training",
    status: "completed",
    organizer: "Leo Lion Thusal Ranawaka",
    contactEmail: "thusal@llccue.org",
    highlights: ["Digital marketing fundamentals", "Youth entrepreneurship", "Collaborative workshop", "Skill development"]
  },
  {
    title: "Wellawatta Beach Cleanup",
    description: "Environmental conservation initiative to protect Sri Lanka's coastal ecosystems and raise awareness about marine pollution.",
    date: new Date("2025-09-15"),
    location: "Wellawatta Beach, Colombo",
    type: "service",
    status: "upcoming",
    organizer: "Leo Lion Savindu Pahasara",
    contactEmail: "savindu@llccue.org",
    highlights: ["Beach cleanup", "Environmental awareness", "Community participation", "Marine conservation"]
  },
  {
    title: "Leadership Development Workshop",
    description: "Comprehensive leadership training program facilitated by Zone Chairperson Lion Lakisha Perera for club officers and members.",
    date: new Date("2025-10-05"),
    location: "Colombo, Sri Lanka",
    type: "training",
    status: "upcoming",
    organizer: "Leo Lion Thesara Ranaweera",
    contactEmail: "thesara@llccue.org",
    highlights: ["Leadership skills", "Team building", "Professional development", "Mentorship"]
  }
];

// Sample news articles based on the activities
const news = [
  {
    title: "LLCCUE Successfully Chartered at Aurum'25 Ceremony",
    content: "The Leo Lions Club of Colombo Uptown Eminence (LLCCUE) was officially chartered at the prestigious Aurum'25 Charter Installation Ceremony held on July 24, 2025. The event marked the beginning of a new era for community service and leadership development in Colombo. District Governor Lion [Name] presided over the ceremony, installing the 17-member executive board led by Charter President Leo Lion Anuk Nisalitha. The ceremony was attended by distinguished Lions, Leos, and community leaders who witnessed the official unveiling of the club banner and the oath-taking ceremony. Charter President Anuk Nisalitha outlined the club's vision for combining environmental conservation, digital literacy, and traditional community service under the theme 'Service Beyond Boundaries.'",
    summary: "LLCCUE officially chartered with installation of 17 executive board members at landmark ceremony.",
    author: "Leo Lion Sasira Vihanga",
    category: "Club News",
    tags: ["Charter", "Installation", "Leadership", "Aurum'25"],
    isPublished: true,
    featured: true,
    publishedAt: new Date("2025-07-25")
  },
  {
    title: "BRANDBOOST360 Empowers Young Entrepreneurs in Anuradhapura",
    content: "LLCCUE successfully conducted the BRANDBOOST360 Digital Marketing Workshop in collaboration with Leo Club of St. Joseph's College Anuradhapura and Lions Club of Anuradhapura City. The workshop provided essential digital marketing skills to over 50 youth entrepreneurs from the North Central Province. Led by Club Secretary Leo Lion Thusal Ranawaka, the program covered social media marketing, content creation, SEO basics, and online business strategies. Participants received hands-on training and certificates of completion. This initiative demonstrates LLCCUE's commitment to extending its impact beyond Colombo and fostering entrepreneurship nationwide.",
    summary: "Digital marketing workshop empowers 50+ youth entrepreneurs with essential business skills.",
    author: "Leo Lion Sasira Vihanga",
    category: "Service Projects",
    tags: ["Digital Marketing", "Entrepreneurship", "Workshop", "Collaboration"],
    isPublished: true,
    featured: false,
    publishedAt: new Date("2025-08-28")
  },
  {
    title: "Environmental Conservation Drive: Wellawatta Beach Cleanup Initiative",
    content: "LLCCUE is organizing a major environmental conservation initiative focused on Wellawatta Beach cleanup. Scheduled for September 15, 2025, this project aims to remove plastic waste and raise awareness about marine ecosystem protection. Led by 2nd Vice President Leo Lion Savindu Pahasara, the initiative will involve over 100 volunteers including students, community members, and environmental activists. The project includes waste segregation, recycling education, and plantation of coastal vegetation. This aligns with President's Environment Pioneer programs and contributes to Sri Lanka's sustainable development goals.",
    summary: "Major beach cleanup initiative planned for Wellawatta with 100+ volunteers.",
    author: "Leo Lion Hesani Vithanage",
    category: "Environmental",
    tags: ["Environment", "Beach Cleanup", "Conservation", "Sustainability"],
    isPublished: true,
    featured: false,
    publishedAt: new Date("2025-09-01")
  }
];

// Sample membership applications
const applications = [
  {
    firstName: "Kamal",
    lastName: "Perera",
    email: "kamal.perera@email.com",
    phone: "+94 77 123 4567",
    dateOfBirth: new Date("1998-05-15"),
    occupation: "Software Engineer",
    education: "BSc in Computer Science, University of Colombo",
    interests: ["Community Service", "Technology Education", "Environmental Conservation"],
    motivation: "I want to contribute my technical skills to help the community and develop leadership abilities while making a positive impact on society.",
    skills: ["Web Development", "Database Management", "Project Management", "Teaching"],
    experience: "2 years of volunteer experience teaching coding to underprivileged students",
    availability: "Weekends and evenings",
    referenceName: "Nimal Fernando",
    referenceContact: "+94 71 234 5678"
  },
  {
    firstName: "Priyanka",
    lastName: "Silva",
    email: "priyanka.silva@email.com",
    phone: "+94 76 987 6543",
    dateOfBirth: new Date("2000-08-22"),
    occupation: "Marketing Executive",
    education: "BA in Marketing, University of Sri Jayewardenepura",
    interests: ["Digital Marketing", "Event Management", "Youth Development"],
    motivation: "I'm passionate about using marketing skills for social causes and want to be part of an organization that creates real community impact.",
    skills: ["Social Media Marketing", "Content Creation", "Event Planning", "Public Relations"],
    experience: "Organized several charity events and fundraising campaigns",
    availability: "Flexible schedule",
    referenceName: "Rashmi Kumar",
    referenceContact: "+94 77 456 7890"
  }
];

async function migrateAllData() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('test');

    // Migrate Officers
    console.log('Migrating officers...');
    const officersCollection = database.collection('officers');
    await officersCollection.deleteMany({});
    const officerResult = await officersCollection.insertMany(officers);
    console.log(`✅ Inserted ${officerResult.insertedCount} officers`);

    // Migrate Events
    console.log('Migrating events...');
    const eventsCollection = database.collection('events');
    await eventsCollection.deleteMany({});
    const eventResult = await eventsCollection.insertMany(events);
    console.log(`✅ Inserted ${eventResult.insertedCount} events`);

    // Migrate News
    console.log('Migrating news...');
    const newsCollection = database.collection('news');
    await newsCollection.deleteMany({});
    const newsResult = await newsCollection.insertMany(news);
    console.log(`✅ Inserted ${newsResult.insertedCount} news articles`);

    // Migrate Applications
    console.log('Migrating applications...');
    const applicationsCollection = database.collection('applications');
    await applicationsCollection.deleteMany({});
    const applicationResult = await applicationsCollection.insertMany(applications);
    console.log(`✅ Inserted ${applicationResult.insertedCount} applications`);

    console.log('\n🎉 All data migration completed successfully!');
    console.log('\nSummary:');
    console.log(`- Officers: ${officerResult.insertedCount}`);
    console.log(`- Events: ${eventResult.insertedCount}`);
    console.log(`- News Articles: ${newsResult.insertedCount}`);
    console.log(`- Applications: ${applicationResult.insertedCount}`);

  } catch (error) {
    console.error('❌ Error migrating data:', error);
  } finally {
    await client.close();
    console.log('\n📡 Disconnected from MongoDB');
  }
}

migrateAllData();