import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';
const { Pool } = pg;
import * as dotenv from 'dotenv';
import { portfolioItems } from './shared/schema';

dotenv.config();

async function main() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        console.error('❌ DATABASE_URL is not set');
        process.exit(1);
    }

    console.log('🔄 Connecting to database...');
    const pool = new Pool({ connectionString });
    const db = drizzle(pool);

    try {
        console.log('🔄 Creating portfolio_items table...');

        // Create the portfolio_items table
        await pool.query(`
      CREATE TABLE IF NOT EXISTS portfolio_items (
        id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        line_art_url TEXT NOT NULL,
        full_art_url TEXT NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

        console.log('✅ Portfolio items table created successfully!');
        console.log('✅ Migration complete!');
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

main();
