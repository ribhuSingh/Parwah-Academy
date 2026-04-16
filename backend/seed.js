import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Committee from './models/Committee.js'; // Updated path
import Event from './models/Event.js'; // Updated path
import GalleryImage from './models/GalleryImage.js'; // Updated path
import User from './models/User.js'; // Add User model
import Registration from './models/Registration.js';

dotenv.config();
const SALT_ROUNDS = 10;

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB for seeding at ${mongoose.connection.host}`);

    // Clear existing collections to prevent duplicate seeding
    await Committee.deleteMany();
    await Event.deleteMany();
    await GalleryImage.deleteMany(); // Clear existing gallery images
    await User.deleteMany(); // Clear existing users
    await Registration.deleteMany();
    console.log('Cleared existing Committee, Event, Gallery, User, and Registration data.');

    const committeeData = [
      { name: 'Haider Ali Choudhary', role: 'Founder / President', bio: 'BSc (Physical Education), B.Ped, M.Ped. Black Belt in Taekwondo and a National Referee.', category: 'Leadership', imageUrl: '/assets/M2.jpeg' },
      { name: 'Digvijay Singh', role: 'Head Coach', bio: 'BPES graduate, Diploma in Sports & Event Marketing (Canada). Certified Taekwondo & Fitness Trainer with 10+ years of experience.', category: 'Coaching Team', imageUrl: '/assets/M4.jpeg' },
      { name: 'M. Mustkeem Ansari', role: 'National Coach', bio: 'Holds an M.Ped degree and is a certified National Coach, bringing a wealth of experience in high-level athlete training.', category: 'Coaching Team', imageUrl: '/assets/M1.jpeg' },
      { name: 'Sakshi Rana', role: 'Legal Advisor', bio: 'Holds LLB and LLM degrees. Provides legal guidance for organizational compliance, partnerships, and governance.', category: 'Advisors & Patrons', imageUrl: '' },
      { name: 'Vasar Choudhary', role: 'Advisor', bio: 'Associated with PGIMER Chandigarh, providing valuable insights into athlete health and well-being.', category: 'Advisors & Patrons', imageUrl: '' },
      { name: 'Giani Hardayal Singh', role: 'Patron (USA)', bio: "A key supporter and patron based in the USA, helping to guide the trust's international vision.", category: 'Advisors & Patrons', imageUrl: '' },
      { name: 'Sufi Gujjar', role: 'Brand Ambassador', bio: 'A well-known Artist, Actor, and Model who supports and represents the mission of PSCT.', category: 'Ambassadors', imageUrl: '' }
    ];

    const eventData = [
      { title: 'Annual Sports Gala', description: 'Celebrate the achievements of our athletes with awards and performances.', eventDate: new Date('2024-06-15T18:00:00Z'), location: 'Grand Hall, Sports Center' },
      { title: 'Youth Training Workshop', description: 'Interactive workshop for young athletes to learn new skills and techniques.', eventDate: new Date('2024-07-20T10:00:00Z'), location: 'Training Field A' },
      { title: 'Community Open Day', description: 'Open day for the community to participate in various sports activities.', eventDate: new Date('2024-08-10T09:00:00Z'), location: 'Main Stadium' }
    ];

    const galleryImageData = [
      {
        src: "/assets/P1.jpeg",
        alt: "Taekwondo training session",
        category: "Taekwondo",
        caption: "Focused training session for upcoming competitions.",
        order: 1
      },
      {
        src: "/assets/P2.jpeg",
        alt: "Athletes during a running drill",
        category: "Athletics",
        caption: "Speed and endurance drills on the track.",
        order: 2
      },
      {
        src: "/assets/P3.jpeg",
        alt: "Volleyball team practice",
        category: "Volleyball",
        caption: "Teamwork and strategy in action.",
        order: 3
      },
      {
        src: "/assets/P4.jpeg",
        alt: "Athlete development program",
        category: "Athlete Development",
        caption: "Strength and conditioning session.",
        order: 4
      },
      // Add more sample images as needed
    ];

    // Create a default admin user
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hashedAdminPassword = await bcrypt.hash(adminPassword, SALT_ROUNDS);
    const adminUser = {
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      password: hashedAdminPassword,
      isAdmin: true,
    };

    // Insert new data
    await Committee.insertMany(committeeData);
    await Event.insertMany(eventData);
    await GalleryImage.insertMany(galleryImageData); // Insert gallery images
    await User.create(adminUser);


    console.log(`✅ Seed data successfully inserted! Admin user created with email: ${adminUser.email}`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();