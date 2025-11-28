import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { sql } from 'drizzle-orm';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ DATABASE_URL environment variable is required');
  console.error('Please set DATABASE_URL in your .env file');
  process.exit(1);
}

console.log('🔄 Connecting to database...');

const client = neon(connectionString);
const db = drizzle(client);

try {
  console.log('📝 Creating database tables...');

  // Create tables if they don't exist
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    );
  `);

  console.log('✅ Created contact_submissions table');

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS testimonials (
      id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
      platform TEXT NOT NULL,
      post_url TEXT NOT NULL,
      author_name TEXT NOT NULL,
      author_handle TEXT,
      content TEXT NOT NULL,
      image_url TEXT,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    );
  `);

  console.log('✅ Created testimonials table');
  console.log('');
  console.log('🎉 Database migration completed successfully!');
  console.log('You can now start your application with: npm run dev');

} catch (error) {
  console.error('❌ Migration failed:', error);
  process.exit(1);
}
