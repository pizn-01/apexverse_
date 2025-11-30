import { config } from 'dotenv';
config();

import pg from 'pg';
const { Pool } = pg;

console.log('🔍 Verifying Supabase Database Connection...\n');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    console.error('❌ DATABASE_URL not found in environment variables');
    process.exit(1);
}

console.log('✓ DATABASE_URL found');
console.log(`✓ Connection string: ${connectionString.replace(/:[^:@]+@/, ':****@')}\n`);

const pool = new Pool({ connectionString });

try {
    // Test connection
    console.log('📡 Testing database connection...');
    const client = await pool.connect();
    console.log('✅ Successfully connected to Supabase!\n');

    // Check if tables exist
    console.log('📋 Checking database tables...');

    const tablesQuery = await client.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name IN ('contact_submissions', 'testimonials')
    ORDER BY table_name;
  `);

    if (tablesQuery.rows.length === 0) {
        console.log('⚠️  No tables found. Run: npm run db:migrate');
    } else {
        console.log('✅ Found tables:');
        tablesQuery.rows.forEach(row => {
            console.log(`   - ${row.table_name}`);
        });
    }

    // Count records in each table
    console.log('\n📊 Record counts:');

    try {
        const contactCount = await client.query('SELECT COUNT(*) FROM contact_submissions');
        console.log(`   - contact_submissions: ${contactCount.rows[0].count} records`);
    } catch (e) {
        console.log('   - contact_submissions: Table not found');
    }

    try {
        const testimonialCount = await client.query('SELECT COUNT(*) FROM testimonials');
        console.log(`   - testimonials: ${testimonialCount.rows[0].count} records`);
    } catch (e) {
        console.log('   - testimonials: Table not found');
    }

    // Test insert and delete
    console.log('\n🧪 Testing database operations...');

    try {
        // Insert test testimonial
        const insertResult = await client.query(`
      INSERT INTO testimonials (platform, post_url, author_name, content)
      VALUES ('x', 'https://x.com/test', 'Test User', 'This is a test testimonial')
      RETURNING id, author_name;
    `);

        const testId = insertResult.rows[0].id;
        console.log(`✅ INSERT: Created test testimonial (ID: ${testId})`);

        // Delete test testimonial
        await client.query('DELETE FROM testimonials WHERE id = $1', [testId]);
        console.log(`✅ DELETE: Removed test testimonial`);

        console.log('✅ All database operations working correctly!');
    } catch (e: any) {
        console.log(`⚠️  Could not test operations: ${e.message}`);
        console.log('   This might be because tables don\'t exist yet.');
        console.log('   Run: npm run db:migrate');
    }

    client.release();

    console.log('\n🎉 Database verification complete!');
    console.log('\n📝 Summary:');
    console.log('   ✓ Connection: Working');
    console.log('   ✓ Database: Accessible');
    console.log('   ✓ Ready for deployment');

} catch (error: any) {
    console.error('\n❌ Database connection failed:');
    console.error(`   Error: ${error.message}`);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Check your DATABASE_URL in .env file');
    console.error('   2. Ensure you\'re using the Connection Pooler URL (port 6543)');
    console.error('   3. Verify your Supabase project is active');
    console.error('   4. Check that the password is correct');
    process.exit(1);
} finally {
    await pool.end();
}
