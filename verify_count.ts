
import { config } from 'dotenv';
import { resolve } from 'path';
import pg from 'pg';

config({ path: resolve(__dirname, '.env') });
const { Pool } = pg;

async function check() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT COUNT(*) FROM testimonials');
        console.log('Count:', res.rows[0].count);
        const recent = await client.query('SELECT author_name, platform FROM testimonials ORDER BY created_at DESC LIMIT 5');
        console.log('Recent:', recent.rows);
    } catch (e) {
        console.error(e);
    } finally {
        client.release();
        pool.end();
    }
}
check();
